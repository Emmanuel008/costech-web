import React, { useState, useEffect } from 'react';
import '../styles/pages/ConferencePage.css';
import { getConferences, formatDate } from '../services/api';

const ConferencePage = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 ConferencePage: Starting to fetch conferences from API...');
        
        // Fetch conferences from API
        const apiConferences = await getConferences();
        
        console.log('📊 ConferencePage: Received conferences from API:', apiConferences);
        
        if (apiConferences && apiConferences.length > 0) {
          console.log(`✅ ConferencePage: Using ${apiConferences.length} conferences from API`);
          setConferences(apiConferences);
        } else {
          console.warn('⚠️ ConferencePage: API returned empty array');
          setConferences([]);
        }
      } catch (err) {
        console.error('❌ ConferencePage: Error fetching conferences:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        setConferences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);
  return (
    <section className="conference-page">
      <div className="conference-hero">
        <div className="conference-hero-overlay" />
        <div className="conference-hero-content">
          <h1>Conferences</h1>
          <p>All about conferences organized in COSTECH</p>
        </div>
      </div>

      <div className="conference-body">
        <div className="conference-content">
          <div className="conference-list-section">
            <h2 className="conference-list-title">Upcoming & Past Conferences</h2>
            {loading ? (
              <div className="conference-loading">
                <p>Loading conferences...</p>
              </div>
            ) : error ? (
              <div className="conference-error">
                <p>Unable to load conferences. Please try again later.</p>
              </div>
            ) : conferences.length > 0 ? (
              <div className="conference-grid">
                {conferences.map((conference) => (
                  <div key={conference.id} className="conference-card">
                    {conference.image && (
                      <div className="conference-image-container">
                        <img
                          src={conference.image}
                          alt={conference.title}
                          className="conference-image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="conference-card-content">
                      <h3 className="conference-card-title">{conference.title}</h3>
                      {conference.description && (
                        <p className="conference-card-description">{conference.description}</p>
                      )}
                      {conference.created_at && (
                        <p className="conference-card-date">
                          {formatDate(conference.created_at)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="conference-empty">
                <p>No conferences available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConferencePage;

