'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center
                   bg-[url('/assests/about-hero-mobile.png')] lg:bg-[url('/assests/about-hero.png')]"
      >
        <div className="absolute inset-0 bg-black/60 lg:bg-none hero-gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center relative z-10">
        <div className="max-w-2xl w-full pl-4 lg:pl-8 lg:text-left text-center">
          {/* Tag */}
          <span className="inline-block px-4 py-2 bg-white/30 text-white lg:text-rose-700 text-sm font-medium rounded-full tracking-wide mb-5">
            Our Story
          </span>

          {/* Large Title */}
          <h1 className="text-5xl lg:text-7xl font-light text-white lg:text-black leading-tight mb-5">
            Crafting
            <span className="block font-normal bg-gradient-to-r from-rose-300 to-pink-200 lg:from-rose-600 lg:to-pink-500 bg-clip-text text-transparent drop-shadow-md">
              Love and Legacy
            </span>
          </h1>

          {/* Smaller Description */}
          <p className="text-base lg:text-lg text-white/90 lg:text-black/80 font-light leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
            At Aaranal, every tote is more than just a bag—it’s a story stitched with care and painted with passion. We blend tradition with modern artistry to create timeless pieces.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center lg:justify-start space-x-7 text-white lg:text-black">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">2025</div>
              <div className="text-xs lg:text-sm text-gray-300 lg:text-gray-500">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light mb-1">40+</div>
              <div className="text-xs lg:text-sm text-gray-300 lg:text-gray-500">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
