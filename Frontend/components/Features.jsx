'use client'
import { motion } from 'framer-motion';

const features = [
  {
    icon: "ri-paint-brush-line",
    title: "Hand-Painted Detailing",
    description: "Every tote, pouch, and crochet carries unique brushstrokes, turning everyday essentials into one-of-a-kind art."
  },
  {
    icon: "ri-scissors-line",
    title: "Embroidered with Care",
    description: "Delicate embroidery adds depth, beauty, and a personal touch, making each piece timeless and full of character."
  },
  {
    icon: "ri-hand-heart-line",
    title: "Sustainably Handmade",
    description: "Crafted using eco-conscious practices and durable fabrics, our creations are as kind to the planet as they are to you."
  },
  {
    icon: "ri-star-smile-line",
    title: "Everyday Elegance",
    description: "Designed for style and function, Aaranal's pieces bring artistry into your daily life with effortless grace."
  }
];

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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
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
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const featureCardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function Features() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="py-24 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-200/15 to-rose-200/15 rounded-full blur-3xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div variants={textVariants} className="text-center mb-20">
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4"
          >
            Our Promise
          </motion.span>
          <motion.h2
            variants={textVariants}
            className="text-4xl lg:text-5xl font-light text-gray-900 mb-6"
          >
            Exceptional
            <motion.span
              variants={textVariants}
              className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent"
            >
              Standards
            </motion.span>
          </motion.h2>
          <motion.p
            variants={textVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            At Aaranal, we believe accessories should be more than just useful.
            They should carry artistry, care, and timeless beauty.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureCardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group text-center"
            >
              <div className="relative mb-8">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-20 h-20 bg-gradient-to-br from-white to-rose-50 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-rose-100"
                >
                  <motion.i
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                    viewport={{ once: true }}
                    className={`${feature.icon} w-8 h-8 text-rose-600 flex items-center justify-center`}
                  ></motion.i>
                </motion.div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional Community Section with Animation */}
        {/* <motion.div 
          variants={itemVariants}
          className="mt-20 text-center bg-white rounded-3xl p-12 shadow-xl border border-rose-100"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Join Our Craftsmanship Community
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-light">
              Be part of an exclusive community that values traditional craftsmanship, 
              sustainable practices, and timeless design.
            </p>
            <Link 
              href="/community" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg group"
            >
              Learn More
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
        </motion.div> */}
      </div>
    </motion.section>
  );
}