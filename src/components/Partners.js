import React from 'react';
import './Partners.css';

const Partners = () => {
  const partners = [
    { id: 1, logo: '/assets/img/bankword.jpeg', name: 'World Bank', alt: 'World Bank' },
    { id: 2, logo: '/assets/img/commeo.jpeg', name: 'COMESA', alt: 'COMESA' },
    { id: 3, logo: '/assets/img/eu.jpeg', name: 'European Union', alt: 'European Union' },
    { id: 4, logo: '/assets/img/giz.jpeg', name: 'GIZ', alt: 'GIZ' },
    { id: 5, logo: '/assets/img/idrc.jpeg', name: 'IDRC', alt: 'IDRC' },
    { id: 6, logo: '/assets/img/iita.jpeg', name: 'IITA', alt: 'IITA' },
    { id: 7, logo: '/assets/img/nam.png', name: 'NAM', alt: 'NAM' },
    { id: 8, logo: '/assets/img/norad.jpeg', name: 'NORAD', alt: 'NORAD' },
    { id: 9, logo: '/assets/img/nrf.png', name: 'NRF', alt: 'NRF' },
    { id: 10, logo: '/assets/img/sida.png', name: 'SIDA', alt: 'SIDA' },
    { id: 11, logo: '/assets/img/uncdf.jpeg', name: 'UNCDF', alt: 'UNCDF' },
    { id: 12, logo: '/assets/img/undp.jpeg', name: 'UNDP', alt: 'UNDP' },
    { id: 13, logo: '/assets/img/wfp.jpeg', name: 'WFP', alt: 'WFP' }
  ];

  return (
    <section className="partners-section">
      <div className="partners-container">
        <div className="partners-header">
          <h2 className="partners-title">Partners</h2>
        </div>
        
        <div className="partners-marquee-wrapper">
          <div className="partners-marquee">
            <div className="marquee-content">
              {partners.map((partner, index) => (
                <div key={`${partner.id}-${index}`} className="partner-logo-container">
                  <img 
                    src={partner.logo} 
                    alt={partner.alt || partner.name} 
                    className="partner-logo-img" 
                    loading="lazy"
                  />
                </div>
              ))}
              {partners.map((partner, index) => (
                <div key={`${partner.id}-clone-${index}`} className="partner-logo-container">
                  <img 
                    src={partner.logo} 
                    alt={partner.alt || partner.name} 
                    className="partner-logo-img" 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

