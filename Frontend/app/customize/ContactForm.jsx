'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      interest: 'general'
    });
  };

  const interests = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'custom', label: 'Custom Design' },
    { value: 'visit', label: 'Atelier Visit' },
    { value: 'wholesale', label: 'Wholesale Partnership' },
    { value: 'repair', label: 'Repair Service' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Let's Create
                <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Every inquiry is important to us. Our team of artisans and customer care specialists 
                are ready to assist you with personalized attention and expert guidance.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <i className="ri-time-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-gray-600 font-light">Within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Direct Line</h3>
                  <p className="text-gray-600 font-light">+34 93 123 4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <i className="ri-mail-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 font-light">hello@luxeleather.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Design Service</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Transform your vision into reality with our bespoke leather goods service. 
                From initial concept to final creation, our master artisans work with you every step of the way.
              </p>
              <div className="flex items-center text-rose-600">
                <i className="ri-star-line w-5 h-5 flex items-center justify-center mr-2"></i>
                <span className="font-medium">Starting from €200</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-rose-50/50 p-8 rounded-3xl shadow-xl border border-rose-100">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-check-line w-8 h-8 flex items-center justify-center text-white"></i>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Message Sent!</h3>
                <p className="text-gray-600 font-light">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest</label>
                    <div className="relative">
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-8 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                      >
                        {interests.map((interest) => (
                          <option key={interest.value} value={interest.value}>
                            {interest.label}
                          </option>
                        ))}
                      </select>
                      <i className="ri-arrow-down-s-line w-5 h-5 flex items-center justify-center absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  ></textarea>
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-4 rounded-2xl hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}