'use client';

import { useCheckoutContext } from '@/context/CheckoutContext';
import AddressSelector from './AddressSelector';



export default function ShippingStep({
    addresses,
    formData,
    setFormData,
    showAddressSelector,
    setShowAddressSelector,
    selectAddress,
    handleChange,
}) {
    const { shipping } = useCheckoutContext();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Shipping Address</h2>
                {addresses?.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setShowAddressSelector(true)}
                        className="text-rose-600 hover:text-rose-700 text-sm font-medium"
                    >
                        Choose another address
                    </button>
                )}
            </div>

            <AddressSelector
                show={showAddressSelector}
                addresses={addresses}
                formData={formData}
                onClose={() => setShowAddressSelector(false)}
                onSelect={selectAddress}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                        type="tel"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flat, House no., Building, Company, Apartment *</label>
                <input
                    type="text"
                    name="house"
                    value={formData.house}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area, Street, Sector, Village *</label>
                <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Landmark (Optional)</label>
                <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Town / City *</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Shipping Method</h3>
                <div className="space-y-3">
                    <label className="flex items-center p-4 bg-rose-50 rounded-2xl border border-rose-200 cursor-pointer hover:bg-rose-100 transition-colors">
                        <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={formData.shippingMethod === 'standard'}
                            onChange={handleChange}
                            className="w-4 h-4 text-rose-600 border-rose-300"
                        />
                        <div className="ml-3 flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">Standard Shipping</span>
                                <span className="text-gray-600">{((shipping > 0) && (shipping < 45))? '₹'+shipping: 'Free'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">10-12 business days</p>
                                <span className="text-gray-600 text-xs">{((shipping > 0) && (shipping < 45))? 'Orders below ₹300 are are not eligible for free delivery' : ''}</span>
                            </div>
                            
                        </div>
                    </label>
                    <label className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={formData.shippingMethod === 'express'}
                            onChange={handleChange}
                            className="w-4 h-4 text-rose-600 border-rose-300"
                        />
                        <div className="ml-3 flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">Express Shipping</span>
                                <span className="text-gray-600">₹45</span>
                            </div>
                            <p className="text-sm text-gray-500">5-7 business days</p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleChange}
                    className="w-4 h-4 text-rose-600 border-rose-300 rounded focus:ring-rose-300"
                />
                <label className="ml-3 text-sm text-gray-600">
                    Save this address for future purchases
                </label>
            </div>
        </div>
    );
}