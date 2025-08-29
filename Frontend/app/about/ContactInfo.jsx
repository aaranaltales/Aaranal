'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactInfo() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    },
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white to-rose-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      ></motion.div>
      <motion.div
        className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-gradient-to-tl from-pink-200/15 to-rose-200/15 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      ></motion.div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-8 w-full">
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Visit Our Store
              </motion.span>
              <motion.h2
                className="text-4xl lg:text-5xl font-light text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Experience
                <motion.span
                  className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent"
                  initial={{ backgroundPosition: "0% 50%" }}
                  whileInView={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Our Totes
                </motion.span>
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Visit our store to experience the elegance of Aaranal up close.
                Discover our timeless totes, each crafted with purpose and personality.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-20 py-4"
              variants={containerVariants}
            >
              <motion.div
                className="flex flex-col items-center space-y-4"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 font-light">Kakinada Andhra Pradesh</p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center space-y-4"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <i className="ri-time-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Opening Hours</h3>
                  <p className="text-gray-600 font-light">Sunday: 12:00 - 17:00</p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center space-y-4"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-rose-600"></i>
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Contact</h3>
                  <p className="text-gray-600 font-light">support@aaranaltales.shop</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={containerVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/customize"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg group"
                >
                  Customize
                  <i className="ri-calendar-line w-5 h-5 flex items-center justify-center ml-2 group-hover:scale-110 transition-transform"></i>
                </Link>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium group"
                >
                  Browse Collection
                  <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}