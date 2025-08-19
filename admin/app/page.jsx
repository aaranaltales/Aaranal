"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    topProduct: "N/A",
    recentOrders: [],
  });
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch products
      const productsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/list`
      );
      const products = productsRes.data.products || [];
      setProducts(products);
      const topProduct = products[0]?.name || "N/A";

      // Fetch orders
      const ordersRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/list`,
        {},
        { headers: { token } }
      );
      let orders = ordersRes.data.orders || [];

      // ✅ Filter only paid orders
      orders = orders.filter((o) => o.payment === true);

      // ✅ Calculate revenue only from paid orders
      const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

      // ✅ Enrich orders with product info
      const enrichedOrders = orders.map((order) => {
        const enrichedItems = order.items.map((item) => {
          const product = products.find(
            (p) => String(p._id) === String(item.productId)
          );
          return {
            ...item,
            productName: product?.name || "Unknown Product",
            productPrice: product?.price || 0,
            productImage: product?.image || [],
          };
        });
        return { ...order, items: enrichedItems };
      });

      setSummary({
        totalOrders: orders.length, // ✅ paid orders only
        totalRevenue,
        totalProducts: products.length,
        topProduct,
        recentOrders: enrichedOrders.slice(0, 5), // ✅ latest paid orders only
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl px-4 mx-auto py-6 sm:py-10">
      <ToastContainer />
      <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <Card title="Total Orders" value={summary.totalOrders} icon="🛍" />
        <Card
          title="Total Revenue"
          value={`₹${summary.totalRevenue}`}
          icon="💰"
        />
        <Card title="Total Products" value={summary.totalProducts} icon="📦" />
        <Card title="Top Product" value={summary.topProduct} icon="⭐" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-medium mb-4 text-gray-700">
          Recent Orders
        </h2>

        {summary.recentOrders.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent paid orders found.</p>
        ) : (
          <ul className="space-y-4 text-sm text-gray-700 min-w-[300px]">
            {summary.recentOrders.map((order) => (
              <li
                key={order._id}
                className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 items-start sm:items-center border-b border-gray-100 pb-2"
              >
                {/* Show multiple items */}
                <div className="flex flex-col">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="font-medium">
                      {item.productName} × {item.quantity}
                    </span>
                  ))}
                </div>

                <span className="text-gray-500 text-xs">
                  {new Date(order.date).toLocaleDateString()}
                </span>

                <span className="font-semibold text-gray-800">
                  ₹{order.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-xl sm:text-2xl font-semibold text-gray-900">
        {value}
      </div>
    </div>
  );
}
