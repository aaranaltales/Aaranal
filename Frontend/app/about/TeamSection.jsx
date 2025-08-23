'use client';

import { type } from "os";

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
    type:"Supervisor",
    role: "Master Craftsman",
    image: "assests/archana.jpg",
    bio: "With over 20 years of boutique experience, plays a key role in crafting each Aaranal bag with care and precision."
  },
  {
    name: "Aparna Lekkala",
    type:"Creative",
    role: "Artist",
    image: "assests/aparna.jpeg",
    bio: "A talented artist, adds a unique touch to Aaranal by hand-painting select bags with expressive and elegant designs."
  }
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4">
            Meet Our Team
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Master
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Craftspeople
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
           Guided by tradition and inspired by innovation,
our artisans pour passion into every detail,
crafting timeless pieces that carry stories of art and care.

          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-8">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-rose-100">
                    <div className="flex items-center space-x-2">
                      <i className="ri-award-line w-4 h-4 flex items-center justify-center text-rose-600"></i>
                      <span className="text-sm font-medium text-gray-800">{member.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-rose-600 font-medium mb-4 uppercase tracking-wide text-sm">
                {member.role}
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}