'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
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
      toast.error(err.message);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      toast.success('Status Updated');
      fetchOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-light mb-8">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white"
            >
              {/* Items */}
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-800 mb-2">Items:</h2>
                <ul className="text-gray-600 text-sm space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.quantity} <span className="text-xs text-gray-500">({item.size})</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Address & Customer Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <h3 className="text-sm font-medium text-gray-800">Shipping Address</h3>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country} -{' '}
                    {order.address.zipcode}
                  </p>
                  <p>📞 {order.address.phone}</p>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Items:</span> {order.items.length}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{' '}
                    {order.payment ? 'Done' : 'Pending'}
                  </p>
                  <p>
                    <span className="font-medium">Method:</span> {order.payMethod}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span>{' '}
                    <span className="text-gray-900 font-semibold">${order.amount}</span>
                  </p>
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mt-4">
                <label className="text-sm font-medium text-gray-700">Update Status:</label>
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
          ))}
        </div>
      )}
    </div>
  );
}
