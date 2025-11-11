import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WelcomeNote from './components/WelcomeNote';
import News from './components/News';
import SectionDivider from './components/SectionDivider';
import LatestVideo from './components/LatestVideo';
import Partners from './components/Partners';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import InnovationSpacesPage from './pages/InnovationSpacesPage';
import VisionMissionPage from './pages/VisionMissionPage';
import OrganogramPage from './pages/OrganogramPage';
import CommissionMembersPage from './pages/CommissionMembersPage';
import TopManagementPage from './pages/TopManagementPage';
import EstablishmentPage from './pages/EstablishmentPage';
import FundingPage from './pages/FundingPage';
import Footer from './components/Footer';
import Contact from './components/Contact';
import './App.css';

function Home() {
  return (
    <>
      <Hero />
      <WelcomeNote />
      <News />
      <SectionDivider />
      <LatestVideo />
      <Partners />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/about/establishment" element={<EstablishmentPage />} />
            <Route path="/about/vision-mission" element={<VisionMissionPage />} />
            <Route path="/about/organogram" element={<OrganogramPage />} />
            <Route path="/about/commission-members" element={<CommissionMembersPage />} />
            <Route path="/about/top-management" element={<TopManagementPage />} />
            <Route path="/technology/funding" element={<FundingPage />} />
            <Route path="/technology/innovation-spaces" element={<InnovationSpacesPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
