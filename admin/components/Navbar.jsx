'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* AARANAL Brand Text */}
          <div className="text-3xl font-pacifico bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent hover:from-rose-700 hover:to-pink-600 transition-all duration-300">
            AARANAL
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
