'use client';

const orderItems = [
  {
    id: '1',
    name: "Blue Floral Tote",
    price: 295,
    image:"assests/blue_floral_bag.jpg",
    quantity: 1,
    color: "#800020"
  },
  {
    id: '2',
    name: "Butterfly Tote",
    price: 185,
    image: "assests/butterfly_bag.jpg",
    quantity: 1,
    color: "#800020"
  },
  {
    id: '3',
    name: "Flowers Tote (Hand-Painted)",
    price: 125,
    image: "assests/flowers_handpainted_bag.jpg",
    quantity: 1,
    color: "#800020"
  }
];

export default function OrderSummary() {
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 25;
  const tax = Math.round(subtotal * 0.21);
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gradient-to-br from-white to-rose-50/50 rounded-3xl shadow-xl p-8 border border-rose-100 sticky top-24">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-6 mb-8">
        {orderItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-rose-50 flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Color: {item.color}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                <span className="font-semibold text-gray-900">${item.price * item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-rose-200 pt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">${shipping}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (21%)</span>
          <span className="font-medium text-gray-900">${tax}</span>
        </div>
        <div className="border-t border-rose-200 pt-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900 text-lg">Total</span>
            <span className="font-semibold text-2xl bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">${total}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-2xl">
          <div className="flex items-center space-x-3">
            <i className="ri-truck-line w-5 h-5 flex items-center justify-center text-rose-600"></i>
            <div>
              <p className="font-medium text-gray-900 text-sm">Free Returns</p>
              <p className="text-xs text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-4 rounded-2xl">
          <div className="flex items-center space-x-3">
            <i className="ri-award-line w-5 h-5 flex items-center justify-center text-rose-600"></i>
            <div>
              <p className="font-medium text-gray-900 text-sm">Lifetime Warranty</p>
              <p className="text-xs text-gray-600">Craftsmanship guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}