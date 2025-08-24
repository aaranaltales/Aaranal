"use client";

import React, { createContext, useContext, useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";

// Toast Context
const ToastContext = createContext();

// Toast Component
const Toast = ({ message, isVisible, onClose, duration = 3000, type = "success" }) => {
  const [isShowing, setIsShowing] = React.useState(false);
  const [isLeaving, setIsLeaving] = React.useState(false);

  React.useEffect(() => {
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
      className={`transform transition-all duration-300 ease-out ${
        isShowing && !isLeaving
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-4 opacity-0 scale-95"
      }`}
    >
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg shadow-lg p-4 pr-10 min-w-[280px] max-w-[400px] relative">
        
        {/* Content */}
        <div className="flex items-start space-x-3">
          {/* Pink icon */}
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-6 h-6 flex items-center justify-center">
              {type === "success" ? (
                <Check 
                  className={`w-5 h-5 text-pink-500 transition-all duration-300 ${
                    isShowing && !isLeaving ? "scale-100" : "scale-0"
                  }`}
                  strokeWidth={2.5}
                />
              ) : (
                <AlertCircle 
                  className={`w-5 h-5 text-pink-500 transition-all duration-300 ${
                    isShowing && !isLeaving ? "scale-100" : "scale-0"
                  }`}
                  strokeWidth={2.5}
                />
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 pr-2">
            <p className="text-pink-700 text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-5 h-5 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors duration-200"
        >
          <X className="w-3 h-3 text-pink-400" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message,
      type,
      isVisible: true,
      duration
    };

    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration + 400);
  };

  const showSuccess = (message, duration = 3000) => showToast(message, "success", duration);
  const showError = (message, duration = 3000) => showToast(message, "error", duration);

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
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={() => closeToast(toast.id)}
            duration={toast.duration}
          />
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

