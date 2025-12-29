import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/FellowshipsGrantsPage.css';

const FellowshipsGrantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const programs = [
    {
      id: 1,
      category: 'Fellowship/Professional Development Program',
      status: 'open',
      statusText: 'Open until February 2, 2026',
      title: 'Air Force Science & Technology Fellowship Program',
      description: 'The Air Force Science & Technology Fellowship Program (AF STFP) provides nationally competitive fellowship awards for postdoctoral and senior scientists. Selected individuals have the unique opportunity to conduct independent research of their own choosing that supports the mission of the Air Force Research Laboratory.'
    },
    {
      id: 2,
      category: 'Fellowship/Professional Development Program',
      status: 'closed',
      statusText: 'Closed',
      title: 'Arab-American Frontiers of Science, Engineering, and Medicine',
      description: 'Based on the success of NAS\'s Kavli Frontiers of Science Program and NAE\'s Frontiers of Engineering, the Arab-American Frontiers of Science, Engineering, and Medicine program will initiate a series of symposia to bring together outstanding young scientists, engineers, and medical professionals from the United States and the 22 countries of the Arab League.'
    },
    {
      id: 3,
      category: 'Fellowship/Professional Development Program',
      status: 'closed',
      statusText: 'Closed',
      title: 'Army Research Laboratory Distinguished Postdoctoral Fellowships',
      description: 'Army Research Laboratory (ARL) Distinguished Postdoctoral Fellowships provide early career researchers the opportunity to pursue independent research of their own choosing that supports the mission of ARL. Fellows work alongside ARL scientists and engineers to address critical Army challenges.'
    }
  ];

  return (
    <section className="fellowships-grants-page">
      <div className="fellowships-grants-hero">
        <div className="fellowships-grants-hero-content">
          <h1>FELLOWSHIP AND GRANTS</h1>
          <p>
            The Academies offer several fellowships, grants, and awards in science, engineering, and medicine. 
            Information on eligibility guidelines and application deadlines is available on specific programs' websites.
          </p>
        </div>
      </div>

      <div className="fellowships-grants-body">
        <div className="search-section">
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-submit-btn" type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="programs-list">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-header">
                <span className={`program-status ${program.status}`}>
                  {program.statusText}
                </span>
              </div>
              <Link to={`/fellowships-grants/${program.id}`} className="program-title-link">
                <h3 className="program-title">{program.title}</h3>
              </Link>
              <p className="program-description">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FellowshipsGrantsPage;

