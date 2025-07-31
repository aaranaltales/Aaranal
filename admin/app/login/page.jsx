'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/admin`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        toast.success('Login Successful');
        setTimeout(() => {
          router.push('/add-product');
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-light mb-6 text-gray-900 text-center">Admin Login</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white text-lg font-medium hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
