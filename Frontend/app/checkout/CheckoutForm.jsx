'use client';

import { useState } from 'react';

export default function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'Spain',
    postalCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    shippingMethod: 'standard',
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Order submitted:', formData);
    }
  };

  const steps = [
    { number: 1, title: 'Contact Info', completed: currentStep > 1 },
    { number: 2, title: 'Shipping', completed: currentStep > 2 },
    { number: 3, title: 'Payment', completed: false }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              currentStep === step.number 
                ? 'bg-gradient-to-r from-rose-600 to-pink-500 border-rose-600 text-white' 
                : step.completed 
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 text-gray-400'
            }`}>
              {step.completed ? (
                <i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
              ) : (
                step.number
              )}
            </div>
            <span className={`ml-3 text-sm font-medium ${
              currentStep === step.number ? 'text-rose-600' : step.completed ? 'text-green-600' : 'text-gray-400'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="w-4 h-4 text-rose-600 border-rose-300 rounded focus:ring-rose-300"
              />
              <label className="ml-3 text-sm text-gray-600">
                Subscribe to our newsletter for exclusive offers and updates
              </label>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apartment, suite, etc.</label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-8 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  required
                >
                  <option value="Spain">Spain</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Shipping Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 bg-rose-50 rounded-2xl border border-rose-200 cursor-pointer hover:bg-rose-100 transition-colors">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-600 border-rose-300"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Standard Shipping</span>
                      <span className="text-gray-600">$25</span>
                    </div>
                    <p className="text-sm text-gray-500">5-7 business days</p>
                  </div>
                </label>
                <label className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-600 border-rose-300"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Express Shipping</span>
                      <span className="text-gray-600">$45</span>
                    </div>
                    <p className="text-sm text-gray-500">2-3 business days</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100">
              <div className="flex items-center space-x-3 mb-3">
                <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                <span className="font-semibold text-gray-900">Secure Payment</span>
              </div>
              <p className="text-sm text-gray-600">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
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
            {currentStep === 3 ? 'Complete Order' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}