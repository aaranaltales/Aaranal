"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import CollectionsFilter from "./CollectionsFilter";
import CollectionsGrid from "./CollectionsGrid";
import CollectionsHero from "./CollectionsHero";
import { useLoading } from '@/context/LoadingContext';

function Content() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const filterRef = useRef(null);
  const { loading } = useLoading();

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Category from URL
  useEffect(() => {
    const category = searchParams.get("category");
    if (
      category &&
      ["Tote Bag", "Pouch and Purse", "Crochet", "Others"].includes(category)
    ) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // Smooth scroll with deceleration effect
  useEffect(() => {
    if (!loading && filterRef.current) {
      const timer = setTimeout(() => {
        const targetPosition = filterRef.current.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;
        const duration = 2000; // 1.6 seconds for scroll

        const easeOutQuad = (t) => t * (2 - t); // Deceleration easing

        const animateScroll = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuad(progress);

          window.scrollTo(0, startPosition + distance * easedProgress);
          if (progress < 1) window.requestAnimationFrame(animateScroll);
        };
        window.requestAnimationFrame(animateScroll);
      }, 1000); // 1-second delay
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="min-h-screen">
      <CollectionsHero />
      <div ref={filterRef} id="collections-grid" className="relative z-10">
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

export default function CollectionsContent() {
  return (
    <Suspense fallback={<div>Loading collections...</div>}>
      <Content />
    </Suspense>
  );
}
