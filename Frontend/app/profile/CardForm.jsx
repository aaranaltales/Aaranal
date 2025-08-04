export default function CardForm({ card, onChange, onSubmit, onCancel, submitLabel = "Submit" }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {submitLabel} Card
            </h3>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Type
                    </label>
                    <input
                        type="text"
                        value={card.type}
                        onChange={(e) => onChange("type", e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last 4 Digits
                    </label>
                    <input
                        type="text"
                        value={card.last4}
                        onChange={(e) => onChange("last4", e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                    </label>
                    <input
                        type="text"
                        value={card.expiry}
                        onChange={(e) => onChange("expiry", e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                    />
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <button
                    onClick={onSubmit}
                    className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    {submitLabel}
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
