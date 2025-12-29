import React from 'react';
import '../styles/pages/WhatWeOfferPage.css';

const WhatWeOfferPage = () => {
  const services = [
    {
      id: 1,
      text: 'Advising the Government on research and technology'
    },
    {
      id: 2,
      text: 'Fund for the Advancement of Science and Technology'
    },
    {
      id: 3,
      text: 'Research permits'
    },
    {
      id: 4,
      text: 'Digital connectivity to facilitate STI knowledge sharing'
    },
    {
      id: 5,
      text: 'Registration of technology transfer agreement'
    },
    {
      id: 6,
      text: 'Facilitate STI knowledge dissemination'
    },
    {
      id: 7,
      text: 'Profiling researcher, innovators, STI information'
    },
    {
      id: 8,
      text: 'Fostering regional and international cooperation in Science, Technology and Innovation'
    },
    {
      id: 9,
      text: 'Facilitate the commercialization of research results and innovations to support economic development'
    }
  ];

  return (
    <section className="what-we-offer-page">
      <div className="what-we-offer-hero">
        <div className="what-we-offer-hero-overlay" />
        <div className="what-we-offer-hero-content">
          <h1>Our Services</h1>
        </div>
      </div>

      <div className="what-we-offer-container">
        <div className="what-we-offer-list">
          {services.map((service) => (
            <div key={service.id} className="what-we-offer-item">
              <span className="what-we-offer-number">{service.id}.</span>
              <p className="what-we-offer-text">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferPage;

