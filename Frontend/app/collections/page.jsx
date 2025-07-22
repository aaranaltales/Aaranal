'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CollectionsHero from './CollectionsHero';
import CollectionsGrid from './CollectionsGrid';
import CollectionsFilter from './CollectionsFilter';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <CollectionsHero />
      <CollectionsFilter />
      <CollectionsGrid />
      <Footer />
    </div>
  );
}