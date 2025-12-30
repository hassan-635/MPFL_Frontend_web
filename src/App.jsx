import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateProject from './pages/CreateProject';
import ProofUpload from './pages/ProofUpload';
import ClientView from './pages/ClientView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:id" element={<ProofUpload />} />
        <Route path="/client-access" element={<ClientView />} />
      </Routes>
    </Router>
  );
}

export default App;