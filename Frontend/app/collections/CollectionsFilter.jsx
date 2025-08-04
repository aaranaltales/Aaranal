'use client';
import { useState } from "react";

const categories = ['All', 'Tote Bags', 'Pouch', 'Money Pouch'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function CollectionsFilter({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className=" py-6 md:py-12 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" w-full px-4 py-2 bg-white border border-rose-300 rounded-full hover:border-rose-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 sm:gap-4 justify-end w-full md:w-1/2 md:ml-10">
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-black font-normal text-sm">Category:</span>
              <div className="relative   flex-1">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 bg-white border border-rose-300 rounded-full hover:border-rose-300 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-gray-700 text-[10px] sm:text-sm">{activeCategory}</span>
                  <i className={`ri-arrow-down-s-line w-5 h-5 flex items-center justify-center transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {isCategoryOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-rose-200 rounded-2xl shadow-xl z-10">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-[10px] sm:text-sm transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${activeCategory === category
                          ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg'
                          : 'hover:bg-rose-50 hover:text-rose-600'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-black font-normal text-sm">Sort by:</span>
              <div className="relative flex-1">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 bg-white border border-rose-300 rounded-full hover:border-rose-300 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-gray-700 text-[10px] sm:text-sm">{sortBy}</span>
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
                        className={`w-full px-4 py-2 text-left text-[10px] sm:text-sm transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${sortBy === option
                          ? 'bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg'
                          : 'hover:bg-rose-50 hover:text-rose-600'
                          }`}
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
      </div>
    </section>
  );
}
