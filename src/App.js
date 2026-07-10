import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomepageStats from './components/HomepageStats';
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
import AuditedReportsPage from './pages/AuditedReportsPage';
import ReportsPage from './pages/ReportsPage';
import GuidelinesPage from './pages/GuidelinesPage';
import StrategicPlanPage from './pages/StrategicPlanPage';
import ResearchTechnologyPolicyPage from './pages/ResearchTechnologyPolicyPage';
import ResearchInnovationMagazinePage from './pages/ResearchInnovationMagazinePage';
import BooksPage from './pages/BooksPage';
import ActsAndLegalPage from './pages/ActsAndLegalPage';
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
import ConnectivityDashboardPage from './pages/ConnectivityDashboardPage';
import DisseminationDashboardPage from './pages/DisseminationDashboardPage';
import DirectoratesPage from './pages/DirectoratesPage';
import WhatWeOfferPage from './pages/WhatWeOfferPage';
import FellowshipsGrantsPage from './pages/FellowshipsGrantsPage';
import FellowshipGrantDetailPage from './pages/FellowshipGrantDetailPage';
import JournalsPage from './pages/JournalsPage';
import NewsletterPage from './pages/NewsletterPage';
import StatementPage from './pages/StatementPage';
import PressReleasePage from './pages/PressReleasePage';
import CostechFundedProjectsPage from './pages/CostechFundedProjectsPage';
import CostechFundedProjectDetailPage from './pages/CostechFundedProjectDetailPage';
import HeroDetailPage from './pages/HeroDetailPage';
import FeedbackPage from './pages/FeedbackPage';
import Footer from './components/Footer';
import Contact from './components/Contact';
import './styles/App.css';

function Home() {
  return (
    <>
      <Hero />
      {/*<HomepageStats />*/}
      <News />
      <SectionDivider />
      <Partners />
    </>
  );
}

