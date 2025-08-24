"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Star,
  Eye,
  Download,
  RotateCcw,
  Shield,
  Heart,
  ChevronRight,
  ShoppingBag
} from "lucide-react";
import { getProductsData } from "@/services/products";
import { useLoading } from '@/context/LoadingContext';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user, token } = useUser();
  const [allProducts, setAllProducts] = useState([]);
  const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { setLoading } = useLoading()
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsData(setLoading);
      setAllProducts(products);
    };
    fetchProducts();
  }, []);
  // Fetch user orders
  useEffect(() => {
    const fetchAndEnrichOrders = async () => {
      try {
        // 1. Fetch orders
        const response = await axios.post(
          `${dbUri}/api/order/userorders`,
          { userId: user?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          let fetchedOrders = response.data.orders;
          fetchedOrders = fetchedOrders.filter((order) => order.payment === true);
          fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
          // 2. Enrich orders (only if products available)
          if (allProducts.length > 0) {
            fetchedOrders = fetchedOrders.map((order) => {
              const alreadyEnriched = order.items.every((item) => item.product);
              if (alreadyEnriched) return order;

              const enrichedItems = order.items.map((item) => {
                const product = allProducts.find((p) => p._id === item.productId);
                if (!product) return item;
                return { ...item, product };
              });

              return { ...order, items: enrichedItems };
            });
          }

          // 3. Update state
          setOrders(fetchedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?._id && token) {
      fetchAndEnrichOrders();
    }
  }, [user, token, allProducts]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Shipped":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "Order Placed":
        return <Package className="w-4 h-4 text-orange-600" />;
      case "Cancelled":
        return <Clock className="w-4 h-4 text-red-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Order Placed":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const searchParams = useSearchParams();
  const handleBack = () => {
    const placed = searchParams.get('placed')
    console.log(placed)
    if (placed) {
      router.push("/");
    } else {
      router.back();
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs font-medium rounded-full tracking-wide">
                    Your Orders
                  </span>
                  <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    {filteredOrders.length} Orders
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">
                  Order
                  <span className="block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                    History
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID or product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-700 font-light"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors duration-300"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-light capitalize">
                {statusFilter === "all" ? "All Orders" : statusFilter}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${showFilters ? "rotate-180" : ""
                  }`}
              />
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                <div className="py-2">
                  {[
                    "all",
                    "Order Placed",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilters(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200 capitalize font-light"
                    >
                      {status === "all" ? "All Orders" : status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600 font-light">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "You haven't placed any orders yet"}
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-rose-200 transition-all duration-300 cursor-pointer"
              >
              <Link href={`/orders/${order._id}`} passHref>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <h3 className="text-lg font-medium text-gray-900">
                          {"ORD-" + order._id.toString().slice(-6)}
                        </h3>
                        <div
                          className={`flex items-center space-x-1.5 px-3 py-1 border rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-light text-gray-900">
                        ₹{order.amount}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 font-light mb-4">
                      <div>
                        Placed on {formatDate(order.date)}
                        {order.status === "Delivered" && (
                          <span className="block sm:inline sm:ml-2">
                            • Delivered on {formatDate(order.updatedAt)}
                          </span>
                        )}
                        {order.status === "Cancelled" && (
                          <span className="block sm:inline sm:ml-2">
                            • Cancelled on {formatDate(order.updatedAt)}
                          </span>
                        )}
                        {(order.status === "Shipped" ||
                          order.status === "Order Placed") && (
                            <span className="block sm:inline sm:ml-2">
                              • Expected by{" "}
                              {formatDate(
                                new Date(order.date).setDate(
                                  new Date(order.date).getDate() + 9
                                )
                              )}
                            </span>
                          )}
                      </div>
                      <div>
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex items-center space-x-3 overflow-x-auto pb-2 mb-4">
                      {order.isCustomized ? (
                        // Customized Order Preview
                        <div className="flex-shrink-0 flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {order.customImage ? (
                              <img
                                src={order.customImage}
                                alt="Custom design"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {order.items[0]?.name || "Custom Tote Bag"}
                            </p>
                            <p className="text-xs text-gray-500 font-light">
                              ₹{order.customPrice}
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Non-Customized Orders Preview
                        <>
                          {order.items.slice(0, 3).map((item, index) => {
                            // Check if item has product data
                            if (item.product) {
                              return (
                                <div key={index} className="flex-shrink-0 flex items-center space-x-3">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                    {item.product.image && item.product.image[0] ? (
                                      <img
                                        src={item.product.image[0]}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <ShoppingBag className="w-6 h-6 text-gray-400" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {item.product.name || item.name}
                                    </p>
                                    <p className="text-xs text-gray-500 font-light">
                                      ₹{item.product.price || item.price}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            // Fallback for items without product data
                            return (
                              <div key={index} className="flex-shrink-0 flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                    <ShoppingBag className="w-6 h-6 text-gray-400" />
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500 font-light">
                                    ₹{item.price}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                          {order.items.length > 3 && (
                            <div className="flex-shrink-0 text-sm text-gray-500 font-light">
                              +{order.items.length - 3} more
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Action Buttons - moved to bottom right */}
                    <div className="flex justify-end">
                      <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-rose-300 text-rose-600 rounded-full hover:bg-rose-50 transition-all duration-300 font-light">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Need
              <span className="ml-1 sm:ml-2 block font-normal bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                Help?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Our artisan care team is here to assist with any questions about
              your orders.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button className="group p-6 rounded-2xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-all duration-300">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 bg-gray-50 group-hover:bg-white rounded-full transition-colors duration-300">
                  <Heart className="w-6 h-6 text-gray-600 group-hover:text-rose-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Contact Support
                  </h3>
                  <p className="text-sm text-gray-600 font-light">
                    Get personalized help
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;