"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  Download,
  RotateCcw,
  MessageCircle,
  Star,
  Shield,
  Heart,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const OrderDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  const order = {
    id: "ORD-2024-156789",
    status: "shipped",
    placedAt: "2024-08-01T14:30:00Z",
    expectedDelivery: "2024-08-05T18:00:00Z",
    total: 680,
    items: [
      {
        id: 1,
        name: "Blue Floral Tote",
        price: 295,
        originalPrice: 350,
        quantity: 1,
        image: "/assests/blue_floral_bag.jpg",
        category: "Tote Bags",
        size: "Medium",
        color: "Blue Floral",
        isNew: true,
      },
      {
        id: 2,
        name: "Butterfly Tote",
        price: 185,
        originalPrice: 225,
        quantity: 1,
        image: "/assests/butterfly_bag.jpg",
        category: "Tote Bags",
        size: "Large",
        color: "Lavender",
        isNew: false,
      },
    ],
    shipping: {
      method: "Free Shipping & White Glove Delivery",
      cost: 0,
      address: {
        name: "Sarah Anderson",
        street: "123 Madison Avenue",
        city: "New York",
        state: "NY",
        zip: "10016",
        country: "United States",
      },
    },
    payment: {
      method: "Visa ending in 4242",
      status: "Confirmed",
      subtotal: 480,
      discount: 48,
      tax: 48,
      shipping: 0,
      total: 680,
    },
    tracking: {
      carrier: "Premium Express",
      number: "1Z999AA1234567890",
      currentStatus: "In Transit",
      location: "Newark, NJ Distribution Center",
      updates: [
        {
          date: "2024-08-03T10:15:00Z",
          status: "In Transit",
          location: "Newark, NJ Distribution Center",
          description: "Your handcrafted pieces are on their way to you",
        },
        {
          date: "2024-08-02T16:45:00Z",
          status: "In Transit",
          location: "Philadelphia, PA",
          description: "Package departed from facility",
        },
        {
          date: "2024-08-02T08:30:00Z",
          status: "Processing",
          location: "Philadelphia, PA",
          description: "Package arrived at sorting facility",
        },
        {
          date: "2024-08-01T18:20:00Z",
          status: "Shipped",
          location: "Artisan Workshop",
          description: "Your order has been carefully packaged and shipped",
        },
        {
          date: "2024-08-01T14:30:00Z",
          status: "Confirmed",
          location: "Artisan Workshop",
          description: "Order confirmed and being prepared with care",
        },
      ],
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const statusToIndex = {
      confirmed: 0,
      shipped: 1,
      "in transit": 2,
      delivered: 3,
    };
    const currentIndex = statusToIndex[order.status.toLowerCase()] || 0;
    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      if (step === currentIndex) {
        clearInterval(interval);
      }
      step++;
    }, 800);
    return () => clearInterval(interval);
  }, [order.status]);

  useEffect(() => {
    if (activeStep > 0) {
      stepsRef.current.forEach((step, index) => {
        if (index <= activeStep) {
          step.classList.add("bg-rose-100", "text-rose-600");
          step.classList.remove("bg-gray-100", "text-gray-400");
        }
      });
    }
  }, [activeStep]);

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-2">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2">
          Share Your
          <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <p className="text-lg text-gray-600 font-light mb-6">
          How would you rate your handcrafted pieces?
        </p>
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="p-1 transition-all duration-300 hover:scale-110"
            >
              <Star
                className={`w-8 h-8 md:w-10 md:h-10 ${
                  star <= rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <textarea
          placeholder="Tell us about your experience with these handcrafted pieces..."
          className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-700 font-light"
        />
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setShowReviewModal(false)}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-full text-gray-700 hover:border-gray-400 transition-all duration-300 font-light"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowReviewModal(false)}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full hover:from-rose-700 hover:to-pink-600 transition-all duration-300 font-medium"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-300">
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </Link>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-medium rounded-full tracking-wide">
                    Order Details
                  </span>
                  {order.status === "shipped" && (
                    <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-xs font-medium rounded-full">
                      In Transit
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-2">
                      Order {order.id}
                    </h1>
                    <div className="text-gray-600 font-light text-sm sm:text-base">
                      Placed on {formatDate(order.placedAt)}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1.5">
                      ${order.total}
                    </div>
                    <div className="text-gray-600 font-light text-sm sm:text-base">
                      Expected delivery: {formatDate(order.expectedDelivery)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Order Items */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Your Handcrafted
                <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Pieces
                </span>
              </h2>
              <div className="space-y-4 md:space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-6 rounded-xl md:rounded-2xl hover:bg-gray-50 transition-all duration-300">
                      <div className="aspect-square w-full md:w-24 h-40 md:h-24 rounded-xl md:rounded-2xl overflow-hidden bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="w-full md:flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-medium rounded-full">
                            {item.category}
                          </span>
                          {item.isNew && (
                            <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-xs font-medium rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span>Color: {item.color}</span>
                          <span>•</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="w-full md:w-auto text-right md:mt-0">
                        <div className="flex items-center space-x-3 justify-end">
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
            <div className="border-t border-gray-200 pt-8 md:pt-12">
              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-6">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600 font-light text-sm md:text-base">Subtotal</span>
                  <span className="font-light text-gray-900 text-sm md:text-base">
                    ${order.payment.subtotal}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600 font-light text-sm md:text-base">
                    Artisan Discount
                  </span>
                  <span className="font-light text-green-600 text-sm md:text-base">
                    -${order.payment.discount}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600 font-light text-sm md:text-base">Tax</span>
                  <span className="font-light text-gray-900 text-sm md:text-base">
                    ${order.payment.tax}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600 font-light text-sm md:text-base">Shipping</span>
                  <span className="font-light text-green-600 text-sm md:text-base">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl md:text-2xl font-light text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl md:text-3xl font-light text-gray-900">
                      ${order.payment.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tracking & Details */}
          <div className="space-y-8 md:space-y-12">
            {/* Tracking Section */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Package
                <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
              {/* Current Status Display */}
              <div className="mb-6 p-4 md:p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl md:rounded-2xl border border-rose-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-white rounded-full shadow-sm">
                    {order.status === "delivered" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Truck className="w-5 h-5 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-rose-900 capitalize">
                      {order.status}
                    </p>
                    <p className="text-rose-700 font-light text-sm">
                      {
                        order.tracking.updates.find(
                          (u) =>
                            u.status.toLowerCase() ===
                            order.status.toLowerCase()
                        )?.location
                      }
                    </p>
                  </div>
                </div>
              </div>
              {/* Vertical Tracking Steps */}
              <div className="relative flex flex-col space-y-4 md:space-y-6 ml-2 md:ml-4">
                {/* Vertical Line (Background) */}
                <div
                  className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full transition-all duration-1000 ease-in-out"
                  style={{
                    height: `${(activeStep / 3) * 100}%`,
                  }}
                />
                {[
                  {
                    status: "Confirmed",
                    icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />,
                  },
                  { status: "Shipped", icon: <Truck className="w-4 h-4 md:w-5 md:h-5" /> },
                  { status: "In Transit", icon: <Clock className="w-4 h-4 md:w-5 md:h-5" /> },
                  {
                    status: "Delivered",
                    icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />,
                  },
                ].map((step, index) => {
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;
                  return (
                    <div key={index} className="relative flex items-start">
                      {/* Blob Step */}
                      <div
                        ref={(el) => (stepsRef.current[index] = el)}
                        className={`z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? "bg-rose-500 text-white ring-4 ring-rose-200 scale-110"
                            : isCompleted
                            ? "bg-rose-100 text-rose-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {/* Step Content */}
                      <div className="pl-3 md:pl-4">
                        <h4
                          className={`text-base md:text-lg font-medium ${
                            isActive || isCompleted
                              ? "text-rose-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.status}
                        </h4>
                        {isActive && (
                          <p className="text-gray-600 font-light text-xs md:text-sm mt-1">
                            {
                              order.tracking.updates.find(
                                (u) =>
                                  u.status.toLowerCase() ===
                                  step.status.toLowerCase()
                              )?.description
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Shipping Address */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
                Delivery Address
              </h3>
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-gray-50 rounded-full">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </div>
                <div className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
                  <p className="font-medium text-gray-900 mb-0.5">
                    {order.shipping.address.name}
                  </p>
                  <p>{order.shipping.address.street}</p>
                  <p>
                    {order.shipping.address.city},{" "}
                    {order.shipping.address.state} {order.shipping.address.zip}
                  </p>
                  <p>{order.shipping.address.country}</p>
                </div>
              </div>
            </div>
            {/* Payment Method */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
                Payment Method
              </h3>
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gray-50 rounded-full">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm md:text-base">
                    {order.payment.method}
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    Payment {order.payment.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Need
              <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Assistance?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Our artisan care team is here to help with any questions about your handcrafted pieces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full group p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 md:p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base">
                    Write Review
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-light">
                    Share your experience
                  </p>
                </div>
              </div>
            </button>
            <button className="w-full group p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 md:p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base">
                    Contact Support
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-light">
                    Get help from our team
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="flex flex-col md:flex-row justify-center md:gap-16 md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2.5">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-rose-600" />
              <span className="text-gray-700 font-light text-sm md:text-base">
                Lifetime Craftsmanship Guarantee
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Truck className="w-4 h-4 md:w-5 md:h-5 text-rose-600" />
              <span className="text-gray-700 font-light text-sm md:text-base">
                Free Shipping & White Glove Delivery
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-rose-600" />
              <span className="text-gray-700 font-light text-sm md:text-base">
                30-Day Return Policy
              </span>
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
