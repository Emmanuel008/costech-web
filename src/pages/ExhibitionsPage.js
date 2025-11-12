import React from 'react';
import './ExhibitionsPage.css';

const ExhibitionsPage = () => {
  return (
    <section className="exhibitions-page">
      <div className="exhibitions-hero">
        <div className="exhibitions-hero-overlay" />
        <div className="exhibitions-hero-content">
          <h1>Exhibitions</h1>
          <p>
            Showcasing the latest advancements in science, technology and innovation through
            exhibitions across Tanzania
          </p>
        </div>
      </div>

      <div className="exhibitions-body">
        <div className="exhibitions-content">
          <div className="exhibitions-main-card">
            <h2>About Exhibitions</h2>
            <p>
              Exhibitions function as a communicator of ideas, it seeks to convey additional
              messages that elaborate on that theme and provide new information or perspectives.
              COSTECH organizes, participates and sponsors various exhibitions in the country as part
              of showcasing the latest advancements in science, technology and innovation.
            </p>
            <p>
              These exhibitions are used as a platform to showcase and express to the community
              various STI activities and publications which have been accomplished in a specific
              period. COSTECH regularly participates in various exhibitions in the country such as:
            </p>

            <div className="exhibitions-list">
              <div className="exhibitions-list-item">
                <div className="exhibitions-list-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Dar es Salaam International Trade Fair (Sabasaba)</h3>
                  <p>Annual international trade fair showcasing innovations and technologies</p>
                </div>
              </div>

              <div className="exhibitions-list-item">
                <div className="exhibitions-list-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Annual National STI Competition and Exhibitions (MAKISATU)</h3>
                  <p>National competition showcasing science, technology and innovation achievements</p>
                </div>
              </div>

              <div className="exhibitions-list-item">
                <div className="exhibitions-list-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3>Annual National SIDO Exhibitions</h3>
                  <p>Small Industries Development Organization exhibitions promoting local innovations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsPage;

