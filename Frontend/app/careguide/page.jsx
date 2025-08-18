import React from 'react';
import { Heart, Droplets, Sun, Shield, Brush, Scissors, Package, Wind, Sparkles, Hand } from 'lucide-react';

export default function CareGuidePage() {
  const careInstructions = [
    {
      title: "General Care",
      icon: <Shield className="w-6 h-6" />,
      color: "from-rose-600 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      instructions: [
        "Keep your bag in a cool, dry place away from direct sunlight to preserve colors and fabrics.",
        "Avoid overloading to maintain its shape and strength.",
        "If wet, gently pat dry with a soft cloth and air dry naturally."
      ]
    },
    {
      title: "Hand-Painted Designs",
      icon: <Brush className="w-6 h-6" />,
      color: "from-rose-600 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      instructions: [
        "Do not scrub or machine wash.",
        "Wipe gently with a slightly damp, soft cloth if needed.",
        "Avoid harsh chemicals or cleaners, as they may damage the artwork."
      ]
    },
    {
      title: "Embroidery",
      icon: <Scissors className="w-6 h-6" />,
      color: "from-rose-600 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      instructions: [
        "Keep away from sharp objects to prevent snagging.",
        "For dust, use a soft brush or lint roller to clean gently.",
        "Spot clean with mild soap and cold water if necessary, but never rub harshly."
      ]
    },
    {
      title: "Crochet & Fabric Items",
      icon: <Hand className="w-6 h-6" />,
      color: "from-rose-600 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      instructions: [
        "Hand wash separately in cold water with a mild detergent.",
        "Do not twist or wring — press gently to remove excess water.",
        "Dry flat on a clean towel to maintain shape."
      ]
    },
    {
      title: "Storage Tips",
      icon: <Package className="w-6 h-6" />,
      color: "from-rose-600 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      instructions: [
        "Store in a breathable cotton bag or cover when not in use.",
        "Insert soft tissue paper inside totes to help retain their shape.",
        "Keep away from moisture to avoid mildew."
      ]
    }
  ];

  const careTips = [
    {
      icon: <Sun className="w-8 h-8" />,
      tip: "Avoid Direct Sunlight",
      description: "Prolonged exposure can fade colors"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      tip: "Keep Dry",
      description: "Moisture can damage delicate artwork"
    },
    {
      icon: <Wind className="w-8 h-8" />,
      tip: "Air Dry Only",
      description: "Never use heat or direct sunlight to dry"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      tip: "Handle with Care",
      description: "Gentle handling preserves craftsmanship"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-8">
            <Heart className="w-10 h-10 text-rose-600" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Care
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Guide
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed mb-8">
            At Aaranal, every piece is handcrafted with love - painted, embroidered, and stitched to last. 
            With a little care, your tote, pouch, or crochet can stay beautiful for years to come.
          </p>

          {/* Quick Care Tips */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {careTips.map((tip, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300">
                  <div className="text-rose-600">
                    {tip.icon}
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{tip.tip}</h3>
                <p className="text-sm text-gray-600 font-light">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Care Instructions */}
        <div className="grid gap-12 lg:gap-16">
          {careInstructions.map((section, index) => (
            <div key={index} className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${section.bgColor} p-8 lg:p-12`}>
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    {section.icon}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-light text-gray-900">
                    {section.title}
                  </h2>
                </div>
                
                <div className="grid gap-6">
                  {section.instructions.map((instruction, instrIndex) => (
                    <div key={instrIndex} className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
                      <div className={`w-3 h-3 bg-gradient-to-r ${section.color} rounded-full mt-2 flex-shrink-0`}></div>
                      <p className="text-gray-700 font-light leading-relaxed text-lg">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative background element */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${section.color} opacity-10 rounded-full transform translate-x-32 -translate-y-32`}></div>
            </div>
          ))}
        </div>

        {/* Love & Care Message */}
        <div className="mt-20 p-12 bg-gradient-to-r from-rose-600 to-pink-500 rounded-3xl text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <Heart className="w-12 h-12 mx-auto mb-6 fill-current" />
            <h3 className="text-3xl lg:text-4xl font-light mb-6">
              Made with Love, Cared for with Love
            </h3>
            <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed opacity-90">
              Each Aaranal piece carries the passion and skill of our artisans. By following these care instructions, 
              you're not just preserving a product — you're honoring the craftsmanship and ensuring your piece 
              remains a cherished part of your collection for years to come.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full transform -translate-x-24 -translate-y-24"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 translate-y-16"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>

        {/* Additional Care Resources */}
        <div className="mt-16 grid grid-cols-1 gap-8">
          <div className="p-8 bg-gray-50 rounded-3xl justify-center text-center">
            <div className="flex items-center justify-center mr-5 space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-2xl font-light text-gray-900">Need Help?</h3>
            </div>
            <p className="text-gray-600 font-light mb-6">
              Have questions about caring for your Aaranal piece? Our team is here to help with personalized advice.
            </p>
            <a 
              href="mailto:care@aaranal.com"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-full hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
            >
              <Heart className="w-4 h-4" />
              <span>Contact Care Team</span>
            </a>
          </div>
        </div>

        {/* Final Message */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 font-light text-lg">
            Remember: A little care goes a long way in preserving the beauty and artistry of your handcrafted piece.
          </p>
        </div>
      </div>
    </div>
  );
}