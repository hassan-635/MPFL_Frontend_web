import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Copy, Check, Upload, FileText, 
  Download, Key, Loader2, AlertCircle, CheckCircle2 
} from 'lucide-react';

const API_BASE_URL = 'https://mpfl-backend.onrender.com/api/v1';

const ProofUpload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { fetchData(); }, [id]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const projectRes = await axios.get(`${API_BASE_URL}/projects/${id}`, { headers });
      setProject(projectRes.data);

      const proofRes = await axios.get(`${API_BASE_URL}/proofs/project/${id}`, { headers });
      setProofs(Array.isArray(proofRes.data) ? proofRes.data : (proofRes.data.proofs || []));
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
    } finally { setLoading(false); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const endpoint = `${API_BASE_URL}/proofs`;
    console.debug("Preparing upload:", { name: file.name, type: file.type, size: file.size, endpoint, projectId: id });
    
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const fd = new FormData();
      fd.append('files', file, file.name);
      fd.append('projectId', id);
      await axios.post(endpoint, fd, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      fetchData();
      alert("Uploaded successfully!");
    } catch (err) {
      console.error("Upload Error:", err);
      console.error("Server response:", err.response?.status, err.response?.data);
      const serverMsg = err.response?.data?.message || JSON.stringify(err.response?.data) || err.message;
      alert(`Server Error (${err.response?.status || 'unknown'}): ${serverMsg}`);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  // Sidebar download fix
  const triggerDownload = (url) => {
    if (!url) return alert("Link missing");
    window.open(url, '_blank');
  };

  if (loading || !project) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-8 h-screen sticky top-0 overflow-y-auto">
        <Link to="/dashboard" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-12 block">
          <ArrowLeft size={14} className="inline mr-2" /> Back
        </Link>
        <div className="space-y-10">
            <section>
                <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-4">Assets</h3>
                {proofs.map((p, i) => (
                    <div key={i} className="p-3 mb-2 bg-slate-50 border rounded-xl flex justify-between items-center group">
                        <span className="text-[11px] font-bold">Asset_{i+1}</span>
                        <button onClick={() => triggerDownload(p.imageUrl || p.fileUrl)} className="text-slate-400 hover:text-blue-600">
                          <Download size={14} />
                        </button>
                    </div>
                ))}
            </section>
        </div>
      </aside>

      <main className="flex-1 p-16 flex flex-col items-center">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-black mb-10">{project.title}</h1>
          
          

          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[40px] py-24 mb-10 group hover:border-blue-500 transition-all">
            <input type="file" id="f" className="hidden" onChange={handleUpload} disabled={uploading} />
            <label htmlFor="f" className="cursor-pointer">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {uploading ? <Loader2 className="animate-spin text-blue-600" /> : <Upload size={30} className="text-slate-300" />}
              </div>
              <p className="font-black text-slate-700">{uploading ? 'Uploading...' : 'Drop File Here'}</p>
            </label>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl flex items-center justify-between">
            <div className="text-left ml-2">
                <p className="text-[8px] text-blue-400 font-black uppercase">Project Token</p>
                <p className="text-white font-mono text-sm">{project.shareableToken}</p>
            </div>
            <button onClick={() => {navigator.clipboard.writeText(project.shareableToken); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} 
                    className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">
                {copied ? 'Copied!' : 'Copy Token'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProofUpload;
