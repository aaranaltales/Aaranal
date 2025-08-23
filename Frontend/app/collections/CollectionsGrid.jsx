'use client';
import { useLoading } from '@/context/LoadingContext';
import { useUser } from '@/context/UserContext';
import { getProductsData } from '@/services/products';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function CollectionsGrid({ activeCategory, sortBy, searchQuery }) {
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart, wishlist, toggleWishlist } = useUser();
  const { setLoading } = useLoading()
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsData(setLoading);
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(productId);
  };

  const parsePrice = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    }
    return typeof value === 'number' ? value : 0;
  };

  const filteredProducts = allProducts
    .filter(product =>
      activeCategory === 'All' || product.category === activeCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High':
        return parsePrice(a.price) - parsePrice(b.price);
      case 'Price: High to Low':
        return parsePrice(b.price) - parsePrice(a.price);
      case 'Newest':
        return b.createdAt?.localeCompare(a.createdAt || '') || 0;
      default:
        return 0;
    }
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white via-rose-50/20 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ✅ Added items-stretch to keep all cards same height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {sortedProducts.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="group cursor-pointer block h-full" // ✅ h-full to stretch height
            >
              {/* ✅ flex-col + h-full for equal height cards */}
              <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 flex flex-col h-full">

                {/* NEW & SALE Badges */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    New
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-4 left-12 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 group-hover:scale-110"
                >
                  <i
                    className={`${wishlist.includes(product._id)
                      ? 'ri-heart-fill text-rose-500'
                      : 'ri-heart-line text-gray-600'
                      } w-5 h-5`}
                  ></i>
                </button>
                {/* Product Image */}
                <div className="aspect-[4/5] overflow-hidden rounded-t-3xl">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* 📝 Product Info */}
                <div className="p-6 space-y-4 flex flex-col flex-grow"> {/* ✅ flex-grow so bottom section aligns */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-rose-600 font-medium tracking-wide uppercase">
                      {product.category}
                    </span>
                    {/* <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(product.rating)
                            ? 'ri-star-fill text-yellow-400'
                            : 'ri-star-line text-gray-300'
                            }`}
                        ></i>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div> */}
                  </div>

                  {/* ✅ Fixed height product name */}
                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-semibold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product._id)}
                      className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap font-medium shadow-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-8">
            Showing {sortedProducts.length} of {allProducts.length} products
          </p>
          <Link
            href="/customize"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 whitespace-nowrap font-medium shadow-lg group"
          >
            Need Custom Design?
            <i className="ri-arrow-right-line w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
