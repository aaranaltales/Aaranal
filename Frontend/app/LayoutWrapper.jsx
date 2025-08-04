'use client';

import { usePathname } from 'next/navigation';
import { UserProvider } from '@/context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const hideLayout = pathname.startsWith('/auth');

    return (
        <div className="min-h-screen">
            <UserProvider>
                {!hideLayout && <Header />}
                {children}
                <ToastContainer />
                {!hideLayout && <Footer />}
            </UserProvider>
        </div>
    );
}
