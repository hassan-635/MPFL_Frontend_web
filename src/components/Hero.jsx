import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-44 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Clean Badge (v2 removed) */}
        <div className="inline-flex items-center gap-2 bg-blue-50/50 border border-blue-100 px-4 py-1.5 rounded-full mb-10">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-black text-blue-700 uppercase tracking-widest">
            Secure Project Delivery System
          </span>
        </div>

        <h1 className="text-6xl md:text-[85px] font-black text-slate-900 leading-[0.95] tracking-[-0.05em] mb-10">
          Bridge the gap between <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700">
            Work and Approval.
          </span>
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          MPFL provides a professional environment for freelancers to showcase proofs and clients to give instant feedback. No clutter, just results.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link to="/signup">
                <button className="group bg-blue-600 text-white px-10 py-5 rounded-[20px] text-lg font-bold shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] hover:bg-blue-700 hover:shadow-blue-300/50 transition-all flex items-center gap-2">
                    Create Your First Project
                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </Link>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
             </div>
             <p className="text-[13px] font-bold text-slate-400">
               Used by <span className="text-slate-900">500+ Freelancers</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;