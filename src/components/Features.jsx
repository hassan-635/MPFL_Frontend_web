import React from 'react';
import { Shield, Zap, Globe, MousePointer2, Layers, Share2 } from 'lucide-react';

const FeatureCard = ({ icon, title, desc, colSpan = "col-span-1", bg = "bg-white" }) => (
  <div className={`${colSpan} ${bg} group relative p-10 rounded-[40px] border border-slate-100 overflow-hidden hover:border-blue-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50`}>
    {/* Subtle Background Glow on Hover */}
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative z-10">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 text-blue-600 shadow-inner">
        {icon ? React.createElement(icon, { size: 28, strokeWidth: 1.5 }) : null}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-32">
      <div className="text-center mb-20">
        <h2 className="text-[12px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The MPFL Advantage</h2>
        <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Everything you need to <br/> scale your workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Row 1 */}
        <FeatureCard 
          icon={Shield}
          title="Secure Tokens"
          desc="Unique, encrypted access tokens for every client. No passwords needed, just instant secure access to your proofs."
        />
        <FeatureCard 
          icon={Zap}
          title="Instant Feedback"
          desc="Clients can point, click, and comment. Real-time notifications mean you never miss an update on your work."
          bg="bg-slate-50/50"
        />
        <FeatureCard 
          icon={Share2}
          title="Smart Sharing"
          desc="One-click links to share your progress. Looks professional on any device, from mobile to ultra-wide monitors."
        />

        {/* Row 2 - Bento Style (Wide Card) */}
        <div className="md:col-span-2 bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400">
                <Layers size={28} />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight text-white">Version Control for Proofs</h3>
              <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
                Keep track of every iteration. Clients can view history and compare versions to see how their project evolved.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4">
               <span className="text-[11px] font-black uppercase tracking-widest text-blue-400">Integrated Workflow</span>
               <div className="h-[1px] w-20 bg-white/10"></div>
            </div>
          </div>
          {/* Decorative Gradient for the Dark Card */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] group-hover:bg-blue-600/40 transition-all duration-700"></div>
        </div>

        <FeatureCard 
            icon={MousePointer2}
            title="Zero-Friction Review"
             desc="No complex dashboards for your clients. They just enter a token and start reviewing. It's built to get you approved faster."
        />
      </div>
    </section>
  );
};

export default Features;
