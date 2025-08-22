"use client";
import Toast from "@/components/useToast";
import { useState } from "react";

export default function SimpleToastExample() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <div>
      <button 
        onClick={() => triggerToast("Operation completed successfully!")}
        className="bg-gradient-to-r from-rose-600 to-pink-500 text-white px-6 py-3 rounded-full"
      >
        Trigger Toast
      </button>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={4000}
      />
    </div>
  );
}