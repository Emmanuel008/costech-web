import React, { useState } from 'react';
import '../styles/pages/ConnectivityDashboardPage.css';

const ConnectivityDashboardPage = () => {
  const [activeSegment, setActiveSegment] = useState('institution');

  const segments = {
    institution: {
      title: 'Connectivity per Institution',
      description: 'View network connections and partnerships by institution type',
      data: [
        { category: 'Teachers Training Colleges (TTCs)', count: 25 },
        { category: 'HLIs/TVET', count: 11 },
        { category: 'Research Institutions', count: 2 }
      ]
    },
    repository: {
      title: 'Repository',
      description: 'Access and explore research repositories and knowledge databases',
      data: []
    }
  };

  return (
    <section className="connectivity-dashboard-page">
      <div className="connectivity-dashboard-container">
        <div className="connectivity-dashboard-header">
          <a href="/dashboard" className="back-link">← Back to Dashboard</a>
          <h1 className="connectivity-dashboard-title">Connectivity Dashboard</h1>
          <p className="connectivity-dashboard-subtitle">
            Comprehensive insights into network connections, partnerships, and collaborative initiatives
          </p>
        </div>

        <div className="connectivity-segments-tabs">
          {Object.keys(segments).map((key) => (
            <button
              key={key}
              className={`connectivity-segment-tab ${activeSegment === key ? 'active' : ''}`}
              onClick={() => setActiveSegment(key)}
            >
              {segments[key].title}
            </button>
          ))}
        </div>

        <div className="connectivity-segments-content">
          {Object.keys(segments).map((key) => {
            const segment = segments[key];
            if (activeSegment !== key) return null;

            return (
              <div key={key} className="connectivity-segment-section">
                <div className="connectivity-segment-header">
                  <h2 className="connectivity-segment-title">{segment.title}</h2>
                  <p className="connectivity-segment-description">{segment.description}</p>
                </div>

                <div className="connectivity-segment-data">
                  {key === 'institution' ? (
                    <div className="institution-list">
                      {segment.data.map((item, index) => (
                        <div key={index} className="institution-card">
                          <div className="institution-header">
                            <h3 className="institution-name">{item.category}</h3>
                          </div>
                          <div className="institution-stats">
                            <div className="institution-stat">
                              <span className="stat-value">{item.count}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="repository-table-container">
                      <div className="repository-table-title">
                        <h3>LIST OF TANZANIA JOURNALS</h3>
                      </div>
                      <div className="repository-empty-state">
                        <p>No repository data available at this time.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConnectivityDashboardPage;
