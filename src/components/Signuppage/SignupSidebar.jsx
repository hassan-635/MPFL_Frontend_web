import React from 'react';

const SignupSidebar = () => (
  <div className="hidden lg:flex bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full"></div>
    
    <div className="relative z-10 text-center">
      <div className="w-24 h-24 bg-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl">
        <span className="text-white text-4xl font-black italic">M</span>
      </div>
      <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Scale your Business <br/> with Confidence.</h3>
      <p className="text-slate-400 max-w-sm leading-relaxed font-medium mx-auto">
        Your professional hub for managing proofs, tokens, and client approvals.
      </p>
    </div>
  </div>
);

export default SignupSidebar;