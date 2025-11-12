import React, { useEffect, useMemo, useState } from 'react';
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

const useCarousel = (items, visibleItems = 4, interval = 5000) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  const slice = useMemo(() => {
    const current = [];
    for (let i = 0; i < Math.min(visibleItems, items.length); i += 1) {
      current.push(items[(activeIndex + i) % items.length]);
    }
    return current;
  }, [activeIndex, items, visibleItems]);

  return { slice, activeIndex, setActiveIndex };
};

const ClusterInitiativePage = () => {
  const objectivesCarousel = useCarousel(objectives);
  const outcomesCarousel = useCarousel(outcomes, 3, 5000);

  return (
    <section className="cluster-page">
      <div className="cluster-hero">
        <div className="cluster-hero-overlay" />
        <div className="cluster-hero-content">
          <h1>Cluster Initiative</h1>
          <p>
            COSTECH’s Cluster Initiative empowers SMEs, researchers and government partners to build
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
              COSTECH is implementing a three-year programme “Fostering Innovation for Sustainable
              Socio-Economic Development” (2017-2020) that includes innovative clusters and an
              innovation fund component.
            </p>
          </div>
          <aside className="cluster-side-card">
            <h3>Programme Snapshot</h3>
            <ul>
              <li>Programme: Fostering Innovation for Sustainable Socio-Economic Development</li>
              <li>Duration: 2017 – 2020</li>
              <li>Partners: COSTECH, SIDO, Swedish International Centre for Diffusion (SICD)</li>
              <li>Focus: Innovative clusters and innovation fund components</li>
            </ul>
          </aside>
        </section>

        <section className="cluster-carousel-section">
          <div className="cluster-section-header">
            <h2>Programme Objectives</h2>
            <p>Key objectives cycle every five seconds—use the dots to navigate.</p>
          </div>
          <div className="cluster-carousel cluster-carousel--objectives" role="list">
            {objectivesCarousel.slice.map((text) => (
              <div key={`objective-${text}`} className="cluster-carousel-card cluster-carousel-card--objective" role="listitem">
                <span className="cluster-carousel-badge">Objective</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="cluster-carousel-indicators">
            {objectives.map((_, idx) => (
              <button
                key={`objective-dot-${idx}`}
                type="button"
                className={`cluster-carousel-dot ${idx === objectivesCarousel.activeIndex ? 'active' : ''}`}
                onClick={() => objectivesCarousel.setActiveIndex(idx)}
                aria-label={`Show objective ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="cluster-carousel-section">
          <div className="cluster-section-header">
            <h2>Main Outcomes</h2>
            <p>The programme outcomes also rotate automatically every five seconds.</p>
          </div>
          <div className="cluster-carousel cluster-carousel--outcomes" role="list">
            {outcomesCarousel.slice.map((text) => (
              <div key={`outcome-${text}`} className="cluster-carousel-card cluster-carousel-card--outcome" role="listitem">
                <span className="cluster-carousel-badge">Outcome</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="cluster-carousel-indicators">
            {outcomes.map((_, idx) => (
              <button
                key={`outcome-dot-${idx}`}
                type="button"
                className={`cluster-carousel-dot ${idx === outcomesCarousel.activeIndex ? 'active' : ''}`}
                onClick={() => outcomesCarousel.setActiveIndex(idx)}
                aria-label={`Show outcome ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="cluster-guidelines">
          <h3>Guidelines for Development of Innovative Clusters</h3>
          <p>
            The ultimate output is a comprehensive guideline publication that supports replication
            and scale-up of innovative clusters across Tanzania, ensuring sustainable impact for
            SMEs, researchers and regional economies.
          </p>
        </section>
      </div>
    </section>
  );
};

export default ClusterInitiativePage;

