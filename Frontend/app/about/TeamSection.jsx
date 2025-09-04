'use client';

import { motion } from 'framer-motion';

const team = [
  {
    name: "Alokhya Vedurupaka",
    type: "Visionary",
    role: "Founder",
    image: "assests/alokhya.jpeg",
    bio: "The founder of Aaranal, created the brand to blend elegance and utility through timeless, handcrafted essentials."
  },
  {
    name: "Archana Vedurupaka",
    type: "Supervisor",
    role: "Master Craftsman",
    image: "assests/archana.jpg",
    bio: "With over 20 years of boutique experience, plays a key role in crafting each Aaranal bag with care and precision."
  },
  {
    name: "Aparna Lekkala",
    type: "Creative",
    role: "Artist",
    image: "assests/aparna.jpeg",
    bio: "A talented artist, adds a unique touch to Aaranal by hand-painting select bags with expressive and elegant designs."
  }
];

export default function TeamSection() {
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
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
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

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4"
            variants={itemVariants}
          >
            Meet Our Team
          </motion.span>
          <motion.h2
            className="text-4xl lg:text-5xl font-light text-gray-900 mb-6"
            variants={itemVariants}
          >
            Master
            <motion.span
              className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent"
              initial={{ backgroundPosition: "0% 50%" }}
              whileInView={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              viewport={{ once: true }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Craftspeople
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
            variants={itemVariants}
          >
            Guided by tradition and inspired by innovation,
            our artisans pour passion into every detail,
            crafting timeless pieces that carry stories of art and care.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group text-center"
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative mb-8">
                <motion.div
                  className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                  variants={badgeVariants}
                >
                  <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-rose-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-sm font-medium text-gray-800">{member.type}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.h3
                className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors duration-300"
                variants={itemVariants}
              >
                {member.name}
              </motion.h3>
              <motion.p
                className="text-rose-600 font-medium mb-4 uppercase tracking-wide text-sm"
                variants={itemVariants}
              >
                {member.role}
              </motion.p>
              <motion.p
                className="text-gray-600 leading-relaxed font-light"
                variants={itemVariants}
              >
                {member.bio}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}