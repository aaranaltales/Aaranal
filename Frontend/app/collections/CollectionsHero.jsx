'use client';

import { motion } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const blobVariants = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 1.5
    }
  }
};

const badgeVariants = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const titleVariants = {
  hidden: {
    y: 30,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};

const gradientTextVariants = {
  hidden: {
    opacity: 0,
    backgroundPosition: "0% 50%"
  },
  visible: {
    opacity: 1,
    backgroundPosition: "100% 50%",
    transition: {
      opacity: { duration: 0.8 },
      backgroundPosition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }
};

const paragraphVariants = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.5
    }
  }
};

export default function CollectionsHero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="relative h-[100vh] py-48 md:py-32 bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden"
    >
      {/* Animated decorative blobs */}
      <motion.div
        variants={blobVariants}
        className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      ></motion.div>

      <motion.div
        variants={blobVariants}
        className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-pink-200/15 to-rose-200/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.span
          variants={badgeVariants}
          className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-6 shadow-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          Complete Collection
        </motion.span>

        <motion.h1
          variants={titleVariants}
          className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight mb-6"
        >
          Curated
          <motion.span
            variants={gradientTextVariants}
            className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            Excellence
          </motion.span>
        </motion.h1>

        <motion.p
          variants={paragraphVariants}
          className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Step into Aaranal's collection, where every piece is thoughtfully designed with a perfect blend of style, utility, and comfort to complement your everyday lifestyle.
        </motion.p>

        {/* Optional subtle floating elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1 }
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-rose-400 text-4xl"
          >
            ⌄
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}