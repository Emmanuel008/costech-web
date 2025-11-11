import React from 'react';
import './FundingPage.css';

const stats = [
  { label: 'Innovation Grants Awarded', value: '120+' },
  { label: 'Research Calls Issued', value: '45' },
  { label: 'Institutions Engaged', value: '80+' },
  { label: 'Innovation Fund Window (TZS)', value: '5.2 B' },
];

const FundingPage = () => {
  return (
    <section className="funding-page">
      <div className="funding-hero">
        <div className="funding-hero-overlay" />
        <div className="funding-hero-content">
          <h1>Funding</h1>
          <p>
            The National Fund for Advancement of Science and Technology (NFAST) supports research and
            innovation across Tanzania. Through open and commissioned calls, COSTECH mobilises
            resources that empower researchers and innovators to solve national challenges.
          </p>
        </div>
      </div>

      <div className="funding-body">
        <section className="funding-summary">
          <article className="funding-summary-card">
            <h2>National Innovation Fund Window</h2>
            <p>
              NFAST, managed under COSTECH, offers funding through open and commissioned calls aimed
              at strategic research. Building on NFAST&apos;s experience, COSTECH has institutionalised an
              innovation fund window that increases opportunities for innovators, researchers and
              private sector actors to co-create solutions, strengthening Tanzania&apos;s National
              Innovation System.
            </p>
          </article>
          <article className="funding-summary-card funding-summary-card--highlight">
            <h3>Why it Matters</h3>
            <p>
              The innovation fund window bridges the gap between research, higher education and the
              private sector—ensuring new ideas receive the support needed to move from concept to
              impact and contribute to inclusive socio-economic growth.
            </p>
          </article>
        </section>

        <section className="funding-stats">
          {stats.map((item) => (
            <div key={item.label} className="funding-stat-card">
              <span className="funding-stat-value">{item.value}</span>
              <span className="funding-stat-label">{item.label}</span>
            </div>
          ))}
        </section>

        <section className="funding-support">
          <div className="funding-support-header">
            <h2>Support to Schools &amp; Ecosystem Partners</h2>
            <p>
              Development partners, including Sida and HDIF, have contributed resources to the
              Innovation Fund Window under NFAST, enabling more schools, innovators and businesses to
              access funding and technical support.
            </p>
          </div>
          <div className="funding-support-details">
            <div className="support-card">
              <h3>Supporting Partners</h3>
              <ul>
                <li>Sida – Swedish International Development Cooperation Agency</li>
                <li>HDIF – Human Development Innovation Fund</li>
              </ul>
            </div>
            <div className="support-card">
              <h3>Focus Areas</h3>
              <p>
                The fund prioritises initiatives that deliver measurable impact in schools and
                communities, fostering creativity, entrepreneurship, digital literacy and applied
                research partnerships.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default FundingPage;
