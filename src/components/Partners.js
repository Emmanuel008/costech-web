import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getPartners } from '../services/api';
import '../styles/components/Partners.css';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiData = await getPartners();

        if (apiData && apiData.length > 0) {
          // Transform API data to match component structure
          const transformedPartners = apiData.map((item) => ({
            id: item.id || item.uuid || Math.random(),
            logo: item.logo || '',
            name: item.name || 'Partner',
            alt: item.name || 'Partner',
          }));

          setPartners(transformedPartners);
        } else {
          setPartners([]);
        }
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError('Failed to load partners');
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
        }
      }
    ]
  };

  if (loading) {
    return (
      <section className="partners-section">
        <div className="partners-container">
          <div className="partners-header">
            <h2 className="partners-title">Partners</h2>
          </div>
          <div className="partners-loading">
            <p>Loading partners...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="partners-section">
        <div className="partners-container">
          <div className="partners-header">
            <h2 className="partners-title">Partners</h2>
          </div>
          <div className="partners-error">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null; // Don't show section if no partners
  }

  return (
    <section className="partners-section">
      <div className="partners-container">
        <div className="partners-header">
          <h2 className="partners-title">Partners</h2>
        </div>
        
        <div className="partners-carousel-wrapper">
          <Slider {...settings}>
            {partners.map((partner) => (
              <div key={partner.id} className="partner-card-wrapper">
                <div className="partner-card">
                  <div className="partner-card-inner">
                  <img 
                      src={partner.logo || ''} 
                    alt={partner.alt || partner.name} 
                    className="partner-logo-img" 
                    loading="lazy"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                  />
                </div>
                </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Partners;
