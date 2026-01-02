import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Download, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Aapki api.js ke mutabiq base URL
const API_BASE_URL = 'https://mpfl-backend.onrender.com/api/v1';

const ClientView = () => {
  const [token, setToken] = useState('');
  const [project, setProject] = useState(null);
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 1. FETCH DATA (Following fetchProjectByToken logic)
  const handleAccess = async (e) => {
    if (e) e.preventDefault();
    if (!token.trim()) return;

    setLoading(true);
    try {
      // Mobile logic: API.get(`/client/shared/${shareableToken}`)
      const res = await axios.get(`${API_BASE_URL}/client/shared/${token}`);
      setProject(res.data.project);
      setProofs(res.data.proofs);
      setAccessGranted(true);
    } catch (err) {
      console.error(err);
      alert("Invalid link or project not found.");
    } finally {
      setLoading(false);
    }
  };

  // 2. FEEDBACK LOGIC (Exact Mobile App Match)
  const handleFeedback = async (decision) => {
    // Normalize to match backend expectation ("Accepted" or "Rejected")
    const normalizedDecision = decision.charAt(0).toUpperCase() + decision.slice(1).toLowerCase();

    // Agar mobile app feedback mang rahi hai, toh handle karein
    if (!comment.trim() && normalizedDecision === 'Rejected') {
      return alert("Please enter a comment for revisions.");
    }

    if (!project?._id) {
      return alert("Project not loaded. Please access with a valid token first.");
    }

    setSubmitting(true);
    try {
      // Bulk feedback at project level as per backend routes
      console.log('Submitting feedback', { projectId: project._id, decision: normalizedDecision, comment });
      const res = await axios.put(`${API_BASE_URL}/client/bulk-feedback/${project._id}`, {
        clientFeedback: {
          name: 'Client',
          email: '',
          comment: comment,
          decision: normalizedDecision, // "Accepted" or "Rejected"
        }
      });

      if (res.status === 200 || res.status === 201) {
        alert(`Project ${normalizedDecision} Successfully!`);
        setComment('');
        // Refresh data
        const refresh = await axios.get(`${API_BASE_URL}/client/shared/${token}`);
        setProject(refresh.data.project);
        setProofs(refresh.data.proofs);
      }
    } catch (err) {
      console.error("Feedback Error:", err.response?.data);
      alert(err.response?.data?.message || "Could not submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- TOKEN LOGIN UI ---
  if (!accessGranted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <form onSubmit={handleAccess} className="bg-white p-10 rounded-[30px] shadow-xl max-w-md w-full text-center">
          <ShieldCheck size={50} className="mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-black mb-6">Client Access</h2>
          <input 
            type="text" 
            placeholder="Enter Shareable Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-4 bg-slate-100 rounded-2xl mb-4 text-center font-bold"
          />
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "ACCESS PROJECT"}
          </button>
        </form>
      </div>
    );
  }

  // --- MAIN PORTAL UI ---
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-2">{project?.title}</h1>
        <p className="text-slate-500 mb-10">{project?.description}</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Deliverables */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Files to Review</h3>
            {proofs.map((file, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-600" />
                  <span className="font-bold text-sm">Version {i + 1}</span>
                </div>
                <button onClick={() => window.open(file.imageUrl || file.fileUrl, '_blank')} className="text-slate-400">
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Feedback Form */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Your Feedback</h3>
            <textarea 
              className="w-full h-32 bg-slate-50 rounded-2xl p-4 mb-6 outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="Write your comments here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-4">
              <button 
                onClick={() => handleFeedback('Rejected')}
                disabled={submitting}
                className="flex-1 py-4 border-2 border-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-50"
              >
                REQUEST REVISION
              </button>
              <button 
                onClick={() => handleFeedback('Accepted')}
                disabled={submitting}
                className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100"
              >
                ACCEPT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientView;
