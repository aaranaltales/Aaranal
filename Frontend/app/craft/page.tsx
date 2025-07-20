'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CraftHero from './CraftHero';
import CraftProcess from './CraftProcess';

export default function CraftPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <CraftHero />
      <CraftProcess />
      <Footer />
    </div>
  );
}