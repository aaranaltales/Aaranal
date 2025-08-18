import React from 'react';
import {
  FileText,
  ShoppingCart,
  RotateCcw,
  AlertTriangle,
  Scale,
  UserCheck,
  CreditCard,
  Truck,
} from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = "August 20, 2025";

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <UserCheck className="w-6 h-6" />,
      content: [
        "By accessing or using our website, you agree to comply with and be bound by these Terms of Service.",
        "If you do not accept these terms, please refrain from using our services.",
        "These terms apply to all users, visitors, and customers of our platform.",
        "We may update these terms at any time. Continued use of our services means you accept those updates.",
      ],
    },
    {
      title: "Products and Services",
      icon: <ShoppingCart className="w-6 h-6" />,
      content: [
        "Products are subject to availability and may be discontinued or updated at any time.",
        "We may limit quantities purchased per customer or household.",
        "Images are for reference only; actual product details may vary.",
        "Prices may change without notice and do not include applicable taxes.",
        "In the event of pricing errors, we reserve the right to cancel affected orders.",
      ],
    },
    {
      title: "Orders and Payment",
      icon: <CreditCard className="w-6 h-6" />,
      content: [
        "All orders are subject to review and acceptance.",
        "Payments must be completed before your order is processed.",
        "We accept major credit/debit cards and approved third-party payment methods.",
        "You are responsible for ensuring your billing and shipping details are accurate.",
        "We may cancel or refuse orders in cases of suspected fraud, errors, or policy violations.",
      ],
    },
    {
      title: "Shipping and Delivery",
      icon: <Truck className="w-6 h-6" />,
      content: [
        "Estimated shipping times are provided but not guaranteed.",
        "Risk of loss passes to you once items are handed to the carrier.",
        "We are not responsible for shipping delays outside our control.",
        "Additional fees may apply for express shipping or special requests.",
        "International orders may be subject to customs duties and taxes.",
      ],
    },
    {
      title: "Returns and Refunds",
      icon: <RotateCcw className="w-6 h-6" />,
      content: [
        "You may request a return within 30 days of delivery.",
        "Items must be unused, in original condition, and with all packaging intact.",
        "Custom or personalized products cannot be returned unless defective.",
        "Return shipping costs are your responsibility unless the item is faulty.",
        "Refunds are processed within 5–10 business days to your original payment method.",
      ],
    },
    {
      title: "User Conduct",
      icon: <Scale className="w-6 h-6" />,
      content: [
        "You must provide accurate, truthful information when creating an account.",
        "You are responsible for safeguarding your login credentials.",
        "You may not engage in fraud, harassment, spam, or unlawful activity on our platform.",
        "Malware distribution, hacking, or harmful activity is strictly prohibited.",
        "We may suspend or terminate accounts for violations of these rules.",
      ],
    },
    {
      title: "Intellectual Property",
      icon: <FileText className="w-6 h-6" />,
      content: [
        "All site content, including images, text, and logos, is protected by copyright and trademark laws.",
        "You may not reproduce or distribute our materials without written permission.",
        "User-submitted content may be used by us for business purposes.",
        "We respect intellectual property rights and respond to valid infringement notices.",
      ],
    },
    {
      title: "Disclaimers and Limitations",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        "Our services are provided 'as is' without warranties of any kind.",
        "We do not guarantee uninterrupted, error-free operation of the website.",
        "We are not liable for indirect, incidental, or consequential damages.",
        "Our maximum liability is limited to the purchase amount of the product or service in dispute.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-6">
            <FileText className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Terms of
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            These Terms of Service outline your rights and responsibilities when
            using our website and services. Please review them carefully.
          </p>
          <div className="inline-flex items-center space-x-2 mt-8 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Last Updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border-l-4 border-gradient-to-b from-rose-500 to-pink-500 pl-8"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center text-rose-600">
                  {section.icon}
                </div>
                <h2 className="text-3xl font-light text-gray-900">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-3 flex-shrink-0"></div>
                    <p className="text-gray-600 font-light leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Important Information */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border border-rose-100">
            <div className="flex items-center space-x-3 mb-4">
              <Scale className="w-6 h-6 text-rose-600" />
              <h3 className="text-xl font-medium text-gray-900">Governing Law</h3>
            </div>
            <p className="text-gray-600 font-light">
              TThese Terms are governed by the laws of India, and any disputes will be subject to Indian courts.
            </p>
          </div>
          <div className="p-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border border-rose-100">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
              <h3 className="text-xl font-medium text-gray-900">Severability</h3>
            </div>
            <p className="text-gray-600 font-light">
              If any part of these terms is found unenforceable, the remaining
              provisions will remain valid and enforceable.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl">
          <div className="text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-gray-600 font-light mb-6">
              Contact our legal team for clarification or concerns regarding these
              Terms of Service.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:support@aaranaltales.shop"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-full hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span>Contact us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Agreement Notice */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 font-light">
            By using our services, you confirm that you have read, understood, and
            agreed to these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
