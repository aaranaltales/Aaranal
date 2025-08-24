'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense, useRef } from 'react';
import CollectionsFilter from './CollectionsFilter';
import CollectionsGrid from './CollectionsGrid';
import CollectionsHero from './CollectionsHero';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');

  const filterRef = useRef(null);

  // 🔎 Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 🏷️ Handle category from URL
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['Tote Bag', 'Pouch', 'Money Purse', 'Crochet'].includes(category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // ⬇️ Auto-scroll smoothly to filter/grid after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!filterRef.current) return;

      const targetY = filterRef.current.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const duration = 1600; // 2s smooth scroll
      const startTime = performance.now();

      const easeInOutQuad = (t) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startY + (targetY - startY) * ease);

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }, 1200); // wait before starting scroll

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero stays, not hidden */}
      <CollectionsHero />

      {/* Filter + Grid (scroll target) */}
      <div ref={filterRef} className="relative z-10">
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

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div>Loading collections...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
