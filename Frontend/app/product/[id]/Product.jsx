"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
import { getProductsData } from "@/services/products";
import { useUser } from "@/context/UserContext";
import { useLoading } from "@/context/LoadingContext";

// This would typically come from your database or API

export default function DynamicProductPage() {
  const params = useParams();
  const productId = params.id;
  const { refreshUser, token, addToCart, toggleWishlist, wishlist } = useUser();
  const [productsData, setAllProducts] = useState([]);
  const { setLoading } = useLoading()
  useEffect(() => {
    const fetchProducts = async () => {
      const Products = await getProductsData(setLoading);
      setAllProducts(Products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Stop event bubbling
    // Add your cart logic here

    addToCart(productId);
    // You could also dispatch to a global state or call an API here
  };
  // Find the product by ID
  const product = productsData.find((p) => p._id === productId);
  const similarProducts = productsData.filter(
    (p) => p.category === product?.category && p._id !== product?._id
  );
  // --- image scrollable gallery logic only ---
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollRef = useRef(null);
  useEffect(() => {
    setSelectedImage(0);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [productId]);
  const onScroll = (e) => {
    const { scrollLeft, offsetWidth } = e.target;
    const idx = Math.round(scrollLeft / offsetWidth);
    setSelectedImage(idx);
  };
  const scrollToImage = (idx) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTo({ left: idx * container.offsetWidth, behavior: 'smooth' });
    }
  };
  // ------------------------------

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[1] || product?.sizes?.[0] || "Medium"
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "Default"
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-full"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50">
              <div
                className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar"
                ref={scrollRef}
                onScroll={onScroll}
                style={{ scrollBehavior: 'smooth' }}
              >
                {product.image.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-full h-full snap-start"
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
              {product.image.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {product.image.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to image ${idx + 1}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 outline-none focus:outline-none ${selectedImage === idx
                          ? 'bg-rose-500 scale-125'
                          : 'bg-white/80'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        scrollToImage(idx);
                      }}
                    ></button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.image.map((image, index) => (
                <button
                  key={index}
                  onClick={() => scrollToImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                    ? "border-rose-500"
                    : "border-transparent hover:border-gray-300"
                    }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide mb-4">
                {product.category}
              </span>

              {product.isNew && (
                <span className="ml-2 inline-block px-3 py-1 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-xs font-medium rounded-full">
                  New
                </span>
              )}

              <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div> */}

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-3xl font-light text-gray-900">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-lg text-gray-600 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection
            {product.colors && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div> 
            )} */}

            {/* Size Selection */}
            {/* {product.sizes && product.sizes.length > 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Size</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full border-2 transition-all ${selectedSize === size
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            {/* Quantity */}
            {/* <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  +
                </button>
              </div>
            </div> */}

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={(e) => handleAddToCart(e, product._id)}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-4 rounded-full text-lg font-medium hover:from-rose-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  toggleWishlist(product._id);
                  setIsWishlisted(!isWishlisted);
                }}
                className={`w-full py-3 rounded-full border-2 transition-all flex items-center justify-center space-x-2 ${isWishlisted
                    ? "border-rose-500 text-rose-700 bg-rose-50"
                    : "border-gray-300 hover:border-gray-400"
                  }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
                <span>
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-col-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-700">Right on Time, Fast & Reliable.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-700">
                    Free Shipping & White Glove Delivery
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-award-line w-5 h-5 flex items-center justify-center text-rose-600"></i>
                  <span className="text-gray-700">Crafted to Perfection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Product Features
              </h2>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mt-2"></div>
                    <span className="text-gray-600 font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Specifications
              </h2>
              <div className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-2 py-2 border-b border-gray-100"
                  >
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products - Matching Collections UI Style */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              You May Also
              <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Love
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Discover more pieces from our collection, each crafted with the
              same attention to detail and timeless elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
            {similarProducts.map((similarProduct) => (
              <Link
                key={similarProduct._id}
                href={`/product/${similarProduct._id}`}
                className="group cursor-pointer block h-full"
              >
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 flex flex-col h-full">
                  {/* NEW & SALE Badges */}
                  {similarProduct.isNew && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      New
                    </div>
                  )}
                  {similarProduct.originalPrice && (
                    <div className="absolute top-4 left-12 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Sale
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(similarProduct._id);
                    }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 group-hover:scale-110"
                  >
                    <Heart
                      className={`w-5 h-5 ${wishlist.includes(similarProduct._id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-gray-600"
                        }`}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="aspect-[4/5] overflow-hidden rounded-t-3xl">
                    <img
                      src={similarProduct.image[0]}
                      alt={similarProduct.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-rose-600 font-medium tracking-wide uppercase">
                        {similarProduct.category}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {similarProduct.name}
                    </h3>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-semibold text-gray-900">
                          ₹{similarProduct.price}
                        </span>
                        {similarProduct.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{similarProduct.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, similarProduct._id)}
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

          {/* View More Button - matching your collections page style */}
          {similarProducts.length >= 3 && (
            <div className="text-center mt-16">
              <p className="text-gray-600 mb-8">
                Showing {similarProducts.length} similar products from{" "}
                {product.category}
              </p>
              <Link
                href={`/collections?category=${product.category}`}
                className="inline-flex items-center justify-center px-10 py-4 border-2 border-rose-300 text-rose-700 rounded-full hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white hover:border-transparent transform hover:scale-105 transition-all duration-300 whitespace-nowrap font-medium shadow-lg group"
              >
                View All {product.category}
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* Optional: Hide scrollbars */}
      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
