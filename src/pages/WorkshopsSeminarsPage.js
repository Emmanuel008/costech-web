import React from 'react';
import './WorkshopsSeminarsPage.css';

const WorkshopsSeminarsPage = () => {
  return (
    <section className="workshops-seminars-page">
      <div className="workshops-seminars-hero">
        <div className="workshops-seminars-hero-overlay" />
        <div className="workshops-seminars-hero-content">
          <h1>Workshops &amp; Seminars</h1>
          <p>
            Building capacity and sharing knowledge through workshops and seminars on science,
            technology and innovation
          </p>
        </div>
      </div>

      <div className="workshops-seminars-body">
        <div className="workshops-seminars-content">
          <div className="workshops-seminars-main-card">
            <h2>About Workshops &amp; Seminars</h2>
            <p>
              COSTECH organizes workshops and seminars with the primary aim of imparting information
              in terms of a particular subject with reference to science, technology and innovation.
            </p>
            <p>
              These events serve as important platforms for knowledge sharing, capacity building, and
              fostering collaboration among researchers, innovators, policy makers, and other
              stakeholders in the STI ecosystem.
            </p>

            <div className="workshops-seminars-features">
              <div className="workshops-seminars-feature-card">
                <div className="workshops-seminars-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3>Knowledge Sharing</h3>
                <p>
                  Disseminate the latest research findings, innovations, and best practices in STI
                </p>
              </div>

              <div className="workshops-seminars-feature-card">
                <div className="workshops-seminars-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3>Capacity Building</h3>
                <p>
                  Enhance skills and competencies of participants in various STI-related fields
                </p>
              </div>

              <div className="workshops-seminars-feature-card">
                <div className="workshops-seminars-feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3>Networking</h3>
                <p>
                  Facilitate connections and collaborations among STI stakeholders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopsSeminarsPage;

