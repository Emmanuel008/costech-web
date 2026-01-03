import React, { useState } from 'react';
import '../styles/pages/FellowshipsGrantsPage.css';

const FellowshipsGrantsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const programs = [
    {
      id: 1,
      status: 'open',
      statusText: 'Open',
      title: 'Horizon Europe - Funding Programmes and Open Calls',
      description: 'Horizon Europe is the EU\'s key funding programme for research and innovation. It tackles climate change, helps to achieve the UN\'s Sustainable Development Goals and boosts the EU\'s competitiveness and growth.',
      url: 'https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en'
    },
    {
      id: 2,
      status: 'open',
      statusText: 'Open',
      title: 'ICGEB Fellowship Programme',
      description: 'The ICGEB Fellowship Programme offers long-term fellowships for research in Life Sciences at ICGEB Component laboratories in Trieste (Italy), New Delhi (India) and Cape Town (South Africa).',
      url: 'https://www.icgeb.org/fellowship/?utm_source=brevo&utm_campaign=nome-campagna&utm_medium=email'
    },
    {
      id: 3,
      status: 'open',
      statusText: 'Open',
      title: 'ICGEB Grants Programme',
      description: 'The ICGEB Grants Programme supports research projects in basic science, human healthcare, industrial and agricultural biotechnology and bioenergy. Grants are awarded to researchers in ICGEB Member States.',
      url: 'https://www.icgeb.org/grants/?utm_source=brevo&utm_campaign=nome-campagna&utm_medium=email'
    },
    {
      id: 4,
      status: 'open',
      statusText: 'Open',
      title: 'ICGEB Meetings and Courses',
      description: 'ICGEB organizes scientific meetings, courses and workshops to promote scientific exchange and capacity building in biotechnology and related fields.',
      url: 'https://www.icgeb.org/meeting-and-courses/'
    },
    {
      id: 5,
      status: 'open',
      statusText: 'Open',
      title: 'ICGEB Call for Proposal - Meetings and Courses',
      description: 'ICGEB offers support for organizing scientific meetings, courses and workshops. Apply to host events that contribute to scientific knowledge exchange and capacity building.',
      url: 'https://www.icgeb.org/meeting-and-courses/call-for-proposal-meeting-and-courses/'
    },
    {
      id: 6,
      status: 'open',
      statusText: 'Open',
      title: 'EDCTP Calls for Proposals',
      description: 'The European & Developing Countries Clinical Trials Partnership (EDCTP) funds collaborative research projects that accelerate the development of new or improved interventions against poverty-related diseases in sub-Saharan Africa.',
      url: 'https://www.edctp.org/funding/calls-for-proposals-2/'
    },
    {
      id: 7,
      status: 'open',
      statusText: 'Open',
      title: 'SGCI Africa Funding Opportunities',
      description: 'The Science Granting Councils Initiative in Sub-Saharan Africa (SGCI) provides funding opportunities to support research and innovation across African countries.',
      url: 'https://sgciafrica.org/funding/'
    },
    {
      id: 8,
      status: 'open',
      statusText: 'Open',
      title: 'Wellcome Research Funding',
      description: 'Wellcome supports discovery research into life, health and wellbeing, and we\'re taking on three worldwide health challenges: mental health, infectious disease and climate and health.',
      url: 'https://wellcome.org/research-funding'
    }
  ];

  return (
    <section className="fellowships-grants-page">
      <div className="fellowships-grants-hero">
        <div className="fellowships-grants-hero-content">
          <h1>FUNDING OPPORTUNITIES</h1>
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
              <a href={program.url} target="_blank" rel="noopener noreferrer" className="program-title-link">
                <h3 className="program-title">{program.title}</h3>
              </a>
              <p className="program-description">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FellowshipsGrantsPage;

