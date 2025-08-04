'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.push('/'); // Navigate to the home page
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white relative overflow-hidden">
      <div className="w-full h-full relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 z-50 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:bg-gray-100 hover:scale-110 transform transition-all duration-300"
          aria-label="Back to home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Login Form */}
        <div
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            showLogin ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div className="h-full w-full flex items-center justify-center">
            <Login onCreateAccount={() => setShowLogin(false)} />
          </div>
        </div>

        {/* Signup Form */}
        <div
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            !showLogin ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div className="h-full w-full flex items-center justify-center">
            <Signup onAlreadyHaveAccount={() => setShowLogin(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}
