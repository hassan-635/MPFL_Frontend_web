import React from 'react';
import LoginHeader from '../components/Loginpage/LoginHeader.jsx';
import LoginForm from '../components/Loginpage/LoginForm';
import LoginSidebar from '../components/Loginpage/LoginSidebar';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 selection:bg-blue-100">
      {/* Left Column */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">
            <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 mb-12 transition-colors">
                ← Back to Home
            </Link>

          <LoginHeader />
          <LoginForm />
          
          <p className="mt-8 text-center text-sm font-bold text-slate-400">
            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Request Access</a>
          </p>
        </div>
      </div>

      {/* Right Column */}
      <LoginSidebar />
    </div>
  );
};

export default LoginPage;