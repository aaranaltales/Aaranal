'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="py-12 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Secure
              <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Checkout
              </span>
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Complete your purchase with confidence
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}