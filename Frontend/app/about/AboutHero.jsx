'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function AboutHero() {
  const { isLoading } = useLoading();
  const [showAnimations, setShowAnimations] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Small delay after loading completes to ensure smooth animations
      const timer = setTimeout(() => {
        setShowAnimations(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const gradientVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 bg-gradient-to-r from-rose-300 to-pink-200 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0 }}
        animate={showAnimations ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-[90vh] flex items-center overflow-hidden
                   bg-cover bg-center
                   bg-[url('/assests/about-hero-mobile.png')] lg:bg-[url('/assests/about-hero.png')]"
      >
        {/* Elegant overlay for large screens */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none bg-black/60 lg:bg-none hero-gradient-overlay"
          variants={gradientVariants}
          initial="hidden"
          animate={showAnimations ? "visible" : "hidden"}
        ></motion.div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-20">
          <motion.div
            className="space-y-6 md:space-y-8 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={showAnimations ? "visible" : "hidden"}
          >
            <div className="space-y-3">
              {/* Tag */}
              <motion.span
                className="inline-block px-4 py-2 bg-white/30 text-white lg:text-rose-700 text-sm font-medium rounded-full tracking-wide"
                variants={itemVariants}
              >
                Our Story
              </motion.span>

              {/* Large Title */}
              <motion.h1
                className="text-7xl font-light text-white lg:text-black leading-[1.02]"
                variants={itemVariants}
              >
                Crafting
                <motion.span
                  className="block font-normal bg-gradient-to-r from-rose-300 to-pink-200 lg:from-rose-600 lg:to-pink-500 bg-clip-text text-transparent drop-shadow-md"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={showAnimations ? {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  } : {}}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Love and Legacy
                </motion.span>
              </motion.h1>
            </div>

            {/* Smaller Description */}
            <motion.p
              className="text-base text-white/90 lg:text-black leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
              variants={itemVariants}
            >
              At Aaranal, every tote is more than just a bag—it's a story stitched with care and painted with passion. We blend tradition with modern artistry to create timeless pieces.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex items-center justify-center lg:justify-start space-x-7 text-white lg:text-black"
              variants={statsVariants}
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-light mb-1">2025</div>
                <div className="text-xs lg:text-sm text-gray-300 lg:text-gray-500">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-light mb-1">40+</div>
                <div className="text-xs lg:text-sm text-gray-300 lg:text-gray-500">Happy Customers</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}