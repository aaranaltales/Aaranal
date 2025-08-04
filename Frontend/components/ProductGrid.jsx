'use client';

import { useUser } from '@/context/UserContext';
import { getProductsData } from '@/services/products';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: "Blue Floral Tote",
    price: "$295",
    originalPrice: "$350",
    image: "assests/blue_floral_bag.jpg",
    category: "Tote Bags",
    isNew: true,
    // colors: ["#8B4513", "#2F2F2F", "#8B0000"]
  },
  {
    id: 2,
    name: "Butterfly Tote",
    price: "$185",
    image: "assests/butterfly_bag.jpg",
    category: "Tote Bags",
    isNew: false,
    // colors: ["#2F2F2F", "#654321", "#800020"]
  },
  {
    id: 3,
    name: "Flowers Tote (Hand-Painted)",
    price: "$125",
    image: "assests/flowers_handpainted_bag.jpg",
    category: "Tote Bags",
    isNew: false,
    // colors: ["#800020", "#2F2F2F", "#8B4513"]
  },
  {
    id: 4,
    name: "Paris Tote",
    price: "$395",
    image: "assests/paris_bag.jpg",
    category: "Tote Bags",
    isNew: true,
    // colors: ["#2F2F2F", "#8B4513", "#4B0082"]
  },
  {
    id: 5,
    name: "Red Tulips Tote",
    price: "$225",
    image: "assests/red_tuplis_bag.jpg",
    category: "Tote Bags",
    isNew: false,
    // colors: ["#D2B48C", "#8B4513", "#2F2F2F"]
  },
  {
    id: 6,
    name: "Paw Money Pouch",
    price: "$85",
    originalPrice: "$110",
    image: "assests/paw_money_pouch.jpg",
    category: "Money Pouches",
    isNew: true,
    // colors: ["#191970", "#2F2F2F", "#8B0000"]
  }
];

export default function ProductGrid() {
  const [likedProducts, setLikedProducts] = useState([]);
  const { refreshUser, token, addToCart, toggleWishlist, wishlist } = useUser();
  const [bestSellers, setBestSellers] = useState([]);

  const fetchProducts = async () => {
    const allProducts = await getProductsData();

    const bestSellersOnly = allProducts.filter(product => product.bestseller === true);

    setBestSellers(bestSellersOnly);
  }
  useEffect(() => {
    fetchProducts();
  }, [])


  const toggleLike = (e, productId) => {
    e.preventDefault(); // Prevent navigation when clicking heart
    e.stopPropagation(); // Stop event bubbling
    setLikedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Stop event bubbling
    // Add your cart logic here

    addToCart(productId)
    // You could also dispatch to a global state or call an API here
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4">
            Curated Collection
          </span>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Signature
            <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Pieces
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Each piece in our collection represents the perfect harmony of traditional craftsmanship
            and contemporary design, created for the discerning individual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {bestSellers.map((product) => (
            <div key={product._id} className="group cursor-pointer relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">

              {product.isNew && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  New
                </div>
              )}

              {/* ❤️ Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 group-hover:scale-110"
              >
                <i className={`${wishlist.includes(product._id) ? 'ri-heart-fill text-rose-500' : 'ri-heart-line text-gray-600'} w-5 h-5 flex items-center justify-center transition-colors`}></i>
              </button>

              {/* 🖼️ Link wrapping only image and text */}
              <Link href={`/product/${product._id}`} className="block">
                <div className="aspect-[4/5] overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-rose-600 font-medium tracking-wide uppercase">{product.category}</span>
                  </div>

                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
              </Link>

              {/* 🛒 Add to Cart (outside Link) */}
              <div className="px-6 pb-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={(e) => handleAddToCart(e, product._id)}
                  className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

        </div>

        <div className="text-center mt-16">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg group"
          >
            View Full Collection
            <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2 group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}