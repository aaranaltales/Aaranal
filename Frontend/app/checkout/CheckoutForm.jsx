'use client';

import { useEffect, useState } from 'react';
import CheckoutStepper from './CheckoutStepper';
import ShippingStep from './ShippingStep';
import { useCheckoutContext } from '@/context/CheckoutContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { useLoading } from '@/context/LoadingContext';

export default function CheckoutForm({ assets }) {
  const {
    formData,
    setFormData,
    showAddressSelector,
    setShowAddressSelector,
    selectAddress,
    handleChange,
    user,
    currentStep,
    setCurrentStep,
    subtotal,
    shipping,
    products,
    handleSubmit,
  } = useCheckoutContext();

  const { token, getUserCart,cartItems, setCartItems } = useUser();
  const { setLoading } = useLoading();
  const router = useRouter();
  const [method, setMethod] = useState('razorpay');
  const [isRzpLoaded, setIsRzpLoaded] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // ✅ Load Razorpay SDK once
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.Razorpay) {
      setIsRzpLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRzpLoaded(true);
    script.onerror = () =>
      toast.error('Failed to load Razorpay. Try COD or refresh the page.');
    document.body.appendChild(script);
  }, []);


  // ✅ Exit early if user not loaded yet
  if (!user) return null;

  // ✅ Razorpay popup
  const initPay = (order) => {
    if (!window.Razorpay) {
      toast.error('Razorpay not ready yet. Please try again.');
      return;
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Checkout Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          setLoading(true);
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            { response },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          if (data.success) {
            setCartItems({});
            router.push('/orders?placed=true');
          } else {
            toast.error('Payment verification failed.');
          }
        } catch (err) {
          console.error(err);
          toast.error('Payment verification error.');
        } finally {
          setLoading(false);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Handle placing order depending on payment method
  const handlePayment = async () => {
    setLoading(true);

    try {
      handleSubmit();
      // build order items
      const orderItems = [];

      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          orderItems.push({ productId, quantity: cartItems[productId] });
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: subtotal + shipping,
      };

      if (method === 'cod') {
        const res = await axios.post(
          `${backendUrl}/api/order/place`,
          { orderData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setCartItems({});
          router.push('/orders');
        } else {
          toast.error(res.data.message || 'Failed to place COD order.');
        }
      }

      if (method === 'razorpay') {
        if (!isRzpLoaded) {
          toast.info('Preparing Razorpay… please try again.');
          return;
        }
        const res = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          { orderData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          initPay(res.data.order);
        } else {
          toast.error(res.data.message || 'Failed to start Razorpay payment.');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-rose-100 w-full">
      <CheckoutStepper currentStep={currentStep} />

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {currentStep === 1 && (
          <ShippingStep
            addresses={user.addresses}
            formData={formData}
            setFormData={setFormData}
            showAddressSelector={showAddressSelector}
            setShowAddressSelector={setShowAddressSelector}
            selectAddress={selectAddress}
            handleChange={handleChange}
          />
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Choose Payment Method</h2>
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Razorpay */}
              <div
                onClick={() => setMethod('razorpay')}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition ${method === 'razorpay' ? 'border-green-400 bg-green-50' : 'border-gray-300'
                  }`}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400 border-green-400' : 'border-gray-400'
                    }`}
                ></p>
                <img className="h-5 mx-4" src="/assests/razorpay_logo.png" alt="Razorpay" />
              </div>

              {/* COD */}
              {/* <div
                onClick={() => setMethod('cod')}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md transition ${method === 'cod' ? 'border-green-400 bg-green-50' : 'border-gray-300'
                  }`}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400 border-green-400' : 'border-gray-400'
                    }`}
                ></p>
                <p className="text-gray-700 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div> */}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-rose-100 gap-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full sm:w-auto px-6 py-3 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              currentStep === 2 ? handlePayment() : setCurrentStep(currentStep + 1)
            }
            className="ml-auto bg-gradient-to-r from-rose-600 to-pink-500 text-white px-8 py-4 rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
          >
            {currentStep === 2 ? 'Complete Order' : 'Continue to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}
