import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProfileBySlug, directorGeneral, directors } from '../data/managementProfiles';
import './ManagementProfilePage.css';

const ManagementProfilePage = () => {
  const { slug } = useParams();
  const profile = getProfileBySlug(slug);

  if (!profile) {
    return (
      <section className="management-profile-page">
        <div className="management-profile-container">
          <div className="management-profile-not-found">
            <h1>Profile Not Found</h1>
            <p>The management profile you're looking for doesn't exist.</p>
            <Link to="/about/top-management" className="management-profile-back-btn">
              Back to Top Management
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedProfiles = [...directors, directorGeneral]
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <section className="management-profile-page">
      <div className="management-profile-container">
        <Link to="/about/top-management" className="management-profile-back-link">
          ← Back to Top Management
        </Link>

        <div className="management-profile-main">
          <div className="management-profile-header">
            <div className="management-profile-image-wrapper">
              <img src={profile.image} alt={profile.name} loading="lazy" />
            </div>
            <div className="management-profile-info">
              <h1>{profile.name}</h1>
              <p className="management-profile-title">{profile.title}</p>
            </div>
          </div>

          {profile.bio && (
            <div className="management-profile-section">
              <h2>Biography</h2>
              <p>{profile.bio}</p>
            </div>
          )}

          {profile.responsibilities && profile.responsibilities.length > 0 && (
            <div className="management-profile-section">
              <h2>Responsibilities</h2>
              <ul className="management-profile-responsibilities">
                {profile.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {relatedProfiles.length > 0 && (
          <aside className="management-profile-sidebar">
            <h3>Other Management</h3>
            <div className="management-profile-related">
              {relatedProfiles.map((related) => (
                <Link
                  key={related.slug}
                  to={`/about/top-management/${related.slug}`}
                  className="management-profile-related-card"
                >
                  <img src={related.image} alt={related.name} loading="lazy" />
                  <div>
                    <h4>{related.name}</h4>
                    <p>{related.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default ManagementProfilePage;

