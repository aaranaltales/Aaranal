import { FiUser, FiShoppingBag, FiMapPin, FiCreditCard, FiSettings } from "react-icons/fi";

export default function MobileNavbar({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }) {
  const navItems = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "addresses", label: "Addresses", icon: <FiMapPin /> },
    { id: "payments", label: "Payments", icon: <FiCreditCard /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
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
  );
}
