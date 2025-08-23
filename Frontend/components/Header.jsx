'use client';
import Link from 'next/link';
import Image from 'next/image';
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
  const { user, setUser, refreshUser, loading, cartCount, setCartData, setCartCount, wishlistCount } = useUser();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    Cookies.remove('token');
    setUser(null);
    refreshUser()
    router.refresh()
    setIsProfileOpen(false);
    setCartData([]);
    setCartCount(0);
    router.refresh();
    router.push('/');
  };

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

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-rose-100/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center justify-center text-3xl font-pacifico bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
            >
              <Image
                alt="Aaranal logo"
                src="/assests/logo.png"
                width={50}
                height={50}
                className="h-12 mr-2 w-auto drop-shadow-lg"
              />
              <p className="hidden sm:block">Aaranal</p>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Right side icons and profile */}
            <div className="flex items-center space-x-1 sm:space-x-6">
              {/* Wishlist Button */}
              {
                user &&
                <>
                  <button
                    onClick={() => setIsWishlistOpen(true)}
                    className="text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50 relative group"
                  >
                    <i className="ri-heart-line w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center">{wishlistCount}</span>
                  </button>

                  {/* Cart Button */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50 relative group"
                  >
                    <i className="ri-shopping-bag-line w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"></i>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center">{cartCount}</span>
                  </button>
                </>
              }


              {/* User Profile or Login */}
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              ) : user ? (
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 hover:from-rose-200 hover:to-pink-200 transition-all duration-300">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-rose-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-rose-50 bg-gradient-to-r from-rose-50 to-pink-50">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600" onClick={() => setIsProfileOpen(false)}>
                          My Profile
                        </Link>
                        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600" onClick={() => setIsProfileOpen(false)}>
                          My Orders
                        </Link>
                      </div>
                      <div className="py-1 border-t border-rose-50">
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth" className="hidden lg:flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white hover:from-rose-700 hover:to-pink-600 transition-all duration-300 text-sm font-medium">
                  Login
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                className="lg:hidden text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} w-6 h-6 flex items-center justify-center transition-transform duration-300`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay and Slide-in Panel */}
      <div className="lg:hidden">
        {/* Backdrop overlay */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          onClick={handleMobileMenuClose}
          aria-hidden="true"
        />

        {/* Slide-in menu panel */}
        <div
          className={`fixed top-0 right-0 h-full w-[90%] max-w-[85vw] bg-white/90 backdrop-blur-md shadow-xl z-[70] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Menu header */}
          <div className="flex justify-between items-center p-6 border-b border-rose-100/30">
            <Link
              href="/"
              className="flex items-center text-2xl font-pacifico bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent"
              onClick={handleMobileMenuClose}
            >
              <Image
                alt="Aaranal logo"
                src="/assests/logo.png"
                width={32}
                height={32}
                className="h-8 mr-2 w-auto drop-shadow-lg"
              />
              Aaranal
            </Link>
            <button
              onClick={handleMobileMenuClose}
              className="text-gray-800 hover:text-rose-600 cursor-pointer transition-all duration-300 p-2 rounded-full hover:bg-rose-50/50"
              aria-label="Close mobile menu"
            >
              <i className="ri-close-line w-6 h-6 flex items-center justify-center" />
            </button>
          </div>

          <hr className="border-t border-2 border-grey-800" />

          {/* Navigation links */}
          <nav className="flex flex-col p-6 space-y-1">
            <Link
              href="/"
              className="text-gray-800 hover:text-rose-600 hover:bg-rose-50/50 cursor-pointer transition-all duration-300 font-medium text-lg tracking-wide uppercase py-3 px-3 rounded-lg"
              onClick={handleMobileMenuClose}
            >
              Home
            </Link>
            <Link
              href="/collections"
              className="text-gray-800 hover:text-rose-600 hover:bg-rose-50/50 cursor-pointer transition-all duration-300 font-medium text-lg tracking-wide uppercase py-3 px-3 rounded-lg"
              onClick={handleMobileMenuClose}
            >
              Collections
            </Link>
            <Link
              href="/customize"
              className="text-gray-800 hover:text-rose-600 hover:bg-rose-50/50 cursor-pointer transition-all duration-300 font-medium text-lg tracking-wide uppercase py-3 px-3 rounded-lg"
              onClick={handleMobileMenuClose}
            >
              Customize
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-rose-600 hover:bg-rose-50/50 cursor-pointer transition-all duration-300 font-medium text-lg tracking-wide uppercase py-3 px-3 rounded-lg"
              onClick={handleMobileMenuClose}
            >
              About
            </Link>
          </nav>

          {/* User section for mobile */}
          {!user && (
            <div className="px-6 py-4 border-t border-rose-100/30 mt-auto">
              <Link
                href="/auth"
                className="block w-full text-center px-4 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white hover:from-rose-700 hover:to-pink-600 transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                onClick={handleMobileMenuClose}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}
