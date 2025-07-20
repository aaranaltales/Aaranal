'use client';

const milestones = [
  {
    year: "6th June 2025",
    title: "The Beginning",
    description: "Founded by master craftsman Antonio Rodriguez in Barcelona, starting with traditional leather goods for local aristocracy.",
    icon: "ri-home-line"
  },
  {
    year: "11th June 2025",
    title: "4+ Totes Released",
    description: "Antonio's son Carlos expanded the workshop, introducing innovative techniques while preserving traditional methods.",
    icon: "ri-tools-line"
  },
  {
    year: "14th June 2025",
    title: "2+ Hand Painted Totes Released",
    description: "First international exhibition in Paris, establishing our reputation for exceptional quality and artisan craftsmanship.",
    icon: "ri-award-line"
  },
  {
    year: "23rd June 2025",
    title: "Started Designing Pouches",
    description: "Elena Rodriguez, third generation, modernized production while maintaining hand-crafting traditions and heritage techniques.",
    icon: "ri-lightbulb-line"
  },
  {
    year: "30th June 2025",
    title: "Served 12+ Customers",
    description: "Launched our online presence, bringing artisan leather goods to discerning customers worldwide.",
    icon: "ri-global-line"
  },
  {
    year: "11th July 2025",
    title: "1 Month Anniversary",
    description: "Leading the industry in sustainable practices while continuing our commitment to timeless craftsmanship.",
    icon: "ri-leaf-line"
  }
];

export default function CompanyHistory() {
  return (
    <section className="py-24 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-200/15 to-rose-200/15 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4">
            Heritage & Legacy
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Our
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-300 to-pink-300 rounded-full"></div>
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-rose-100 hover:shadow-xl transition-all duration-300 group">
                    <div className={`flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-600 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i className={`${milestone.icon} w-6 h-6 text-white flex items-center justify-center`}></i>
                      </div>
                    </div>
                    <div className="text-3xl font-light text-rose-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-gradient-to-br from-rose-600 to-pink-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}