"use client";

import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

const Toast = ({ message, isVisible, onClose, duration = 3000 }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      setIsLeaving(false);
      
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsShowing(false);
      onClose();
    }, 250);
  };

  if (!isVisible && !isShowing) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-out ${
        isShowing && !isLeaving
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-4 opacity-0 scale-95"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 pr-10 min-w-[280px] max-w-[320px] relative">
        
        {/* Simple gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-t-2xl"></div>
        
        {/* Content */}
        <div className="flex items-center space-x-3">
          {/* Clean check icon */}
          <div className="flex-shrink-0">
            <div className="w-7 h-7 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
              <Check 
                className={`w-4 h-4 text-white transition-all duration-300 ${
                  isShowing && !isLeaving ? "scale-100" : "scale-0"
                }`}
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex-1">
            <p className="text-gray-800 text-sm font-medium">
              {message}
            </p>
          </div>
        </div>

        {/* Minimal close button */}
        <button
          onClick={handleClose}
          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
        >
          <X className="w-3 h-3 text-gray-500" strokeWidth={2} />
        </button>

        {/* Clean progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-50 rounded-b-2xl overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all ease-linear ${
              isShowing && !isLeaving ? "animate-progress" : "w-0"
            }`}
            style={{
              animationDuration: `${duration}ms`
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-progress {
          animation: progress linear;
        }
      `}</style>
    </div>
  );
};

// Clean toast hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, duration = 3000) => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      isVisible: true,
      duration
    };

    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration + 400);
  };

  const closeToast = (id) => {
    setToasts(prev =>
      prev.map(toast =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 250);
  };

  const ToastContainer = () => (
    <div className="fixed bottom-0 right-0 p-6 space-y-3 z-50 pointer-events-none">
      {toasts.map((toast, index) => (
        <div 
          key={toast.id} 
          className="pointer-events-auto"
          style={{
            transform: `translateY(-${index * 8}px)`,
            zIndex: 50 - index
          }}
        >
          <Toast
            message={toast.message}
            isVisible={toast.isVisible}
            onClose={() => closeToast(toast.id)}
            duration={toast.duration}
          />
        </div>
      ))}
    </div>
  );

  return { showToast, ToastContainer };
};

export default Toast;