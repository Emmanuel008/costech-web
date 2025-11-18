import React from 'react';
import './ClusterInitiativePage.css';

const objectives = [
  'To develop a method for replication and scale-up of competitive and innovative clusters in the emerging knowledge society of Tanzania.',
  'Capacity building for COSTECH and SIDO to promote, govern, and manage innovative cluster interventions.',
  'Enhancing capacity in regional and local government authorities in the implementation of innovative clusters initiatives.',
  'Enhance sustainable competitiveness of relevant innovative cluster products and services.',
  'Disseminate and develop the cluster research model among clusters and academic/research institutions.',
  'Building ICT-support for cluster development.',
];

const outcomes = [
  'Stakeholders demonstrate the capacity to collaborate and co-develop for increased cluster competitiveness.',
  'Publication of “Guidelines for development of innovative clusters” for replication and scale-up.',
  'Strengthened linkages between research/higher education institutions and the private sector.',
  'Expanded innovation opportunities through the NFAST innovation fund window.',
];

const ClusterInitiativePage = () => {
  return (
    <section className="cluster-page">
      <div className="cluster-hero">
        <div className="cluster-hero-content">
          <h1>Cluster Initiative</h1>
          <p>
            COSTECH's Cluster Initiative empowers SMEs, researchers and government partners to build
            competitive, innovation-driven clusters through collaborative platforms and targeted
            funding.
          </p>
        </div>
      </div>

      <div className="cluster-body">
        <section className="cluster-overview">
          <div className="cluster-text-card">
            <h2>What is a Cluster?</h2>
            <p>
              Clusters are groups of firms engaged in similar or related economic activities that are
              co-located and connected through shared value chains and partnerships. Innovative
              Cluster Initiatives are organised efforts to increase SME competitiveness and local
              industry growth, bringing together firms, government and academia in a triple helix
              model for technology transfer and demand-driven research.
            </p>
            <p>
              Although the concept is new in Tanzania, COSTECH is advancing cluster development as a
              collaborative platform for innovation. Currently, with SIDO and Swedish partner SICD,
              COSTECH is implementing a three-year programme "Fostering Innovation for Sustainable
              Socio-Economic Development" (2017-2020) that includes innovative clusters and an
              innovation fund component.
            </p>
          </div>
          <aside className="cluster-side-card">
            <div className="cluster-side-card-header">
              <h3>Programme Snapshot</h3>
            </div>
            <ul className="cluster-snapshot-list">
              <li>
                <span className="snapshot-label">Programme:</span>
                <span className="snapshot-value">Fostering Innovation for Sustainable Socio-Economic Development</span>
              </li>
              <li>
                <span className="snapshot-label">Duration:</span>
                <span className="snapshot-value">2017 – 2020</span>
              </li>
              <li>
                <span className="snapshot-label">Partners:</span>
                <span className="snapshot-value">COSTECH, SIDO, Swedish International Centre for Diffusion (SICD)</span>
              </li>
              <li>
                <span className="snapshot-label">Focus:</span>
                <span className="snapshot-value">Innovative clusters and innovation fund components</span>
              </li>
            </ul>
          </aside>
        </section>

        <section className="cluster-carousel-section">
          <div className="cluster-section-header">
            <h2>Programme Objectives</h2>
            <p>Key objectives that guide our cluster development initiatives</p>
          </div>
          <div className="cluster-objectives-table-wrapper">
            <table className="cluster-objectives-table">
              <thead>
                <tr>
                  <th className="table-col-number">#</th>
                  <th className="table-col-objective">Objective</th>
                </tr>
              </thead>
              <tbody>
                {objectives.map((objective, index) => (
                  <tr key={`objective-${index}`}>
                    <td className="table-col-number">{index + 1}</td>
                    <td className="table-col-objective">{objective}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="cluster-carousel-section">
          <div className="cluster-section-header">
            <h2>Main Outcomes</h2>
            <p>Expected results and achievements from the cluster initiative programme</p>
          </div>
          <div className="cluster-outcomes-grid" role="list">
            {outcomes.map((text, index) => (
              <div key={`outcome-${index}`} className="cluster-carousel-card cluster-carousel-card--outcome" role="listitem">
                <div className="cluster-card-number">{index + 1}</div>
                <span className="cluster-carousel-badge">Outcome</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cluster-guidelines">
          <div className="cluster-guidelines-content">
            <div className="cluster-guidelines-icon">📋</div>
            <div className="cluster-guidelines-text">
              <h3>Guidelines for Development of Innovative Clusters</h3>
              <p>
                The ultimate output is a comprehensive guideline publication that supports replication
                and scale-up of innovative clusters across Tanzania, ensuring sustainable impact for
                SMEs, researchers and regional economies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ClusterInitiativePage;

