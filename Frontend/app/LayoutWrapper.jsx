"use client";
import { usePathname } from "next/navigation";
import Context from "@/context/Context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingOverlay from "./LoadingOverlay";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth");

  return (
    <div className="min-h-screen">
      <Context>
        <LoadingOverlay />
        {!hideLayout && <Header />}
        {children}
        {!hideLayout && <Footer />}
      </Context>
    </div>
  );
}