import React from 'react';
import './ConferencePage.css';

const ConferencePage = () => {
  return (
    <section className="conference-page">
      <div className="conference-hero">
        <div className="conference-hero-overlay" />
        <div className="conference-hero-content">
          <h1>STICE</h1>
          <p>Science, Technology and Innovation Conference and Exhibitions</p>
        </div>
      </div>

      <div className="conference-body">
        <div className="conference-content">
          <div className="conference-main-card">
            <h2>About STICE</h2>
            <p>
              Science, Technology and Innovation Conference and Exhibitions (STICE) is a national
              and multisectoral event organized every year by Tanzania Commission for Science and
              Technology (COSTECH). The objective of STICE among others, includes to provide a
              platform for national leaders such as President, Vice President or Prime Minister to
              meet with scientists, researchers, policy makers, innovators, funders, development
              partners and industry players. It is an important platform for exchanging information
              and experiences from STI activities.
            </p>
            <p>
              For more details about Conference and the exhibitions{' '}
              <button type="button" className="conference-link" onClick={() => window.open('#', '_blank')}>
                click here
              </button>
            </p>
          </div>

          <div className="conference-highlights">
            <div className="conference-highlight-card">
              <div className="conference-highlight-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3>Multisectoral Platform</h3>
              <p>
                Brings together scientists, researchers, policy makers, innovators, funders,
                development partners and industry players
              </p>
            </div>

            <div className="conference-highlight-card">
              <div className="conference-highlight-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3>Annual Event</h3>
              <p>Organized every year to showcase the latest developments in STI</p>
            </div>

            <div className="conference-highlight-card">
              <div className="conference-highlight-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3>National Leadership</h3>
              <p>
                Provides a platform for national leaders to engage with the STI community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferencePage;

