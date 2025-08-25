'use client';
import { useUser } from '@/context/UserContext';
import { getProductsData } from '@/services/products';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import { useToast } from "@/components/ToastContext";
import { motion } from 'framer-motion'; // Import motion from framer-motion

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
  const { showSuccess, showError } = useToast();
  const [bestSellers, setBestSellers] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getProductsData(setLoading);
      const bestSellersOnly = allProducts.filter(product => product.bestseller === true);
      setBestSellers(bestSellersOnly);
    } catch (error) {
      showError("Failed to load products. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(productId);
      showSuccess("Added to cart successfully!");
    } catch (error) {
      showError("Failed to add item to cart. Please try again.");
    }
  };

  const handleToggleWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleWishlist(productId);
      const isInWishlist = wishlist.includes(productId);
      if (isInWishlist) {
        showSuccess("Removed from wishlist!");
      } else {
        showSuccess("Added to wishlist!");
      }
    } catch (error) {
      showError("Failed to update wishlist. Please try again.");
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="py-24 bg-gradient-to-b from-white via-rose-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={textVariants} className="text-center mb-20">
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

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {bestSellers.map((product, index) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              custom={index}
            >
              <Link
                href={`/product/${product._id}`}
                className="group cursor-pointer block h-full"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col"
                >
                  {/* NEW & SALE Badges */}
                  {product.isNew && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium"
                    >
                      New
                    </motion.div>
                  )}
                  {product.originalPrice && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="absolute top-4 left-12 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium"
                    >
                      Sale
                    </motion.div>
                  )}
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleToggleWishlist(e, product._id)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
                  >
                    <i
                      className={`${wishlist.includes(product._id)
                        ? 'ri-heart-fill text-rose-500'
                        : 'ri-heart-line text-gray-600'
                        } w-5 h-5`}
                    ></i>
                  </motion.button>
                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[4/5] overflow-hidden rounded-t-3xl"
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700"
                    />
                  </motion.div>
                  {/* Product Info */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-rose-600 font-medium tracking-wide uppercase">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-rose-600 transition-colors mb-4">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-semibold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleAddToCart(e, product._id)}
                        className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-rose-700 hover:to-pink-600 transition-all duration-300 whitespace-nowrap font-medium shadow-lg"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
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
    </motion.section>
  );
}