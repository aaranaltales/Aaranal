"use client";
import { useState, useEffect, useRef } from "react";
import {
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiCreditCard,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { RiVipCrownFill } from "react-icons/ri";

export default function UserProfile() {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPaymentId, setEditPaymentId] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newCard, setNewCard] = useState({
    type: "",
    last4: "",
    expiry: "",
  });
  const [newAddress, setNewAddress] = useState({
    type: "",
    doorNo: "",
    pincode: "",
    addressLine1: "",
    address: "",
  });

  const [user, setUser] = useState({
    name: "Sophia Williams",
    email: "sophia.williams@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "March 2023",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b60cb18d?w=200&h=200&fit=crop&crop=faces",
    membership: "Gold",
    orders: 24,
    spent: 3280,
    satisfaction: 4.9,
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Elegance Street, Beverly Hills, CA 90210",
      default: true,
    },
    {
      id: 2,
      type: "Office",
      address: "456 Business Avenue, Los Angeles, CA 90028",
      default: false,
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "Visa",
      last4: "4567",
      expiry: "12/26",
      default: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8901",
      expiry: "08/25",
      default: false,
    },
  ]);

  const [orders] = useState([
    {
      id: "#ORD-2024-001",
      date: "Jan 15, 2024",
      items: 2,
      total: "$485.00",
      status: "Delivered",
    },
    {
      id: "#ORD-2024-002",
      date: "Jan 8, 2024",
      items: 1,
      total: "$185.00",
      status: "Shipped",
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "addresses", label: "Addresses", icon: <FiMapPin /> },
    { id: "payments", label: "Payments", icon: <FiCreditCard /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditPayment = (id) => {
    setEditPaymentId(id);
  };

  const handleSavePayment = (id) => {
    setEditPaymentId(null);
  };

  const handleChangePayment = (id, field, value) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id ? { ...payment, [field]: value } : payment
      )
    );
  };

  const handleEditAddress = (id) => {
    setEditAddressId(id);
  };

  const handleSaveAddress = (id) => {
    setEditAddressId(null);
  };

  const handleChangeAddress = (id, field, value) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id ? { ...address, [field]: value } : address
      )
    );
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id
          ? { ...address, default: true }
          : { ...address, default: false }
      )
    );
  };

  const handleSetDefaultPayment = (id) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === id
          ? { ...payment, default: true }
          : { ...payment, default: false }
      )
    );
  };

  const handleAddCard = () => {
    setShowAddCardForm(true);
  };

  const handleNewCardChange = (field, value) => {
    setNewCard((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmitNewCard = () => {
    const id =
      payments.length > 0 ? Math.max(...payments.map((p) => p.id)) + 1 : 1;
    setPayments((prevPayments) => [
      ...prevPayments,
      { ...newCard, id, default: false },
    ]);
    setShowAddCardForm(false);
    setNewCard({ type: "", last4: "", expiry: "" });
  };

  const handleAddAddress = () => {
    setShowAddAddressForm(true);
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmitNewAddress = () => {
    const id =
      addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      { ...newAddress, id, default: false },
    ]);
    setShowAddAddressForm(false);
    setNewAddress({
      type: "",
      doorNo: "",
      pincode: "",
      addressLine1: "",
      address: "",
    });
  };

  return (
    <div className="bg-white pt-6 sm:pt-0">
      <style jsx global>{`
        @media (max-width: 767px) {
          .text-xl {
            font-size: 1.25rem !important;
          }
          .text-2xl {
            font-size: 1.5rem !important;
          }
          .text-3xl {
            font-size: 1.75rem !important;
          }
          .text-sm {
            font-size: 0.75rem !important;
          }
        }
      `}</style>

      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-16 left-0 w-full z-50">
          <div className="flex justify-between items-center p-4 bg-white/90 backdrop-blur-md shadow-sm border-b border-rose-100">
            <h1 className="text-xl font-medium text-rose-900">My Account</h1>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-rose-700"
            >
              {mobileMenuOpen ? (
                <FiChevronLeft className="w-5 h-5" />
              ) : (
                <FiChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar - Desktop */}
          {!isMobile && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50 h-fit">
                <h2 className="text-xl font-semibold text-gray-900 mb-8">
                  My Account
                </h2>
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-6 py-3 rounded-xl transition-all duration-200 font-medium text-left ${
                        activeSection === item.id
                          ? "bg-rose-100 text-rose-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-4 text-xl">{item.icon}</span>
                      <span className="text-base">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Sidebar - Mobile */}
          {isMobile && (
            <div
              className={`fixed top-[130px] left-0 w-3/4 h-full bg-white/90 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <nav className="space-y-2 p-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg ${
                      activeSection === item.id
                        ? "bg-rose-100 text-rose-700"
                        : "text-gray-600 hover:bg-rose-50"
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {activeSection === "profile" && (
              <div className="space-y-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full p-2 shadow-lg">
                        <RiVipCrownFill className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {user.name}
                      </h2>
                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                        <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-rose-700 shadow-sm">
                          {user.membership} Member
                        </span>
                        <span className="text-sm text-gray-600">
                          Member since {user.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Profile Details */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
    <button
      onClick={editMode ? handleSave : handleEdit}
      className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-1 shadow-md hover:shadow-lg whitespace-nowrap"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
      {editMode ? 'Save' : 'Edit'}
    </button>
  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Full Name
                      </label>
                      <div
                        className={`bg-gray-50 border rounded-xl px-4 py-4 transition-colors ${
                          editMode
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {editMode ? (
                          <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full bg-transparent focus:outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">
                            {user.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address
                      </label>
                      <div
                        className={`bg-gray-50 border rounded-xl px-4 py-4 transition-colors ${
                          editMode
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {editMode ? (
                          <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full bg-transparent focus:outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Phone Number
                      </label>
                      <div
                        className={`bg-gray-50 border rounded-xl px-4 py-4 transition-colors ${
                          editMode
                            ? "border-rose-500 bg-rose-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {editMode ? (
                          <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent focus:outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">
                            {user.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Member Since
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 hover:border-gray-300 transition-colors">
                        <p className="text-gray-900 font-medium">
                          {user.joinDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "addresses" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        Saved Addresses
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Manage your delivery locations
                      </p>
                    </div>
                    <button
                      onClick={handleAddAddress}
                      className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Add New
                    </button>
                  </div>
                </div>
                {showAddAddressForm && (
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Add New Address
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address Type
                        </label>
                        <input
                          type="text"
                          value={newAddress.type}
                          onChange={(e) =>
                            handleNewAddressChange("type", e.target.value)
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Door Number
                        </label>
                        <input
                          type="text"
                          value={newAddress.doorNo || ""}
                          onChange={(e) =>
                            handleNewAddressChange("doorNo", e.target.value)
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={newAddress.pincode || ""}
                          onChange={(e) =>
                            handleNewAddressChange("pincode", e.target.value)
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          value={newAddress.addressLine1 || ""}
                          onChange={(e) =>
                            handleNewAddressChange(
                              "addressLine1",
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          value={newAddress.address}
                          onChange={(e) =>
                            handleNewAddressChange("address", e.target.value)
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSubmitNewAddress}
                        className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setShowAddAddressForm(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`bg-white rounded-lg shadow-sm p-4 border transition-shadow duration-200 ${
                        editAddressId === address.id
                          ? "border-rose-500 bg-rose-50"
                          : "border-gray-100 hover:shadow-md"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          {editAddressId === address.id ? (
                            <>
                              <input
                                type="text"
                                value={address.type}
                                onChange={(e) =>
                                  handleChangeAddress(
                                    address.id,
                                    "type",
                                    e.target.value
                                  )
                                }
                                className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                              />
                              <textarea
                                value={address.address}
                                onChange={(e) =>
                                  handleChangeAddress(
                                    address.id,
                                    "address",
                                    e.target.value
                                  )
                                }
                                className="mt-2 text-gray-600 w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                              />
                            </>
                          ) : (
                            <>
                              <h3 className="font-medium text-gray-900 text-sm">
                                {address.type}
                              </h3>
                              {address.default && (
                                <span className="inline-block bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded mt-1">
                                  Default
                                </span>
                              )}
                              <p className="mt-2 text-gray-600 text-sm">
                                {address.address}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              editAddressId === address.id
                                ? handleSaveAddress(address.id)
                                : handleEditAddress(address.id)
                            }
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            {editAddressId === address.id ? (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {!address.default && editAddressId === null && (
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Set as Default
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "payments" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        Payment Methods
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Secure and encrypted payments
                      </p>
                    </div>
                    <button
                      onClick={handleAddCard}
                      className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Add Card
                    </button>
                  </div>
                </div>
                {showAddCardForm && (
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Add New Card
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Card Type
                        </label>
                        <input
                          type="text"
                          value={newCard.type}
                          onChange={(e) =>
                            handleNewCardChange("type", e.target.value)
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last 4 Digits
                        </label>
                        <input
                          type="text"
                          value={newCard.last4}
                          onChange={(e) =>
                            handleNewCardChange("last4", e.target.value)
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={newCard.expiry}
                          onChange={(e) =>
                            handleNewCardChange("expiry", e.target.value)
                          }
                          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={handleSubmitNewCard}
                        className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setShowAddCardForm(false)}
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className={`bg-white rounded-lg shadow-sm p-4 border transition-shadow duration-200 ${
                        editPaymentId === payment.id
                          ? "border-rose-500 bg-rose-50"
                          : "border-gray-100 hover:shadow-md"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                            <span className="text-xs">
                              {payment.type === "Visa" ? "VISA" : "MC"}
                            </span>
                          </div>
                          <div>
                            {editPaymentId === payment.id ? (
                              <>
                                <input
                                  type="text"
                                  value={payment.type}
                                  onChange={(e) =>
                                    handleChangePayment(
                                      payment.id,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                  className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                                />
                                <input
                                  type="text"
                                  value={payment.last4}
                                  onChange={(e) =>
                                    handleChangePayment(
                                      payment.id,
                                      "last4",
                                      e.target.value
                                    )
                                  }
                                  className="ml-1 font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none text-sm"
                                />
                                <input
                                  type="text"
                                  value={payment.expiry}
                                  onChange={(e) =>
                                    handleChangePayment(
                                      payment.id,
                                      "expiry",
                                      e.target.value
                                    )
                                  }
                                  className="ml-1 text-xs text-gray-500 bg-transparent border-b border-gray-300 focus:outline-none"
                                />
                              </>
                            ) : (
                              <>
                                <h3 className="font-medium text-gray-900 text-sm">
                                  {payment.type} •••• {payment.last4}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  Expires {payment.expiry}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {payment.default && (
                            <span className="bg-rose-100 text-rose-800 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          <button
                            onClick={() =>
                              editPaymentId === payment.id
                                ? handleSavePayment(payment.id)
                                : handleEditPayment(payment.id)
                            }
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            {editPaymentId === payment.id ? (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {!payment.default && editPaymentId === null && (
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => handleSetDefaultPayment(payment.id)}
                            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            Set as Default
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'orders' && (
  <div className="space-y-6">
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Order History</h2>
      <p className="text-gray-600 text-sm">Track and manage your purchases</p>
    </div>
    <div className="space-y-4">
      {orders.map((order) => (
        <div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{order.id}</h3>
                <p className="text-xs text-gray-500 mt-1">Placed on {order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 text-sm">{order.total}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
            {activeSection === "settings" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Account Settings
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Customize your experience
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          Email Updates
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Order updates and promotions
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
                      </label>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          SMS Alerts
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Shipping and delivery updates
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
