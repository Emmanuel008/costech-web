import React, { useState } from 'react';
import '../styles/pages/ProjectsPage.css';

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
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
          <h1>Projects</h1>
          <p>
            COSTECH manages and coordinates various projects aimed at advancing science, technology, and innovation in Tanzania
          </p>
        </div>
      </div>

      <div className="projects-container">
        {/* Tabs */}
        <div className="projects-tabs">
          <button
            className={`projects-tab ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            Ongoing Projects
          </button>
          <button
            className={`projects-tab ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Area for Partnership
          </button>
        </div>

        {/* Tab Content */}
        <div className="projects-content">
          {/* Ongoing Projects Section */}
          <div className={`projects-section ${activeTab === 0 ? 'active' : ''}`}>
            <div className="projects-section-header">
              <h2>Ongoing Projects</h2>
              <p>Current projects and initiatives being implemented by COSTECH in collaboration with development partners</p>
            </div>

            <div className="projects-grid">
              {ongoingProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-card-header">
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-card-body">
                    <p className="project-description">{project.description}</p>
                    {project.focusAreas && (
                      <div className="project-focus-areas">
                        <h4>Focus Areas:</h4>
                        <ul>
                          {project.focusAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Areas Section */}
          <div className={`projects-section ${activeTab === 1 ? 'active' : ''}`}>
            <div className="projects-section-header">
              <h2>Areas to Partner with COSTECH</h2>
              <p>Explore opportunities to collaborate with COSTECH in advancing science, technology, and innovation in Tanzania</p>
            </div>

            <div className="partnership-grid">
              {partnershipAreas.map((area) => (
                <div key={area.id} className="partnership-card">
                  <h3 className="partnership-title">{area.title}</h3>
                  <p className="partnership-description">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;

