import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function UserProfileHeader({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="flex justify-between items-center p-4 px-6 bg-white/90 backdrop-blur-md shadow-sm border-b border-rose-100">
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
  );
}
