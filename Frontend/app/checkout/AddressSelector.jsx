export default function AddressSelector({ show, addresses, formData, onClose, onSelect }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Select Address</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    {addresses.map((address) => (
                        <div
                            key={address._id}
                            className={`p-4 border rounded-xl cursor-pointer hover:border-rose-300 transition-colors ${formData.name === address.name && formData.phone === address.number
                                    ? 'border-rose-500 bg-rose-50'
                                    : 'border-gray-200'
                                }`}
                            onClick={() => onSelect(address)}
                        >
                            <div className="flex justify-between">
                                <h4 className="font-medium text-gray-900">{address.name}</h4>
                                {address.default && (
                                    <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">
                                        Default
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{address.number}</p>
                            <p className="text-gray-600 text-sm mt-1">
                                {address.house}, {address.area}, {address.city}, {address.state} - {address.pincode}
                            </p>
                            {address.landmark && (
                                <p className="text-gray-500 text-xs mt-1">Landmark: {address.landmark}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}