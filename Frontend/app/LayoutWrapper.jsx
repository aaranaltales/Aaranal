'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Context from '@/context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

// Loading Component
function LoadingPage() {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <video
                width="80"
                height="80"
                autoPlay
                loop
                muted
                playsInline
                className="object-contain"
            >
                <source src="assests/logo_gif.mp4" type="video/mp4" />
                {/* Fallback to GIF if MP4 doesn't work */}
                <Image
                    src="/loading.gif"
                    alt="Loading..."
                    width={100}
                    height={100}
                    unoptimized={true}
                    priority={true}
                />
            </video>
        </div>
    );
}

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    
    const hideLayout = pathname.startsWith('/auth');

    useEffect(() => {
        // Show loading for 2 seconds on every page
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1650);

        return () => clearTimeout(timer);
    }, [pathname]); // Runs every time the route changes

    return (
        <div className="min-h-screen">
            <Context>
                {loading && <LoadingPage />}
                {!hideLayout && <Header />}
                {children}
                <ToastContainer />
                {!hideLayout && <Footer />}
            </Context>
        </div>
    );
}