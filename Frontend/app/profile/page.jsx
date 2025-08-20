"use client";
import { useState, useEffect } from "react";
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
    editAddressId
  } = useUserProfile();
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
      });
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
          const sortedOrders = response.data.orders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
          setRecentOrders(sortedOrders);
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
    handleEditAddress(address._id)
    setIsAddingNew(false);
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
    setIsAddingNew(false);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    handleProfileUpdate(profileData.name, profileData.email)
  };

  const handleCancelProfileEdit = () => {
    setIsEditingProfile(false);
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
    });
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
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
                    className="text-2xl md:text-3xl font-light text-gray-900 bg-transparent border-b-2 border-rose-300 focus:border-rose-500 focus:outline-none transition-colors w-full max-w-md"
                  />
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="text-base md:text-lg text-gray-600 bg-transparent border-b border-gray-300 focus:border-rose-500 focus:outline-none transition-colors w-full"
                    />
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
                          {recentOrders.length} Orders
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
            {/* Edit button - Top-right corner for both mobile and desktop */}
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
          {/* Saved Addresses - Full width on mobile */}
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
              <div className="max-h-80 overflow-y-auto space-y-2 md:space-y-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100">
                {/* New Address Form */}
                {isAddingNew && showAddAddressForm && (
                  <div className="border-2 border-dashed border-rose-200 rounded-xl md:rounded-2xl p-3 md:p-4 bg-rose-50">
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">
                      New Address
                    </h3>
                    <div className="space-y-2 md:space-y-3">
                      <select
                        value={newAddress.type}
                        onChange={(e) =>
                          handleNewAddressChange("type", e.target.value)
                        }
                        className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) =>
                          handleNewAddressChange("name", e.target.value)
                        }
                        className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Mobile Number"
                        value={newAddress.number}
                        onChange={(e) =>
                          handleNewAddressChange("number", e.target.value)
                        }
                        className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={(e) =>
                          handleNewAddressChange("pincode", e.target.value)
                        }
                        className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="House No./Building Name"
                        value={newAddress.house}
                        onChange={(e) =>
                          handleNewAddressChange("house", e.target.value)
                        }
                        className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Area/Street"
                        value={newAddress.area}
                        onChange={(e) =>
                          handleNewAddressChange("area", e.target.value)
                        }
                        className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddress.city}
                          onChange={(e) =>
                            handleNewAddressChange("city", e.target.value)
                          }
                          className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={newAddress.state}
                          onChange={(e) =>
                            handleNewAddressChange("state", e.target.value)
                          }
                          className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Landmark (Optional)"
                        value={newAddress.landmark}
                        onChange={(e) =>
                          handleNewAddressChange("landmark", e.target.value)
                        }
                        className="w-full px-2.5 py-2 md:px-3 md:py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-3 md:mt-4">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-gray-300 hover:border-gray-400 transition-all text-xs md:text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          handleSubmitNewAddress();
                          setIsAddingNew(false);
                          setShowAddAddressForm(false);
                        }}
                        className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl hover:from-rose-600 hover:to-pink-700 transition-all text-xs md:text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
                {/* Address List or No Addresses Message */}
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
                      {editAddressId === address._id ? (
                        <div className="space-y-2 md:space-y-3">
                          <select
                            value={address.type}
                            onChange={(e) =>
                              handleChangeAddress(
                                address._id,
                                "type",
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={address.name}
                            onChange={(e) =>
                              handleChangeAddress(
                                address._id,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Mobile Number"
                            value={address.number}
                            onChange={(e) =>
                              handleChangeAddress(
                                address._id,
                                "number",
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={address.pincode}
                            onChange={(e) =>
                              handleChangeAddress(
                                address._id,
                                "pincode",
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                          />
                          <input
                            type="text"
                            placeholder="House No./Building Name"
                            value={address.house}
                            onChange={(e) =>
                              handleChangeAddress(
                                address._id,
                                "house",
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Area/Street"
                            value={address.area}
                            onChange={(e) =>
                              handleChangeAddress(
                                address._id,
                                "area",
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="City"
                              value={address.city}
                              onChange={(e) =>
                                handleChangeAddress(
                                  address._id,
                                  "city",
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                            />
                            <input
                              type="text"
                              placeholder="State"
                              value={address.state}
                              onChange={(e) =>
                                handleChangeAddress(
                                  address._id,
                                  "state",
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Landmark (Optional)"
                            value={address.landmark}
                            onChange={(e) =>
                              handleChangeAddress(
                                address._id,
                                "landmark",
                                e.target.value
                              )
                            }
                            className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-xl border border-gray-200 focus:border-rose-500 focus:outline-none transition-colors text-xs md:text-sm"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={handleCancelEdit}
                              className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg border border-gray-300 hover:border-gray-400 transition-all text-xs md:text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSubmitEditAddress(address)}
                              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all text-xs md:text-sm"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
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
                                onClick={() => handleSetDefaultAddress(address._id)}
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
                              onClick={() => handleDeleteAddress(address._id)}
                              className="p-1.5 md:p-2 rounded-lg hover:bg-white transition-all opacity-100"
                            >
                              <X className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {/* Recent Orders - Full width on mobile */}
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
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs md:text-sm text-gray-500">Live updates</span>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-3 md:space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100">
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
    </div>
  );
}
