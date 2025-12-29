import React from 'react';
import { Link } from 'react-router-dom';
import SignupHeader from '../components/Signuppage/SignupHeader';
import SignupForm from '../components/Signuppage/SignupForm';
import SignupSidebar from '../components/Signuppage/SignupSidebar';

const SignupPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 selection:bg-blue-100">
      <div className="flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-12 transition-colors">
             ← Back to Home
          </Link>
          <SignupHeader />
          <SignupForm />
          <p className="mt-8 text-center text-sm font-bold text-slate-400">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
      <SignupSidebar />
    </div>
  );
};

export default SignupPage;