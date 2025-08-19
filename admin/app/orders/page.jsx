"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [enrichedOrders, setEnrichedOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/list`
      );
      if (res.data.products) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      toast.success("Status Updated");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // ✅ Enrich orders whenever both orders & products are available
  useEffect(() => {
    if (orders.length === 0 || products.length === 0) return;
    const paidOrders = orders.filter((order) => order.payment === true);
    const merged = paidOrders.map((order) => {
      const enrichedItems = order.items.map((item) => {
        const product = products.find(
          (p) => String(p._id) === String(item.productId) // 🔑 fix: safe compare
        );
        return {
          ...item,
          productName: product?.name || "Unknown Product",
          productPrice: product?.price || 0,
          productImage: product?.image || "",
        };
      });
      return { ...order, items: enrichedItems };
    });

    setEnrichedOrders(merged);
    console.log("✅ Enriched Orders:", merged);
  }, [orders, products]); // ✅ depend on BOTH


  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-light mb-8">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {enrichedOrders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white"
            >
              {/* Order ID and Header */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-medium text-gray-800">
                  Order #{order._id.substring(0, 8)}...
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Out for delivery"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Items:
                </h3>
                {order.isCustomized ? (
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    {order.customImage ? (
                      <img
                        src={order.customImage}
                        alt="Custom design"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {order.items[0].name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.designDescription ||
                          "Custom design as per specifications"}
                      </p>
                      <p className="text-sm font-medium text-gray-800 mt-2">
                        ₹{order.customPrice}
                      </p>
                    </div>
                  </div>
                ) : (

                  <ul className="text-gray-600 text-sm space-y-2">

                    {order.items.map((item, index) => (

                      <li key={index} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        {/* Image */}
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.productImage[0]}
                            alt="Custom design"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          {/* Product Info */}
                          <div>
                            <span className="font-medium text-gray-800">
                              {item.productName} × {item.quantity}
                            </span>
                            {item.size && (
                              <span className="text-xs text-gray-500 ml-2">
                                ({item.size})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <span className="font-medium text-gray-800">
                          ₹{item.productPrice}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Address & Order Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {order.address?.name && (
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        {order.address.name}
                      </p>
                    )}
                    <p className="text-sm text-gray-700">
                      {order.address.street}
                    </p>
                    <p className="text-sm text-gray-700">
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.zipcode}
                    </p>
                    <p className="text-sm text-gray-700">
                      {order.address.country}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      📞 {order.address.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    Order Details
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Customer:</span>
                      <span className="font-medium">
                        {order.address?.name ||
                          (order.isCustomized ? order.items[0]?.name : "N/A")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                      <span>Items:</span>
                      <span className="font-medium">{order.items.length}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                      <span>Payment:</span>
                      <span
                        className={`font-medium ${order.payment ? "text-green-600" : "text-yellow-600"
                          }`}
                      >
                        {order.payment ? "Done" : "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                      <span>Method:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                      <span>Date:</span>
                      <span className="font-medium">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                      <span>Amount:</span>
                      <span className="font-semibold text-gray-900">
                        ₹{order.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <label className="text-sm font-medium text-gray-700">
                    Update Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-800 focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
