import React from 'react';
import './OrganogramPage.css';

const OrganogramPage = () => {
  return (
    <section className="organogram-page">
      <div className="organogram-container">
        <header className="organogram-header">
          <h1>Organogram</h1>
          <p>
            COSTECH is structured in three tiers, consisting of Commission Members, Research and
            Development (R&amp;D) Advisory Committees and the Secretariat. The Chairperson of the
            Board of Commissioners is appointed by the President of the United Republic of Tanzania
            while members of the Commission are appointed by the Minister responsible for Education,
            Science and Technology. Some members of the Board of Commissioners constitute an
            Executive Committee, which is a statutory organ of the Commission to which the
            Commission can delegate any of its functions. The Board of Commissioners gives broad
            directives and guidelines for implementation of COSTECH strategic objectives to the
            Secretariat or management through its various R&amp;D Advisory Committees.
          </p>
        </header>

        <div className="organogram-tree">
          <div className="org-node org-node--center">
            <div className="org-box">COMMISSION</div>
          </div>

          <div className="org-line org-line--vertical short" />

          <div className="org-node org-node--center">
            <div className="org-box">DIRECTOR GENERAL</div>
          </div>

          <div className="org-line org-line--vertical medium" />

          <div className="org-node org-node--middle">
            <div className="org-box org-box--secondary">
              INTERNAL AUDIT SECTION
              <span>MANAGER</span>
            </div>
            <div className="org-box org-box--secondary">
              NATIONAL FUND FOR ACHIEVEMENT OF SCIENCES AND TECHNOLOGY
              <span>MANAGER</span>
            </div>
            <div className="org-box org-box--secondary">
              PROCUREMENT MANAGEMENT SECTION
              <span>MANAGER</span>
            </div>
            <div className="org-box org-box--secondary">
              LEGAL SECTION
              <span>MANAGER</span>
            </div>
          </div>

          <div className="org-line org-line--horizontal" />

          <div className="org-node org-node--bottom">
            <div className="org-column">
              <div className="org-box org-box--director">
                DIRECTORATE OF RESEARCH COORDINATION AND PROMOTION
                <span>DIRECTOR</span>
              </div>
              <div className="org-child-grid">
                <div className="org-box org-box--child">LIFE SCIENCE SECTION</div>
                <div className="org-box org-box--child">PHYSICAL SCIENCE SECTION</div>
                <div className="org-box org-box--child">SOCIAL SCIENCE SECTION</div>
              </div>
            </div>
            <div className="org-column">
              <div className="org-box org-box--director">
                DIRECTORATE OF KNOWLEDGE MANAGEMENT
                <span>DIRECTOR</span>
              </div>
              <div className="org-child-grid">
                <div className="org-box org-box--child">ICT SYSTEMS AND NETWORKING</div>
                <div className="org-box org-box--child">DOCUMENTATION AND PUBLICATIONS SECTION</div>
              </div>
            </div>
            <div className="org-column">
              <div className="org-box org-box--director">
                CENTRE FOR DEVELOPMENT AND TRANSFER OF TECHNOLOGY
                <span>DIRECTOR</span>
              </div>
              <div className="org-child-grid">
                <div className="org-box org-box--child">
                  TECHNOLOGY ACQUISITION AND DEVELOPMENT SECTION
                </div>
                <div className="org-box org-box--child">
                  TECHNOLOGY MANAGEMENT, IP AND TRANSFER SECTION
                </div>
                <div className="org-box org-box--child">
                  INNOVATION TECHNOLOGY FORESIGHT AND EMERGING TECHNOLOGY SECTION
                </div>
              </div>
            </div>
            <div className="org-column">
              <div className="org-box org-box--director">
                DIRECTORATE OF CORPORATE SERVICES
                <span>DIRECTOR</span>
              </div>
              <div className="org-child-grid">
                <div className="org-box org-box--child">FINANCE AND ACCOUNTS SECTION</div>
                <div className="org-box org-box--child">
                  ADMINISTRATION AND HUMAN RESOURCE SECTION
                </div>
                <div className="org-box org-box--child">
                  PLANNING, MONITORING AND EVALUATION SECTION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganogramPage;


