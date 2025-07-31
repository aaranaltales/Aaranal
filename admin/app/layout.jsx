'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <head>
        <title>Admin Panel</title>
        <meta
          name="description"
          content="Admin dashboard for managing products and orders"
        />
      </head>
      <body className="bg-white text-gray-900 font-light">
        {isLoginPage ? (
          children
        ) : (
          <>
            {/* Full-width Top Navbar */}
            <Navbar />

            <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
              {/* Fixed Sidebar beneath Navbar */}
              <Sidebar />

              {/* Main Content beside Sidebar */}
              <main className="ml-64 flex-1 overflow-y-auto px-6 py-8">
                {children}
              </main>
            </div>
          </>
        )}
      </body>
    </html>
  );
}
