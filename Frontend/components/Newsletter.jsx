'use client';

import { useState } from 'react';

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
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-800"
        style={{
          backgroundImage: `url("https://readdy.ai/api/search-image?query=Elegant%20leather%20crafting%20workshop%20with%20artisan%20tools%20and%20premium%20leather%20materials%2C%20warm%20ambient%20lighting%20creating%20sophisticated%20atmosphere%2C%20hands%20working%20on%20luxury%20handbag%20with%20traditional%20techniques%2C%20rich%20brown%20and%20golden%20tones%20with%20soft%20shadows&width=1200&height=800&seq=newsletter-craft&orientation=landscape")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-800/85 to-rose-800/90"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
          <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-6">
            Exclusive Access
          </span>
          
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            Customize Your
            <span className="block font-normal text-rose-200">
              Tote
            </span>
          </h2>
          
          <p className="text-xl text-rose-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Your style, your story. Customize your tote with hand-painted art and embroidery,
making it a one-of-a-kind piece that reflects you perfectly.
          </p>

          {/* Uncomment below to enable newsletter form */}
          {/* {isSubscribed ? (
            <div className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full inline-flex items-center shadow-xl">
              <i className="ri-check-circle-line w-6 h-6 flex items-center justify-center mr-3 text-rose-200"></i>
              <span className="font-medium">Welcome to our community!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                  required
                />
                
              </div>
            </form>
          )} */}
          <a href='/customize' >   
            <button
              type="submit"
              className="bg-white text-rose-700 px-8 py-4 rounded-full hover:bg-rose-50 hover:scale-105 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
            >
              Customize
            </button>
          </a>
          
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-rose-200 text-xs sm:text-sm">
            <div className="flex items-center space-x-1">
              <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
              <span>Choose your color</span>
            </div>
            <span className="mx-2 hidden sm:inline">|</span>
            <div className="flex items-center space-x-1">
              <i className="ri-gift-line w-4 h-4 flex items-center justify-center"></i>
              <span>Select the Design</span>
            </div>
            <span className="mx-2 hidden sm:inline">|</span>
            <div className="flex items-center space-x-1">
              <i className="ri-eye-line w-4 h-4 flex items-center justify-center"></i>
              <span>Make it yours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}