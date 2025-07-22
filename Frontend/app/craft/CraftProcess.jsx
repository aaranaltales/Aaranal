'use client';

const processSteps = [
  {
    step: "01",
    title: "Material Selection",
    description: "We source only the finest full-grain leather from Italian and Spanish tanneries, each hide carefully inspected for quality, texture, and character.",
    image: "https://readdy.ai/api/search-image?query=Premium%20leather%20hides%20selection%20in%20luxury%20tannery%2C%20rich%20cognac%20and%20black%20leather%20materials%20with%20natural%20grain%20textures%2C%20professional%20quality%20control%20inspection%20with%20artisan%20hands%20examining%20leather%20quality&width=600&height=400&seq=process-1&orientation=landscape",
    tools: ["Quality Loupe", "Thickness Gauge", "Grain Tester"]
  },
  {
    step: "02",
    title: "Pattern Creation",
    description: "Master artisans create precise patterns, considering leather grain direction and optimal material usage while maintaining structural integrity.",
    image: "https://readdy.ai/api/search-image?query=Leather%20pattern%20cutting%20on%20wooden%20workbench%20with%20traditional%20templates%20and%20measuring%20tools%2C%20artisan%20hands%20marking%20premium%20leather%20with%20precision%20instruments%2C%20warm%20workshop%20lighting&width=600&height=400&seq=process-2&orientation=landscape",
    tools: ["Steel Rulers", "Pattern Templates", "Marking Tools"]
  },
  {
    step: "03",
    title: "Cutting & Preparation",
    description: "Each piece is carefully cut by hand using traditional techniques, ensuring clean edges and perfect alignment for the construction process.",
    image: "https://readdy.ai/api/search-image?query=Master%20craftsman%20cutting%20luxury%20leather%20with%20traditional%20cutting%20tools%2C%20precise%20hand%20cutting%20technique%20on%20premium%20material%2C%20detailed%20craftsmanship%20process%20in%20warm%20lit%20workshop%20environment&width=600&height=400&seq=process-3&orientation=landscape",
    tools: ["Rotary Cutters", "Craft Knives", "Edge Bevelers"]
  },
  {
    step: "04",
    title: "Hand Stitching",
    description: "Using traditional saddle stitching techniques, each seam is sewn by hand with linen thread, creating durable and beautiful connections.",
    image: "https://readdy.ai/api/search-image?query=Close-up%20of%20hand%20stitching%20luxury%20leather%20handbag%20with%20traditional%20needles%20and%20linen%20thread%2C%20detailed%20view%20of%20saddle%20stitching%20technique%2C%20warm%20golden%20workshop%20lighting%20highlighting%20craftsmanship&width=600&height=400&seq=process-4&orientation=landscape",
    tools: ["Saddle Needles", "Linen Thread", "Stitching Awl"]
  },
  {
    step: "05",
    title: "Hardware Assembly",
    description: "Premium hardware is carefully selected and attached using specialized techniques, ensuring both functionality and aesthetic perfection.",
    image: "https://readdy.ai/api/search-image?query=Installing%20premium%20gold%20hardware%20on%20luxury%20leather%20handbag%2C%20artisan%20hands%20attaching%20buckles%20and%20clasps%20with%20precision%20tools%2C%20elegant%20brass%20fittings%20and%20professional%20assembly%20process&width=600&height=400&seq=process-5&orientation=landscape",
    tools: ["Rivet Setters", "Punch Tools", "Hardware Jigs"]
  },
  {
    step: "06",
    title: "Finishing & Quality",
    description: "Final inspection and finishing touches including edge painting, conditioning, and quality control ensure every piece meets our exacting standards.",
    image: "https://readdy.ai/api/search-image?query=Final%20quality%20inspection%20of%20completed%20luxury%20leather%20handbag%2C%20artisan%20examining%20finished%20product%20under%20professional%20lighting%2C%20premium%20leather%20goods%20quality%20control%20and%20finishing%20touches&width=600&height=400&seq=process-6&orientation=landscape",
    tools: ["Edge Paint", "Leather Conditioner", "Inspection Tools"]
  }
];

export default function CraftProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4">
            Our Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            From Concept to
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Creation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Each piece undergoes a meticulous 15-step process, combining traditional techniques 
            with modern precision to create leather goods of exceptional quality.
          </p>
        </div>

        <div className="space-y-24">
          {processSteps.map((process, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className="text-6xl font-light text-rose-300">{process.step}</div>
                  <div className="h-px flex-1 bg-gradient-to-r from-rose-300 to-transparent"></div>
                </div>
                
                <h3 className="text-3xl font-light text-gray-900 mb-4">
                  {process.title}
                </h3>
                
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  {process.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-rose-600 uppercase tracking-wide">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {process.tools.map((tool, toolIndex) => (
                      <span key={toolIndex} className="px-3 py-1 bg-rose-50 text-rose-700 text-sm rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={process.image} 
                    alt={process.title}
                    className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}