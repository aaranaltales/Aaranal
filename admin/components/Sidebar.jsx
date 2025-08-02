'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlusCircle, List, PackageSearch, ChartLine, LogIn, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/login');
  };

  const navItems = [
    { href: '/', label: 'Dashboard', icon: <ChartLine className="w-5 h-5" /> },
    { href: '/add-product', label: 'Add Product', icon: <PlusCircle className="w-5 h-5" /> },
    { href: '/products', label: 'Product List', icon: <List className="w-5 h-5" /> },
    { href: '/orders', label: 'Orders', icon: <PackageSearch className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 fixed top-20 left-0 bottom-0 z-40 bg-white border-r border-gray-200 px-4 py-6 shadow-md">
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all text-gray-700 font-light ${pathname === href
                ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700'
                : 'hover:bg-gray-100'
              }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile-specific auth actions */}
      <div className="mt-8 md:hidden border-t pt-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-left bg-red-50 hover:bg-red-100 text-red-600 font-medium transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-left bg-green-50 hover:bg-green-100 text-green-600 font-medium transition"
          >
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
