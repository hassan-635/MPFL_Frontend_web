import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, CheckCircle2, Loader2, PlayCircle, Plus, LogOut, LayoutGrid } from 'lucide-react';

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Aapke backend ka endpoint
      const res = await axios.get('https://mpfl-backend.onrender.com/api/v1/projects', config);
      setProjects(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Status mapping as per your backend models/Project.js
  const pending = projects.filter(p => p.status === 'pending');
  const inProgress = projects.filter(p => p.status === 'in-progress');
  const completed = projects.filter(p => p.status === 'completed');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Workspace...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-20">
      {/* --- TOP NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-10 py-5 mb-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg shadow-slate-200">M</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">MPFL <span className="text-blue-600">Pro</span></span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="group flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-[11px] uppercase tracking-[0.2em] transition-all"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-10">
        {/* --- HEADER WITH STATS & ACTION --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Workspace</h1>
            <p className="text-slate-500 font-medium italic">Manage your delivery pipeline with precision.</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Total Projects Stats Box */}
            <div className="bg-white border border-slate-100 px-6 py-4 rounded-[24px] shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <LayoutGrid size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Projects</p>
                <p className="text-2xl font-black text-slate-900 leading-none">{projects.length}</p>
              </div>
            </div>

            {/* Create New Project Button */}
            <button className="h-[70px] w-[70px] bg-slate-900 text-white rounded-[24px] flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 group active:scale-95">
              <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </header>

        {/* --- KANBAN SECTIONS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* PENDING SECTION */}
          <ProjectSection 
            title="Pending Approval" 
            count={pending.length} 
            projects={pending} 
            icon={<Clock size={20}/>} 
            theme={{ 
              bg: 'bg-slate-50', 
              text: 'text-slate-500', 
              badge: 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
            }} 
          />

          {/* IN PROGRESS SECTION */}
          <ProjectSection 
            title="In Progress" 
            count={inProgress.length} 
            projects={inProgress} 
            icon={<PlayCircle size={20}/>} 
            theme={{ 
              bg: 'bg-blue-50', 
              text: 'text-blue-600', 
              badge: 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
            }} 
          />

          {/* COMPLETED SECTION */}
          <ProjectSection 
            title="Completed" 
            count={completed.length} 
            projects={completed} 
            icon={<CheckCircle2 size={20}/>} 
            theme={{ 
              bg: 'bg-emerald-50', 
              text: 'text-emerald-600', 
              badge: 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' 
            }} 
          />

        </div>
      </div>
    </div>
  );
};

// --- REUSABLE SECTION COMPONENT ---
const ProjectSection = ({ title, count, projects, icon, theme }) => (
  <div className="bg-white border border-slate-100 rounded-[35px] p-7 shadow-sm min-h-[600px] flex flex-col">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-10 px-1">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.bg} ${theme.text}`}>
          {icon}
        </div>
        <h3 className="font-bold text-[14px] uppercase tracking-[0.1em] text-slate-700">{title}</h3>
      </div>
      
      {/* Enhanced Badge Number */}
      <span className={`h-8 min-w-[32px] px-2.5 flex items-center justify-center rounded-full text-[13px] font-black ${theme.badge}`}>
        {count}
      </span>
    </div>

    {/* Project Cards */}
    <div className="space-y-5 flex-1">
      {projects.length === 0 ? (
        <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-50 rounded-[30px] bg-slate-50/20">
          <p className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.2em]">Queue Empty</p>
        </div>
      ) : (
        projects.map((project) => (
          <div 
            key={project._id} 
            className="p-6 bg-white border border-slate-100 rounded-[30px] hover:shadow-2xl hover:shadow-slate-200/60 hover:border-blue-100 hover:-translate-y-1 transition-all duration-500 group cursor-pointer"
          >
            <h4 className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h4>
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed line-clamp-2">
              {project.description || "Digital assets awaiting review and feedback."}
            </p>
            
            <div className="mt-5 pt-5 border-t border-slate-50 flex justify-between items-center">
               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                 Manage Assets
               </span>
               <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                 <Plus size={16} />
               </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default DashboardPage;