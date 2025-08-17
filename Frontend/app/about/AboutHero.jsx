'use client';

export default function AboutHero() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://readdy.ai/api/search-image?query=Elegant%20leather%20crafting%20workshop%20interior%20with%20vintage%20tools%20and%20premium%20materials%2C%20warm%20golden%20lighting%20creating%20sophisticated%20atmosphere%2C%20artisan%20workbench%20with%20leather%20pieces%20and%20traditional%20equipment%2C%20rich%20brown%20wooden%20textures%20with%20soft%20ambient%20glow&width=1200&height=800&seq=about-hero&orientation=landscape")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full tracking-wide mb-6">
            Our Story
          </span>
          
          <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight mb-6">
            Crafting
            <span className="block font-normal text-rose-200">
              Love and Legacy
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 font-light leading-relaxed mb-8">
           At Aaranal, every tote is more than just a bag it’s a story stitched with care and painted with passion. We carry forward a legacy of creativity and craftsmanship, blending tradition with modern artistry to create timeless pieces that celebrate excellence, individuality, and love.
          </p>
          
          <div className="flex items-center space-x-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-light mb-1">2025</div>
              <div className="text-sm text-gray-300">Founded</div>
            </div>
            {/* <div className="text-center">
              <div className="text-3xl font-light mb-1">3</div>
              <div className="text-sm text-gray-300">Generations</div>
            </div> */}
            <div className="text-center">
              <div className="text-3xl font-light mb-1">40+</div>
              <div className="text-sm text-gray-300">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}