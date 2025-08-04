'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import Loading from '@/components/Loading';
import CheckoutStepper from './CheckoutStepper';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';

export default function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      console.log('Form submitted');
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100 max-w-3xl mx-auto">
      <CheckoutStepper currentStep={currentStep} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <ShippingStep user={user} />
        )}

        {currentStep === 2 && (
          <PaymentStep />
        )}

        <div className="flex items-center justify-between pt-6 border-t border-rose-100">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="ml-auto bg-gradient-to-r from-rose-600 to-pink-500 text-white px-8 py-4 rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
          >
            {currentStep === 2 ? 'Complete Order' : 'Continue to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}