'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';

export default function ContactPage() {
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroVisible(false);
    }, 200); // slight delay before starting the animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Header />

      <AnimatePresence mode="wait">
        {heroVisible && (
          <motion.div
            key="contact-hero"
            initial={{ height: 'auto' }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -120 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <ContactHero />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
}
