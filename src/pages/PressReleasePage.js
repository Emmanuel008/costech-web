import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/pages/PressReleasePage.css';
import { getPressReleases } from '../services/api';

// Fallback static data
const fallbackPressReleases = [
  {
    id: 1,
    title: 'COSTECH Press Release - January 2024',
    description: 'Sample press release description',
    image: '/assets/img/hero2.jpeg',
  },
];

const PressReleasePage = () => {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPressRelease, setSelectedPressRelease] = useState(null);

  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        // Fetch press releases from API
        const apiPressReleases = await getPressReleases();
        
        
        if (apiPressReleases && apiPressReleases.length > 0) {
          setPressReleases(apiPressReleases);
        } else {
          console.warn('PressReleasePage: API returned empty array, using static data');
          setPressReleases(fallbackPressReleases);
        }
      } catch (err) {
        console.error('PressReleasePage: Error fetching press releases:', err);
        setError(err.message);
        console.warn('PressReleasePage: Falling back to static data due to error');
        setPressReleases(fallbackPressReleases);
      } finally {
        setLoading(false);
      }
    };

    fetchPressReleases();
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
    <section className="press-release-page">
      <div className="press-release-hero">
        <div className="press-release-hero-overlay" />
        <div className="press-release-hero-content">
          <h1>Press Releases</h1>
          <p>
            Read our latest press releases and official announcements about COSTECH's activities,
            programs, and achievements in science, technology and innovation.
          </p>
        </div>
      </div>

      <div className="press-release-body">
        {loading ? (
          <div className="press-release-loading">
            <p>Loading press releases...</p>
          </div>
        ) : error && pressReleases.length === 0 ? (
          <div className="press-release-error">
            <p>Unable to load press releases. Please try again later.</p>
          </div>
        ) : (
          <div className="press-release-carousel-wrapper">
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
              {pressReleases.map((pressRelease) => (
                <div key={pressRelease.id} className="press-release-card-wrapper">
                  <div className="press-release-card">
                    <div className="press-release-card-image-container">
                      <img 
                        src={getImageUrl(pressRelease.image)} 
                        alt={pressRelease.title || 'Press Release'}
                        className="press-release-card-image"
                        loading="lazy"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="press-release-card-content">
                      <h3 className="press-release-card-title">
                        {pressRelease.title || 'Press Release'}
                      </h3>
                      <p className="press-release-card-description">
                        {pressRelease.description || 'No description available.'}
                      </p>
                      <button
                        className="press-release-card-button"
                        onClick={() => setSelectedPressRelease(pressRelease)}
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

      {selectedPressRelease && (
        <div className="press-release-modal" onClick={() => setSelectedPressRelease(null)}>
          <div className="press-release-modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="press-release-modal-close"
              onClick={() => setSelectedPressRelease(null)}
              aria-label="Close details"
            >
              ×
            </button>
            <div className="press-release-modal-header">
              <img 
                src={getImageUrl(selectedPressRelease.image)} 
                alt={selectedPressRelease.title || 'Press Release'}
                className="press-release-modal-image"
                onError={handleImageError}
              />
              <h2>{selectedPressRelease.title || 'Press Release'}</h2>
            </div>
            <div className="press-release-modal-body">
              <div className="press-release-modal-description">
                <p>{selectedPressRelease.description || 'No description available.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PressReleasePage;
