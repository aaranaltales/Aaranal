'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { getProductsData } from '@/services/products';
import { useUser } from '@/context/UserContext';

// This would typically come from your database or API

export default function DynamicProductPage() {
  const params = useParams();
  const productId = params.id;
  const { refreshUser, token, addToCart, toggleWishlist, wishlist } = useUser();
  const [productsData, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const Products = await getProductsData();
      setAllProducts(Products);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    e.stopPropagation(); // Stop event bubbling
    // Add your cart logic here

    addToCart(productId)
    // You could also dispatch to a global state or call an API here
  };
  // Find the product by ID
  const product = productsData.find(p => p._id === productId);
  const similarProducts = productsData.filter(
    p => p.category === product.category && p._id !== product._id
  );
  console.log(product)
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[1] || product?.sizes?.[0] || 'Medium');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Link href="/" className="mt-4 inline-block bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-full">
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
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50">
              <img
                src={product.image[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.image.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-rose-500' : 'border-transparent hover:border-gray-300'
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
                className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-4 rounded-full text-lg font-medium hover:from-rose-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  toggleWishlist(product._id)
                  setIsWishlisted(!isWishlisted)
                }}
                className={`w-full py-3 rounded-full border-2 transition-all flex items-center justify-center space-x-2 ${isWishlisted
                  ? 'border-rose-500 text-rose-700 bg-rose-50'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-700">Lifetime Craftsmanship Guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-700">Free Shipping & White Glove Delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-rose-600" />
                  <span className="text-gray-700">30-Day Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-8">Product Features</h2>
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
              <h2 className="text-3xl font-light text-gray-900 mb-8">Specifications</h2>
              <div className="space-y-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              You May Also
              <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Love
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Discover more pieces from our collection, each crafted with the same
              attention to detail and timeless elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map((similarProduct) => (
              <Link key={similarProduct._id} href={`/product/${similarProduct._id}`} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
                  <img
                    src={similarProduct.image[0]}
                    alt={similarProduct.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="space-y-2">
                  {/* <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(similarProduct.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({similarProduct.rating})</span>
                  </div> */}

                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                    {similarProduct.name}
                  </h3>

                  <p className="text-xl font-light text-gray-900">
                    ₹{similarProduct.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}