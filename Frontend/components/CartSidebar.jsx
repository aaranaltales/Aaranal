"use client";
import { useEffect } from "react";
import { useUser } from '@/context/UserContext';
import { useToast } from "@/components/ToastContext";
import Link from 'next/link';

export default function CartSidebar({ isOpen, onClose, justAddedItem = false }) {
  const { updateQuantity, getCartAmount, cartData } = useUser();
  const { showSuccess, showError } = useToast();
  const subtotal = getCartAmount();

  // Show toast when cart opens and a new item was just added
  useEffect(() => {
    if (isOpen && justAddedItem) {
      showSuccess("Added to cart successfully!");
    }
  }, [isOpen, justAddedItem]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await updateQuantity(itemId, newQuantity);
      if (newQuantity === 0) {
        showSuccess("Item removed from cart!");
      } else {
        showSuccess("Cart updated!");
      }
    } catch (error) {
      showError("Failed to update cart. Please try again.");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-[90%] max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Rest of your component remains the same */}
        <div className="flex items-center justify-between p-6 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex items-center space-x-3">
            <i className="ri-shopping-bag-fill w-6 h-6 flex items-center justify-center text-rose-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-full transition-colors cursor-pointer"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center text-gray-600" />
          </button>
        </div>
        {cartData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                <i className="ri-shopping-bag-line w-8 h-8 flex items-center justify-center text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Your cart is empty</h3>
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
                {cartData.map((item) => (
                  <div key={item._id} className="flex items-start space-x-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-rose-50 flex-shrink-0">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-full border border-rose-300 flex items-center justify-center hover:bg-rose-50 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <i className="ri-subtract-line w-4 h-4 flex items-center justify-center text-rose-600" />
                          </button>
                          <span className="text-sm font-medium text-gray-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-rose-300 flex items-center justify-center hover:bg-rose-50 cursor-pointer transition-colors"
                          >
                            <i className="ri-add-line w-4 h-4 flex items-center justify-center text-rose-600" />
                          </button>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">₹{item.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, 0)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-100 rounded-full transition-all cursor-pointer"
                    >
                      <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center text-gray-400 hover:text-rose-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-rose-100 p-6 bg-gradient-to-b from-white to-rose-50/30">
              <div className="space-y-3 mb-6">
                <div className="border-t border-rose-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-xl bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                      ₹{subtotal}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-4 rounded-full font-semibold hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={onClose}
                  className="w-full border-2 border-rose-300 text-rose-700 py-3 rounded-full font-medium hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
