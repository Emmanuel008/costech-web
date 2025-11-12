import React from 'react';
import './IncubationPage.css';

const achievements = [
  { value: '29', label: 'ICT Solutions Commercialized' },
  { value: '27', label: 'Incubates Supported' },
  { value: '559', label: 'Direct Jobs Created' },
  { value: '16,000+', label: 'Indirect Jobs Created' },
];

const supportFunctions = [
  'Business development support',
  'Channeling new innovations into the market',
  'Access to finance',
  'Training and information provision',
  'Mentoring',
  'Networking',
  'Physical resources',
];

const successfulInnovations = [
  { name: 'CAS', description: 'Through TCU' },
  { name: 'V-Somo', description: 'E-learning platform used by VETA' },
  { name: 'TiGo Back-up', description: 'Through TiGo' },
  { name: 'TANESCO-HUDUMA', description: 'Through TANESCO' },
  { name: 'Maxmalipo', description: 'Used by TRA, LGAs, TANESCO etc.' },
  { name: 'MRECOM', description: 'Through LGA' },
  { name: 'Twende Technology', description: 'Innovation platform' },
  { name: 'Wezesha', description: 'Empowerment solution' },
];

const IncubationPage = () => {
  return (
    <section className="incubation-page">
      <div className="incubation-hero">
        <div className="incubation-hero-overlay" />
        <div className="incubation-hero-content">
          <h1>Incubation</h1>
          <p>
            COSTECH&apos;s Dar Teknohama Business Incubator (DTBi) serves as a hub for technology
            start-ups, providing value-added services and support to innovators across Tanzania.
          </p>
        </div>
      </div>

      <div className="incubation-body">
        <section className="incubation-intro">
          <div className="incubation-intro-card">
            <h2>Dar Teknohama Business Incubator (DTBi)</h2>
            <p>
              Tanzania Commission for Science and Technology (COSTECH) in collaboration with InfoDev
              established Dar Teknohama Business Incubator (DTBi) which is hosted at COSTECH. DTBi aims
              to serve as a hub for technology start-ups and is actively identifies and provides for
              the value-added services required to support incubator.
            </p>
            <p>
              Since its establishment in 2011 a total of <strong>29 ICT based solutions (innovations)</strong> from{' '}
              <strong>27 incubates</strong> have been commercialized through different arrangements and agreements
              with private entities and government departments. Due to this, there was a creation of{' '}
              <strong>559 direct</strong> and more than <strong>16,000 indirect employments</strong>.
            </p>
          </div>
        </section>

        <section className="incubation-achievements">
          {achievements.map((achievement, index) => (
            <div key={index} className="incubation-achievement-card">
              <span className="incubation-achievement-value">{achievement.value}</span>
              <span className="incubation-achievement-label">{achievement.label}</span>
            </div>
          ))}
        </section>

        <section className="incubation-pepfar">
          <div className="incubation-section-card">
            <h2>Data Usage Innovation Challenge</h2>
            <p>
              Recently DTBi-COSTECH in collaboration with MCC/PEPFAR has launched a project on data
              usage innovation challenge. With financial support from PEPFAR and technical support from
              DTBi to innovators who won the challenge a total of <strong>20 innovations</strong> were created by
              Tanzanian graduates covering the areas of health and education to adolescent girls and
              women.
            </p>
            <div className="incubation-support-functions">
              <h3>Support Functions Provided</h3>
              <ul>
                {supportFunctions.map((function_, index) => (
                  <li key={index}>{function_}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="incubation-success">
          <div className="incubation-section-card">
            <h2>Successful Innovations</h2>
            <p className="incubation-success-intro">
              The important point to be noted is that the success of the above services was attributed
              by the invisible qualities of the collaboration between DTBi and COSTECH. Examples of
              successful innovations from DTBi include protected and commercialized number of
              technologies:
            </p>
            <div className="incubation-innovations-grid">
              {successfulInnovations.map((innovation, index) => (
                <div key={index} className="incubation-innovation-card">
                  <h4>{innovation.name}</h4>
                  <p>{innovation.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="incubation-future">
          <div className="incubation-future-card">
            <h2>Virtual Business Incubator Pilot</h2>
            <p>
              To make sure that this experience is sustained, and majority of Tanzanians are
              benefiting, COSTECH in collaboration with DTBi decided to pilot a model of virtual
              business incubator in partnership with Local Government Authorities in Mwanza Municipality
              and this effort will be widened to other parts of Tanzania.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default IncubationPage;

