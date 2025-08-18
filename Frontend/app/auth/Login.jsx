'use client';
import { useUser } from '@/context/UserContext';
import { signin } from '@/services/user';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Login({ onCreateAccount }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { refreshUser } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await signin(form.email, form.password);
      const { token, success } = response;
      if (success && token) {
        Cookies.set("token", token, {
          expires: 3,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
        });

        await refreshUser();
        router.refresh();
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      <div
        className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-800 to-rose-800"
        style={{
          backgroundImage: `url("/assests/auth_bg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-800/85 to-rose-800/90"></div>
      </div>
      <div className="w-full max-w-md px-4 sm:px-6 text-center relative z-10 ">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20">
          <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-3">
            Welcome Back
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-3">
            Sign In to
            <span className="block font-normal text-rose-200">
              Your Account
            </span>
          </h2>
          <p className="text-base sm:text-lg text-rose-100 mb-6 font-light leading-relaxed">
            Access exclusive features, track your orders, and manage your wishlist.
          </p>
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-4">
            {error && (
              <div className="bg-rose-900/50 text-white px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
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
              className={`w-full bg-white text-rose-700 px-8 py-3 rounded-full hover:bg-rose-50 hover:scale-105 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mt-6 text-rose-200">
            <div className="flex items-center space-x-2">
              <i className="ri-mail-line w-5 h-5 flex items-center justify-center"></i>
              <span className="text-sm">Forgot Password?</span>
            </div>
            <button
              type="button"
              onClick={onCreateAccount}
              className="flex items-center space-x-2 underline text-sm text-rose-100 hover:text-white transition"
            >
              <i className="ri-user-add-line w-5 h-5 flex items-center justify-center"></i>
              <span>Create Account</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
