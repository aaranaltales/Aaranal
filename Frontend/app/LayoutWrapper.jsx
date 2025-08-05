'use client';

import { usePathname } from 'next/navigation';
import Context from '@/context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const hideLayout = pathname.startsWith('/auth');

    return (
        <div className="min-h-screen">
            <Context>
                {!hideLayout && <Header />}
                {children}
                <ToastContainer />
                {!hideLayout && <Footer />}
            </Context>
        </div>
    );
}
