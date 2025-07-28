'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import DynamicProductPage from './Product';

export default function CraftPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <DynamicProductPage />
      <Footer />
    </div>
  );
}