'use client';
import { useUser } from '@/context/UserContext';
import { getProductsData } from '@/services/products';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard'; // ⬅️ use ProductCard

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function ProductGrid() {
  const { addToCart, wishlist, toggleWishlist } = useUser();
  const { setLoading } = useLoading();
  const [bestSellers, setBestSellers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const scrollRefs = useRef({});

  const fetchProducts = async () => {
    try {
      const allProducts = await getProductsData(setLoading);
      const bestSellersOnly = allProducts.filter(product => product.bestseller === true);
      setBestSellers(bestSellersOnly);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4"
          >
            Curated Collection
          </motion.span>
          <motion.h2
            variants={textVariants}
            className="text-4xl lg:text-5xl font-light text-gray-900 mb-6"
          >
            Signature
            <motion.span
              variants={textVariants}
              className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent"
            >
              Pieces
            </motion.span>
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            These are the pieces closest to our heart.
            From the first brushstroke to the final stitch,
            our signature collection celebrates craftsmanship,
            bringing you artful accessories that stand out with elegance.
          </motion.p>
        </motion.div>

        {/* Product grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {bestSellers.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              custom={index}
            >
              <ProductCard
                product={product}
                wishlist={wishlist}
                toggleWishlist={handleToggleWishlist}
                addToCart={handleAddToCart}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
                scrollRefs={scrollRefs}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={buttonVariants}
          className="text-center mt-16"
        >
          <Link
            href="/collections"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 whitespace-nowrap font-medium shadow-lg group"
          >
            View Full Collection
            <i className="ri-arrow-right-line w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </motion.div>
      </div>

      {/* Hide scrollbar but keep functionality */}
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
