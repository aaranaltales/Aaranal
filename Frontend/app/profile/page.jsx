"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserProfile from "./useUserProfile";
import { useUser } from "@/context/UserContext";
import {
  Edit2,
  Save,
  X,
  Plus,
  User,
  Mail,
  Home,
  Building,
  MapIcon,
  Package,
  Truck,
  Calendar,
  ShoppingBag,
  Eye,
  Camera,
  Upload,
} from "lucide-react";

export default function ProfilePage() {
  const {
    user,
    handleProfileUpdate,
    handleAddAddress,
    handleNewAddressChange,
    handleSubmitNewAddress,
    handleEditAddress,
    handleChangeAddress,
    handleSubmitEditAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
    newAddress,
    showAddAddressForm,
    setShowAddAddressForm,
    editAddressId,
    handleUploadAvatar,
  } = useUserProfile();

  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentEditingAddress, setCurrentEditingAddress] = useState(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
      setAvatarPreview(user.avatar || "");
    }
  }, [user]);

  const dbUri = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { token } = useUser();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.post(
          `${dbUri}/api/order/userorders`,
          { userId: user?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          const orders = response.data.orders;
          const sortedOrders = response.data.orders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
          setRecentOrders(sortedOrders);
          setAllOrders(orders);
        }
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };
    if (user?._id) {
      fetchRecentOrders();
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
    }
  }, [user?.addresses]);

  const handleEditAddressLocal = (address) => {
    setCurrentEditingAddress({ ...address });
    setIsEditingAddress(true);
  };

  const handleCancelEdit = () => {
    setIsAddingNew(false);
    setShowAddAddressForm(false);
    setIsEditingAddress(false);
    setCurrentEditingAddress(null);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    let avatarUrl = profileData.avatar;

    if (avatarFile) {
      avatarUrl = await handleUploadAvatar(avatarFile);
    }
    setIsEditingProfile(false);
    await handleProfileUpdate(profileData.name, profileData.email, avatarUrl);
    setAvatarFile(null);
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
    });
    setAvatarPreview(user?.avatar || "");
    setAvatarFile(null);
  };

  const handleEditAddressChange = (field, value) => {
    setCurrentEditingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEditAddress = async () => {
    await handleSubmitEditAddress(currentEditingAddress);
    setIsEditingAddress(false);
    setCurrentEditingAddress(null);
  };

  const handleDeleteAddressLocal = async (addressId) => {
    await handleDeleteAddress(addressId);
  };

  const handleSetDefaultAddressLocal = async (addressId) => {
    await handleSetDefaultAddress(addressId);
  };

  const handleSubmitNewAddressLocal = async () => {
    await handleSubmitNewAddress();
    setIsAddingNew(false);
    setShowAddAddressForm(false);
  };

  const navigateToOrder = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Order Placed":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "Home":
        return <Home className="w-4 h-4" />;
      case "Work":
        return <Building className="w-4 h-4" />;
      default:
        return <MapIcon className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Add Address Modal */}
      {showAddAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New Address</h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                <select
                  value={newAddress.type}
                  onChange={(e) => handleNewAddressChange("type", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={newAddress.name}
                  onChange={(e) => handleNewAddressChange("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={newAddress.number}
                  onChange={(e) => handleNewAddressChange("number", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => handleNewAddressChange("pincode", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="House No./Building Name"
                  value={newAddress.house}
                  onChange={(e) => handleNewAddressChange("house", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Area/Street"
                  value={newAddress.area}
                  onChange={(e) => handleNewAddressChange("area", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => handleNewAddressChange("city", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => handleNewAddressChange("state", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  value={newAddress.landmark}
                  onChange={(e) => handleNewAddressChange("landmark", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitNewAddressLocal}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all"
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {isEditingAddress && currentEditingAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit Address</h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                <select
                  value={currentEditingAddress.type}
                  onChange={(e) => handleEditAddressChange("type", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={currentEditingAddress.name}
                  onChange={(e) => handleEditAddressChange("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={currentEditingAddress.number}
                  onChange={(e) => handleEditAddressChange("number", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={currentEditingAddress.pincode}
                  onChange={(e) => handleEditAddressChange("pincode", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="House No./Building Name"
                  value={currentEditingAddress.house}
                  onChange={(e) => handleEditAddressChange("house", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Area/Street"
                  value={currentEditingAddress.area}
                  onChange={(e) => handleEditAddressChange("area", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={currentEditingAddress.city}
                    onChange={(e) => handleEditAddressChange("city", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={currentEditingAddress.state}
                    onChange={(e) => handleEditAddressChange("state", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  value={currentEditingAddress.landmark}
                  onChange={(e) => handleEditAddressChange("landmark", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditAddress}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
                {(avatarPreview || (profileData.avatar && profileData.avatar.trim() !== '')) ? (
                  <img
                    src={avatarPreview || profileData.avatar}
                    alt=""
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center ${(avatarPreview || (profileData.avatar && profileData.avatar.trim() !== '')) ? 'hidden' : 'flex'}`}>
                  <User className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>
              </div>
              {isEditingProfile && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-black bg-opacity-50 flex items-center justify-center transition-all duration-200"
                  >
                    <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </>
              )}
              {!isEditingProfile && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex-1 w-full">
              {isEditingProfile ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="text-lg md:text-xl font-semibold text-gray-900 bg-transparent border-b-2 border-rose-300 focus:border-rose-500 focus:outline-none transition-colors w-full max-w-md"
                  />
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    <span className="text-sm text-gray-400">
                      {profileData.email} (Email cannot be changed)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl md:rounded-2xl hover:from-rose-700 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2 shadow-lg text-sm md:text-base"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelProfileEdit}
                      className="px-4 py-2 md:px-6 md:py-2.5 rounded-xl md:rounded-2xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center space-x-2 text-sm md:text-base"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div>
                    <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                      {profileData.name}
                    </h1>
                    <div className="flex items-center space-x-1 text-gray-600 mb-4">
                      <Mail className="w-5 h-5 text-rose-600" />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
                        <Package className="w-4 h-4 text-rose-600" />
                        <span className="text-sm font-medium text-rose-700">
                          {allOrders.length} Orders
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
                        <Home className="w-4 h-4 text-rose-600" />
                        <span className="text-sm font-medium text-rose-700">
                          {addresses.length} Addresses
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Edit button */}
            {!isEditingProfile && (
              <button
                onClick={handleEditProfile}
                className="p-2 md:p-3 rounded-xl md:rounded-2xl hover:bg-gray-50 transition-colors border border-gray-200 hover:border-gray-300 absolute top-4 right-4"
              >
                <Edit2 className="w-5 h-5 text-rose-600" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Saved Addresses */}
          <div className="lg:col-span-2 col-span-1">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <Home className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Addresses
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">Manage delivery locations</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAddingNew(true);
                    setShowAddAddressForm(true);
                  }}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-2 rounded-xl md:rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
                >
                  <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-2 md:space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                {addresses.length === 0 ? (
                  <div className="text-center py-6 md:py-8">
                    <p className="text-gray-500 text-sm md:text-base">No saved addresses</p>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <div
                      key={address._id}
                      className="group border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 hover:border-rose-300 hover:bg-rose-50 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <div className="flex-1 w-full md:w-auto mb-3 md:mb-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-flex items-center space-x-1.5 px-2 py-1 md:px-2.5 md:py-1 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg group-hover:border-rose-300">
                              {getAddressIcon(address.type)}
                              <span className="text-xs">{address.type}</span>
                            </span>
                            {address.default && (
                              <span className="inline-flex items-center space-x-1.5 px-2 py-1 md:px-2.5 md:py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-lg">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {address.name}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600 mb-1">
                            {address.house}, {address.area}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600 mb-1">
                            {address.city}, {address.state} {address.pincode}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                            Phone: {address.number}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1.5 md:space-x-2">
                          {!address.default && (
                            <button
                              onClick={() => handleSetDefaultAddressLocal(address._id)}
                              className="text-xs text-rose-600 hover:text-rose-800"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => handleEditAddressLocal(address)}
                            className="p-1.5 md:p-2 rounded-lg hover:bg-white transition-all opacity-100"
                          >
                            <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-rose-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddressLocal(address._id)}
                            className="p-1.5 md:p-2 rounded-lg hover:bg-white transition-all opacity-100"
                          >
                            <X className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-3 col-span-1">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <Package className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                      Recent Orders
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">Track your recent purchases</p>
                  </div>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                {recentOrders.length === 0 ? (
                  <div className="text-center py-6 md:py-8">
                    <p className="text-gray-500 text-sm md:text-base">No recent orders found.</p>
                  </div>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order._id}
                      onClick={() => navigateToOrder(order._id)}
                      className="group cursor-pointer border border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4 hover:border-rose-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                          <img
                            src={
                              order.image ||
                              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80"
                            }
                            alt={order.items[0]?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                                {"ORD-" + order._id.toString().slice(-6)}
                              </h3>
                              <p className="text-xs text-gray-500 truncate">
                                {order.items[0]?.name}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 md:px-2.5 md:py-1 text-xs font-medium rounded-lg border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-xs text-gray-600 mb-2 md:mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(order.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ShoppingBag className="w-3 h-3" />
                              <span>{order.items.length} items</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-gray-900">
                                ₹{order.amount}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Truck className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {order.status === "Delivered"
                                  ? "Delivered successfully"
                                  : "On the way"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-rose-600 group-hover:text-rose-700">
                              <Eye className="w-3 h-3" />
                              <span className="text-xs font-medium">View</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #fda4af;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #fb7185;
        }
        .scrollbar-thumb-rose-300::-webkit-scrollbar-thumb {
          background: #fda4af;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background: #d1d5db;
        }
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .scrollbar-thumb-rounded-full::-webkit-scrollbar-thumb {
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
