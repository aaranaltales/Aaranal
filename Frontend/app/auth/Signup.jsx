"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { signup, sendOtp, verifyOtp, googleSignin } from "@/services/user";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

export default function Signup({ onAlreadyHaveAccount }) {
  const router = useRouter();
  const { refreshUser } = useUser();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    cPassword: "",
  });
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const googleButtonContainerRef = useRef(null);
  const googleInitialized = useRef(false);

  // Load Google script
  const loadGoogleScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Google callback handler
  const handleGoogleCallback = async (response) => {
    setError("");

    try {
      const result = await googleSignin(response.credential);
      if (result.success && result.token) {
        Cookies.set("token", result.token, {
          expires: 3,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        await refreshUser();
        router.refresh();
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        setError(result.message || "Google authentication failed");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message || "Google sign-in failed");
    }
  };

  // Initialize Google Sign-In
  const initializeGoogleSignIn = async () => {
    try {
      await loadGoogleScript();

      if (window.google && googleButtonContainerRef.current) {
        // Clear any existing button
        googleButtonContainerRef.current.innerHTML = '';

        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
          use_fedcm_for_prompt: true,
        });

        // Render the Google button
        window.google.accounts.id.renderButton(
          googleButtonContainerRef.current,
          {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signup_with",
          }
        );

        googleInitialized.current = true;
      }
    } catch (err) {
      console.error("Google initialization error:", err);
      setError("Google Sign-In initialization failed");
    }
  };

  // Initialize Google when component mounts or when it becomes visible
  useEffect(() => {
    const initGoogle = async () => {
      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      await initializeGoogleSignIn();
    };

    initGoogle();

    return () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);


  // Countdown for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  // Send OTP
  const handleSendOtp = async () => {
    setError("");
    if (!form.email) {
      setError("Email is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsLoading(true);
      const response = await sendOtp({ email: form.email });
      if (response.success) {
        setOtpSent(true);
        setCountdown(30);
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while sending OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setError("");
    if (!form.otp) {
      setError("Please enter the OTP");
      return;
    }

    // Basic OTP validation (6 digits)
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(form.otp)) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      setIsLoading(true);
      const response = await verifyOtp({
        email: form.email,
        otp: form.otp,
      });
      if (response.success) {
        setOtpVerified(true);
      } else {
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while verifying OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setError("");
    try {
      setIsLoading(true);
      const response = await sendOtp({ email: form.email });
      if (response.success) {
        setCountdown(30);
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while resending OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name) {
      setError("Name is required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.cPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    if (!otpVerified) {
      setError("Please verify your email with OTP first");
      return;
    }

    try {
      setIsSignupLoading(true);
      const response = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        otp: form.otp,
      });

      if (response.success && response.token) {
        Cookies.set("token", response.token, {
          expires: 3,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        await refreshUser();
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        setError(response.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during signup. Please try again.");
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      <div
        className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-800"
        style={{
          backgroundImage: `url("/assests/auth_bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-800/85 to-rose-800/90"></div>
      </div>
      <div className="w-full max-w-md sm:max-w-sm lg:max-w-md px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl py-4 sm:py-5 px-6 sm:px-7 lg:px-10 shadow-2xl border border-white/20">
          <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-2">
            Join Us
          </span>
          <h2 className="text-3xl sm:text-3xl font-light text-white mb-2">
            Create Your
            <span className="block font-normal text-rose-200">Account</span>
          </h2>
          <p className="text-base sm:text-sm text-rose-100 mb-5 sm:mb-4 font-light leading-relaxed">
            Sign up to access exclusive features, track your orders, and save your favorites.
          </p>

          {/* Google Sign Up Button Container */}
          <div className="flex justify-center items-center">
            <div ref={googleButtonContainerRef} id="google-signin-button" className=""></div>
          </div>

          {/* Divider */}
          <div className="max-w-xs mx-auto flex items-center my-4">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-3 text-white/60 text-xs">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-3 sm:space-y-3">
            {error && (
              <div className="bg-rose-900/50 text-white px-4 py-2 rounded-lg text-xs sm:text-sm">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm sm:text-base"
                required
              />
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm sm:text-base pr-24 sm:pr-20"
                  required
                  disabled={otpSent}
                />
                {!otpVerified && (
                  <button
                    type="button"
                    onClick={otpSent && countdown === 0 ? handleResendOtp : handleSendOtp}
                    disabled={(otpSent && countdown > 0) || isLoading}
                    className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full text-xs transition-all z-10 ${(otpSent && countdown > 0) || isLoading
                        ? "bg-rose-900/80 text-white hover:bg-rose-900/55 shadow-sm backdrop-blur-sm border border-white/20"
                        : "bg-rose-900/80 text-white hover:bg-rose-900/55 shadow-sm backdrop-blur-sm border border-white/20"
                      }`}
                  >
                    {isLoading ? "Sending..." : (otpSent ? (countdown > 0 ? `${countdown}s` : "Resend") : "Send OTP")}
                  </button>
                )}
              </div>
              {otpSent && (
                <div className="relative">
                  <input
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    disabled={otpVerified}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm sm:text-base pr-24 sm:pr-20"
                    required
                    maxLength="6"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otpVerified || isLoading}
                    className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full text-xs transition-all z-10 ${otpVerified
                        ? "bg-green-500/90 text-white cursor-default"
                        : (isLoading ? "bg-white/30 text-rose-900 cursor-not-allowed" : "bg-rose-900/80 text-white hover:bg-rose-900/55 shadow-sm backdrop-blur-sm border border-white/20")
                      }`}
                  >
                    {isLoading ? "Verifying..." : (otpVerified ? "Verified ✓" : "Verify")}
                  </button>
                </div>
              )}
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password (min. 6 characters)"
                minLength="6"
                className="w-full px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm sm:text-base"
                required
              />
              <input
                type="password"
                name="cPassword"
                value={form.cPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                minLength="6"
                className="w-full px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm sm:text-base"
                required
              />
              <div className="flex items-start mt-1">
                <div className="flex items-center h-4">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="focus:ring-rose-500 h-3.5 w-3.5 text-rose-600 border-white/30 rounded"
                    required
                  />
                </div>
                <div className="ml-2 text-xs sm:text-sm">
                  <label htmlFor="terms" className="font-light text-rose-100">
                    I agree to the{" "}
                    <a href="/terms" className="text-rose-200 hover:text-white">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !otpVerified || !agreeToTerms}
              className={`w-full bg-white text-rose-700 px-6 py-2 sm:px-7 sm:py-2.5 rounded-full hover:bg-rose-50 hover:scale-105 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg mt-3 text-sm sm:text-base ${isLoading || !otpVerified || !agreeToTerms ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isSignupLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Already have an account */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 mt-4 text-rose-200">
            <button
              type="button"
              onClick={onAlreadyHaveAccount}
              className="flex items-center space-x-1.5 text-xs sm:text-sm text-rose-100 hover:text-white transition"
            >
              <i className="ri-login-circle-line w-4 h-4 flex items-center justify-center"></i>
              <span>Already have an account?</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}