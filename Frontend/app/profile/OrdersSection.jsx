export default function OrdersSection({ orders }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Order History</h2>
        <p className="text-gray-600 text-sm">Track and manage your purchases</p>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id}>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    {order.id}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">
                    {order.total}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
