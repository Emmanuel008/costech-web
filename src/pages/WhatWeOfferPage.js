import React from 'react';
import '../styles/pages/WhatWeOfferPage.css';

const WhatWeOfferPage = () => {
  const services = [
    {
      id: 1,
      text: 'Advising the government on the formulation of policies and priority areas for scientific research and technology development.'
    },
    {
      id: 2,
      text: 'Coordinating, monitoring, and promoting scientific research and technology development activities across the country, involving public and private institutions.'
    },
    {
      id: 3,
      text: 'Mobilizing, Managing and administering funds for research and innovation, including providing grants and loans through the National Fund for the Advancement of Science and Technology (NFAST).'
    },
    {
      id: 4,
      text: 'Acquiring, storing, and disseminating scientific and technological information through various means, such as STI publications, conferences, and information services.'
    },
    {
      id: 5,
      text: 'Registering researchers, Innovators institutions and all research and innovation activities conducted within mainland Tanzania.'
    },
    {
      id: 6,
      text: 'Fostering regional and international cooperation in science and technology initiatives.'
    },
    {
      id: 7,
      text: 'Facilitating the commercialization of research results and innovations to support economic development.'
    }
  ];

  return (
    <section className="what-we-offer-page">
      <div className="what-we-offer-hero">
        <div className="what-we-offer-hero-overlay" />
        <div className="what-we-offer-hero-content">
          <h1>What We Offer</h1>
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

