'use client';
import Link from 'next/link';

export default function ContactInfo() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="space-y-8 w-full">
            <div>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4">
                Visit Our Store
              </span>
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
                Experience
                <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Our Totes
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Visit our store to experience the elegance of Aaranal up close.
                Discover our timeless totes, each crafted with purpose and personality.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-20  py-4 ">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 font-light">Kakinada Andhra Pradesh</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <i className="ri-time-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Opening Hours</h3>
                  <p className="text-gray-600 font-light">Sunday: 12:00 - 17:00</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Contact</h3>
                  <p className="text-gray-600 font-light">support@aaranaltales.shop</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/customize"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg group"
              >
                Customize
                <i className="ri-calendar-line w-5 h-5 flex items-center justify-center ml-2 group-hover:scale-110 transition-transform"></i>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium group"
              >
                Browse Collection
                <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
