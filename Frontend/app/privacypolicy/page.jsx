import React from 'react';
import { Shield, Eye, Lock, User, Mail, Phone, Globe, Calendar } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 20, 2025";

  const sections = [
    {
      title: "Information We Collect",
      icon: <User className="w-6 h-6" />,
      content: [
        "Personal details such as name, email, phone number, and billing/shipping addresses.",
        "Account information like username, password, and purchase history.",
        "Payment details processed securely through third-party providers.",
        "Technical data such as IP address, browser type, and device identifiers.",
        "Usage data including pages visited, time spent, and search queries.",
        "Location information derived from your IP address (with consent).",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content: [
        "To process and deliver your orders.",
        "To provide customer support and respond to inquiries.",
        "To send confirmations, shipping updates, and account notifications.",
        "To personalize your shopping experience.",
        "To improve our website, products, and services.",
        "To send marketing communications (with your consent).",
        "To prevent fraud and maintain security.",
        "To comply with legal obligations and enforce our terms.",
      ],
    },
    {
      title: "Information Sharing",
      icon: <Globe className="w-6 h-6" />,
      content: [
        "We may share information with trusted service providers (e.g., payment processors, delivery services).",
        "We may disclose data if required by law, court order, or government request.",
        "In case of mergers, acquisitions, or business sales, data may be transferred.",
        "We will only share information with your explicit consent where required.",
        "We do not sell or rent your personal data for marketing purposes.",
      ],
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: [
        "We use industry-standard encryption to protect sensitive data.",
        "Payments are handled through PCI-compliant providers.",
        "We conduct regular security audits and vulnerability assessments.",
        "Strict access controls are enforced within our systems.",
        "Our staff receive training on handling personal data responsibly.",
        "In the event of a security breach, we will take prompt action and notify affected users if required.",
      ],
    },
    {
      title: "Your Rights and Choices",
      icon: <Shield className="w-6 h-6" />,
      content: [
        "Access: Request a copy of your personal data we store.",
        "Correction: Ask us to update inaccurate or incomplete data.",
        "Deletion: Request removal of your data (subject to legal requirements).",
        "Portability: Request your data in a machine-readable format.",
        "Opt-Out: Unsubscribe from marketing emails anytime.",
        "Cookie Preferences: Adjust tracking settings in your browser.",
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-6">
            <Shield className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Privacy
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have.
          </p>
          <div className="inline-flex items-center space-x-2 mt-8 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full">
            <Calendar className="w-4 h-4" />
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

        {/* Footer Notice */}
        <div className="mt-20 p-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl border border-rose-100">
          <div className="text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Questions About Your Privacy?
            </h3>
            <p className="text-gray-600 font-light mb-6">
              Our privacy team is here to help with any questions or requests.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:support@aaranaltales.shop"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-full hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Changes Notice */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 font-light">
            We may update this Privacy Policy from time to time. Changes will be
            posted here with an updated “Last Updated” date.
          </p>
        </div>
      </div>
    </div>
  );
}
