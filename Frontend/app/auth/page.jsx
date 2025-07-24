'use client';
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white relative overflow-hidden">
      <div className="w-full h-full relative">
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