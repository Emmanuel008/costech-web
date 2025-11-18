import React from 'react';
import './VisionMissionPage.css';

const coreValues = [
  {
    title: 'Integrity',
    description:
      'We demonstrate ethics, responsibility and honesty in performing our duties at all times.',
  },
  {
    title: 'Excellence',
    description: 'We strive for best-in-class delivery of service.',
  },
  {
    title: 'Customer Focus',
    description: "We put our customers' and stakeholders’ needs first.",
  },
  {
    title: 'Professionalism',
    description:
      'We comply with laws, promote best practices and use our knowledge diligently in all work.',
  },
  {
    title: 'Accountability',
    description:
      'We promote openness and transparency to ensure timely delivery of products and services.',
  },
  {
    title: 'Teamwork',
    description:
      'We recognise and value the contribution of individuals and teams in realising our vision.',
  },
];

const VisionMissionPage = () => {
  return (
    <section className="vision-page">
      <div className="vision-hero">
        <div className="vision-hero-overlay" />
        <div className="vision-hero-content">
          <h1>Vision, Mission &amp; Core Values</h1>
          <p>
            The vision and mission presented here are as stipulated in the COSTECH rolling strategic
            plan of 2021/22 – 2025/2026. They guide the Commission’s efforts to coordinate and
            promote science, technology and innovation across the nation.
          </p>
        </div>
      </div>

      <div className="vision-content">
        <div className="vision-card">
          <span className="vision-card-tag">Vision</span>
          <h2>A nation driven by Science, Technology and Innovation.</h2>
        </div>

        <div className="vision-card">
          <span className="vision-card-tag vision-card-tag--mission">Mission</span>
          <h2>
            Ensure utilization of knowledge-based products through coordination and promotion of
            science, technology and innovation for rapid social-economic development.
          </h2>
        </div>
      </div>

      <section className="values-section">
        <div className="values-header">
          <h2>Our Core Values</h2>
          <p>In undertaking our roles and functions, we uphold the following core values:</p>
        </div>

        <div className="values-timeline">
          {coreValues.map((value, index) => (
            <article key={value.title} className="values-timeline-item">
              <div className="values-marker">
                <span>{index + 1}</span>
              </div>
              <div className="values-card-surface">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default VisionMissionPage;


