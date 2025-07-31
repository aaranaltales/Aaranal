'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import CartSidebar from './CartSidebar';
import WishlistSidebar from './WishlistSidebar';
import { useUser } from '@/context/UserContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, setUser, loading, cartCount } = useUser();

  useEffect(() => {
    // This will force a re-render when user changes
  }, [user]);

  // And modify the logout function:
  const handleLogout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsProfileOpen(false);
    router.refresh(); // Keep this
    router.push('/');
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center">{cartCount}</span>
              </button>

              {loading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              ) : user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 hover:from-rose-200 hover:to-pink-200 transition-all duration-300"
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-rose-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-rose-50 bg-gradient-to-r from-rose-50 to-pink-50">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          My Wishlist
                        </Link>
                      </div>
                      <div className="py-1 border-t border-rose-50">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="hidden lg:flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white hover:from-rose-700 hover:to-pink-600 transition-all duration-300 text-sm font-medium"
                >
                  Login
                </Link>
              )}

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
                <Link
                  href="/"
                  className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/collections"
                  className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link
                  href="/customize"
                  className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Customize
                </Link>
                <Link
                  href="/about"
                  className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                {!user && !loading && (
                  <Link
                    href="/auth"
                    className="text-gray-800 hover:text-rose-600 whitespace-nowrap cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
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