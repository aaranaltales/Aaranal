import { FiUser, FiShoppingBag, FiMapPin, FiCreditCard, FiSettings } from "react-icons/fi";

export default function Navbar({ activeSection, setActiveSection }) {
  const navItems = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "addresses", label: "Addresses", icon: <FiMapPin /> },
    { id: "payments", label: "Payments", icon: <FiCreditCard /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50 h-fit">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">My Account</h2>
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
  );
}
