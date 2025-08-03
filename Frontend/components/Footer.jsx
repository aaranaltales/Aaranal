
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-rose-50 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className=" flex items-center text-3xl sm:text-4xl font-pacifico bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent hover:from-rose-700 hover:to-pink-600 transition-all duration-300">
              <Image src="/assests/logo.png"  width={50} height={50} className="h-12 mr-2 w-12" />
              <p >Aaranal</p>
            </Link>
            <p className="text-gray-600 text-lg max-w-md font-light leading-relaxed">
              Where traditional craftsmanship meets contemporary elegance. Each piece tells a story 
              of dedication, artistry, and timeless sophistication.
            </p>
            <div className="flex space-x-4">
              <button className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center hover:from-rose-200 hover:to-pink-200 hover:scale-110 transform transition-all duration-300 cursor-pointer group">
                <i className="ri-instagram-line w-6 h-6 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform"></i>
              </button>
              <button className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center hover:from-rose-200 hover:to-pink-200 hover:scale-110 transform transition-all duration-300 cursor-pointer group">
                <i className="ri-facebook-line w-6 h-6 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform"></i>
              </button>
              <button className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center hover:from-rose-200 hover:to-pink-200 hover:scale-110 transform transition-all duration-300 cursor-pointer group">
                <i className="ri-pinterest-line w-6 h-6 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform"></i>
              </button>
              <button className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center hover:from-rose-200 hover:to-pink-200 hover:scale-110 transform transition-all duration-300 cursor-pointer group">
                <i className="ri-youtube-line w-6 h-6 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform"></i>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Collections</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/tote-bags" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Tote Bags
                </Link>
              </li>
              <li>
                <Link href="/pouches" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Pouches
                </Link>
              </li>
              <li>
                <Link href="/money-pouches" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Money Pouches
                </Link>
              </li>
              <li>
                <Link href="/limited-edition" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Limited Edition
                </Link>
              </li>
              <li>
                <Link href="/gift-sets" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
            <ul className="space-y-4">
              {/* <li>
                <Link href="/craftsmanship" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Craftsmanship
                </Link>
              </li> */}
              <li>
                <Link href="/personalization" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Customization
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rose-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm font-light">
              © 2025 Aaranal. Crafted with passion and precision.
            </p>
            <div className="flex space-x-8">
              <Link href="/privacy" className="text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer font-light">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer font-light">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer font-light">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
