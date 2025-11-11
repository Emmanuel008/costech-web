import React, { useState } from 'react';
import './WelcomeNote.css';

const WelcomeNote = () => {
  const [activeTab, setActiveTab] = useState('welcome');

  const tabs = [
    { id: 'welcome', label: 'Welcome note' },
    { id: 'vision', label: 'Vision' },
    { id: 'mission', label: 'Mission' },
    { id: 'biography', label: 'DG Biography' },
    { id: 'quality', label: 'Quality Policy' }
  ];

  const welcomeContent = (
    <div className="welcome-content">
      <p>
        On behalf of the Management and Staff of the Tanzania Commission for Science and Technology (COSTECH), 
        I would like to welcome you to our website. We hope that this website will be informative, educative, 
        and appealing for knowledge about Science, Technology and Innovation (STI) in Tanzania and beyond.
      </p>
      <p>
        Through this website, we are committed to providing accurate, relevant, up-to-date, and quality information 
        to stakeholders and the public, as mandated by the Parliament Act. No. 7 of 1986.
      </p>
      <p>
        This website also aims to demonstrate our conviction to realize our vision, mission, and core functions.
      </p>
      <p>
        Once again, COSTECH welcomes you to this website.
      </p>
    </div>
  );

  const visionContent = (
    <div className="welcome-content">
      <p>
      A nation driven by Science, Technology and Innovation.
      </p>
    </div>
  );

  const missionContent = (
    <div className="welcome-content">
      <p>
      Ensure utilization of knowledge-based products through coordination and 
      promotion of science, technology and innovation for rapid 
      social-economic development.
      </p>
    </div>
  );

  const biographyContent = (
    <div className="welcome-content biography-content">
      <h2 className="biography-title">Dr. AMOS MUHUNDA NUNGU</h2>
      <h3 className="biography-subtitle">Director General of the Tanzania Commission for Science and Technology (COSTECH)</h3>
      <p>
        Dr. Amos Muhunda Nungu is the Director General of COSTECH. Previously saved as assistant Director at the Ministry 
        of Education, Science and Technology. He is also a Senior Lecturer, Researcher, and Consultant in Information 
        and Communication Technology (ICT) at the Dar Es Salaam Institute of Technology (DIT) in Dar es Salaam, where he 
        was also heading (Director) the National Centre of Excellence in ICT (CoEICT) until November 2016. While at DIT, 
        also worked as Chief Executive Officer of the Tanzania Education and Research Network (TERNET) between 2012 and 2016.
      </p>
      <p>
        Amos holds a PhD in Telecommunication Systems and an MSc Information Technology both from the Royal Institutes 
        of Technology (KTH) of Sweden. He has a BSc. in Computer Science from the University of Dar es salaam in Tanzania.
      </p>
    </div>
  );

  const qualityPolicyContent = (
    <div className="welcome-content">
      <p>
        COSTECH is committed to coordinate, promote and facilitate science, technology and innovation in the country 
        by meeting legal and customer requirements and even exceeding customer expectations.
      </p>
      <p>
        COSTECH provides resources and continually improve its processes to meet requirements of ISO 9001:2015 by 
        ensuring staff are capable of delivering quality products and services timely and consistently to ensure that 
        country is driven by science, technology and innovation.
      </p>
    </div>
  );

  const getContent = () => {
    switch (activeTab) {
      case 'welcome':
        return welcomeContent;
      case 'vision':
        return visionContent;
      case 'mission':
        return missionContent;
      case 'biography':
        return biographyContent;
      case 'quality':
        return qualityPolicyContent;
      default:
        return welcomeContent;
    }
  };

  return (
    <section className="welcome-section">
      <div className="welcome-container">
        <div className="welcome-left">
          <div className="dg-image-container">
            <img 
              src="/assets/img/dg.jpg" 
              alt="Dr. Amos Mhunda Nungu" 
              className="dg-image"
              loading="lazy"
            />
            <div className="dg-caption">
              <h3>DR. AMOS MHUNDA NUNGU</h3>
              <p>Director General</p>
            </div>
          </div>
        </div>
        
        <div className="welcome-right">
          <div className="welcome-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`welcome-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="welcome-tab-content">
            {getContent()}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WelcomeNote;

