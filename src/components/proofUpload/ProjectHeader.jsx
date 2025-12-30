import React from 'react';
import { Copy, Check } from 'lucide-react';

const ProjectHeader = ({ project, copied, onCopy }) => (
  <header className="mb-16">
    <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">{project.title}</h1>
    <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">{project.description}</p>
    
    <div className="bg-slate-900 rounded-[32px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-slate-200">
      <div className="flex items-center gap-4 text-left">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
          <Check size={24} />
        </div>
        <div>
          <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Shareable Link</p>
          <p className="text-white/60 text-xs font-medium">shared/{project.shareableToken}</p>
        </div>
      </div>
      <button 
        onClick={onCopy}
        className="w-full md:w-auto bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied' : 'Copy Token'}
      </button>
    </div>
  </header>
);

export default ProjectHeader;