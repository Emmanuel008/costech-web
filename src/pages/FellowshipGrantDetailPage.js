import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/pages/FellowshipGrantDetailPage.css';

const FellowshipGrantDetailPage = () => {
  const { id } = useParams();

  // In a real application, this would fetch from an API or data source
  const programs = {
    1: {
      id: 1,
      category: 'Fellowship/Professional Development Program',
      status: 'open',
      statusText: 'Open until February 2, 2026',
      title: 'Air Force Science & Technology Fellowship Program',
      description: 'The Air Force Science & Technology Fellowship Program (AF STFP) provides nationally competitive fellowship awards for postdoctoral and senior scientists. Selected individuals have the unique opportunity to conduct independent research of their own choosing that supports the mission of the Air Force Research Laboratory.',
      fullDescription: `The Air Force Science & Technology Fellowship Program (AF STFP) provides nationally competitive fellowship awards for postdoctoral and senior scientists. Selected individuals have the unique opportunity to conduct independent research of their own choosing that supports the mission of the Air Force Research Laboratory.

The program offers opportunities for scientists and engineers to work alongside Air Force researchers on cutting-edge projects that address critical national security challenges. Fellows receive competitive stipends, research support, and access to state-of-the-art facilities and equipment.

Eligibility requirements include a doctoral degree in a relevant field, demonstrated research excellence, and alignment with Air Force research priorities. Applications are reviewed on a competitive basis, with selection based on research quality, potential impact, and alignment with program goals.`
    },
    2: {
      id: 2,
      category: 'Fellowship/Professional Development Program',
      status: 'closed',
      statusText: 'Closed',
      title: 'Arab-American Frontiers of Science, Engineering, and Medicine',
      description: 'Based on the success of NAS\'s Kavli Frontiers of Science Program and NAE\'s Frontiers of Engineering, the Arab-American Frontiers of Science, Engineering, and Medicine program will initiate a series of symposia to bring together outstanding young scientists, engineers, and medical professionals from the United States and the 22 countries of the Arab League.',
      fullDescription: `Based on the success of NAS's Kavli Frontiers of Science Program and NAE's Frontiers of Engineering, the Arab-American Frontiers of Science, Engineering, and Medicine program will initiate a series of symposia to bring together outstanding young scientists, engineers, and medical professionals from the United States and the 22 countries of the Arab League.

This program aims to foster scientific collaboration, knowledge exchange, and professional networking across borders. Participants engage in interdisciplinary discussions, share research findings, and explore opportunities for joint research initiatives that address regional and global challenges.

The symposia cover a wide range of topics including renewable energy, water resources, healthcare innovation, information technology, and sustainable development. Selected participants are early-career researchers with demonstrated excellence in their respective fields.`
    },
    3: {
      id: 3,
      category: 'Fellowship/Professional Development Program',
      status: 'closed',
      statusText: 'Closed',
      title: 'Army Research Laboratory Distinguished Postdoctoral Fellowships',
      description: 'Army Research Laboratory (ARL) Distinguished Postdoctoral Fellowships provide early career researchers the opportunity to pursue independent research of their own choosing that supports the mission of ARL. Fellows work alongside ARL scientists and engineers to address critical Army challenges.',
      fullDescription: `Army Research Laboratory (ARL) Distinguished Postdoctoral Fellowships provide early career researchers the opportunity to pursue independent research of their own choosing that supports the mission of ARL. Fellows work alongside ARL scientists and engineers to address critical Army challenges.

The program supports innovative research in areas such as materials science, computational sciences, human sciences, and information sciences. Fellows receive mentorship from leading researchers, access to advanced research facilities, and opportunities to collaborate on high-impact projects.

Eligible candidates must have completed their doctoral degree within the past five years and demonstrate exceptional research potential. The fellowship includes a competitive salary, research funding, and professional development opportunities.`
    }
  };

  const program = programs[id];

  if (!program) {
    return (
      <section className="fellowship-grant-detail-page">
        <div className="detail-container">
          <h1>Program Not Found</h1>
          <Link to="/fellowships-grants" className="back-link">← Back to Fellowships and Grants</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="fellowship-grant-detail-page">
      <div className="detail-hero">
        <div className="detail-hero-content">
          <Link to="/fellowships-grants" className="back-link">← Back to Fellowships and Grants</Link>
          <div className="detail-header">
            <span className={`detail-status ${program.status}`}>
              {program.statusText}
            </span>
            <h1>{program.title}</h1>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-container">
          <div className="detail-content">
            <p className="detail-description">{program.fullDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FellowshipGrantDetailPage;

