import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white border border-slate-100 p-7 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all duration-500 group">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${colorClass}`}>
      <Icon size={26} />
    </div>
    <div className="space-y-1">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        {trend && <span className="text-xs font-bold text-emerald-500">{trend}</span>}
      </div>
    </div>
  </div>
);

export default StatCard;