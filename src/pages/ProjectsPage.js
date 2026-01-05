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
      id: 'research-innovation',
      title: 'Research & Innovation Development',
      description: 'Strengthening national research capacity and infrastructure, joint research programs aligned with national development priorities, support for applied research and problem-driven innovation, research commercialization and technology transfer.'
    },
    {
      id: 'sti-policy',
      title: 'Science, Technology & Innovation (STI) Policy Support',
      description: 'Evidence-based policy development, STI monitoring, evaluation, and impact assessment, data systems for research and innovation management, alignment with national and regional STI framework.'
    },
    {
      id: 'human-capital',
      title: 'Human Capital & Skills Development',
      description: 'Training of researchers, innovators, and technicians, capacity building in emerging technologies, research ethics, integrity, and responsible innovation, mentorship programs for early-career scientists and innovators.'
    },
    {
      id: 'tech-transfer',
      title: 'Technology Transfer & Commercialization',
      description: 'Intellectual property (IP) management and protection, patent development and licensing, market readiness and scaling of innovations, public–private partnerships for technology deployment.'
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation & Emerging Technologies',
      description: 'Artificial intelligence, data science, and digital innovation, biotechnology and life sciences, renewable energy and green technologies, space science, remote sensing, and geospatial technologies.'
    },
    {
      id: 'research-ethics',
      title: 'Research Ethics, Biosafety & Regulatory Support',
      description: 'Ethical review systems and compliance, responsible research and innovation (RRI), biosafety protocols and regulatory frameworks.'
    },
    {
      id: 'national-development',
      title: 'National Development & Societal Challenges',
      description: 'Health, agriculture, and food security innovations, climate change adaptation and mitigation, environmental conservation and sustainability, water, energy, and urban development solutions.'
    },
    {
      id: 'international-collaboration',
      title: 'International & Regional Collaboration',
      description: 'Joint programs with regional and global partners, research mobility and exchange programs, participation in international funding mechanisms, South–South and North–South cooperation.'
    },
    {
      id: 'science-communication',
      title: 'Science Communication & Public Engagement',
      description: 'Public awareness of science and innovation, science education and outreach initiatives, evidence-informed decision-making, knowledge dissemination and uptake.'
    }
  ];

  return (
    <section className="projects-page">
      <div className="projects-hero">
        <div className="projects-hero-overlay" />
        <div className="projects-hero-content">
          {activeSection === 'ongoing' ? (
            <>
              <h1>Ongoing Projects</h1>
              <p>
                Current projects and initiatives being implemented by COSTECH in collaboration with development partners
              </p>
            </>
          ) : (
            <>
              <h1>Areas to Partner with COSTECH</h1>
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
                {partnershipAreas.map((area) => (
                  <div key={area.id} className="partnership-card-wrapper">
                    <div className="partnership-card">
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

