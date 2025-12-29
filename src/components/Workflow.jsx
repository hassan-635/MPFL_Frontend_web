import React from 'react';
import { UserPlus, Send, CheckCircle2 } from 'lucide-react';

const Workflow = () => {
  return (
    <section id="process" className="max-w-7xl mx-auto px-6 py-32 text-center">
      <div className="mb-24">
        <h2 className="text-[12px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">How it works</h2>
        <p className="text-4xl font-black text-slate-900 tracking-tight">The Bridge between Idea <br/> and Approval.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 md:gap-4 justify-between relative">
        {/* Step 1 */}
        <div className="relative flex flex-col items-center flex-1 group">
          <div className="w-24 h-24 bg-white border-[6px] border-slate-50 rounded-[32px] flex items-center justify-center mb-8 shadow-xl shadow-slate-100 text-blue-600">
            <UserPlus size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Create & Upload</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[200px]">
            Freelancer creates a project and uploads initial proofs or designs.
          </p>
          {/* Connection Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-slate-100 -z-10 overflow-hidden">
            <div className="h-full bg-blue-600 w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col items-center flex-1 group">
          <div className="w-24 h-24 bg-white border-[6px] border-slate-50 rounded-[32px] flex items-center justify-center mb-8 shadow-xl shadow-slate-100 text-blue-600">
            <Send size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Share Token</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[200px]">
            System generates a secure token. Share it with your client instantly.
          </p>
          {/* Connection Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-slate-100 -z-10 overflow-hidden">
            <div className="h-full bg-blue-600 w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col items-center flex-1 group">
          <div className="w-24 h-24 bg-white border-[6px] border-slate-50 rounded-[32px] flex items-center justify-center mb-8 shadow-xl shadow-slate-100 text-blue-600">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Fast Approval</h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[200px]">
            Client reviews and approves or requests changes in one click.
          </p>
        </div>
      </div>

      {/* Trust Badge with Avatars */}
      <div className="mt-24 inline-flex items-center gap-6 px-8 py-4 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex -space-x-3">
          {/* Random Avatar Images */}
          {["https://i.pravatar.cc/150?img=11", "https://i.pravatar.cc/150?img=12", "https://i.pravatar.cc/150?img=13", "https://i.pravatar.cc/150?img=14"].map((img, i) => (
            <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-sm">
              <img src={img} alt="User Profile" className="w-full h-full object-cover" />
            </div>
          ))}
          {/* Plus count badge */}
          <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
            +2k
          </div>
        </div>
        
        <p className="text-sm font-bold text-slate-600 text-left">
          Join <span className="text-blue-600">200+ teams</span> delivering <br/> work faster this week.
        </p>
      </div>
    </section>
  );
};

export default Workflow;