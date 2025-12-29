import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  
  // 1. Form States
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. Input Change Handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Jab user type karna shuru kare toh purana error saaf ho jaye
    if (error) setError('');
  };

  // 3. Submit Handler (Final Logic)
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await axios({
      method: 'post',
      url: 'https://mpfl-backend.onrender.com/api/v1/auth/login',
      data: {
        email: formData.email.toLowerCase().trim(), // Backend lowercase expect kar raha hai
        password: formData.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Login Success:", response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    }
  } catch (err) {
    console.error("Login Error Details:", err.response?.data);
    // Agar backend 'Invalid Credentials' bhej raha hai toh wahi dikhayega
    setError(err.response?.data?.message || 'Login failed. Check Console.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full">
      {/* Error Message Box */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 animate-shake">
          <AlertCircle size={18} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Mail size={20} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ahmed@example.com"
              className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-slate-900"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Lock size={20} />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-slate-900"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-xl shadow-blue-100"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Sign In <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;