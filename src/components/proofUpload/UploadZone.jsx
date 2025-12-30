import React from 'react';
import { Upload, Loader2 } from 'lucide-react';

const UploadZone = ({ uploading, onUpload }) => (
  <div className="relative">
    <input 
      type="file" 
      id="fileUpload" 
      className="hidden" 
      onChange={onUpload} 
      disabled={uploading}
    />
    <label 
      htmlFor="fileUpload"
      className="group cursor-pointer flex flex-col items-center justify-center border-4 border-dashed border-slate-100 rounded-[50px] py-24 hover:border-blue-200 hover:bg-blue-50/10 transition-all duration-500"
    >
      <div className="w-20 h-20 bg-white shadow-xl rounded-[28px] flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500 mb-6">
        {uploading ? <Loader2 className="animate-spin" /> : <Upload size={32} />}
      </div>
      <p className="text-xl font-black text-slate-900 mb-2 tracking-tight">
        {uploading ? 'Processing Assets...' : 'Upload New Proof'}
      </p>
      <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">JPG, PNG, PDF up to 10MB</p>
    </label>
  </div>
);

export default UploadZone;