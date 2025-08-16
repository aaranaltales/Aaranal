'use client';

import Loading from '@/components/Loading';
import CheckoutStepper from './CheckoutStepper';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';
import { useCheckoutContext } from '@/context/CheckoutContext';

export default function CheckoutForm() {
  const {
    formData,
    setFormData,
    showAddressSelector,
    setShowAddressSelector,
    selectAddress,
    handleChange,
    handleSubmit,
    user,
    currentStep,
    setCurrentStep,
    paymentData,
    setPaymentData,
    showCardSelector,
    setShowCardSelector,
    selectCard,
    handleCardChange
  } = useCheckoutContext();

  if (!user) return <Loading />;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-rose-100 w-full">
      <CheckoutStepper currentStep={currentStep} />

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <PaymentStep
            paymentMethods={user?.paymentMethods || []}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            showCardSelector={showCardSelector}
            setShowCardSelector={setShowCardSelector}
            selectCard={selectCard}
            handleCardChange={handleCardChange}
          />
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
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
          >
            {currentStep === 2 ? 'Complete Order' : 'Continue to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}
