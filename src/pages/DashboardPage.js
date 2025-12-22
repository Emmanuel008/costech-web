import React from 'react';
import '../styles/pages/DashboardPage.css';

const DashboardPage = () => {
  const sections = [
    {
      id: 'innovation',
      title: 'Innovation',
      description: 'Explore innovation metrics, projects, and technology transfer initiatives',
      color: 'primary',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      href: '/dashboard/innovation'
    },
    {
      id: 'research',
      title: 'Research',
      description: 'Access research permits, statistics, and research coordination data',
      color: 'blue',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      href: '/dashboard/research'
    },
    {
      id: 'connectivity',
      title: 'Connectivity',
      description: 'View network connections, partnerships, and collaborative initiatives',
      color: 'primary',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      href: '/dashboard/connectivity'
    },
    {
      id: 'dissemination',
      title: 'Dissemination',
      description: 'Disseminate scientific knowledge, research findings, and innovation outcomes to stakeholders',
      color: 'blue',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <line x1="9" y1="15" x2="13" y2="15" />
        </svg>
      ),
      href: '/dashboard/dissemination'
    }
  ];

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-description">
            A comprehensive platform for accessing and exploring data across innovation, research, connectivity, and dissemination 
            initiatives that enable various stakeholders to access information and understand the processes used in 
            science, technology, and innovation development.
          </p>
        </div>

        <div className="dashboard-cards">
          {sections.map((section) => (
            <div key={section.id} className="dashboard-card">
              <div className={`dashboard-card-top dashboard-card-top--${section.color}`}>
                <div className="dashboard-card-icon">
                  {section.icon}
                </div>
              </div>
              <div className="dashboard-card-bottom">
                <h3 className={`dashboard-card-title dashboard-card-title--${section.color}`}>{section.title}</h3>
                <p className="dashboard-card-description">{section.description}</p>
                <a href={section.href} className={`dashboard-card-button dashboard-card-button--${section.color}`}>
                  Explore →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;

