import React from 'react';
import { MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

const FeedbackCard = ({ feedback, status }) => {
  if (!feedback) return (
    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
      <MessageSquare className="text-slate-300" size={20} />
      <p className="text-sm font-medium text-slate-400 italic">Awaiting feedback...</p>
    </div>
  );

  const isApproved = status === 'completed';

  return (
    <div className={`p-6 rounded-[32px] border-2 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 ${
      isApproved ? 'bg-emerald-50/50 border-emerald-100 text-emerald-900' : 'bg-red-50/50 border-red-100 text-red-900'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        {isApproved ? <CheckCircle2 className="text-emerald-500" /> : <AlertCircle className="text-red-500" />}
        <span className="font-black text-[10px] uppercase tracking-widest">
          {isApproved ? 'Client Approved' : 'Revision Requested'}
        </span>
      </div>
      <p className="text-sm font-bold leading-relaxed italic">"{feedback}"</p>
    </div>
  );
};

export default FeedbackCard;