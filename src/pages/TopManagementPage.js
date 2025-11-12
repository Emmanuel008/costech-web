import React from 'react';
import { Link } from 'react-router-dom';
import { directorGeneral, directors, managers } from '../data/managementProfiles';
import './TopManagementPage.css';

const TopManagementPage = () => {

  return (
    <section className="management-page">
      <div className="management-container">
        <header className="management-header">
          <h1>Top Management</h1>
          <p>
            COSTECH‘s top management team ensures the Commission delivers on its mandate to
            coordinate, promote and support science, technology and innovation for national
            development.
          </p>
        </header>

        <section className="management-section">
          <h2 className="management-section-title">Director General</h2>
          <div className="management-single">
            <article className="management-card management-card--large">
              <div className="management-card-content">
                <div className="management-image-wrapper">
                  <img src={directorGeneral.image} alt={directorGeneral.name} loading="lazy" />
                </div>
                <div className="management-card-body">
                  <h3>{directorGeneral.name}</h3>
                  <p>{directorGeneral.title}</p>
                  <div className="management-card-actions">
                    <Link
                      to={`/about/top-management/${directorGeneral.slug}`}
                      className="management-btn management-btn--primary"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="management-section">
          <h2 className="management-section-title">Directors</h2>
          <div className="management-grid">
            {directors.map((director) => (
              <article key={director.name} className="management-card">
                <div className="management-card-content">
                  <div className="management-image-wrapper">
                    <img src={director.image} alt={director.name} loading="lazy" />
                  </div>
                  <div className="management-card-body">
                    <h3>{director.name}</h3>
                    <p>{director.title}</p>
                    <div className="management-card-actions">
                      <Link
                        to={`/about/top-management/${director.slug}`}
                        className="management-btn management-btn--primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="management-section">
          <h2 className="management-section-title">Managers</h2>
          <div className="management-grid">
            {managers.map((manager) => (
              <article key={manager.name} className="management-card">
                <div className="management-card-content">
                  <div className="management-image-wrapper">
                    <img src={manager.image} alt={manager.name} loading="lazy" />
                  </div>
                  <div className="management-card-body">
                    <h3>{manager.name}</h3>
                    <p>{manager.title}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default TopManagementPage;
