'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { signin, sendOtp, verifyOtp, resetPassword } from '@/services/user';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login({ onCreateAccount }) {
  // Login State
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [fpStep, setFpStep] = useState(1); // 1: Email, 2: OTP, 3: Success

  // Forgot Password State
  const [fpForm, setFpForm] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
  const [fpIsLoading, setFpIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [fpError, setFpError] = useState('');
  const [fpSuccess, setFpSuccess] = useState('');

  const { refreshUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Login Handlers (unchanged)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await signin(form.email, form.password);
      if (response.success && response.token) {
        Cookies.set('token', response.token, {
          expires: 3,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
        });
        await refreshUser();
        router.refresh();
        const redirectTo = searchParams.get('redirect') || '/';
        router.push(redirectTo);
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Handlers
  const handleFpChange = (e) => {
    setFpForm({ ...fpForm, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    setFpError('');
    if (!fpForm.email) {
      setFpError('Email is required');
      return;
    }
    try {
      setFpIsLoading(true);
      const response = await sendOtp({ email: fpForm.email, method: "forgot" });
      if (response.success) {
        setFpStep(2);
        setCountdown(30);
      } else {
        setFpError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setFpError('An error occurred while sending OTP. Please try again.');
    } finally {
      setFpIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setFpError('');
    if (!fpForm.otp) {
      setFpError('Please enter the OTP');
      return;
    }
    try {
      setFpIsLoading(true);
      const response = await verifyOtp({ email: fpForm.email, otp: fpForm.otp });
      if (response.success) {
        setFpStep(3);
      } else {
        setFpError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setFpError('An error occurred while verifying OTP. Please try again.');
    } finally {
      setFpIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setFpError('');
    try {
      setFpIsLoading(true);
      const response = await sendOtp({ email: fpForm.email, method: "forgot" });
      if (response.success) {
        setCountdown(30);
      } else {
        setFpError(response.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setFpError('An error occurred while resending OTP. Please try again.');
    } finally {
      setFpIsLoading(false);
    }
  };

  // Countdown Effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResetPassword = async () => {
    setFpError('');
    if (!fpForm.newPassword || !fpForm.confirmPassword) {
      setFpError('Please enter and confirm your new password');
      return;
    }
    if (fpForm.newPassword !== fpForm.confirmPassword) {
      setFpError('Passwords do not match');
      return;
    }
    try {
      setFpIsLoading(true);
      const response = await resetPassword({
        email: fpForm.email,
        otp: fpForm.otp,
        newPassword: fpForm.newPassword,
      });
      if (response.success) {
        setFpStep(4); // Move to success step
      } else {
        setFpError(response.message || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setFpError(err.message || 'Password reset failed. Please try again.');
    } finally {
      setFpIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-800"
        style={{
          backgroundImage: `url("/assests/auth_bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-800/85 to-rose-800/90"></div>
      </div>

      {/* Login/Forgot Password Card */}
      <div className="w-full max-w-md px-4 sm:px-6 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20">
          {!showForgotPassword ? (
            <>
              <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-3">
                Welcome Back
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-3">
                Sign In to
                <span className="block font-normal text-rose-200">Your Account</span>
              </h2>
              <p className="text-base sm:text-lg text-rose-100 mb-6 font-light leading-relaxed">
                Access exclusive features, track your orders, and manage your wishlist.
              </p>
              <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-4">
                {error && (
                  <div className="bg-rose-900/50 text-white px-4 py-3 rounded-lg text-sm">{error}</div>
                )}
                <div className="flex flex-col gap-4">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-white text-rose-700 px-8 py-3 rounded-full hover:bg-rose-50 hover:scale-105 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mt-6 text-rose-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setFpStep(1);
                    setFpForm({ email: '', otp: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="flex items-center space-x-2 underline text-sm hover:text-white transition"
                >
                  <i className="ri-mail-line w-5 h-5 flex items-center justify-center"></i>
                  <span>Forgot Password?</span>
                </button>
                <button
                  type="button"
                  onClick={onCreateAccount}
                  className="flex items-center space-x-2 underline text-sm text-rose-100 hover:text-white transition"
                >
                  <i className="ri-user-add-line w-5 h-5 flex items-center justify-center"></i>
                  <span>Create Account</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-3">
                {fpStep === 1 ? 'Forgot Password' : fpStep === 2 ? 'Verify OTP' : 'Set New Password'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-3">
                {fpStep === 1 ? 'Reset Password' : fpStep === 2 ? 'Enter OTP' : 'New Password'}
              </h2>
              <p className="text-base sm:text-lg text-rose-100 mb-6 font-light leading-relaxed">
                {fpStep === 1
                  ? 'Enter your email to receive an OTP'
                  : fpStep === 2
                    ? 'Enter the OTP sent to your email'
                    : 'Set your new password'}
              </p>

              {/* Step 1: Email Input */}
              {fpStep === 1 && (
                <div className="max-w-xs mx-auto space-y-4">
                  {fpError && (
                    <div className="bg-rose-900/50 text-white px-4 py-3 rounded-lg text-sm">{fpError}</div>
                  )}
                  <input
                    type="email"
                    name="email"
                    value={fpForm.email}
                    onChange={handleFpChange}
                    placeholder="Email address"
                    className="w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={fpIsLoading}
                    className={`w-full bg-white text-rose-700 px-8 py-3 rounded-full hover:bg-rose-50 transition-all duration-300 ${fpIsLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {fpIsLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </div>
              )}

              {/* Step 2: OTP Input */}
              {fpStep === 2 && (
                <div className="max-w-xs mx-auto space-y-4">
                  {fpError && (
                    <div className="bg-rose-900/50 text-white px-4 py-3 rounded-lg text-sm">{fpError}</div>
                  )}
                  <div className="relative">
                    <input
                      type="text"
                      name="otp"
                      value={fpForm.otp}
                      onChange={handleFpChange}
                      placeholder="Enter OTP"
                      className="w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 pr-24"
                      required
                    />
                    <button
                      type="button"
                      onClick={countdown > 0 ? undefined : handleResendOtp}
                      disabled={countdown > 0}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full text-xs ${countdown > 0 ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/15'
                        }`}
                    >
                      {countdown > 0 ? `${countdown}s` : 'Resend'}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFpStep(1)}
                    className="text-rose-200 hover:text-white transition underline text-sm w-full text-left"
                  >
                    Change Email
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={fpIsLoading}
                    className={`w-full bg-white text-rose-700 px-8 py-3 rounded-full hover:bg-rose-50 transition-all duration-300 ${fpIsLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {fpIsLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              )}

              {/* Step 3: New Password Input */}
              {fpStep === 3 && (
                <div className="max-w-xs mx-auto space-y-4">
                  {fpError && (
                    <div className="bg-rose-900/50 text-white px-4 py-3 rounded-lg text-sm">{fpError}</div>
                  )}
                  <input
                    type="password"
                    name="newPassword"
                    value={fpForm.newPassword}
                    onChange={handleFpChange}
                    placeholder="New Password"
                    className="w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={fpForm.confirmPassword}
                    onChange={handleFpChange}
                    placeholder="Confirm New Password"
                    className="w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={fpIsLoading}
                    className={`w-full bg-white text-rose-700 px-8 py-3 rounded-full hover:bg-rose-50 transition-all duration-300 ${fpIsLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {fpIsLoading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              )}

              {/* Step 4: Success */}
              {fpStep === 4 && (
                <div className="max-w-xs mx-auto space-y-4">
                  <div className="bg-rose-900/50 text-white px-4 py-3 rounded-lg text-sm">
                    Password reset successfully!
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setFpStep(1);
                      setFpForm({ email: '', otp: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="w-full bg-white text-rose-700 px-8 py-3 rounded-full hover:bg-rose-50 transition-all duration-300"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </section>
  );
}
