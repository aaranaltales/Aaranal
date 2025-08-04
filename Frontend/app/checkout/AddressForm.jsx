'use client';

import { useState } from 'react';

export default function AddressForm({ show, onClose, onSubmit }) {
    const [addressData, setAddressData] = useState({
        type: 'home',
        name: '',
        number: '',
        house: '',
        area: '',
        landmark: '',
        city: '',
        pincode: '',
        state: '',
        default: false
    });

    const handleChange = (field) => (e) => {
        setAddressData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(addressData);
    };

    if (!show) return null;

    const fields = [
        { label: "Address Type", field: "type" },
        { label: "Full Name", field: "name" },
        { label: "Mobile Number", field: "number", type: "number" },
        { label: "Flat, House no., Building, Company, Apartment", field: "house" },
        { label: "Area, Street, Sector, Village", field: "area" },
        { label: "Landmark", field: "landmark" },
        { label: "Town / City", field: "city" },
        { label: "Pincode", field: "pincode" },
        { label: "State", field: "state" },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Add New Address</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    {fields.map(({ label, field, type = "text" }) => (
                        <div key={field}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                            <input
                                type={type}
                                value={addressData[field] || ""}
                                onChange={handleChange(field)}
                                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                            />
                        </div>
                    ))}

                    <div className="flex gap-2 mt-4">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}