'use client';

import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductGrid />
      <Features />
      <Newsletter />
      <Footer />
    </div>
  );
}