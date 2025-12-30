import React from 'react';
import { FileText, Download } from 'lucide-react';

const AssetList = ({ proofs }) => (
  <div className="space-y-4">
    {proofs.length === 0 && <p className="text-center py-10 text-slate-300 text-xs font-bold uppercase tracking-widest">No assets yet</p>}
    {proofs.map((proof, idx) => (
      <a 
        key={idx} 
        href={proof.imageUrl} 
        target="_blank" 
        rel="noreferrer"
        className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Proof #{idx + 1}</p>
            <p className="text-[10px] text-slate-400 font-medium italic">Click to view/download</p>
          </div>
        </div>
        <Download size={16} className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-y-1" />
      </a>
    ))}
  </div>
);

export default AssetList;