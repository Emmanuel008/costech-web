import React, { useState, useEffect } from 'react';
import '../styles/pages/ExhibitionsPage.css';
import { getExhibitions } from '../services/api';

/**
 * Format date from API (format: "16/01/2026") or standard date string
 * @param {string} dateString - Date string from API or standard format
 * @returns {string} - Formatted date
 */
const formatDate = (dateString) => {
  if (!dateString) {
    return 'Date not available';
  }

  try {
    let date;
    
    // Check if date is in "DD/MM/YYYY" format (from API)
    if (dateString.includes('/') && dateString.split('/').length === 3) {
      const [day, month, year] = dateString.split('/');
      date = new Date(`${year}-${month}-${day}`);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      return dateString; // Return original if parsing fails
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString; // Return original if error
  }
};

const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 ExhibitionsPage: Starting to fetch exhibitions from API...');
        
        // Fetch exhibitions from API
        const apiExhibitions = await getExhibitions();
        
        console.log('📊 ExhibitionsPage: Received exhibitions from API:', apiExhibitions);
        
        if (apiExhibitions && apiExhibitions.length > 0) {
          console.log(`✅ ExhibitionsPage: Using ${apiExhibitions.length} exhibitions from API`);
          setExhibitions(apiExhibitions);
        } else {
          console.warn('⚠️ ExhibitionsPage: API returned empty array');
          setExhibitions([]);
        }
      } catch (err) {
        console.error('❌ ExhibitionsPage: Error fetching exhibitions:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        setExhibitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);
  return (
    <section className="exhibitions-page">
      <div className="exhibitions-hero">
        <div className="exhibitions-hero-overlay" />
        <div className="exhibitions-hero-content">
          <h1>Exhibitions</h1>
          <p>
            Showcasing the latest advancements in science, technology and innovation through
            exhibitions across Tanzania
          </p>
        </div>
      </div>

      <div className="exhibitions-body">
        <div className="exhibitions-content">
          <div className="exhibitions-list-section">
            {loading ? (
              <div className="exhibitions-loading">
                <p>Loading exhibitions...</p>
              </div>
            ) : error ? (
              <div className="exhibitions-error">
                <p>Unable to load exhibitions. Please try again later.</p>
              </div>
            ) : exhibitions.length > 0 ? (
              <div className="exhibitions-grid">
                {exhibitions.map((exhibition) => {
                  // Handle image path - if it's relative, prepend base URL
                  const imageUrl = exhibition.image 
                    ? (exhibition.image.startsWith('http') 
                        ? exhibition.image 
                        : `https://costech.kingdomsolutions.co.tz/${exhibition.image}`)
                    : null;

                  return (
                    <div key={exhibition.id} className="exhibition-card">
                      {imageUrl && (
                        <div className="exhibition-image-container">
                          <img
                            src={imageUrl}
                            alt={exhibition.title}
                            className="exhibition-image"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="exhibition-card-content">
                        <h3 className="exhibition-card-title">{exhibition.title}</h3>
                        {exhibition.date && (
                          <p className="exhibition-card-date">
                            {formatDate(exhibition.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="exhibitions-empty">
                <p>No exhibitions available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsPage;

