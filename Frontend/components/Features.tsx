
'use client';

import Link from 'next/link';

const features = [
  {
    icon: "ri-award-line",
    title: "Artisan Crafted",
    description: "Every piece is meticulously handcrafted by skilled artisans using time-honored techniques passed down through generations."
  },
  {
    icon: "ri-leaf-line",
    title: "Sustainable Materials",
    description: "We source only the finest ethically-sourced leather, ensuring both premium quality and environmental responsibility."
  },
  {
    icon: "ri-shield-star-line",
    title: "Lifetime Warranty",
    description: "Your investment is protected with our comprehensive lifetime warranty covering craftsmanship and materials."
  },
  {
    icon: "ri-gift-line",
    title: "Luxury Experience",
    description: "From our signature packaging to personalized service, every touch point reflects our commitment to excellence."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-200/15 to-rose-200/15 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4">
            Our Promise
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Exceptional
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Standards
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Our commitment to excellence extends beyond our products to every aspect of your experience with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-rose-50 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 border border-rose-100">
                  <i className={`${feature.icon} w-8 h-8 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}></i>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* <div className="mt-20 text-center bg-white rounded-3xl p-12 shadow-xl border border-rose-100">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Join Our Craftsmanship Community
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-light">
              Be part of an exclusive community that values traditional craftsmanship, 
              sustainable practices, and timeless design.
            </p>
            <Link 
              href="/community" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg group"
            >
              Learn More
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
        </div> */}
      </div>
    </section>
  );
}
