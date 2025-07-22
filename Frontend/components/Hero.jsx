
'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide">
              Handcrafted Excellence
            </span>
            <h1 className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight">
              Timeless
              <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Elegance
              </span>
              <span className="block text-4xl lg:text-5xl font-extralight text-gray-700">
                in Every Stitch
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-light">
            Discover our curated collection of premium leather accessories. Each piece is meticulously crafted 
            to embody sophistication and enduring style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/collections" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg group"
            >
              Explore Collection
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <Link 
              href="/customize" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium group"
            >
              Customize
              <i className="ri-play-circle-line w-5 h-5 flex items-center justify-center ml-2 group-hover:scale-110 transition-transform"></i>
            </Link>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-3xl transform rotate-3"></div>
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
            <img 
              src="assests/custom_name_bag.jpg"
              alt="Luxury Leather Collection"
              className="w-full h-auto rounded-2xl object-cover object-top"
            />
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white p-4 rounded-2xl shadow-lg">
              <span className="text-sm font-medium">Premium Quality</span>
              <div className="flex items-center mt-1">
                <div className="flex space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <i key={star} className="ri-star-fill w-4 h-4 flex items-center justify-center text-yellow-300"></i>
                  ))}
                </div>
                <span className="ml-2 text-sm">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
