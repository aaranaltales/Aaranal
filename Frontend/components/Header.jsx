'use client';

import Link from 'next/link';
import { useState } from 'react';
import CartSidebar from './CartSidebar';
import WishlistSidebar from './WishlistSidebar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-pacifico bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent hover:from-rose-700 hover:to-pink-600 transition-all duration-300">
              Aaranal
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-12">
              <Link href="/" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/collections" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase relative group">
                Collections
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/customize" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase relative group">
                Customize
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/about" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            <div className="flex items-center space-x-6">
              <button className="text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50 group">
                <i className="ri-search-line w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
              </button>
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50 relative group"
              >
                <i className="ri-heart-line w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50 relative group"
              >
                <i className="ri-shopping-bag-line w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button>
              <button 
                className="lg:hidden text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="ri-menu-line w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-rose-100 bg-gradient-to-b from-white to-rose-50/20">
              <nav className="flex flex-col space-y-6">
                <Link href="/" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase">
                  Home
                </Link>
                <Link href="/collections" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase">
                  Collections
                </Link>
                <Link href="/craft" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase">
                  Craftsmanship
                </Link>
                <Link href="/about" className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase">
                  About
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}