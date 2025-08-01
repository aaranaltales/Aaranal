'use client';

import { useState } from "react";

const categories = ['All', 'Tote Bags', 'Pouch', 'Money Pouch'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function CollectionsFilter({ activeCategory, setActiveCategory, sortBy, setSortBy }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="py-12 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer font-medium ${activeCategory === category
                  ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-light">Sort by:</span>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between px-4 py-3 bg-white border border-rose-200 rounded-full hover:border-rose-300 transition-all duration-300 cursor-pointer min-w-48"
              >
                <span className="text-gray-700">{sortBy}</span>
                <i className={`ri-arrow-down-s-line w-5 h-5 flex items-center justify-center transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {isFilterOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-rose-200 rounded-2xl shadow-xl z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsFilterOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
