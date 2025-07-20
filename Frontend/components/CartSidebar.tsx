
'use client';

import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  color: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const cartItems: CartItem[] = [
    {
    id: '3',
    name: "Blue Floral Tote",
    price: "$295",
    image:"assests/blue_floral_bag.jpg",
    quantity: 1,
    color: "#800020"
  },
  {
    id: '3',
    name: "Butterfly Tote",
    price: "$185",
    image: "assests/butterfly_bag.jpg",
    quantity: 1,
    color: "#800020"
  },
  {
    id: '3',
    name: "Flowers Tote (Hand-Painted)",
    price: "$125",
    image: "assests/flowers_handpainted_bag.jpg",
    quantity: 1,
    color: "#800020"
  },
];

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const subtotal = 805;
  const shipping = 25;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
          <h2 className="text-2xl font-semibold text-gray-900">Shopping Bag</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-rose-100 rounded-full transition-colors cursor-pointer"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center text-gray-600"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-4 group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-rose-50 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Color: {item.color}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 rounded-full border border-rose-300 flex items-center justify-center hover:bg-rose-50 cursor-pointer transition-colors">
                        <i className="ri-subtract-line w-4 h-4 flex items-center justify-center text-rose-600"></i>
                      </button>
                      <span className="text-sm font-medium text-gray-900 w-8 text-center">{item.quantity}</span>
                      <button className="w-8 h-8 rounded-full border border-rose-300 flex items-center justify-center hover:bg-rose-50 cursor-pointer transition-colors">
                        <i className="ri-add-line w-4 h-4 flex items-center justify-center text-rose-600"></i>
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{item.price}</p>
                  </div>
                </div>
                
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-100 rounded-full transition-all cursor-pointer">
                  <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center text-gray-400 hover:text-rose-600"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-rose-100 p-6 bg-gradient-to-b from-white to-rose-50/30">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-900">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-900">${shipping}</span>
            </div>
            <div className="border-t border-rose-100 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-semibold text-xl bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">${total}</span>
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
      </div>
    </>
  );
}
