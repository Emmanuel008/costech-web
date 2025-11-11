import React from 'react';
import './EstablishmentPage.css';

const EstablishmentPage = () => {
  const responsibilities = [
    'To contribute in the formulation of policy on the development of science and technology and recommend its implementation to the Government.',
    'To coordinate and promote research undertaking in the country.',
    'To develop, coordinate and transfer technologies.',
    'To acquire, store, process and disseminate science, technology and innovation data and information.',
    'To mobilize funds to support and promote science, technology and innovation.',
    'To popularize science, technology and innovation at all levels.',
    'To foster regional and international cooperation in science, technology and innovation.',
    'To advise the Government on all matters relating to STI.',
  ];

  return (
    <section className="establishment-page">
      <div className="establishment-hero">
        <div className="establishment-hero-overlay" />
        <div className="establishment-hero-content">
          <h1>Establishment</h1>
          <p>
            COSTECH was founded to coordinate and promote scientific research and technological
            development in Tanzania, guiding national priorities and advising the Government on all
            matters related to science, technology and innovation.
          </p>
        </div>
      </div>

      <div className="establishment-body">
        <article className="establishment-intro">
          <div className="establishment-intro-card">
            <h2>Our Origins</h2>
            <p>
              Tanzania Commission for Science and Technology (COSTECH) was established by the Act of
              Parliament No. 7 of 1986 as the successor to the Tanzania National Scientific Research
              Council (UTAFITI). As a parastatal organisation, COSTECH is mandated to coordinate and
              promote research and technology development activities, serving as the chief advisor to
              the Government on matters related to science, technology and innovation (STI) and
              their application to socio-economic development. COSTECH operates under the ministry
              responsible for science and technology.
            </p>
          </div>
          <div className="establishment-highlight">
            <h3>Mandate Highlights</h3>
            <p>
              Since 1986, COSTECH has been the national hub for identifying research priorities,
              mobilising resources and ensuring innovation reaches communities, industry and policy
              makers.
            </p>
          </div>
        </article>

        <section className="establishment-responsibilities">
          <div className="establishment-responsibilities-header">
            <h2>Principal Roles & Responsibilities</h2>
            <p>The Act outlines the following key responsibilities of the Commission:</p>
          </div>
          <div className="establishment-responsibilities-grid">
            {responsibilities.map((item) => (
              <div key={item} className="responsibility-card">
                <span className="responsibility-icon">•</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default EstablishmentPage;
