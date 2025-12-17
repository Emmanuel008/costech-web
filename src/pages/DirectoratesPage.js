import React, { useState } from 'react';
import { directorates } from '../data/directorates';
import '../styles/pages/DirectoratesPage.css';

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
        <div className="directorates-tabs">
          {directorates.map((directorate, index) => (
            <button
              key={directorate.id}
              className={`directorates-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {directorate.name}
            </button>
          ))}
        </div>

        <div className="directorates-content">
          {directorates.map((directorate, index) => (
            <div
              key={directorate.id}
              className={`directorate-section ${activeTab === index ? 'active' : ''}`}
            >
              {/* Director Message */}
              <div className="directorate-message-card">
                <div className="director-info">
                  <h2>Message from the {directorate.director.title.split(',')[0]}</h2>
                  <div className="director-quote">
                    <svg
                      className="quote-icon"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 17H10C11.1 17 12 16.1 12 15V11C12 9.9 11.1 9 10 9H8V7C8 5.9 8.9 5 10 5H12V1H8C5.8 1 4 2.8 4 5V15C4 16.1 4.9 17 6 17Z"
                        fill="#b97c07"
                        fillOpacity="0.3"
                      />
                      <path
                        d="M14 17H18C19.1 17 20 16.1 20 15V11C20 9.9 19.1 9 18 9H16V7C16 5.9 16.9 5 18 5H20V1H16C13.8 1 12 2.8 12 5V15C12 16.1 12.9 17 14 17Z"
                        fill="#1e40af"
                        fillOpacity="0.3"
                      />
                    </svg>
                    <p className="director-message">"{directorate.director.message}"</p>
                  </div>
                  <div className="director-signature">
                    <p className="director-name">{directorate.director.name}</p>
                    <p className="director-title">{directorate.director.title}</p>
                  </div>
                </div>
              </div>

              {/* Combined Sections 1, 2, and 3 */}
              <div className="directorate-section-block combined-sections">
                <div className="section-content">
                  {/* About Section */}
                  <div className="combined-section-item">
                    <div className="section-header">
                      <h3 className="section-number">1.</h3>
                      <h3 className="section-title">About the {directorate.name.split('(')[0].trim()}</h3>
                    </div>
                    <div className="section-text">
                      {directorate.about.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Core Roles */}
                  <div className="combined-section-item">
                    <div className="section-header">
                      <h3 className="section-number">2.</h3>
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
                  <div className="combined-section-item">
                    <div className="section-header">
                      <h3 className="section-number">3.</h3>
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
                </div>
              </div>

              {/* Downloads */}
              <div className="directorate-section-block">
                <h3 className="section-number">4.</h3>
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

