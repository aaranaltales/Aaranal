'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { signup } from '@/services/user';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation'

export default function Signup({ onAlreadyHaveAccount }) {
  const router = useRouter();
  const { refreshUser } = useUser();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '', cPassword: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (form.password !== form.cPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      setIsLoading(true)
      const response = await signup({
        name: form.name,
        email: form.email,
        password: form.password
      });

      if (response.success) {
        refreshUser();
        setForm({ name: '', email: '', password: '', cPassword: '' });
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

      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/20">
          <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full tracking-wide mb-6">
            Join Us
          </span>

          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Create Your
            <span className="block font-normal text-rose-200">
              Account
            </span>
          </h2>

          <p className="text-base sm:text-lg text-rose-100 mb-8 sm:mb-10 font-light leading-relaxed">
            Sign up to access exclusive features, track your orders, and save your favorites.
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-rose-900/50 text-white px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="flex-1 px-5 py-3 sm:px-6 sm:py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="flex-1 px-5 py-3 sm:px-6 sm:py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                required
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                minLength="6"
                className="flex-1 px-5 py-3 sm:px-6 sm:py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                required
              />
              <input
                type="password"
                name="cPassword"
                value={form.cPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                minLength="6"
                className="flex-1 px-5 py-3 sm:px-6 sm:py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-rose-200 focus:ring-2 focus:ring-rose-300 focus:outline-none focus:bg-white/30 transition-all duration-300"
                required
              />

              <div className="flex items-start mt-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="focus:ring-rose-500 h-4 w-4 text-rose-600 border-white/30 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
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
              disabled={isSubmitted}
              className={`bg-white text-rose-700 px-8 py-3 sm:py-4 rounded-full hover:bg-rose-50 hover:scale-105 transform transition-all duration-300 whitespace-nowrap cursor-pointer font-medium shadow-lg mt-2 sm:mt-4 w-full ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mt-8 sm:mt-10 text-rose-200">
            <button
              type="button"
              onClick={onAlreadyHaveAccount}
              className="flex items-center space-x-2 underline text-sm text-rose-100 hover:text-white transition"
            >
              <i className="ri-login-circle-line w-5 h-5 flex items-center justify-center"></i>
              <span>Already have an account?</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}