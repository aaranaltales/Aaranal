"use client";
import { useToast } from "@/components/ToastContext";

export default function SimpleToastExample() {
  const { showSuccess, showError } = useToast();

  const triggerSuccessToast = () => {
    showSuccess("Operation completed successfully!");
  };

  const triggerErrorToast = () => {
    showError("Something went wrong! Please try again.");
  };

  const triggerCustomDuration = () => {
    showSuccess("This toast lasts 6 seconds!", 6000);
  };

  const triggerLongError = () => {
    showError("This is a longer error message that demonstrates how the toast handles more text content gracefully.", 5000);
  };

  const triggerMultiple = () => {
    showSuccess("First toast!");
    setTimeout(() => showError("Second toast!"), 500);
    setTimeout(() => showSuccess("Third toast!"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Toast Examples
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Test different toast notifications
        </p>

        <div className="space-y-4">
          <button 
            onClick={triggerSuccessToast}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            ✅ Show Success Toast
          </button>

          <button 
            onClick={triggerErrorToast}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            ❌ Show Error Toast
          </button>

          <button 
            onClick={triggerCustomDuration}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            ⏱️ Long Duration (6s)
          </button>

          <button 
            onClick={triggerLongError}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            📝 Long Error Message
          </button>

          <button 
            onClick={triggerMultiple}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            🔢 Multiple Toasts
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
          <h3 className="font-semibold text-gray-700 mb-2">Features:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Success toasts with green/pink gradient</li>
            <li>✓ Error toasts with red gradient</li>
            <li>✓ Auto-dismiss with progress bar</li>
            <li>✓ Manual close with X button</li>
            <li>✓ Multiple toasts stack nicely</li>
            <li>✓ Smooth animations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}