'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { signup, sendOtp, verifyOtp } from '@/services/user';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

export default function Signup({ onAlreadyHaveAccount }) {
  const router = useRouter();
  const { refreshUser } = useUser();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', otp: "", password: '', cPassword: '' });
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    setError('');
    if (!form.email) {
      setError('Email is required');
      return;
    }
    try {
      setIsLoading(true);
      const response = await sendOtp({ email: form.email });
      if (response.success) {
        setOtpSent(true);
        setCountdown(30);
      } else {
        setError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while sending OTP. Please try again.');
      console.error('OTP send error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (!form.otp) {
      setError('Please enter the OTP');
      return;
    }
    try {
      setIsLoading(true);
      const response = await verifyOtp({
        email: form.email,
        otp: form.otp
      });
      if (response.success) {
        setOtpVerified(true);
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while verifying OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    try {
      setIsLoading(true);
      const response = await sendOtp({
        email: form.email
      });
      if (response.success) {
        setCountdown(30);
      } else {
        setError(response.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while resending OTP. Please try again.');
      console.error('OTP resend error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name) {
      setError('Name is required');
      return;
    }
    if (form.password !== form.cPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    if (!otpVerified) {
      setError('Please verify your email with OTP first');
      return;
    }
    try {
      setIsLoading(true);
      const response = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        otp: form.otp
      });
      if (response.success) {
        refreshUser();
        setForm({ name: '', email: '',otp: "", password: '', cPassword: '' });
        setAgreeToTerms(false);
        Cookies.set("token", response.token, {
          expires: 3,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        setError(response.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      <div
        className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-800"
        style={{
          backgroundImage: `url("https://readdy.ai/api/search-image?query=Elegant%20leather%20crafting%20workshop%20with%20artisan%20tools%20and%20premium%20leather%20materials%2C%20warm%20ambient%20lighting%20creating%20sophisticated%20atmosphere%2C%20hands%20working%20on%20luxury%20handbag%20with%20traditional%20techniques%2C%20rich%20brown%20and%20golden%20tones%20with%20soft%20shadows&width=1200&height=800&seq=newsletter-craft&orientation=landscape")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-800/85 to-rose-800/90"></div>
      </div>
      <div className="w-full max-w-md sm:max-w-sm lg:max-w-md px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 lg:p-10 shadow-2xl border border-white/20">
          <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-2">
            Join Us
          </span>
          <h2 className="text-3xl sm:text-3xl font-light text-white mb-2">
            Create Your
            <span className="block font-normal text-rose-200">
              Account
            </span>
          </h2>
          <p className="text-base sm:text-sm text-rose-100 mb-5 sm:mb-4 font-light leading-relaxed">
            Sign up to access exclusive features, track your orders, and save your favorites.
          </p>
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
                  className="w-full px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm sm:text-base pr-20"
                  required
                  disabled={otpSent}
                />
                {!otpVerified && (
                  <button
                    type="button"
                    onClick={otpSent && countdown === 0 ? handleResendOtp : handleSendOtp}
                    disabled={otpSent && countdown > 0}
                    className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full text-xs ${otpSent && countdown > 0
                      ? 'bg-white text-rose-900 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/15'
                      } transition-all`}
                  >
                    {otpSent ? (countdown > 0 ? `${countdown}s` : 'Resend') : 'Send OTP'}
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
                    className="w-full px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300 text-sm sm:text-base pr-20"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otpVerified}
                    className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-full text-xs ${otpVerified
                      ? 'bg-green-500/90 text-white cursor-default'
                      : 'bg-white/10 text-white hover:bg-white/15'
                      } transition-all`}
                  >
                    {otpVerified ? 'Verified ✓' : 'Verify'}
                  </button>
                </div>
              )}
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
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
                    I agree to the{' '}
                    <a href="/terms" className="text-rose-200 hover:text-white underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !otpVerified}
              className={`w-full bg-white text-rose-700 px-6 py-2 sm:px-7 sm:py-2.5 rounded-full hover:bg-rose-50 hover:scale-105 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg mt-3 text-sm sm:text-base ${isLoading || !otpVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 mt-4 text-rose-200">
            <button
              type="button"
              onClick={onAlreadyHaveAccount}
              className="flex items-center space-x-1.5 underline text-xs sm:text-sm text-rose-100 hover:text-white transition"
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
