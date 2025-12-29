import React from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Workflow from '../components/Workflow';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Nav />
      <Hero />
      <Features />
      <Workflow />
      <Footer />
    </div>
  );
};

export default LandingPage;