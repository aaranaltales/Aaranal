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
  Package
} from 'lucide-react';

// Dummy data for testing
const dummyReviews = [
  {
    _id: "1",
    customerName: "Priya Sharma",
    rating: 5,
    comment: "Amazing quality! The fabric is so soft and comfortable. Delivered on time and packaging was excellent. Will definitely order again!",
    orderId: "64a5f8b2c3d4e5f6789012ab",
    orderDate: "2024-03-15T10:30:00Z",
    createdAt: "2024-03-18T14:20:00Z",
    orderAmount: 1299,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Cotton Kurta Set",
        productImage: ["https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "M",
        productPrice: 899,
        price: 899
      },
      {
        productName: "Palazzo Pants",
        productImage: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "L",
        productPrice: 400,
        price: 400
      }
    ]
  },
  {
    _id: "2",
    customerName: "Rajesh Kumar",
    rating: 4,
    comment: "Good product overall. The quality is decent for the price. Shipping was a bit delayed but customer service was helpful.",
    orderId: "64a5f8b2c3d4e5f6789012cd",
    orderDate: "2024-03-10T16:45:00Z",
    createdAt: "2024-03-14T09:15:00Z",
    orderAmount: 799,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Casual T-Shirt",
        productImage: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"],
        quantity: 2,
        size: "L",
        productPrice: 399,
        price: 399
      }
    ]
  },
  {
    _id: "3",
    customerName: "Anita Patel",
    rating: 5,
    comment: "Absolutely love this dress! Perfect fit and the color is exactly as shown in the pictures. Fast delivery too!",
    orderId: "64a5f8b2c3d4e5f6789012ef",
    orderDate: "2024-03-08T12:20:00Z",
    createdAt: "2024-03-12T11:30:00Z",
    orderAmount: 1599,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Floral Summer Dress",
        productImage: ["https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "S",
        productPrice: 1599,
        price: 1599
      }
    ]
  },
  {
    _id: "4",
    customerName: "Mohammed Ali",
    rating: 3,
    comment: "The product is okay but not as described. The material feels cheaper than expected. However, the delivery was prompt.",
    orderId: "64a5f8b2c3d4e5f6789012gh",
    orderDate: "2024-03-05T08:15:00Z",
    createdAt: "2024-03-08T17:45:00Z",
    orderAmount: 699,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Formal Shirt",
        productImage: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "XL",
        productPrice: 699,
        price: 699
      }
    ]
  },
  {
    _id: "5",
    customerName: "Deepika Reddy",
    rating: 5,
    comment: "Excellent quality saree! The embroidery work is beautiful and the fabric is premium. Highly recommended for special occasions.",
    orderId: "64a5f8b2c3d4e5f6789012ij",
    orderDate: "2024-03-01T14:30:00Z",
    createdAt: "2024-03-05T13:20:00Z",
    orderAmount: 2499,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Silk Embroidered Saree",
        productImage: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "Free Size",
        productPrice: 2499,
        price: 2499
      }
    ]
  },
  {
    _id: "6",
    customerName: "Vikram Singh",
    rating: 4,
    comment: "Good value for money. The jeans fit well and the quality is satisfactory. Would buy again.",
    orderId: "64a5f8b2c3d4e5f6789012kl",
    orderDate: "2024-02-28T11:45:00Z",
    createdAt: "2024-03-03T10:15:00Z",
    orderAmount: 899,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Slim Fit Jeans",
        productImage: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "32",
        productPrice: 899,
        price: 899
      }
    ]
  },
  {
    _id: "7",
    customerName: "Sneha Gupta",
    rating: 2,
    comment: "Not satisfied with the purchase. The color was different from what was shown online and the size was smaller than expected.",
    orderId: "64a5f8b2c3d4e5f6789012mn",
    orderDate: "2024-02-25T15:20:00Z",
    createdAt: "2024-02-28T09:30:00Z",
    orderAmount: 599,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Printed Top",
        productImage: ["https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "M",
        productPrice: 599,
        price: 599
      }
    ]
  },
  {
    _id: "8",
    customerName: "Arjun Nair",
    rating: 5,
    comment: "Outstanding quality! The leather jacket is exactly what I was looking for. Great craftsmanship and perfect fit.",
    orderId: "64a5f8b2c3d4e5f6789012op",
    orderDate: "2024-02-20T13:10:00Z",
    createdAt: "2024-02-24T16:45:00Z",
    orderAmount: 3999,
    orderStatus: "Delivered",
    orderItems: [
      {
        productName: "Leather Jacket",
        productImage: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop"],
        quantity: 1,
        size: "L",
        productPrice: 3999,
        price: 3999
      }
    ]
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReviews = async () => {
    try {
      // Comment out the API call and use dummy data instead
      /*
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/list`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setReviews(res.data.reviews.reverse());
      } else {
        toast.error(res.data.message);
      }
      */
      
      // Use dummy data
      setReviews(dummyReviews);
      toast.success("Reviews loaded successfully!");
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
                      {review.customerName || 'Anonymous Customer'}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex space-x-1">
                        {renderStars(review.rating || 0)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="mb-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    Order: {"ORD-" + (review.orderId?.slice(-6) || 'N/A')}
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {review.comment || 'No comment provided'}
                </p>
              </div>

              {/* Order Items */}
              {review.orderItems && review.orderItems.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Products reviewed:</span>
                  </div>
                  <div className="space-y-2">
                    {review.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {item.productImage && item.productImage[0] && (
                            <img
                              src={item.productImage[0]}
                              alt={item.productName}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <span className="font-medium text-gray-800">
                              {item.productName || item.name} × {item.quantity}
                            </span>
                            {item.size && (
                              <span className="text-xs text-gray-500 ml-2">
                                ({item.size})
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-medium text-gray-800">
                          ₹{item.productPrice || item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {new Date(review.orderDate || review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Amount:</span>
                    <span className="font-medium">₹{review.orderAmount || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status:</span>
                    <span className={`font-medium capitalize ${
                      review.orderStatus === 'Delivered' ? 'text-green-600' : 
                      review.orderStatus === 'Shipped' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {review.orderStatus || 'N/A'}
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