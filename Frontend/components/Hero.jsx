'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
      duration: 0.5,
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
      duration: 0.5,
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
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative h-[90vh] flex items-center overflow-hidden
                 bg-cover bg-center
                 bg-[url('/assests/hero-bg-mobile.jpg')] lg:bg-[url('/assests/hero-bg.jpg')]"
    >
      {/* Elegant overlay for large screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-10 pointer-events-none bg-black/60 lg:bg-none hero-gradient-overlay"
      ></motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-20">
        <motion.div
          variants={containerVariants}
          className="space-y-6 md:space-y-8 text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="space-y-3">
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 bg-white/30 text-white lg:text-rose-700 text-sm font-medium rounded-full tracking-wide"
            >
              Aaranal Tales
            </motion.span>
            <motion.h1
              variants={textVariants}
              className="text-7xl font-light text-white lg:text-black leading-[1.02]"
            >
              Timeless{' '}
              <motion.span
                variants={textVariants}
                className="block font-normal bg-gradient-to-r from-rose-300 to-pink-200 lg:from-rose-600 lg:to-pink-500 bg-clip-text text-transparent drop-shadow-md"
              >
                Elegance
              </motion.span>
              <motion.span
                variants={textVariants}
                className="block text-2xl md:text-4xl font-extralight text-white/90 lg:text-black"
              >
                in Every Stitch
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            variants={textVariants}
            className="text-base text-white/90 lg:text-black leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
          >
            The art you carry.
            From tote bags to pouches, each piece is designed with care,
            hand-painted and embroidered to make your everyday look
            a little more special.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
          >
            <motion.div variants={buttonVariants}>
              <Link
                href="/collections"
                className={`inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg ${isMounted ? 'animate-fade-in' : 'opacity-0'
                  }`}
              >
                Explore Collection
                <i className="ri-arrow-right-line w-4 h-4 md:w-5 md:h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Link
                href="/customize"
                className={`inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 border-2 border-white/25 lg:border-rose-500 lg:text-rose-600 text-white rounded-full hover:bg-white/10 hover:border-white/40 lg:hover:border-rose-400 lg:hover:bg-transparent lg:hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium group ${isMounted ? 'animate-fade-in-delay' : 'opacity-0'
                  }`}
              >
                Customize
                <i className="ri-play-circle-line w-4 h-4 md:w-5 md:h-5 flex items-center justify-center ml-2 group-hover:scale-110 transition-transform"></i>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}