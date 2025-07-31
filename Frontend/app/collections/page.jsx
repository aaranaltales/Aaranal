'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CollectionsHero from './CollectionsHero';
import CollectionsGrid from './CollectionsGrid';
import CollectionsFilter from './CollectionsFilter';

export default function CollectionsPage() {
  const [heroVisible, setHeroVisible] = useState(true);

  // Start fading out the hero on initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(false);
    }, 300); // Small delay before fade starts, optional
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Header />

      <AnimatePresence mode="wait">
        {heroVisible && (
          <motion.div
            key="hero-wrapper"
            initial={{ height: 'auto' }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <CollectionsHero />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static filter and grid remain unchanged */}
      <div className="relative z-10">
        <CollectionsFilter />
        <CollectionsGrid />
      </div>

      <Footer />
    </div>
  );
}
