'use client';

import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductGrid />
      <Features />
      <Newsletter />
    </div>
  );
}