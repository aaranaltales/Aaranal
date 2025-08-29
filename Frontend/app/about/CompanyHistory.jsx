'use client';
import { motion } from 'framer-motion';

const milestones = [
  {
    year: "Early 2006",
    title: "Aarchana Designer Boutique",
    description: "Founded by Archana Vedurupaka, starting her journey in fashion and design that built a strong legacy over 20 years.",
    icon: "ri-home-line"
  },
  {
    year: "Late 2024",
    title: "The Spark of Aaranal",
    description: "Her daughter, Alokya Vedurupaka, envisioned a new brand and began shaping the idea of Aaranal with creativity and passion.",
    icon: "ri-lightbulb-line"
  },
  {
    year: "May 2025",
    title: "The Birth of Aaranal",
    description: "Aaranal was officially launched, carrying forward a tradition of artistry through hand-painted and embroidered creations.",
    icon: "ri-sparkling-2-line"
  },
  {
    year: "June 2025",
    title: "First Tote Crafted",
    description: "We created our very first tote bag, marking the beginning of a journey in handmade accessories filled with art and care.",
    icon: "ri-shopping-bag-3-line"
  },
  {
    year: "Present Day",
    title: "40+ Products Loved",
    description: "In just a few months, over 40 creations have already reached happy customers a milestone that fuels our growing journey.",
    icon: "ri-heart-line"
  }
];

export default function CompanyHistory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, transformOrigin: "top" },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "backOut" }
    },
    hover: {
      scale: 1.3,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: (isLeft) => ({
      x: isLeft ? -100 : 100,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    hover: {
      y: -8,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "backOut" }
    },
    hover: {
      rotate: 15,
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute top-0 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-gradient-to-tl from-pink-200/15 to-rose-200/15 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span
            className="inline-block px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs md:text-sm font-medium rounded-full tracking-wide mb-3 md:mb-4"
            variants={itemVariants}
          >
            Heritage & Legacy
          </motion.span>
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 md:mb-6"
            variants={itemVariants}
          >
            Our
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
              style={{ backgroundSize: "200% 200%" }}
            >
              Journey
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Middle Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-rose-300 to-pink-300 rounded-full z-0"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          />

          <div className="space-y-8 md:space-y-16 relative z-10">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Card */}
                  <motion.div
                    className={`w-full md:w-1/2 ${isLeft
                      ? "md:pr-12 md:text-right"
                      : "md:pl-12 md:text-left"
                      } mb-6 md:mb-0`}
                    custom={isLeft}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-rose-100 transition-all duration-300 group">
                      {/* Icon */}
                      <div
                        className={`flex ${isLeft ? "md:justify-end" : "md:justify-start"
                          } mb-4`}
                      >
                        <motion.div
                          className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-rose-600 to-pink-500 rounded-full flex items-center justify-center"
                          variants={iconVariants}
                          initial="hidden"
                          whileInView="visible"
                          whileHover="hover"
                          viewport={{ once: true }}
                        >
                          {/* Icon SVG */}
                          <svg
                            className="w-4 h-4 md:w-6 md:h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {milestone.icon === "ri-home-line" && (
                              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            )}
                            {milestone.icon === "ri-lightbulb-line" && (
                              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
                            )}
                            {milestone.icon === "ri-sparkling-2-line" && (
                              <path d="M11 5.5c0 .83.67 1.5 1.5 1.5h1.5v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h1.5c.83 0 1.5-.67 1.5-1.5S19.33 4 18.5 4H17V2.5c0-.83-.67-1.5-1.5-1.5S14 1.67 14 2.5V4h-1.5c-.83 0-1.5.67-1.5 1.5zm-9 8c0-.83.67-1.5 1.5-1.5H5v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V12h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H8v1.5c0 .83-.67 1.5-1.5 1.5S5 17.33 5 16.5V15H3.5c-.83 0-1.5-.67-1.5-1.5zM14 17.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5zm-4-4c0-.83.67-1.5 1.5-1.5h9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5z" />
                            )}
                            {milestone.icon === "ri-shopping-bag-3-line" && (
                              <path d="M17 6h-2V5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4 0h-2V5h2v1z" />
                            )}
                            {milestone.icon === "ri-heart-line" && (
                              <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                            )}
                          </svg>
                        </motion.div>
                      </div>

                      <div className="text-xl md:text-3xl font-light text-rose-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Dot */}
                  <motion.div
                    className="relative z-10"
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                  >
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-rose-600 to-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                  </motion.div>

                  {/* Empty Side */}
                  <div className="w-full md:w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
