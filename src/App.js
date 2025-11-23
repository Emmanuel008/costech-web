import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardCarousel from './components/CardCarousel';
import News from './components/News';
import SectionDivider from './components/SectionDivider';
import Partners from './components/Partners';
import NewsPage from './pages/NewsPage';
import PublicationVideoPage from './pages/PublicationVideoPage';
import NewsDetailPage from './pages/NewsDetailPage';
import InnovationSpacesPage from './pages/InnovationSpacesPage';
import VisionMissionPage from './pages/VisionMissionPage';
import OrganogramPage from './pages/OrganogramPage';
import CommissionMembersPage from './pages/CommissionMembersPage';
import TopManagementPage from './pages/TopManagementPage';
import ManagementProfilePage from './pages/ManagementProfilePage';
import EstablishmentPage from './pages/EstablishmentPage';
import FundingPage from './pages/FundingPage';
import ClusterInitiativePage from './pages/ClusterInitiativePage';
import IncubationPage from './pages/IncubationPage';
import ReportsPage from './pages/ReportsPage';
import GuidelinesPage from './pages/GuidelinesPage';
import StrategicPlanPage from './pages/StrategicPlanPage';
import ResearchTechnologyPolicyPage from './pages/ResearchTechnologyPolicyPage';
import ResearchInnovationMagazinePage from './pages/ResearchInnovationMagazinePage';
import ConferencePage from './pages/ConferencePage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import WorkshopsSeminarsPage from './pages/WorkshopsSeminarsPage';
import EDCTPPage from './pages/EDCTPPage';
import Footer from './components/Footer';
import Contact from './components/Contact';
import './App.css';

function Home() {
  return (
    <>
      <Hero />
      <CardCarousel />
      <News />
      <SectionDivider />
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
            <Route path="/media/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/about/establishment" element={<EstablishmentPage />} />
            <Route path="/about/vision-mission" element={<VisionMissionPage />} />
            <Route path="/about/organogram" element={<OrganogramPage />} />
            <Route path="/about/commission-members" element={<CommissionMembersPage />} />
            <Route path="/about/top-management" element={<TopManagementPage />} />
            <Route path="/about/top-management/:slug" element={<ManagementProfilePage />} />
            <Route path="/technology/funding" element={<FundingPage />} />
            <Route path="/technology/cluster-initiative" element={<ClusterInitiativePage />} />
            <Route path="/technology/innovation-spaces" element={<InnovationSpacesPage />} />
            <Route path="/technology/incubation" element={<IncubationPage />} />
            <Route path="/publication/reports" element={<ReportsPage />} />
            <Route path="/publication/guidelines" element={<GuidelinesPage />} />
            <Route path="/publication/strategic-plans" element={<StrategicPlanPage />} />
            <Route path="/publication/policy" element={<ResearchTechnologyPolicyPage />} />
            <Route path="/publication/magazine" element={<ResearchInnovationMagazinePage />} />
            <Route path="/events/conferences" element={<ConferencePage />} />
            <Route path="/events/exhibitions" element={<ExhibitionsPage />} />
            <Route path="/events/workshops-seminars" element={<WorkshopsSeminarsPage />} />
            <Route path="/research/edctp" element={<EDCTPPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources/news" element={<NewsPage />} />
            <Route path="/resources/publication-video" element={<PublicationVideoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
