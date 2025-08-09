'use client';

import { useUser } from '@/context/UserContext';
import Link from 'next/link';

const wishlistItems = [
  {
    id: '2',
    name: "Paris Tote",
    price: "$395",
    image: "assests/paris_bag.jpg",
    category: "Tote Bags",
    colors: ["#2F2F2F", "#8B4513", "#4B0082"]
  },
  {
    id: '2',
    name: "Red Tulips Tote",
    price: "$225",
    image: "assests/red_tuplis_bag.jpg",
    category: "Tote Bags",
    colors: ["#D2B48C", "#8B4513", "#2F2F2F"]
  },
];

export default function WishlistSidebar({ isOpen, onClose }) {

  const { toggleWishlist, wishlistData, addToCart } = useUser();

  const addCart = (item) => {
    toggleWishlist(item._id)
    addToCart(item._id)
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex items-center space-x-3">
            <i className="ri-heart-fill w-6 h-6 flex items-center justify-center text-rose-600"></i>
            <h2 className="text-2xl font-semibold text-gray-900">Wishlist</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-full transition-colors cursor-pointer"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center text-gray-600"></i>
          </button>
        </div>

        {wishlistData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-heart-line w-8 h-8 flex items-center justify-center text-rose-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Your wishlist is empty</h3>
              <p className="text-gray-600 font-light">Start adding items you love</p>
              <Link
                href="/collections"
                onClick={onClose}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {wishlistData.map((item) => (
                  <div key={item._id} className="group bg-gradient-to-br from-white to-rose-50/30 p-4 rounded-2xl border border-rose-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-rose-50 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-rose-600 font-medium uppercase tracking-wide">{item.category}</p>
                            <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                          </div>
                          <button
                            onClick={() => toggleWishlist(item._id)}
                            className="p-1 hover:bg-rose-100 rounded-full transition-all cursor-pointer"
                          >
                            <i className="ri-heart-fill w-4 h-4 flex items-center justify-center text-rose-500 hover:text-rose-600"></i>
                          </button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900 text-sm">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {/* {item.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-gray-200 cursor-pointer hover:scale-125 transition-transform"
                                style={{ backgroundColor: color }}
                              ></div>
                            ))} */}
                          </div>
                          <button
                            onClick={() => addCart(item)}
                            className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-rose-100 p-6 bg-gradient-to-b from-white to-rose-50/30">
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <i className="ri-notification-line w-5 h-5 flex items-center justify-center text-rose-600"></i>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Price Drop Alerts</p>
                      <p className="text-xs text-gray-600">Get notified when prices drop</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/collections"
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-4 rounded-full font-semibold hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}