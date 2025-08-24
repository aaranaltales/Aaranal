"use client";
import { usePathname } from "next/navigation";
import Context from "@/context/Context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingOverlay from "./LoadingOverlay";
import { ToastProvider } from "@/components/ToastContext";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth");

  return (
    <div className="min-h-screen">
      <Context>
        <ToastProvider>
          <LoadingOverlay />
          {!hideLayout && <Header />}
          {children}
          {!hideLayout && <Footer />}
        </ToastProvider>
      </Context>
    </div>
  );
}