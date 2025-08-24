"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Star,
  Search,
  MessageCircle,
  User,
  Package,
  ShoppingBag
} from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/list`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setReviews(res.data.reviews);
        toast.success("Reviews loaded successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter(review => 
      review.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(filtered);
  }, [reviews, searchTerm]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-light mb-8">Customer Reviews</h1>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reviews by customer, comment, or order..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent"
          />
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">
            {searchTerm ? 'No reviews found matching your search.' : 'No reviews yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white"
            >
              {/* Review Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">
                      {review.customerName}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="mb-1">
                    {formatDate(review.date)}
                  </div>
                  <div>
                    Order: {"ORD-" + review.orderId.slice(-6)}
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Order Items - Enhanced with better display */}
              {review.orderItems && review.orderItems.length > 0 && (
  <div className="mb-4">
    <div className="flex items-center space-x-2 mb-4">
      <Package className="w-5 h-5 text-gray-400" />
      <span className="text-lg font-medium text-gray-800">Products Reviewed:</span>
    </div>
    <div className="space-y-3">
      {review.orderItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
        >
          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
            {item.productId?.image && item.productId.image.length > 0 ? (
              <img
                src={item.productId.image[0]}
                alt={item.productId.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h3 className="font-medium text-gray-900 mb-1">
                  {item.productId?.name}
                </h3>
                {item.productId?.category && (
                  <span className="inline-block px-2 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full mb-2">
                    {item.productId.category}
                  </span>
                )}
                <div className="text-sm text-gray-600">
                  <span>Quantity: {item.quantity}</span>
                  {item.productId?.description && (
                    <p className="mt-1 text-gray-500 text-xs line-clamp-2">
                      {item.productId.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-semibold text-gray-900 text-lg">
                  ₹{item.productId?.price}
                </span>
                {item.quantity > 1 && (
                  <p className="text-xs text-gray-500 mt-1">
                    ₹{(item.productId.price / item.quantity).toFixed(2)} each
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


              {/* Custom Order Display */}
              {review.isCustomOrder && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Package className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-medium text-gray-800">Custom Order:</span>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-rose-100 rounded-lg overflow-hidden">
                        {review.customImage ? (
                          <img 
                            src={review.customImage} 
                            alt="Custom Design"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-rose-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">
                              {review.customItemName || 'Custom Tote Bag'}
                            </h3>
                            <span className="inline-block px-2 py-1 bg-rose-200 text-rose-800 text-xs font-medium rounded-full mb-2">
                              Custom Design
                            </span>
                            {review.designDescription && (
                              <p className="text-sm text-gray-600 mt-1">
                                {review.designDescription}
                              </p>
                            )}
                          </div>
                          <span className="font-semibold text-gray-900 text-lg">
                            ₹{review.customPrice || review.orderAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {formatDate(review.orderDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Amount:</span>
                    <span className="font-medium">₹{review.orderAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status:</span>
                    <span className={`font-medium capitalize ${
                      review.orderStatus === 'Delivered' ? 'text-green-600' : 
                      review.orderStatus === 'Shipped' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {review.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}