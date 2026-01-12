import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/pages/StatementPage.css';
import { getStatements } from '../services/api';

// Fallback static data
const fallbackStatements = [
  {
    id: 1,
    title: 'COSTECH Statement - January 2024',
    description: 'Sample statement description',
    image: '/assets/img/hero2.jpeg',
  },
];

const StatementPage = () => {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatement, setSelectedStatement] = useState(null);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        // Fetch statements from API
        const apiStatements = await getStatements();
        
        
        if (apiStatements && apiStatements.length > 0) {
          setStatements(apiStatements);
        } else {
          console.warn('StatementPage: API returned empty array, using static data');
          setStatements(fallbackStatements);
        }
      } catch (err) {
        console.error('StatementPage: Error fetching statements:', err);
        setError(err.message);
        console.warn('StatementPage: Falling back to static data due to error');
        setStatements(fallbackStatements);
      } finally {
        setLoading(false);
      }
    };

    fetchStatements();
  }, []);

  const handleImageError = (e) => {
    e.target.src = '/assets/img/hero2.jpeg';
  };

  const getImageUrl = (image) => {
    if (!image) return '/assets/img/hero2.jpeg';
    if (image.startsWith('http')) return image;
    if (image.startsWith('/')) return image;
    return `https://costech.kingdomsolutions.co.tz/${image}`;
  };

  return (
    <section className="statement-page">
      <div className="statement-hero">
        <div className="statement-hero-overlay" />
        <div className="statement-hero-content">
          <h1>Statements</h1>
          <p>
            View our official statements and announcements on science, technology and innovation
            initiatives and developments in Tanzania.
          </p>
        </div>
      </div>

      <div className="statement-body">
        {loading ? (
          <div className="statement-loading">
            <p>Loading statements...</p>
          </div>
        ) : error && statements.length === 0 ? (
          <div className="statement-error">
            <p>Unable to load statements. Please try again later.</p>
          </div>
        ) : (
          <div className="statement-carousel-wrapper">
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
              pauseOnHover={true}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]}
            >
              {statements.map((statement) => (
                <div key={statement.id} className="statement-card-wrapper">
                  <div className="statement-card">
                    <div className="statement-card-image-container">
                      <img 
                        src={getImageUrl(statement.image)} 
                        alt={statement.title || 'Statement'}
                        className="statement-card-image"
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="statement-card-content">
                      <h3 className="statement-card-title">
                        {statement.title || 'Statement'}
                      </h3>
                      <p className="statement-card-description">
                        {statement.description || 'No description available.'}
                      </p>
                      <button
                        className="statement-card-button"
                        onClick={() => setSelectedStatement(statement)}
                      >
                        More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      {selectedStatement && (
        <div className="statement-modal" onClick={() => setSelectedStatement(null)}>
          <div className="statement-modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="statement-modal-close"
              onClick={() => setSelectedStatement(null)}
              aria-label="Close details"
            >
              ×
            </button>
            <div className="statement-modal-header">
              <img 
                src={getImageUrl(selectedStatement.image)} 
                alt={selectedStatement.title || 'Statement'}
                className="statement-modal-image"
                onError={handleImageError}
              />
              <h2>{selectedStatement.title || 'Statement'}</h2>
            </div>
            <div className="statement-modal-body">
              <div className="statement-modal-description">
                <p>{selectedStatement.description || 'No description available.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StatementPage;
