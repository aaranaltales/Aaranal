'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
        <section
      className="relative h-[90vh] flex items-center overflow-hidden
                 bg-cover bg-center
                 bg-[url('/assests/hero-bg-mobile.jpg')] lg:bg-[url('/assests/hero-bg.jpg')]"
    >

      {/* Elegant overlay for large screens */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-black/60 lg:bg-none hero-gradient-overlay"
      ></div>


      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-20">
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="space-y-3">
             <span className="inline-block px-4 py-2 bg-white/30 text-white lg:text-rose-700 text-sm font-medium rounded-full tracking-wide">
              Aaranal Tales
            </span>
            <h1 className="text-7xl font-light text-white lg:text-black  leading-[1.02]">
              Timeless{' '}
              <span className="block font-normal bg-gradient-to-r from-rose-300 to-pink-200 lg:from-rose-600 lg:to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                Elegance
              </span>
              <span className="block text-2xl md:text-4xl font-extralight text-white/90 lg:text-black">
                in Every Stitch
              </span>
            </h1>
          </div>
          <p className="text-base text-white/90 lg:text-black leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
            Discover our curated collection of premium leather accessories. Each piece is meticulously crafted to embody sophistication and enduring style.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
            <Link
              href="/collections"
              className={`inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg ${
                isMounted ? 'animate-fade-in' : 'opacity-0'
              }`}
            >
              Explore Collection
              <i className="ri-arrow-right-line w-4 h-4 md:w-5 md:h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <Link
              href="/customize"
              className={`inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-white/25 lg:border-rose-500 lg:text-rose-600 text-white rounded-full hover:bg-white/10 hover:border-white/40 lg:hover:border-rose-400 lg:hover:bg-transparent lg:hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium group ${
                isMounted ? 'animate-fade-in-delay' : 'opacity-0'
              }`}
            >
              Customize
              <i className="ri-play-circle-line w-4 h-4 md:w-5 md:h-5 flex items-center justify-center ml-2 group-hover:scale-110 transition-transform"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}