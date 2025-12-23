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
import CommunityEngagementsPage from './pages/CommunityEngagementsPage';
import ProjectsPage from './pages/ProjectsPage';
import EDCTPPage from './pages/EDCTPPage';
import FAQsPage from './pages/FAQsPage';
import DashboardPage from './pages/DashboardPage';
import InnovationDashboardPage from './pages/InnovationDashboardPage';
import ResearchDashboardPage from './pages/ResearchDashboardPage';
import FinancialAuditPage from './pages/FinancialAuditPage';
import ConnectivityDashboardPage from './pages/ConnectivityDashboardPage';
import DisseminationDashboardPage from './pages/DisseminationDashboardPage';
import DirectoratesPage from './pages/DirectoratesPage';
import WhatWeOfferPage from './pages/WhatWeOfferPage';
import JournalsPage from './pages/JournalsPage';
import Footer from './components/Footer';
import Contact from './components/Contact';
import './styles/App.css';

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
            {/* Publications Routes */}
            <Route path="/publication/reports" element={<ReportsPage />} />
            <Route path="/publication/guidelines" element={<GuidelinesPage />} />
            <Route path="/publication/strategic-plans" element={<StrategicPlanPage />} />
            <Route path="/publication/policy" element={<ResearchTechnologyPolicyPage />} />
            <Route path="/publication/magazine" element={<ResearchInnovationMagazinePage />} />
            <Route path="/publications/journals" element={<JournalsPage />} />
            <Route path="/publications/magazine" element={<ResearchInnovationMagazinePage />} />
            <Route path="/publications/books" element={<ReportsPage />} />
            <Route path="/publications/reports" element={<ReportsPage />} />
            <Route path="/publications/acts-legal" element={<ResearchTechnologyPolicyPage />} />
            <Route path="/publications/policies" element={<ResearchTechnologyPolicyPage />} />
            <Route path="/publications/strategic-plan" element={<StrategicPlanPage />} />
            <Route path="/publications/guidelines-documents" element={<GuidelinesPage />} />
            {/* Events Routes */}
            <Route path="/events/conferences" element={<ConferencePage />} />
            <Route path="/events/exhibitions" element={<ExhibitionsPage />} />
            <Route path="/events/workshops-seminars" element={<WorkshopsSeminarsPage />} />
            <Route path="/events/community-engagements" element={<CommunityEngagementsPage />} />
            <Route path="/research/edctp" element={<EDCTPPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/innovation" element={<InnovationDashboardPage />} />
            <Route path="/dashboard/research" element={<ResearchDashboardPage />} />
            <Route path="/dashboard/connectivity" element={<ConnectivityDashboardPage />} />
            <Route path="/dashboard/dissemination" element={<DisseminationDashboardPage />} />
            <Route path="/directorates" element={<DirectoratesPage />} />
            <Route path="/what-we-offer" element={<WhatWeOfferPage />} />
            <Route path="/resources/news" element={<NewsPage />} />
            <Route path="/resources/publication-video" element={<PublicationVideoPage />} />
            {/* Media Centre Routes */}
            <Route path="/media/newsletter" element={<NewsPage />} />
            <Route path="/media/press-release" element={<NewsPage />} />
            <Route path="/media/public-notes" element={<NewsPage />} />
            <Route path="/media/statements" element={<NewsPage />} />
            <Route path="/media/news-room" element={<NewsPage />} />
            <Route path="/media/costech-video" element={<PublicationVideoPage />} />
            {/* Projects Route */}
            <Route path="/projects" element={<ProjectsPage />} />
            {/* Financial Audit Route */}
            <Route path="/financial-audit" element={<FinancialAuditPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
