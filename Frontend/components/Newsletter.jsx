'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
      duration: 0.6,
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
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="py-24 relative overflow-hidden"
    >
      <motion.div
        variants={backgroundVariants}
        className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-800"
        style={{
          backgroundImage: `url("https://readdy.ai/api/search-image?query=Elegant%20leather%20crafting%20workshop%20with%20artisan%20tools%20and%20premium%20leather%20materials%2C%20warm%20ambient%20lighting%20creating%20sophisticated%20atmosphere%2C%20hands%20working%20on%20luxury%20handbag%20with%20traditional%20techniques%2C%20rich%20brown%20and%20golden%20tones%20with%20soft%20shadows&width=1200&height=800&seq=newsletter-craft&orientation=landscape")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <motion.div
          variants={backgroundVariants}
          className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-800/85 to-rose-800/90"
        ></motion.div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-6"
          >
            Exclusive Access
          </motion.span>

          <motion.h2
            variants={textVariants}
            className="text-4xl lg:text-5xl font-light text-white mb-6"
          >
            Customize Your <span className='sm:hidden'>Tote</span>
            <motion.span
              variants={textVariants}
              className="hidden sm:block font-normal text-rose-200"
            >
              Tote
            </motion.span>
          </motion.h2>

          <motion.p
            variants={textVariants}
            className="text-xl text-rose-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Your style, your story. Customize your tote with hand-painted art and embroidery,
            making it a one-of-a-kind piece that reflects you perfectly.
          </motion.p>

          {/* Customize Button */}
          <motion.div variants={buttonVariants}>
            <a href='/customize'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rose-700 px-8 py-4 rounded-full hover:bg-rose-50 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
              >
                Customize
              </motion.button>
            </a>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center gap-3 mt-8 text-rose-200 text-xs sm:text-sm"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-1">
              <i className="ri-palette-line w-4 h-4 flex items-center justify-center"></i>
              <span>Choose your color</span>
            </motion.div>
            <motion.span variants={itemVariants} className="mx-2 hidden sm:inline">|</motion.span>
            <motion.div variants={itemVariants} className="flex items-center space-x-1">
              <i className="ri-brush-line w-4 h-4 flex items-center justify-center"></i>
              <span>Select the Design</span>
            </motion.div>
            <motion.span variants={itemVariants} className="mx-2 hidden sm:inline">|</motion.span>
            <motion.div variants={itemVariants} className="flex items-center space-x-1">
              <i className="ri-heart-line w-4 h-4 flex items-center justify-center"></i>
              <span>Make it yours</span>
            </motion.div>
          </motion.div>

          {/* Uncomment below to enable newsletter form */}
          {/* {isSubscribed ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full inline-flex items-center shadow-xl mt-6"
            >
              <i className="ri-check-circle-line w-6 h-6 flex items-center justify-center mr-3 text-rose-200"></i>
              <span className="font-medium">Welcome to our community!</span>
            </motion.div>
          ) : (
            <motion.form 
              variants={itemVariants}
              onSubmit={handleSubmit} 
              className="max-w-lg mx-auto mt-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-white text-rose-700 px-8 py-4 rounded-full hover:bg-rose-50 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.form>
          )} */}
        </motion.div>
      </div>
    </motion.section>
  );
}