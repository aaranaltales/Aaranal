'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusCircle, List, PackageSearch } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
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
            className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all text-gray-700 font-light ${
              pathname === href
                ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
