'use client';

export default function CraftHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://readdy.ai/api/search-image?query=Master%20craftsman%20hands%20working%20on%20premium%20leather%20handbag%20with%20traditional%20tools%2C%20detailed%20close-up%20of%20artisan%20stitching%20and%20leather%20crafting%20process%2C%20warm%20golden%20workshop%20lighting%20creating%20atmospheric%20mood%2C%20rich%20textures%20and%20professional%20craftsmanship%20photography&width=1200&height=800&seq=craft-hero&orientation=landscape")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full tracking-wide mb-6">
            Traditional Mastery
          </span>
          
          <h1 className="text-5xl lg:text-8xl font-light text-white leading-tight mb-8">
            The Art of
            <span className="block font-normal text-rose-200">
              Perfection
            </span>
          </h1>
          
          <p className="text-2xl text-gray-200 font-light leading-relaxed mb-12 max-w-2xl">
            Every stitch tells a story. Every piece bears the mark of generations of expertise, 
            where time-honored techniques meet contemporary innovation.
          </p>
          
          <div className="grid grid-cols-3 gap-8 text-white max-w-2xl">
            <div className="text-center">
              <div className="text-4xl font-light mb-2">72</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Hours per Piece</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">15</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Handcraft Steps</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light mb-2">100%</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Hand Made</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}