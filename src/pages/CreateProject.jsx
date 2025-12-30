import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Send, Loader2, Sparkles, Layout, ShieldCheck } from 'lucide-react';

const CreateProjectPage = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('https://mpfl-backend.onrender.com/api/v1/projects', formData, config);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Error creating project. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 selection:bg-blue-100">
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600"></div>

      <div className="w-full max-w-xl">
        {/* Back Link with Floating Effect */}
        <Link 
          to="/dashboard" 
          className="group inline-flex items-center gap-3 text-slate-400 hover:text-slate-900 font-bold text-[11px] uppercase tracking-[0.25em] mb-10 transition-all"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-900 transition-colors">
            <ArrowLeft size={14} />
          </div>
          Back to Workspace
        </Link>

        {/* Glassmorphism Card */}
        <div className="bg-white border border-slate-200/60 rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-slate-900 p-12 text-center relative overflow-hidden">
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[200%] bg-blue-500 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                <Sparkles size={32} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                New Project
              </h1>
              <p className="text-slate-400 font-medium text-sm tracking-wide">
                Establish a new high-end delivery pipeline.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-10">
            {/* Project Title Input */}
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-1 group-focus-within:text-blue-600 transition-colors">
                Project Identity
              </label>
              <input 
                required
                type="text" 
                placeholder="e.g. Minimalist Watch Brand"
                className="w-full bg-slate-50 border-2 border-slate-50 py-5 px-8 rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-slate-900 text-lg placeholder:text-slate-300 shadow-sm"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Description Area */}
            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-1 group-focus-within:text-blue-600 transition-colors">
                Brief Description
              </label>
              <textarea 
                rows="4"
                placeholder="Outline the scope of work..."
                className="w-full bg-slate-50 border-2 border-slate-50 py-5 px-8 rounded-3xl outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-slate-800 placeholder:text-slate-300 resize-none shadow-sm"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Premium Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full group relative overflow-hidden bg-slate-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-blue-600 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-[0.97] disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Initialize Project <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-12 flex items-center justify-between px-6 text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <Layout size={16} className="text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Auto-Token Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
