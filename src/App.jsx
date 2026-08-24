import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import Jobs from './pages/Jobs/Jobs';
import Profile from './pages/Profile/Profile';
import Community from './pages/Community/Community';
import Portfolio from './pages/Portfolio/Portfolio';
import Learning from './pages/Learning/Learning';
import Freelance from './pages/Freelance/Freelance';
import Privacy from './pages/Info/Privacy';
import Terms from './pages/Info/Terms';
import Contact from './pages/Info/Contact';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;