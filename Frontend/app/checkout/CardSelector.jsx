'use client';

export default function CardSelector({ show, cards, paymentData, onClose, onSelect }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Select Payment Method</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg">
                        &times;
                    </button>
                </div>
                <div className="space-y-3">
                    {cards?.map(card => (
                        <div
                            key={card._id}
                            onClick={() => onSelect(card)}
                            className={`p-4 border rounded-xl cursor-pointer hover:bg-rose-50 ${
                                paymentData._id === card._id ? 'border-rose-400 bg-rose-50' : 'border-gray-200'
                            }`}
                        >
                            <div className="flex justify-between flex-wrap gap-2">
                                <span className="font-medium">{card.type}</span>
                                <span>•••• •••• •••• {card.last4}</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                Expires {card.expiry}
                            </div>
                            {card.default && (
                                <span className="inline-block mt-2 px-2 py-1 text-xs bg-rose-100 text-rose-800 rounded">
                                    Default
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 w-full py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors text-sm sm:text-base"
                >
                    Use Selected Card
                </button>
            </div>
        </div>
    );
}
