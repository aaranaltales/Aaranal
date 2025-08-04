'use client'

import React, { use, useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard, Phone, Mail, Download, RotateCcw, MessageCircle, Star, Shield, Heart, ChevronRight} from 'lucide-react';
import Link from 'next/link';

const OrderDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);

  // Order data matching your product structure
  const order = {
    id: 'ORD-2024-156789',
    status: 'shipped',
    placedAt: '2024-08-01T14:30:00Z',
    expectedDelivery: '2024-08-05T18:00:00Z',
    total: 680,
    items: [
      {
        id: 1,
        name: 'Blue Floral Tote',
        price: 295,
        originalPrice: 350,
        quantity: 1,
        image: '/assests/blue_floral_bag.jpg',
        category: 'Tote Bags',
        size: 'Medium',
        color: 'Blue Floral',
        isNew: true
      },
      {
        id: 2,
        name: 'Butterfly Tote',
        price: 185,
        originalPrice: 225,
        quantity: 1,
        image: '/assests/butterfly_bag.jpg',
        category: 'Tote Bags',
        size: 'Large',
        color: 'Lavender',
        isNew: false
      }
    ],
    shipping: {
      method: 'Free Shipping & White Glove Delivery',
      cost: 0,
      address: {
        name: 'Sarah Anderson',
        street: '123 Madison Avenue',
        city: 'New York',
        state: 'NY',
        zip: '10016',
        country: 'United States'
      }
    },
    payment: {
      method: 'Visa ending in 4242',
      status: 'Confirmed',
      subtotal: 480,
      discount: 48,
      tax: 48,
      shipping: 0,
      total: 680
    },
    tracking: {
      carrier: 'Premium Express',
      number: '1Z999AA1234567890',
      currentStatus: 'In Transit',
      location: 'Newark, NJ Distribution Center',
      updates: [
        {
          date: '2024-08-03T10:15:00Z',
          status: 'In Transit',
          location: 'Newark, NJ Distribution Center',
          description: 'Your handcrafted pieces are on their way to you'
        },
        {
          date: '2024-08-02T16:45:00Z',
          status: 'In Transit',
          location: 'Philadelphia, PA',
          description: 'Package departed from facility'
        },
        {
          date: '2024-08-02T08:30:00Z',
          status: 'Processing',
          location: 'Philadelphia, PA',
          description: 'Package arrived at sorting facility'
        },
        {
          date: '2024-08-01T18:20:00Z',
          status: 'Shipped',
          location: 'Artisan Workshop',
          description: 'Your order has been carefully packaged and shipped'
        },
        {
          date: '2024-08-01T14:30:00Z',
          status: 'Confirmed',
          location: 'Artisan Workshop',
          description: 'Order confirmed and being prepared with care'
        }
      ]
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-600';
      case 'shipped':
      case 'in transit': return 'text-rose-600';
      case 'processing':
      case 'confirmed': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4">
        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2">
          Share Your
          <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <p className="text-lg text-gray-600 font-light mb-8">
          How would you rate your handcrafted pieces?
        </p>

        <div className="flex justify-center space-x-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition-all duration-300 hover:scale-110"
            >
              <Star className={`w-10 h-10 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>
        <textarea
          placeholder="Tell us about your experience with these handcrafted pieces..."
          className="w-full h-32 p-6 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-700 font-light"
        />
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => setShowReviewModal(false)}
            className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-full text-gray-700 hover:border-gray-400 transition-all duration-300 font-light"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowReviewModal(false)}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transition-all duration-300 font-medium"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header - matching your product page style */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/profile">
              <button className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-300">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              </Link>
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-medium rounded-full tracking-wide">
                    Order Details
                  </span>
                  {order.status === 'shipped' && (
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-xs font-medium rounded-full">
                      In Transit
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
                      Order {order.id}
                    </h1>
                    <div className="text-gray-600 font-light">Placed on {formatDate(order.placedAt)}</div>
                  </div>
                  <div className="md:text-right md:pl-100">
                    <div className="text-3xl font-light text-gray-900 mb-2">${order.total}</div>
                    <div className="text-gray-600 font-light">Expected delivery: {formatDate(order.expectedDelivery)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Order Items */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8">
                Your Handcrafted
                <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Pieces
                </span>
              </h2>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                      <div className="aspect-square w-24 h-24 rounded-2xl overflow-hidden bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-medium rounded-full">
                            {item.category}
                          </span>
                          {item.isNew && (
                            <span className="inline-block px-2 py-1 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-xs font-medium rounded-full">
                              New
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                          {item.name}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 font-light">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span>Color: {item.color}</span>
                          <span>•</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-light text-gray-900">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-lg text-gray-500 line-through font-light">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-12 p-5 ">
              <h3 className="text-2xl font-light text-gray-900 mb-8">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-light">Subtotal</span>
                  <span className="font-light text-gray-900">${order.payment.subtotal}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-light">Artisan Discount</span>
                  <span className="font-light text-green-600">-${order.payment.discount}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-light">Tax</span>
                  <span className="font-light text-gray-900">${order.payment.tax}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-light">Shipping</span>
                  <span className="font-light text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-light text-gray-900">Total</span>
                    <span className="text-3xl font-light text-gray-900">${order.payment.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Tracking & Details */}
          <div className="space-y-12 pr-5 md:p-0">
            {/* Tracking Section */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8">
                Package
                <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
              {/* Current Status */}
              <div className="mb-8 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <Truck className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-rose-900">{order.tracking.currentStatus}</p>
                    <p className="text-rose-700 font-light">{order.tracking.location}</p>
                    <p className="text-sm text-rose-600 font-light mt-1">
                      {order.tracking.carrier} • {order.tracking.number}
                    </p>
                  </div>
                </div>
              </div>
              {/* Tracking Timeline */}
              <div className="space-y-6">
                {order.tracking.updates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 mt-1 p-2 rounded-full ${index === 0 ? 'bg-rose-100' : 'bg-gray-100'}`}>
                      {index === 0 ? (
                        <Truck className="w-4 h-4 text-rose-600" />
                      ) : update.status.toLowerCase() === 'delivered' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900">{update.status}</p>
                        <p className="text-sm text-gray-500 font-light">{formatDate(update.date)}</p>
                      </div>
                      <p className="text-gray-600 font-light mb-1">{update.description}</p>
                      <p className="text-sm text-gray-500 font-light">{update.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Shipping Address */}
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Delivery Address</h3>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-gray-600 font-light leading-relaxed">
                  <p className="font-medium text-gray-900 mb-1">{order.shipping.address.name}</p>
                  <p>{order.shipping.address.street}</p>
                  <p>{order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zip}</p>
                  <p>{order.shipping.address.country}</p>
                </div>
              </div>
            </div>
            {/* Payment Method */}
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Payment Method</h3>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.payment.method}</p>
                  <p className="text-sm text-gray-500 font-light">Payment {order.payment.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Actions Section */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Need
              <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Assistance?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Our artisan care team is here to help with any questions about your handcrafted pieces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button className="group p-6 rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <Download className="w-6 h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Download Receipt</h3>
                  <p className="text-sm text-gray-600 font-light">Get your order receipt</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setShowReviewModal(true)}
              className="group p-6 rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <Star className="w-6 h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Write Review</h3>
                  <p className="text-sm text-gray-600 font-light">Share your experience</p>
                </div>
              </div>
            </button>
            <button className="group p-6 rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <RotateCcw className="w-6 h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Return Item</h3>
                  <p className="text-sm text-gray-600 font-light">30-day return policy</p>
                </div>
              </div>
            </button>
            <button className="group p-6 rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <MessageCircle className="w-6 h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Contact Support</h3>
                  <p className="text-sm text-gray-600 font-light">Get help from our team</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        {/* Guarantee Section */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-rose-600" />
              <span className="text-gray-700 font-light">Lifetime Craftsmanship Guarantee</span>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-rose-600" />
              <span className="text-gray-700 font-light">Free Shipping & White Glove Delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-5 h-5 text-rose-600" />
              <span className="text-gray-700 font-light">30-Day Return Policy</span>
            </div>
          </div>
        </div>
      </div>
      {/* Review Modal */}
      {showReviewModal && <ReviewModal />}
    </div>
  );
};

export default OrderDetailsPage;
