'use client';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { useState } from 'react';

export default function ContactForm() {
  const { user, token } = useUser();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    type_of_bag: '',
    design_description: '',
    interest: 'custom'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Update form data when user changes
  useState(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type_of_bag: formData.type_of_bag,
        design_description: formData.design_description,
        interest: formData.interest,
      };

      // Add user ID if available
      if (user?._id) {
        submissionData.userId = user._id;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customization/submit`,
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          type_of_bag: '',
          design_description: '',
          interest: 'custom'
        });

        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (err) {
      console.error(err.response?.data?.message ||
        err.message ||
        "An error occurred while submitting your request"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const interests = [
    { value: 'custom', label: 'Custom Design' },
    { value: 'bulk', label: 'Bulk Order' },
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
                  <i className="ri-mail-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 font-light">support@aaranaltales.shop</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-rose-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Design Service</h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Transform your vision into reality with our custom totebag service.
                From initial concept to final creation, our master artisans work with you every step of the way.
              </p>
              <div className="flex items-center text-rose-600">
                <i className="ri-star-line w-5 h-5 flex items-center justify-center mr-2"></i>
                <span className="font-medium">We will connect you as soon as possible.</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type of Bag</label>
                  <input
                    type="text"
                    name="type_of_bag"
                    value={formData.type_of_bag}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Design Description *</label>
                  <textarea
                    name="design_description"
                    value={formData.design_description}
                    onChange={handleChange}
                    rows={6}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  ></textarea>
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.design_description.length}/500 characters
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-4 rounded-2xl hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg ${isUploading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
