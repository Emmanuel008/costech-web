import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { directorates } from '../data/directorates';
import '../styles/pages/DirectoratesPage.css';

// Mapping of director names to their management profile slugs
const directorSlugMap = {
  'Eng. Samson John Mwela, ndc': 'mr-samson-mwela',
  'Mr. Samson Mwela': 'mr-samson-mwela',
  'Dr. Bugwesa Katale': 'dr-bugwesa-katale',
  'Mr. Imanuel Mgonja': 'mr-imanuel-mgonja',
  'Dr. Erasto Shemu Mlyuka': 'dr-athuman-m-ngumia', // Note: This might need updating if the actual director changes
};

// Function to convert director name to slug format
const nameToSlug = (name) => {
  // First check if there's a direct mapping
  if (directorSlugMap[name]) {
    return directorSlugMap[name];
  }
  
  // Otherwise, generate slug from name
  return name
    .toLowerCase()
    .replace(/\./g, '') // Remove periods
    .replace(/,/g, '') // Remove commas
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

const DirectoratesPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleDownload = (file) => {
    // In a real application, this would trigger a download
    // For now, we'll just log it or open in a new tab
    console.log('Downloading:', file);
    // You can implement actual download logic here
  };

  return (
    <section className="directorates-page">
      <div className="directorates-hero">
        <div className="directorates-hero-overlay" />
        <div className="directorates-hero-content">
          <h1>Directorates and Units</h1>
          <p>
            COSTECH operates through five directorates, each playing a crucial role in advancing
            science, technology, and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="directorates-container">
        <div className="directorates-grid">
          {directorates.map((directorate, index) => (
            <button
              key={directorate.id}
              className={`directorate-card ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <span className="directorate-card-text">{directorate.name}</span>
            </button>
          ))}
        </div>

        <div className="directorates-content">
          {directorates.map((directorate, index) => (
            <div
              key={directorate.id}
              className={`directorate-section ${activeTab === index ? 'active' : ''}`}
            >
              {/* About the Directorate */}
              <div className="directorate-section-block about-directorate">
                <div className="section-content">
                  <h2 className="section-title">About the {directorate.name}</h2>
                  <div className="section-text">
                    {directorate.about.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                  {directorate.director.name && (
                    <div className="director-link-section">
                      <p className="director-link-label">Director:</p>
                      <Link
                        to={`/about/top-management/${nameToSlug(directorate.director.name)}`}
                        className="director-link"
                      >
                        {directorate.director.name}
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Combined Sections */}
              <div className="directorate-section-block combined-sections">
                <div className="section-content">
                  {/* Core Roles */}
                  <div className="combined-section-item">
                    <div className="section-header">
                      <h3 className="section-number">1.</h3>
                      <h3 className="section-title">Core Roles and Mandate</h3>
                    </div>
                    <p className="section-intro">
                      {directorate.name} performs the following core roles on behalf of COSTECH:
                    </p>
                    <ol className="roles-list">
                      {directorate.coreRoles.map((role, idx) => (
                        <li key={idx}>{role}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Programmes */}
                  {directorate.programmes && directorate.programmes.length > 0 && (
                    <div className="combined-section-item">
                      <div className="section-header">
                        <h3 className="section-number">2.</h3>
                        <h3 className="section-title">Programmes and Initiatives</h3>
                      </div>
                      {directorate.programmes.map((programme, idx) => (
                        <div key={idx} className="programme-item">
                          <h4 className="programme-title">
                            3.{idx + 1} {programme.title}
                          </h4>
                          <p className="programme-description">{programme.description}</p>
                          <ul className="programme-items">
                            {programme.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <span className="programme-item-label">
                                  {String.fromCharCode(97 + itemIdx)})
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Services */}
                  {directorate.services && directorate.services.length > 0 && (
                    <div className="combined-section-item">
                      <div className="section-header">
                        <h3 className="section-number">
                          {(() => {
                            let num = 2;
                            if (directorate.programmes && directorate.programmes.length > 0) num++;
                            return num;
                          })()}.
                        </h3>
                        <h3 className="section-title">Services</h3>
                      </div>
                      {typeof directorate.services[0] === 'string' ? (
                        // Simple list format (e.g., DRCP)
                        <ul className="roles-list">
                          {directorate.services.map((service, idx) => (
                            <li key={idx}>{service}</li>
                          ))}
                        </ul>
                      ) : (
                        // Categorized format (e.g., DKM)
                        <div className="services-categories">
                          {directorate.services.map((serviceCategory, idx) => (
                            <div key={idx} className="service-category">
                              <h4 className="service-category-title">{serviceCategory.category}</h4>
                              {serviceCategory.description && (
                                <p className="service-category-description">{serviceCategory.description}</p>
                              )}
                              <ul className="service-items">
                                {serviceCategory.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Downloads */}
              <div className="directorate-section-block">
                <h3 className="section-number">
                  {(() => {
                    let sectionNum = 2;
                    if (directorate.programmes && directorate.programmes.length > 0) sectionNum++;
                    if (directorate.services && directorate.services.length > 0) sectionNum++;
                    return sectionNum;
                  })()}.
                </h3>
                <div className="section-content">
                  <h3 className="section-title">Downloads</h3>
                  <div className="downloads-table-wrapper">
                    <table className="downloads-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Document Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {directorate.downloads.map((download, idx) => (
                          <tr key={download.id}>
                            <td className="download-number">{idx + 1}</td>
                            <td className="download-name">{download.name}</td>
                            <td className="download-action">
                              <button
                                className="download-btn"
                                onClick={() => handleDownload(download.file)}
                                aria-label={`Download ${download.name}`}
                                title="Download"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 2.5V12.5M10 12.5L6.25 8.75M10 12.5L13.75 8.75"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.5 15V16.25C2.5 17.0784 3.17157 17.75 4 17.75H16C16.8284 17.75 17.5 17.0784 17.5 16.25V15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DirectoratesPage;

