'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CollectionsFilter from './CollectionsFilter';
import CollectionsGrid from './CollectionsGrid';
import CollectionsHero from './CollectionsHero';

export default function CollectionsPage() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(handler); // Cleanup
  }, [searchQuery]);


  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {heroVisible && (
          <motion.div
            key="hero-wrapper"
            initial={{ height: 'auto' }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <CollectionsHero />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <CollectionsFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <CollectionsGrid
          activeCategory={activeCategory}
          sortBy={sortBy}
          searchQuery={debouncedSearch}
        />


      </div>
    </div>
  );
}
