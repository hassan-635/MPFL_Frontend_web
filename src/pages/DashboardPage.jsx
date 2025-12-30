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
      if (!token) {
        navigate('/login');
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('https://mpfl-backend.onrender.com/api/v1/projects', config);
      setProjects(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- FORCE NAVIGATION FUNCTION ---
  const handleCreateNew = (e) => {
    e.preventDefault();
    console.log("Create Project Button Clicked!"); // Console mein check karein
    navigate('/create-project');
  };

  const pending = projects.filter(p => p.status === 'pending');
  const inProgress = projects.filter(p => p.status === 'in-progress');
  const completed = projects.filter(p => p.status === 'completed');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-10 py-5 mb-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg shadow-slate-200">M</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">MPFL <span className="text-blue-600">Pro</span></span>
          </div>
          <button onClick={handleLogout} className="group flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-[11px] uppercase tracking-[0.2em] transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Workspace</h1>
            <p className="text-slate-500 font-medium italic">Manage your delivery pipeline with precision.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-100 px-6 py-4 rounded-[24px] shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <LayoutGrid size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Projects</p>
                <p className="text-2xl font-black text-slate-900 leading-none">{projects.length}</p>
              </div>
            </div>

            {/* CLICK HANDLER ATTACHED HERE */}
            <button 
              onClick={handleCreateNew}
              className="relative z-[110] h-[70px] w-[70px] bg-slate-900 text-white rounded-[24px] flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 group active:scale-95"
            >
              <Plus size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </header>

        {/* KANBAN SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Section title="Pending" count={pending.length} projects={pending} icon={<Clock size={20}/>} color="slate" />
          <Section title="Active" count={inProgress.length} projects={inProgress} icon={<PlayCircle size={20}/>} color="blue" />
          <Section title="Done" count={completed.length} projects={completed} icon={<CheckCircle2 size={20}/>} color="emerald" />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, count, projects, icon, color }) => {
  const navigate = useNavigate();
  const themes = {
    slate: { bg: 'bg-slate-50', text: 'text-slate-500', badge: 'bg-slate-900' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'bg-emerald-500' }
  };
  const theme = themes[color];

  return (
    <div className="bg-white border border-slate-100 rounded-[35px] p-7 shadow-sm min-h-[500px]">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.bg} ${theme.text}`}>{icon}</div>
          <h3 className="font-bold text-[14px] uppercase tracking-[0.1em] text-slate-700">{title}</h3>
        </div>
        <span className={`h-8 min-w-[32px] px-2.5 flex items-center justify-center rounded-full text-[13px] font-black text-white ${theme.badge}`}>{count}</span>
      </div>
      <div className="space-y-5">
        {projects.map((p) => (
          <div 
            key={p._id} 
            onClick={() => navigate(`/project/${p._id}`)}
            className="p-6 bg-white border border-slate-100 rounded-[30px] hover:shadow-xl transition-all cursor-pointer group"
          >
            <h4 className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600">{p.title}</h4>
            <div className="mt-5 pt-5 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              <span>Manage Assets</span>
              <Plus size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;