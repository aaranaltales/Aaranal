export default function PaymentStep() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Information</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                <input
                    type="text"
                    name="cardNumber"
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                    placeholder="1234 5678 9012 3456"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                    <input
                        type="text"
                        name="expiryDate"
                        className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                        placeholder="MM/YY"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                    <input
                        type="text"
                        name="cvv"
                        className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                        placeholder="123"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                <input
                    type="text"
                    name="cardName"
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                    required
                />
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100">
                <div className="flex items-center space-x-3 mb-3">
                    <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center text-green-600"></i>
                    <span className="font-semibold text-gray-900">Secure Payment</span>
                </div>
                <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure. We never store your card details.
                </p>
            </div>
        </div>
    );
}