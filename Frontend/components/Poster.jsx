"use client";
import { useState, useEffect } from "react";
import { X, Sparkles, Heart } from "lucide-react";

export default function BirthdayBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasSeenBanner = localStorage.getItem("birthdayBannerSeen");
    if (!hasSeenBanner) {
      setShowBanner(true);
    }
  }, []);

  const handleClose = () => {
    setShowBanner(false);
    localStorage.setItem("birthdayBannerSeen", "true"); // ✅ remember
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Banner Card */}
      <div className="relative bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-2xl rounded-3xl p-10 max-w-lg w-full mx-4 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-semibold">Special Celebration 🎉</h3>
        </div>

        <p className="text-lg leading-relaxed text-center mb-6 font-light">
          We’re celebrating the launch of our new website on the occasion of our
          founder <span className="font-semibold">Alokhya’s Birthday</span>.  
          Thank you for being part of Aaranal’s journey!
        </p>

        {/* Footer */}
        <div className="flex items-center justify-center space-x-2 text-sm font-light opacity-90">
          <Heart className="w-4 h-4 text-white" />
          <span>Made with love at Aaranal</span>
        </div>
      </div>
    </div>
  );
}
