import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDirectorates } from '../services/api';
import '../styles/pages/DirectoratesPage.css';

// Mapping of director names to their management profile slugs
const directorSlugMap = {
  'Eng. Samson John Mwela, ndc': 'mr-samson-mwela',
  'Mr. Samson Mwela': 'mr-samson-mwela',
  'Dr. Bugwesa Katale': 'dr-bugwesa-katale',
  'Mr. Imanuel Mgonja': 'mr-imanuel-mgonja',
  'Dr. Erasto Shemu Mlyuka': 'dr-erasto-shemu-mlyuka', // Note: This might need updating if the actual director changes
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [directorates, setDirectorates] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchDirectorates = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiData = await getDirectorates();

        if (apiData && apiData.length > 0) {
          // Transform API data to match component structure
          const transformedDirectorates = apiData.map((item, index) => {
            // Parse service_offered JSON string
            let services = [];
            try {
              if (item.service_offered) {
                services = JSON.parse(item.service_offered);
              }
            } catch (e) {
              console.warn('Error parsing service_offered:', e);
            }

            // Parse downloads JSON string
            let downloads = [];
            try {
              if (item.downloads) {
                const parsedDownloads = JSON.parse(item.downloads);
                downloads = parsedDownloads.map((download, idx) => ({
                  id: idx + 1,
                  name: download.name || 'Document',
                  file: download.document || '',
                }));
              }
            } catch (e) {
              console.warn('Error parsing downloads:', e);
            }

            // Generate slug from name
            const slug = item.name
              ? item.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
              : `directorate-${index}`;

            return {
              id: item.id || item.uuid || index,
              name: item.name || 'Directorate',
              slug: slug,
              director: {
                name: item.director_name || '',
                title: item.director_name ? `Director, ${item.name}` : '',
                message: item.message_from_director || '',
              },
              about: item.message_from_director || item.name || 'No description available.',
              coreRoles: Array.isArray(services) ? services : [],
              programmes: [],
              services: Array.isArray(services) ? services : [],
              downloads: downloads,
            };
          });

          setDirectorates(transformedDirectorates);
          if (transformedDirectorates.length > 0) {
            setActiveTab(0);
          }
        } else {
          setDirectorates([]);
        }
      } catch (err) {
        console.error('Error fetching directorates:', err);
        setError('Failed to load directorates. Please try again later.');
        setDirectorates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectorates();
  }, []);

  const handleDownload = (file) => {
    if (file) {
      // Construct full URL if file is a relative path
      const baseUrl = 'https://costech.kingdomsolutions.co.tz/';
      const fileUrl = file.startsWith('http') ? file : `${baseUrl}${file}`;
      window.open(fileUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <section className="directorates-page">
        <div className="directorates-hero">
          <div className="directorates-hero-overlay" />
          <div className="directorates-hero-content">
            <h1>Directorates</h1>
            <p>
              COSTECH operates through directorates, each playing a crucial role in advancing
              science, technology, and innovation in Tanzania.
            </p>
          </div>
        </div>
        <div className="directorates-container">
          <div className="directorates-loading">
            <p>Loading directorates...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="directorates-page">
        <div className="directorates-hero">
          <div className="directorates-hero-overlay" />
          <div className="directorates-hero-content">
            <h1>Directorates</h1>
            <p>
              COSTECH operates through directorates, each playing a crucial role in advancing
              science, technology, and innovation in Tanzania.
            </p>
          </div>
        </div>
        <div className="directorates-container">
          <div className="directorates-error">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="directorates-page">
      <div className="directorates-hero">
        <div className="directorates-hero-overlay" />
        <div className="directorates-hero-content">
          <h1>Directorates</h1>
          <p>
            COSTECH operates through directorates, each playing a crucial role in advancing
            science, technology, and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="directorates-container">
        {directorates.length > 0 ? (
          <>
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
                      {/* Services Offered */}
                      {directorate.coreRoles && directorate.coreRoles.length > 0 && (
                        <div className="combined-section-item">
                          <div className="section-header">
                            <h3 className="section-title">Services Offered</h3>
                          </div>
                          <p className="section-intro">
                            {directorate.name} offers the following services:
                          </p>
                          <ul className="roles-list">
                            {directorate.coreRoles.map((role, idx) => (
                              <li key={idx}>{role}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Programmes */}
                      {directorate.programmes && directorate.programmes.length > 0 && (
                        <div className="combined-section-item">
                          <div className="section-header">
                            <h3 className="section-title">Programmes and Initiatives</h3>
                          </div>
                          {directorate.programmes.map((programme, idx) => (
                            <div key={idx} className="programme-item">
                              <h4 className="programme-title">
                                {programme.title}
                              </h4>
                              <p className="programme-description">{programme.description}</p>
                              <ul className="programme-items">
                                {programme.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Downloads */}
                  {directorate.downloads && directorate.downloads.length > 0 && (
                    <div className="directorate-section-block downloads-section">
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
                                <tr key={download.id || idx}>
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
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="directorates-empty">
            <p>No directorates available at this time.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DirectoratesPage;

