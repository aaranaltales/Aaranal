"use client"
// admin/CustomizationsPage.jsx
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function CustomizationsPage() {
  const [customizations, setCustomizations] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    house: '',      // Required by schema
    area: '',       // Required by schema
    street: '',     // Optional
    city: '',       // Required by schema
    state: '',      // Required by schema
    country: 'India', // Default value
    pincode: '',    // Required by schema (renamed from zipcode)
    phone: '',      // Required by schema
    paymentMethod: 'COD',
    customImage: null,
    customPrice: '',
  });
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  // Fetch all customizations
  const fetchCustomizations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin/login');
        return;
      }
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customization/list`,
        { headers: { token } }
      );
      if (res.data.success) {
        setCustomizations(res.data.customizations);
      } else {
        toast.error(res.data.message);
        if (res.data.message === 'Not authorized' || res.data.message === 'Invalid token') {
          localStorage.removeItem('token');
          router.push('/admin/login');
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/admin/login');
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'customImage' && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Reset form data when expanding a new customization
  const handleExpand = (customizationId) => {
    if (expandedId === customizationId) {
      setExpandedId(null);
    } else {
      setExpandedId(customizationId);
      // Reset form when opening a new customization
      const customization = customizations.find(c => c._id === customizationId);
      setFormData({
        name: customization?.name || '',
        house: '',      // Reset required fields
        area: '',       // Reset required fields
        street: '',
        city: '',
        state: '',
        country: 'India',
        pincode: '',    // Reset required fields
        phone: customization?.phone || '',
        paymentMethod: 'COD',
        customImage: null,
        customPrice: '',
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Place order
const handlePlaceOrder = async (customization) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Validate required fields
    const requiredFields = ['name', 'house', 'area', 'city', 'state', 'pincode', 'phone', 'customPrice'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const submissionData = new FormData();
    submissionData.append('customizationId', customization._id);
    submissionData.append('userId', customization.userId);

    // Append address fields with ALL required fields
    // Map 'phone' to 'number' for the backend
    submissionData.append('address', JSON.stringify({
      name: formData.name || customization.name,
      house: formData.house,
      area: formData.area,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      number: formData.phone || customization.phone, // Map 'phone' to 'number'
    }));

    submissionData.append('paymentMethod', formData.paymentMethod);
    submissionData.append('customPrice', formData.customPrice);

    // Append the image file if it exists
    if (fileInputRef.current?.files[0]) {
      submissionData.append('customImage', fileInputRef.current.files[0]);
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customization/convert`,
      submissionData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      }
    );

    if (res.data.success) {
      toast.success('Order placed successfully!');
      setExpandedId(null);
      fetchCustomizations(); // Refresh customizations list
      // Add this line to refresh orders list if you're on the orders page
      if (typeof window !== 'undefined' && window.location.pathname.includes('orders')) {
        window.location.reload(); // Force refresh to see the new order
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.message || err.message || 'Failed to place order');
    console.error('Error placing order:', err);
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      router.push('/admin/login');
    }
  }
};

  useEffect(() => {
    fetchCustomizations();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h1 className="text-3xl font-light mb-8">Customizations</h1>
      {customizations.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No customizations yet.</p>
      ) : (
        <div className="space-y-6">
          {customizations.map((customization) => (
            <div key={customization._id} className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-800 mb-2">Customization Request</h2>
                <p><strong>Name:</strong> {customization.name}</p>
                <p><strong>Email:</strong> {customization.email}</p>
                <p><strong>Phone:</strong> {customization.phone}</p>
                <p><strong>Type of Bag:</strong> {customization.type_of_bag}</p>
                <p><strong>Design Description:</strong> {customization.design_description}</p>
                <p><strong>Interest:</strong> {customization.interest}</p>
                {customization.status === 'Converted to Order' && (
                  <p className="mt-2 text-green-600 font-medium">Order Placed</p>
                )}
              </div>
              {customization.status !== 'Converted to Order' && (
                <button
                  type="button"
                  onClick={() => handleExpand(customization._id)}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-xl hover:from-rose-700 hover:to-pink-600 transition-all"
                >
                  {expandedId === customization._id ? 'Cancel' : 'Place Order'}
                </button>
              )}
              {expandedId === customization._id && (
                <div className="mt-6 p-4 border-t border-gray-100 pt-4 transition-all duration-300 ease-in-out">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Order Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                        placeholder={customization.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">House No. *</label>
                      <input
                        type="text"
                        name="house"
                        value={formData.house}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area/Locality *</label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                      <input
                        type="number"
                        name="customPrice"
                        value={formData.customPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                      >
                        <option value="COD">Cash on Delivery</option>
                        <option value="Stripe">Stripe</option>
                        <option value="Razorpay">Razorpay</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                      <input
                        type="file"
                        name="customImage"
                        ref={fileInputRef}
                        onChange={handleInputChange}
                        accept="image/*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400"
                      />
                      {formData.customImage && (
                        <div className="mt-2">
                          <img
                            src={formData.customImage}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedId(null)}
                      className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePlaceOrder(customization)}
                      className="px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-xl hover:from-rose-700 hover:to-pink-600 transition-all"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
