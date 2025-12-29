import React, { useState } from 'react';
import { Sparkles, Send, Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    if(email) {
      window.location.href = `mailto:mpfl4freelancers@gmail.com?body=Interested in MPFL. User Email: ${email}`;
    } else {
      window.location.href = `mailto:mpfl4freelancers@gmail.com`;
    }
  };

  return (
    <footer className="bg-white border-t border-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Invisible 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter text-[22px]">MPFL</span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[240px]">
              Elevating the standard of freelance project delivery and client approvals.
            </p>
          </div>

          {/* Column 2: Copyright & Location (Center) */}
          <div className="md:text-center h-full flex flex-col justify-center">
            <p className="text-slate-300 text-[11px] font-black uppercase tracking-[0.2em] mb-2">
              All Rights Reserved
            </p>
            <p className="text-slate-900 font-black text-xs uppercase tracking-widest">
              © 2025 MPFL System — ISB
            </p>
          </div>

          {/* Column 3: Direct Contact */}
          <div className="md:text-right flex flex-col md:items-end">
            <p className="text-slate-900 font-black text-xs uppercase tracking-[0.2em] mb-6">Contact Us</p>
            
            <div className="flex items-center gap-2 w-full max-w-sm md:justify-end">
              <input 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl text-sm font-medium outline-none focus:border-blue-600 transition-all w-full md:w-[200px]"
              />
              <button 
                onClick={handleSendEmail}
                className="bg-slate-900 text-white p-3.5 rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-90"
                title="Send Email"
              >
                <Send size={18} />
              </button>
            </div>

            <button 
              onClick={() => window.location.href = 'mailto:mpfl4freelancers@gmail.com'}
              className="mt-4 flex items-center gap-2 text-[12px] font-bold text-slate-400 hover:text-blue-600 transition-colors md:justify-end"
            >
              <Mail size={14} />
              mpfl4freelancers@gmail.com
            </button>
          </div>

        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-20 h-[1px] w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;