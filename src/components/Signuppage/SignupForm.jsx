import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend Route from authRoutes.js
      await axios.post('https://mpfl-backend.onrender.com/api/v1/auth/register', formData);
      // Registration ke baad seedha login page par redirect
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 shadow-sm">
          <AlertCircle size={18} className="shrink-0" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input type="text" name="name" required onChange={handleChange} placeholder="Ahmed Ali"
            className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-slate-900" />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input type="email" name="email" required onChange={handleChange} placeholder="ahmed@example.com"
            className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-slate-900" />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input type="password" name="password" required onChange={handleChange} placeholder="••••••••"
            className="w-full bg-slate-50 border border-slate-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-slate-900" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 mt-4 shadow-xl shadow-slate-100">
        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create Account <ArrowRight size={20} /></>}
      </button>
    </form>
  );
};

export default SignupForm;