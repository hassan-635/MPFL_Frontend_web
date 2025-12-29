import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const linkStyle = "relative text-[13px] font-bold text-slate-900 px-2 py-1 group overflow-hidden";
  const underlineStyle = "absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 -translate-x-[110%] group-hover:translate-x-0 transition-transform duration-300";

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[24px] px-8 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-black text-xl italic">M</span>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">MPFL</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[12px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Features</a>
          <a href="#process" className="text-[12px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Process</a>
        </div>

        {/* Action Buttons & Links */}
        <div className="flex items-center gap-6">
          <a href="/client-access" className={linkStyle}>
            Client Portal
            <span className={underlineStyle}></span>
          </a>
          
          <Link to="/login" className={linkStyle}>Sign In<span className={underlineStyle}></span></Link>
          <Link to="/signup">
            <button className="bg-slate-900 text-white text-[13px] font-bold px-7 py-3 rounded-xl hover:bg-blue-600 hover:shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all active:scale-95">
                Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;