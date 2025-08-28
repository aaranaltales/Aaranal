'use client';
import Link from 'next/link';

export default function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  addToCart,
  currentImageIndex,
  setCurrentImageIndex,
  scrollRefs,
}) {
  const scrollToImage = (productId, idx) => {
    const container = scrollRefs.current[productId];
    if (container) {
      const scrollPos = idx * container.offsetWidth;
      container.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  };

  const handleGalleryScroll = (e, product) => {
    const { scrollLeft, offsetWidth } = e.target;
    const idx = Math.round(scrollLeft / offsetWidth);
    setCurrentImageIndex(prev => ({
      ...prev,
      [product._id]: idx,
    }));
  };

  return (
    <div className="group cursor-pointer block h-full">
      <Link href={`/product/${product._id}`}>
        <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 h-full flex flex-col">
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
              toggleWishlist(e, product._id);
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
          {/* Product Images Container */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar"
              ref={el => scrollRefs.current[product._id] = el}
              onScroll={e => handleGalleryScroll(e, product)}
              style={{ scrollBehavior: 'smooth' }}
            >
              {product.image.map((imgSrc, index) => (
                <div key={index} className="flex-shrink-0 w-full h-full snap-start">
                  <img
                    src={imgSrc}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
            {/* Image Indicator Dots */}
            {product.image.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {product.image.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    tabIndex={0}
                    aria-label={`Go to image ${index + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 outline-none focus:outline-none ${(currentImageIndex[product._id] || 0) === index
                      ? 'bg-rose-500 scale-125'
                      : 'bg-white/80'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollToImage(product._id, index);
                    }}
                  ></button>
                ))}
              </div>
            )}
          </div>
          {/* Product Info */}
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-rose-600 font-medium tracking-wide uppercase">
                {product.category}
              </span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 group-hover:text-rose-600 transition-colors mb-4">
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(e, product._id);
                }}
                className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-2.5 rounded-full hover:from-rose-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap font-medium shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