function App() {
  useEffect(() => {
    // Rafiki AI Chat Widget Configuration
    const widgetConfig = {
      apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaUlkIjoiMTc2ODIxOTYyNzg1OC03MzU3ZTIwMCIsInVzZXJJZCI6IjE3NjgyMTkzMjYzNDAtODQwYTc5N2EiLCJ0eXBlIjoid2lkZ2V0IiwiaWF0IjoxNzY4MjE5NjI5LCJleHAiOjE3OTk3NTU2Mjl9.-zpwyjlxfdwpvVdNXE6Qc0BYyK8Apmlb8OrrMvd-4zI',
      assistantId: '1768219627858-7357e200',
      apiEndpoint: 'https://rafikiaicompany.com',
      autoFetchConfig: true,
      autoRefreshInterval: 0,
      fallbackConfig: {
        title: 'STI Assistant',
        subtitle: 'The Assistant will assist on STI related issues',
        welcomeMessage: 'Hello! How can I assist you today?',
        logoUrl: 'https://rafikiaicompany.com/uploads/widget-logos/1768219624956-1764231976276-chat.png',
        primaryColor: '#b97c07',
        position: 'bottom-right',
        showBranding: true,
        allowTranscript: true,
        allowAttachments: false
      },
      debug: false
    };

    // Function to initialize widget
    function initRafikiWidget() {
      // Check if RafikiChat is already available (script already loaded)
      if (window.RafikiChat && typeof window.RafikiChat.init === 'function') {
        // Script already loaded, initialize immediately
        try {
          window.RafikiChat.init(widgetConfig);
        } catch (error) {
          console.error('Rafiki Chat Widget: Initialization error', error);
        }
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="chat-widget.js"]');
      if (existingScript) {
        // Script is already being loaded, wait for it and then initialize
        const checkInterval = setInterval(function() {
          if (window.RafikiChat && typeof window.RafikiChat.init === 'function') {
            clearInterval(checkInterval);
            try {
              window.RafikiChat.init(widgetConfig);
            } catch (error) {
              console.error('Rafiki Chat Widget: Initialization error', error);
            }
          }
        }, 100);

        // Stop checking after 10 seconds
        setTimeout(function() {
          clearInterval(checkInterval);
        }, 10000);
        return;
      }

      // Script not loaded yet, load it now
      const script = document.createElement('script');
      var cacheBuster = Date.now();
      script.src = 'https://rafikiaicompany.com/widget/chat-widget.js?v=latest&t=' + cacheBuster;
      script.async = true;
      script.defer = true;

      // Retry counter
      let retryCount = 0;
      const maxRetries = 10;

      function tryInit() {
        if (window.RafikiChat && typeof window.RafikiChat.init === 'function') {
          try {
            window.RafikiChat.init(widgetConfig);
          } catch (error) {
            console.error('Rafiki Chat Widget: Initialization error', error);
          }
        } else if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(tryInit, 200);
        } else {
          console.error('Rafiki Chat Widget: Failed to initialize after ' + maxRetries + ' attempts.');
          console.error('Please ensure the embed code is added to a SHARED template (header/footer) that loads on every page.');
        }
      }

      script.onload = function() {
        // Wait a bit for RafikiChat to be available
        setTimeout(tryInit, 100);
      };

      script.onerror = function() {
        console.error('Rafiki Chat Widget: Failed to load script from https://rafikiaicompany.com/widget/chat-widget.js');
        console.error('Please check:');
        console.error('1. The script URL is correct');
        console.error('2. Your server allows loading scripts from this domain');
        console.error('3. There are no CORS or network errors');
        console.error('4. The embed code is added to a SHARED template (header/footer) that loads on every page');
      };

      // Append to head or body
      if (document.head) {
        document.head.appendChild(script);
      } else if (document.body) {
        document.body.appendChild(script);
      } else {
        // Wait for DOM
        document.addEventListener('DOMContentLoaded', function() {
          if (document.head) {
            document.head.appendChild(script);
          } else if (document.body) {
            document.body.appendChild(script);
          }
        });
      }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initRafikiWidget);
    } else {
      // DOM is already ready
      initRafikiWidget();
    }

    // Cleanup function to remove script when component unmounts (optional)
    return () => {
      // The widget script will remain loaded, but we could clean up if needed
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hero/:id" element={<HeroDetailPage />} />
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
            <Route path="/publication/audited-reports" element={<AuditedReportsPage />} />
            <Route path="/publication/guidelines" element={<GuidelinesPage />} />
            <Route path="/publication/strategic-plans" element={<StrategicPlanPage />} />
            <Route path="/publication/policy" element={<ResearchTechnologyPolicyPage />} />
            <Route path="/publication/magazine" element={<ResearchInnovationMagazinePage />} />
            <Route path="/publications/journals" element={<JournalsPage />} />
            <Route path="/publications/magazine" element={<ResearchInnovationMagazinePage />} />
            <Route path="/publications/books" element={<BooksPage />} />
            <Route path="/publications/reports" element={<ReportsPage />} />
            <Route path="/publications/audited-reports" element={<AuditedReportsPage />} />
            <Route path="/publications/acts-legal" element={<ActsAndLegalPage />} />
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
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/customer-survey" element={<FeedbackPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/innovation" element={<InnovationDashboardPage />} />
            <Route path="/dashboard/research" element={<ResearchDashboardPage />} />
            <Route path="/dashboard/connectivity" element={<ConnectivityDashboardPage />} />
            <Route path="/dashboard/dissemination" element={<DisseminationDashboardPage />} />
            <Route path="/directorates" element={<DirectoratesPage />} />
            <Route path="/what-we-offer" element={<WhatWeOfferPage />} />
            <Route path="/fellowships-grants" element={<FellowshipsGrantsPage />} />
            <Route path="/fellowships-grants/:id" element={<FellowshipGrantDetailPage />} />
            <Route path="/resources/news" element={<NewsPage />} />
            <Route path="/resources/publication-video" element={<PublicationVideoPage />} />
            {/* Media Centre Routes */}
            <Route path="/media/news-updates" element={<NewsPage />} />
            <Route path="/media/press-release" element={<PressReleasePage />} />
            <Route path="/media/statements" element={<StatementPage />} />
            <Route path="/media/newsletter" element={<NewsletterPage />} />
            <Route path="/media/costech-videos" element={<PublicationVideoPage />} />
            {/* Projects Route */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/costech-funded" element={<CostechFundedProjectsPage />} />
            <Route path="/projects/costech-funded/:id" element={<CostechFundedProjectDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
