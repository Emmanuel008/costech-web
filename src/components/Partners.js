import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/components/Partners.css';

const Partners = () => {
  const partners = [
    { id: 1, logo: '/assets/img/bankword.jpeg', name: 'World Bank', alt: 'World Bank' },
    { id: 2, logo: '/assets/img/commeo.jpeg', name: 'COMESA', alt: 'COMESA' },
    { id: 3, logo: '/assets/img/eu.jpeg', name: 'European Union', alt: 'European Union' },
    { id: 4, logo: '/assets/img/sgci.png', name: 'SGCI', alt: 'Science Granting Councils Initiative' },
    { id: 5, logo: '/assets/img/edctp.jpeg', name: 'EDCTP', alt: 'European & Developing Countries Clinical Trials Partnership' },
    { id: 6, logo: '/assets/img/biotech.jpeg', name: 'Biotech', alt: 'Biotech' },
    { id: 7, logo: '/assets/img/isc.png', name: 'ISC', alt: 'International Science Council' },
    { id: 8, logo: '/assets/img/giz.jpeg', name: 'GIZ', alt: 'GIZ' },
    { id: 9, logo: '/assets/img/idrc.jpeg', name: 'IDRC', alt: 'IDRC' },
    { id: 10, logo: '/assets/img/iita.jpeg', name: 'IITA', alt: 'IITA' },
    { id: 12, logo: '/assets/img/norad.jpeg', name: 'NORAD', alt: 'NORAD' },
    { id: 13, logo: '/assets/img/nrf.png', name: 'NRF', alt: 'NRF' },
    { id: 14, logo: '/assets/img/sida.png', name: 'SIDA', alt: 'SIDA' },
    { id: 15, logo: '/assets/img/uncdf.jpeg', name: 'UNCDF', alt: 'UNCDF' },
    { id: 16, logo: '/assets/img/undp.jpeg', name: 'UNDP', alt: 'UNDP' },
    { id: 17, logo: '/assets/img/wfp.jpeg', name: 'WFP', alt: 'WFP' },
    { id: 18, logo: '/assets/img/global research .jpeg', name: 'Global Research', alt: 'Global Research' },
  ];

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
                      src={partner.logo.replace(/ /g, '%20')} 
                      alt={partner.alt || partner.name} 
                      className="partner-logo-img" 
                      loading="lazy"
                      onError={(e) => {
                        const attemptedPath = e.target.src;
                        console.error(`Failed to load image for ${partner.name}:`, {
                          originalPath: partner.logo,
                          attemptedPath: attemptedPath,
                          partnerId: partner.id
                        });
                        e.target.style.opacity = '0.3';
                        e.target.alt = `Failed to load: ${partner.name}`;
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
