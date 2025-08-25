'use client';

import Head from 'next/head';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Newsletter from '@/components/Newsletter';
import ProductGrid from '@/components/ProductGrid';
import { motion } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';
import { useState, useEffect } from 'react';

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
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Scroll animation variants
const scrollVariants = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Home() {
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

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Basic SEO */}
        <title>Aaranal Tales | Custom & Stylish Collections</title>
        <meta
          name="description"
          content="Discover Aaranal's exclusive totebag collection featuring minimal, floral, and customizable designs. Perfect for work, travel, and everyday fashion with your own personalization."
        />
        <meta
          name="keywords"
          content="Aaranal tote bags, custom tote bags, personalized tote bags, handmade tote bags, stylish tote bags, office tote bags, travel tote bags, crochets, pouches, purses, handbags, eco-friendly bags, unique tote designs"
        />

        {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
        <meta property="og:title" content="Aaranal Tales | Custom & Stylish Collections" />
        <meta
          property="og:description"
          content="Shop Aaranal's totebag collection — minimal, floral, and fully customizable. Add names, quotes, or designs to make your tote unique."
        />
        <meta property="og:url" content="https://aaranaltales.shop" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Aaranal" />
        <meta property="og:image" content="https://aaranaltales.shop/assests/aaranal.jpg" />

        {/* Twitter Card (X) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aaranal Tales | Custom & Stylish Collections" />
        <meta
          name="twitter:description"
          content="Discover Aaranal's totebag collection featuring customizable and stylish designs made for every occasion."
        />
        <meta name="twitter:image" content="https://aaranaltales.shop/assests/aaranal.jpg" />
      </Head>

      <motion.div
        className="min-h-screen"
        initial="hidden"
        animate={showAnimations ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Hero />
        </motion.div>

        {/* ProductGrid with scroll animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scrollVariants}
        >
          <ProductGrid />
        </motion.div>

        {/* Features with scroll animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scrollVariants}
        >
          <Features />
        </motion.div>

        {/* Newsletter with scroll animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={scrollVariants}
        >
          <Newsletter />
        </motion.div>
      </motion.div>
    </>
  );
}