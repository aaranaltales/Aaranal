"use client";

import { useLoading } from "@/context/LoadingContext";
import { getProductsData } from "@/services/products";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MenuGrid() {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Tote Bag");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const ITEMS_PER_PAGE = 10;
    const { setLoading } = useLoading();

    // Load Data
    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getProductsData(setLoading);
            if (products) {
                setAllProducts(products);
                const uniqueCategories = [...new Set(products.map((p) => p.category))].sort();
                setCategories(uniqueCategories);
            }
        };
        fetchProducts();
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Filter Logic
    const filteredProducts = allProducts.filter((product) => {
        const matchesCategory = product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Split into Pages (Chunks)
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const pages = Array.from({ length: totalPages }, (_, i) =>
        filteredProducts.slice(i * ITEMS_PER_PAGE, (i + 1) * ITEMS_PER_PAGE)
    );

    // Handle Scroll Snap & Page Indicator
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const width = scrollContainerRef.current.clientWidth;
            const newPage = Math.round(scrollLeft / width) + 1;
            if (newPage !== currentPage) {
                setCurrentPage(newPage);
            }
        }
    };

    // Button Navigation
    const scrollNext = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    // Reset to Page 1 on filter change
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'instant' });
        }
        setCurrentPage(1);
    }, [activeCategory, searchQuery]);


    const handleCategorySelect = (category) => {
        setActiveCategory(category);
        setIsDropdownOpen(false);
    };

    return (
        <section className="pb-24 px-4 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
            {/* Search & Filter Header */}
            <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search */}
                <div className="relative w-full md:w-1/2 lg:w-1/3">
                    <input
                        type="text"
                        placeholder="Search our menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-5 py-3 pl-12 bg-white border-2 border-rose-100 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 shadow-sm transition-all"
                    />
                    <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 text-xl"></i>
                </div>

                {/* Dropdown */}
                <div className="relative w-full md:w-auto min-w-[220px] z-30" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full flex items-center justify-between px-5 py-3 bg-white border-2 rounded-full text-left font-medium shadow-sm transition-all duration-200 ${isDropdownOpen
                                ? "border-rose-300 ring-4 ring-rose-50 text-rose-600"
                                : "border-rose-100 text-gray-700 hover:border-rose-200"
                            }`}
                    >
                        <span className="truncate mr-2">{activeCategory}</span>
                        <ChevronDown className={`w-5 h-5 text-rose-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden max-h-80 overflow-y-auto z-40"
                            >
                                <div className="p-2 space-y-1">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => handleCategorySelect(category)}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-colors duration-200 flex items-center justify-between ${activeCategory === category
                                                    ? "bg-rose-50 text-rose-700 font-semibold"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                }`}
                                        >
                                            {category}
                                            {activeCategory === category && <span className="w-2 h-2 rounded-full bg-rose-500 ml-2"></span>}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* HORIZONTAL CONTINUOUS SCROLL CONTAINER */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0"
                style={{ scrollBehavior: 'smooth' }}
            >
                {filteredProducts.length > 0 ? (
                    pages.map((pageProducts, pageIndex) => (
                        <div
                            key={pageIndex}
                            className="w-full flex-shrink-0 snap-center px-1" // Each page takes full width
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                                {pageProducts.map((product) => (
                                    <Link href={`/product/${product._id}`} key={product._id}>
                                        <div className="group bg-white rounded-2xl p-4 shadow-sm border border-rose-50 hover:shadow-xl hover:border-rose-100 transition-all duration-300 flex gap-5 h-full cursor-pointer relative overflow-hidden transform-gpu">
                                            {/* Large Image */}
                                            <div className="w-1/3 min-w-[130px] aspect-square rounded-xl overflow-hidden bg-gray-50 relative">
                                                <img
                                                    src={product.image[0]}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            {/* Details */}
                                            <div className="flex-1 flex flex-col justify-center py-2">
                                                <div className="flex justify-between items-start gap-2 mb-3">
                                                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-rose-600 transition-colors leading-tight line-clamp-2">
                                                        {product.name}
                                                    </h3>
                                                    <span className="text-xl font-bold text-rose-600 whitespace-nowrap">
                                                        ₹{product.price}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-1">
                                                    {product.description}
                                                </p>
                                                <div className="mt-auto pt-2">
                                                    <span className="text-xs text-rose-400 font-medium group-hover:underline">
                                                        View Details &rarr;
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full flex-shrink-0 text-center py-24">
                        {allProducts.length > 0 ? (
                            <p className="text-lg text-gray-400">No items found in <span className="text-rose-500 font-medium">{activeCategory}</span>.</p>
                        ) : (
                            <p className="text-lg text-gray-400">Loading menu...</p>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-4 py-8 border-t border-rose-50">
                    <button
                        onClick={scrollPrev}
                        disabled={currentPage === 1}
                        className={`p-4 rounded-full flex items-center justify-center transition-all ${currentPage === 1
                                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                : "bg-white text-rose-600 shadow-md hover:bg-rose-50 border border-rose-100"
                            }`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <span className="text-gray-600 font-medium tracking-wide">
                        Page <span className="text-rose-600 font-bold">{currentPage}</span> of {totalPages}
                    </span>

                    <button
                        onClick={scrollNext}
                        disabled={currentPage === totalPages}
                        className={`p-4 rounded-full flex items-center justify-center transition-all ${currentPage === totalPages
                                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                : "bg-white text-rose-600 shadow-md hover:bg-rose-50 border border-rose-100"
                            }`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            {/* Hiding scrollbar via JSX style since Tailwind scrollbar-hide might not be configured */}
            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
        </section>
    );
}
