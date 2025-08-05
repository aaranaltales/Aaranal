'use client';

import CardSelector from './CardSelector';

export default function PaymentStep({
    paymentMethods,
    paymentData,
    setPaymentData,
    showCardSelector,
    setShowCardSelector,
    selectCard,
    handleCardChange,
}) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>
                {paymentMethods?.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setShowCardSelector(true)}
                        className="text-rose-600 hover:text-rose-700 text-sm font-medium"
                    >
                        Choose another card
                    </button>
                )}
            </div>

            <CardSelector
                show={showCardSelector}
                cards={paymentMethods}
                paymentData={paymentData}
                onClose={() => setShowCardSelector(false)}
                onSelect={selectCard}
            />

            {paymentMethods?.length === 0 || !paymentData.type ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={paymentData.cardNumber}
                                onChange={handleCardChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                            <input
                                type="text"
                                name="holderName"
                                value={paymentData.holderName}
                                onChange={handleCardChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                            <input
                                type="text"
                                name="expiry"
                                value={paymentData.expiry}
                                onChange={handleCardChange}
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                            <input
                                type="text"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handleCardChange}
                                placeholder="123"
                                className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                                required
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 border border-rose-200 bg-rose-50 rounded-xl">
                    <div className="flex justify-between">
                        <span className="font-medium">{paymentData.type}</span>
                        <span>•••• •••• •••• {paymentData.last4}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                        Expires {paymentData.expiry}
                    </div>
                </div>
            )}

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="savePayment"
                    checked={paymentData.savePayment}
                    onChange={handleCardChange}
                    className="w-4 h-4 text-rose-600 border-rose-300 rounded focus:ring-rose-300"
                />
                <label className="ml-3 text-sm text-gray-600">
                    Save this card for future purchases
                </label>
            </div>
        </div>
    );
}