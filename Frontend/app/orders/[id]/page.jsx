"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { getProductsData } from '@/services/products';
import { useUser } from "@/context/UserContext";
import {
  ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin,
  CreditCard, Phone, Mail, Download, RotateCw, MessageCircle,
  Star, Shield, Heart, ChevronRight, Eye, Calendar, ShoppingBag
} from "lucide-react";
import Link from "next/link";

const OrderDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);
  const { token } = useUser();
  const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsData();
      setAllProducts(products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(
          `${dbUri}/api/order/orderdetails`,
          { orderId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          setOrder(response.data.order);
        }
      } catch (error) {
        console.error("Error fetching order details:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id && token) fetchOrderDetails();
  }, [id, token]);

  useEffect(() => {
    if (order && allProducts.length > 0) {
      const alreadyEnriched = order.items.every((item) => item._id);
      if (!alreadyEnriched) {
        const enrichedItems = order.items.map((item) => {
          const product = allProducts.find((p) => p._id === item.productId);
          return product ? { ...product, quantity: item.quantity } : item;
        });
        setOrder((prevOrder) => ({ ...prevOrder, items: enrichedItems }));
      }
    }
  }, [order, allProducts]);

  useEffect(() => {
    if (!order) return;
    const statusToIndex = {
      "order placed": 0,
      shipped: 1,
      "in transit": 2,
      delivered: 3,
      cancelled: 0,
    };
    const currentIndex = statusToIndex[order.status.toLowerCase()] || 0;
    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      if (step === currentIndex) clearInterval(interval);
      step++;
    }, 800);
    return () => clearInterval(interval);
  }, [order]);

  useEffect(() => {
    if (activeStep > 0 && stepsRef.current.length > 0) {
      stepsRef.current.forEach((step, index) => {
        if (index <= activeStep) {
          step.classList.add("bg-rose-100", "text-rose-600");
          step.classList.remove("bg-gray-100", "text-gray-400");
        }
      });
    }
  }, [activeStep]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Shipped": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Order Placed": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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
                className={`w-8 h-8 md:w-10 md:h-10 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-light text-gray-900 mb-2">Order Not Found</h3>
          <p className="text-gray-600 font-light">The order you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/orders">
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
                      Order {order._id}
                    </h1>
                    <div className="text-gray-600 font-light text-sm sm:text-base">
                      Placed on {formatDate(order.date)}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-2xl sm:text-3xl font-light text-gray-900 mb-1.5">
                      ₹{order.amount}
                    </div>
                    <div className="text-gray-600 font-light text-sm sm:text-base">
                      Expected delivery:{" "}
                      {order.status === "Delivered" ? "Delivered" : order.status === "Cancelled" ? "Cancelled" : formatDate(new Date(order.date).setDate(new Date(order.date).getDate() + 7))}
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
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6">
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-6">
    Your Handcrafted
    <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
      Pieces
    </span>
  </h2>
  <div className="space-y-4 md:space-y-6">
    {order.isCustomized ? (
      // Customized Order
      <div className="group cursor-pointer border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 hover:border-rose-300 hover:shadow-md transition-all duration-300">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="aspect-square w-full md:w-24 h-40 md:h-24 rounded-xl md:rounded-2xl overflow-hidden bg-gray-50">
            {order.customImage ? (
              <img
                src={order.customImage}
                alt={order.items[0].name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="w-full md:flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-medium rounded-full">
                Custom Tote Bag
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
              {order.items[0].name}
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
              <span>Qty: 1</span>
            </div>
            <p className="text-sm text-gray-600 font-light mt-1">
              {order.designDescription || "Custom design as per your specifications"}
            </p>
          </div>
          <div className="w-full md:w-auto text-right md:mt-0">
            <div className="flex items-center space-x-3 justify-end">
              <span className="text-xl font-light text-gray-900">
                ₹{order.customPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      // Non-Customized Order
      order.items.map((item, index) => (
        <div key={index} className="group cursor-pointer border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 hover:border-rose-300 hover:shadow-md transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="aspect-square w-full md:w-24 h-40 md:h-24 rounded-xl md:rounded-2xl overflow-hidden bg-gray-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-medium rounded-full">
                  {item.category || "Tote Bags"}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600 font-light">
                <span>Qty: {item.quantity}</span>
              </div>
            </div>
            <div className="w-full md:w-auto text-right md:mt-0">
              <div className="flex items-center space-x-3 justify-end">
                <span className="text-xl font-light text-gray-900">
                  ₹{item.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>


            {/* Order Summary */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600 font-light text-sm md:text-base">Subtotal</span>
                  <span className="font-light text-gray-900 text-sm md:text-base">₹{order.amount - (25 || 0)}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600 font-light text-sm md:text-base">Shipping</span>
                  <span className="font-light text-green-600 text-sm md:text-base">{order.shippingCost === 0 ? "Free" : `₹25`}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl md:text-2xl font-light text-gray-900">Total</span>
                    <span className="text-2xl md:text-3xl font-light text-gray-900">₹{order.amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tracking & Details */}
          <div className="space-y-8 md:space-y-12">
            {/* Tracking Section */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Package
                <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
              <div className="mb-6 p-4 md:p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl md:rounded-2xl border border-rose-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-white rounded-full shadow-sm">
                    {order.status === "Delivered" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Truck className="w-5 h-5 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-rose-900 capitalize">{order.status}</p>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col space-y-4 md:space-y-6 ml-2 md:ml-4">
                <div
                  className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full transition-all duration-1000 ease-in-out"
                  style={{ height: `${(activeStep / 3) * 100}%` }}
                />
                {[
                  { status: "Order Placed", icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> },
                  { status: "Shipped", icon: <Truck className="w-4 h-4 md:w-5 md:h-5" /> },
                  { status: "In Transit", icon: <Clock className="w-4 h-4 md:w-5 md:h-5" /> },
                  { status: "Delivered", icon: <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> },
                ].map((step, index) => {
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;
                  return (
                    <div key={index} className="relative flex items-start">
                      <div
                        ref={(el) => (stepsRef.current[index] = el)}
                        className={`z-10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? "bg-rose-500 text-white ring-4 ring-rose-200 scale-110" : isCompleted ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-400"}`}
                      >
                        {step.icon}
                      </div>
                      <div className="pl-3 md:pl-4">
                        <h4 className={`text-base md:text-lg font-medium ${isActive || isCompleted ? "text-rose-600" : "text-gray-400"}`}>
                          {step.status}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">Delivery Address</h3>
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-gray-50 rounded-full">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                </div>
                <div className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
                  <p>{order.shippingAddress?.name || "N/A"}</p>
                  <p>{order.shippingAddress?.house || "N/A"}, {order.shippingAddress?.city || "N/A"}</p>
                  <p>{order.shippingAddress?.state || "N/A"} {order.shippingAddress?.pincode || "N/A"}</p>
                  <p>Phone: {order.shippingAddress?.phone || "N/A"}</p>
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
                  <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base">Write Review</h3>
                  <p className="text-xs md:text-sm text-gray-600 font-light">Share your experience</p>
                </div>
              </div>
            </button>
            <button className="w-full group p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 md:p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm md:text-base">Contact Support</h3>
                  <p className="text-xs md:text-sm text-gray-600 font-light">Get help from our team</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="flex flex-col md:flex-row justify-center md:gap-16 md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2.5">
              <Truck className="w-4 h-4 md:w-5 md:h-5 text-rose-600" />
              <span className="text-gray-700 font-light text-sm md:text-base">Free Shipping & White Glove Delivery</span>
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
