import React from 'react';
import { ExternalLink, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';

const ProjectRow = ({ project }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'in-progress': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/shared/${project.shareableToken}`);
    alert("Shareable Link Copied to Clipboard! ✨");
  };

  return (
    <div className="group flex items-center justify-between p-6 bg-white border border-slate-50 rounded-[24px] hover:border-blue-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg">
          {project.title.charAt(0)}
        </div>
        <div>
          <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h4>
          <p className="text-sm text-slate-400 font-medium">Updated 2 days ago</p>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(project.status)}`}>
          {project.status}
        </span>
        
        <div className="flex gap-2">
          <button onClick={copyLink} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Copy Share Link">
            <ExternalLink size={20} />
          </button>
          <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectRow;