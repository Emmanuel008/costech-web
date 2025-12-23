import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/pages/ProjectsPage.css';

const ProjectsPage = () => {
  const [activeSection, setActiveSection] = useState('ongoing');

  useEffect(() => {
    // Check URL hash on mount and when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#ongoing') {
        setActiveSection('ongoing');
      } else if (hash === '#partnership') {
        setActiveSection('partnership');
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  const ongoingProjects = [
    {
      id: 'sida',
      title: 'SIDA Project',
      description: 'The Swedish International Development Cooperation Agency (SIDA) supports COSTECH in advancing science, technology, and innovation in Tanzania. This project focuses on strengthening research capacity, promoting innovation ecosystems, and facilitating knowledge transfer to support sustainable development goals.',
      focusAreas: [
        'Research capacity building',
        'Innovation ecosystem development',
        'Knowledge transfer and technology adoption',
        'Support for schools and educational institutions',
        'Community engagement and outreach'
      ]
    },
    {
      id: 'heet',
      title: 'HEET Project',
      description: 'The Higher Education for Economic Transformation (HEET) project aims to enhance the quality and relevance of higher education in Tanzania. COSTECH collaborates with higher learning institutions to strengthen research capabilities, promote innovation, and align academic programs with national economic development priorities.',
      focusAreas: [
        'Higher education quality enhancement',
        'Research and innovation capacity building',
        'Industry-academia collaboration',
        'Curriculum development and alignment',
        'Economic transformation through education'
      ]
    }
  ];

  const partnershipAreas = [
    {
      id: 'research',
      title: 'Research Collaboration',
      description: 'Partner with COSTECH to support cutting-edge research in priority areas including agriculture, health, energy, ICT, and environmental sciences. We facilitate collaborative research projects that address national challenges and contribute to sustainable development.'
    },
    {
      id: 'innovation',
      title: 'Innovation Support',
      description: 'Join us in fostering innovation ecosystems by supporting technology development, innovation hubs, startup incubation, and commercialization of research results. Help bridge the gap between research and market-ready solutions.'
    },
    {
      id: 'capacity',
      title: 'Capacity Building',
      description: 'Support capacity building initiatives for researchers, innovators, and institutions. Partner with us to provide training, mentorship, and resources that strengthen Tanzania\'s scientific and technological capabilities.'
    },
    {
      id: 'funding',
      title: 'Funding and Grants',
      description: 'Contribute to research and innovation funding through the National Fund for the Advancement of Science and Technology (NFAST). Support grants, loans, and financial mechanisms that enable researchers and innovators to bring their ideas to life.'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      description: 'Partner in developing and upgrading research infrastructure, laboratories, innovation spaces, and technology facilities that support scientific research and innovation activities across Tanzania.'
    },
    {
      id: 'policy',
      title: 'Policy Development',
      description: 'Collaborate on developing science, technology, and innovation policies, frameworks, and strategic plans that guide national development priorities and create an enabling environment for STI growth.'
    }
  ];

  return (
    <section className="projects-page">
      <div className="projects-hero">
        <div className="projects-hero-overlay" />
        <div className="projects-hero-content">
          {activeSection === 'ongoing' ? (
            <>
              <div className="hero-title-wrapper">
                <svg className="hero-section-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1>Ongoing Projects</h1>
              </div>
              <p>
                Current projects and initiatives being implemented by COSTECH in collaboration with development partners
              </p>
            </>
          ) : (
            <>
              <div className="hero-title-wrapper">
                <svg className="hero-section-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h1>Areas to Partner with COSTECH</h1>
              </div>
              <p>
                Explore opportunities to collaborate with COSTECH in advancing science, technology, and innovation in Tanzania
              </p>
            </>
          )}
        </div>
      </div>

      <div className="projects-container">
        {/* Ongoing Projects Section */}
        {activeSection === 'ongoing' && (
          <div className="projects-section fade-in" id="ongoing">
            <div className="projects-grid">
              {ongoingProjects.map((project, index) => (
                <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="project-card-header">
                    <div className="project-icon-wrapper">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-card-body">
                    <p className="project-description">{project.description}</p>
                    {project.focusAreas && (
                      <div className="project-focus-areas">
                        <h4>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Focus Areas
                        </h4>
                        <ul>
                          {project.focusAreas.map((area, index) => (
                            <li key={index}>
                              <span className="focus-area-icon">✓</span>
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partnership Areas Section */}
        {activeSection === 'partnership' && (
          <div className="projects-section fade-in" id="partnership">
            <div className="partnership-carousel-wrapper">
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={4000}
                pauseOnHover={true}
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
                {partnershipAreas.map((area, index) => (
                  <div key={area.id} className="partnership-card-wrapper">
                    <div className="partnership-card" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="partnership-card-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="partnership-title">{area.title}</h3>
                      <p className="partnership-description">{area.description}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;

