"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const logoVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const socialIconVariants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const linkVariants = {
  hover: {
    x: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-50 to-rose-50 border-t border-rose-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants}>
              <Link href="/" className="flex items-center">
                <motion.div
                  variants={logoVariants}
                  whileHover="hover"
                  className="flex items-center text-3xl sm:text-4xl font-pacifico bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
                >
                  <Image
                    src="/assests/logo.png"
                    alt="Aaranal logo"
                    width={50}
                    height={50}
                    className="h-12 mr-2 w-12"
                  />
                  <p>Aaranal</p>
                </motion.div>
              </Link>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-600 text-lg max-w-md font-light leading-relaxed">
              Every piece tells a story, and now it's part of yours. Stay
              connected with Aaranal.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center space-x-3">
              <motion.a
                variants={socialIconVariants}
                whileHover="hover"
                href="https://instagram.com/aaranal.tales"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:from-rose-200 group-hover:to-pink-200 transform transition-all duration-300">
                  <i className="ri-instagram-line text-rose-600 text-xl sm:text-2xl group-hover:scale-110 transition-transform"></i>
                </div>
                <span className="text-rose-600 font-medium text-sm sm:text-base group-hover:text-rose-700 transition-colors duration-300">
                  @aaranal.tales
                </span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex w-full justify-between pr-10">
            <div className="space-y-6">
              <motion.h3 variants={itemVariants} className="text-lg font-semibold text-gray-900">
                Collections
              </motion.h3>
              <ul className="space-y-4">
                {["Tote Bag", "Pouch and Purse", "Crochet", "Others"].map((item, index) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    custom={index}
                  >
                    <Link
                      href={{
                        pathname: "/collections",
                        query: { category: item },
                      }}
                      className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                    >
                      <motion.span
                        variants={linkVariants}
                        whileHover="hover"
                        className="inline-block"
                      >
                        {item}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <motion.h3 variants={itemVariants} className="text-lg font-semibold text-gray-900">
                Experience
              </motion.h3>
              <ul className="space-y-4">
                {[
                  { name: "Customization", path: "/customize" },
                  { name: "Care Guide", path: "/careguide" },
                  { name: "Contact Us", path: "mailto:support@aaranaltales.shop" }
                ].map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    custom={index}
                  >
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                    >
                      <motion.span
                        variants={linkVariants}
                        whileHover="hover"
                        className="inline-block"
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-rose-200 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p variants={itemVariants} className="text-gray-600 text-sm font-light">
              © 2025 Aaranal. Crafted with passion and precision.
            </motion.p>
            <motion.div variants={itemVariants} className="flex space-x-8">
              {["Privacy Policy", "Terms of Service"].map((item, index) => (
                <Link
                  key={item}
                  href={item === "Privacy Policy" ? "/privacypolicy" : "/terms"}
                  className="text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer font-light"
                >
                  <motion.span
                    variants={linkVariants}
                    whileHover="hover"
                    className="inline-block"
                  >
                    {item}
                  </motion.span>
                </Link>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}