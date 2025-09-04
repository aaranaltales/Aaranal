'use client';
import { useLoading } from '@/context/LoadingContext';
import { useUser } from '@/context/UserContext';
import { getProductsData } from '@/services/products';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useToast } from "@/components/ToastContext";
import ProductCard from '@/components/ProductCard';
import Script from "next/script"; // ✅ important for JSON-LD

export default function CollectionsGrid({ activeCategory, sortBy, searchQuery }) {
  const [allProducts, setAllProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const scrollRefs = useRef({});
  const { addToCart, wishlist, toggleWishlist } = useUser();
  const { setLoading } = useLoading();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsData(setLoading);
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(productId);
  };

  const handleToggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  const parsePrice = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    }
    return typeof value === 'number' ? value : 0;
  };

  const filteredProducts = allProducts
    .filter(product =>
      activeCategory === 'All' || product.category === activeCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High':
        return parsePrice(a.price) - parsePrice(b.price);
      case 'Price: High to Low':
        return parsePrice(b.price) - parsePrice(a.price);
      case 'Newest':
        return b.createdAt?.localeCompare(a.createdAt || '') || 0;
      default:
        return 0;
    }
  });

  // ✅ Build JSON-LD for all products dynamically
  const productSchema = sortedProducts.map(product => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product.images?.[0] || ""],
    description: product.description || "Handmade product by Aaranal Tales",
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: "Aaranal Tales"
    },
    offers: {
      "@type": "Offer",
      url: `https://aaranaltales.shop/collections/${product._id}`,
      priceCurrency: "INR",
      price: parsePrice(product.price),
      availability: product.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition"
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewsCount || 1
        }
      : undefined
  }));

  return (
    <section className="py-16 bg-gradient-to-b from-white via-rose-50/20 to-white">
      {/* ✅ Inject Product Schema */}
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={handleToggleWishlist}
              addToCart={handleAddToCart}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
              scrollRefs={scrollRefs}
            />
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8">
            Showing {sortedProducts.length} of {allProducts.length} products
          </p>
          <Link
            href="/customize"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 whitespace-nowrap font-medium shadow-lg group"
          >
            Need Custom Design?
            <i className="ri-arrow-right-line w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
      <style jsx>{`
        :global(.no-scrollbar) {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        :global(.no-scrollbar::-webkit-scrollbar) {
          display: none;
        }
      `}</style>
    </section>
  );
}
