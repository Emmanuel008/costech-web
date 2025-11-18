import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import './EDCTPPage.css';

const collaborators = [
  'Tanzania Commission for Science and Technology (COSTECH)',
  'Muhimbili University of Health and Allied Sciences (MUHAS)',
  'Kibong\'oto Infectious Diseases Hospital (KIDH)',
  'University College London (UCL), University of London',
];

const projectDetails = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Recruitment Centres',
    description: 'Kibong\'oto Infectious Diseases Hospital & Health centres in Dar es Salaam',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Ethical Approval',
    description: 'Tanzania National Institute for Medical Research (NIMR)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Funding Source',
    description: 'European and Developing Countries Clinical Trials Partnerships (EDCTP)',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Host Organization',
    description: 'Tanzania Commission for Science and Technology in collaboration with Kibong\'oto Infectious Diseases Hospital, University College London and Muhimbili University of Health and Allied Sciences',
  },
];

const EDCTPPage = () => {
  return (
    <section className="edctp-page">
      <div className="edctp-hero">
        <div className="edctp-hero-overlay" />
        <div className="edctp-hero-content">
          <h1>Clinical application of whole genome sequencing in multidrug resistance tuberculosis patients in Tanzania</h1>
        </div>
      </div>

      <div className="edctp-container">
        <div className="edctp-layout">
          {/* Sidebar */}
          <aside className="edctp-sidebar">
            <div className="edctp-sidebar-section">
              <h3 className="edctp-sidebar-title">Project Details</h3>
              <div className="edctp-sidebar-divider" />
              <div className="edctp-sidebar-content">
                <div className="edctp-sidebar-row">
                  <span className="edctp-sidebar-label">Programme:</span>
                  <span className="edctp-sidebar-value">EDCTP 2</span>
                </div>
                <div className="edctp-sidebar-row">
                  <span className="edctp-sidebar-label">Start Date:</span>
                  <span className="edctp-sidebar-value">October 2020</span>
                </div>
                <div className="edctp-sidebar-row">
                  <span className="edctp-sidebar-label">End Date:</span>
                  <span className="edctp-sidebar-value">September 2024</span>
                </div>
                <div className="edctp-sidebar-row">
                  <span className="edctp-sidebar-label">Project Code:</span>
                  <span className="edctp-sidebar-value">TMA2018CDF-2363</span>
                </div>
                <div className="edctp-sidebar-row">
                  <span className="edctp-sidebar-label">Grant Acronym:</span>
                  <span className="edctp-sidebar-value">CWGSMDRTB</span>
                </div>
                <div className="edctp-sidebar-row">
                  <span className="edctp-sidebar-label">Participants:</span>
                  <span className="edctp-sidebar-value">153 MDR-TB patients</span>
                </div>
              </div>
            </div>

            <div className="edctp-sidebar-section">
              <h3 className="edctp-sidebar-title">Quick Information</h3>
              <div className="edctp-sidebar-divider" />
              <div className="edctp-sidebar-content">
                <div className="edctp-sidebar-info-item">
                  <strong>Recruitment Centres:</strong>
                  <p>Kibong&apos;oto Infectious Diseases Hospital &amp; Health centres in Dar es Salaam</p>
                </div>
                <div className="edctp-sidebar-info-item">
                  <strong>Ethical Approval:</strong>
                  <p>Tanzania National Institute for Medical Research (NIMR)</p>
                </div>
                <div className="edctp-sidebar-info-item">
                  <strong>Funding Source:</strong>
                  <p>European and Developing Countries Clinical Trials Partnerships (EDCTP)</p>
                </div>
              </div>
            </div>

            <div className="edctp-sidebar-section">
              <h3 className="edctp-sidebar-title">Contact</h3>
              <div className="edctp-sidebar-divider" />
              <div className="edctp-sidebar-content">
                <div className="edctp-contact-box">
                  <h4>Dr Bugwesa Zablon Katale</h4>
                  <p className="edctp-contact-org">Tanzania Commission for Science and Technology</p>
                  <p className="edctp-contact-detail">P.O. BOX 4302, Dar es Salaam</p>
                  <p className="edctp-contact-detail">
                    <a href="mailto:bugwesa.katale@costech.or.tz">bugwesa.katale@costech.or.tz</a>
                  </p>
                  <p className="edctp-contact-detail">
                    <a href="tel:+255784687178">+255 784 687 178</a>
                  </p>
                </div>
                <div className="edctp-contact-box">
                  <h4>Prof Meck I Matee</h4>
                  <p className="edctp-contact-org">Muhimbili University of Health and Allied Sciences</p>
                  <p className="edctp-contact-detail">P.O. BOX 65001, Department of Microbiology and Immunology</p>
                  <p className="edctp-contact-detail">
                    <a href="mailto:mateemecky@yahoo.com">mateemecky@yahoo.com</a> or <a href="mailto:mateemecky@gmail.com">mateemecky@gmail.com</a>
                  </p>
                  <p className="edctp-contact-detail">
                    <a href="tel:+255713081162">+255 713 081 162</a>
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="edctp-main">
            {/* Brief Summary */}
            <section className="edctp-content-section">
              <h2 className="edctp-section-title">The project in brief</h2>
              <div className="edctp-content-text">
                <p>
                  TMA2018CDF-2363 research project, hosted at COSTECH will determine the clinical application of whole genome sequencing in multidrug resistance tuberculosis patients. The study will utilize whole genome sequencing of multidrug resistance tuberculosis (MDR-TB) in diagnosis and treatment of TB in Tanzania while providing stringent strain discrimination. The study enrolls 153 multidrug resistance tuberculosis patients attending health services at TB dedicated Kibong&apos;oto Hospital (KIDH) and TB health clinics in Dar es Salaam. Whole genome sequencing (WGS) and bioinformatics analysis will be performed to determine mutations that predict phenotypic resistance to anti-TB drugs. Patient&apos;s clinical information and outcomes are obtained and compared to phenotypic and genetic data. This study will provide an insight into the role of WGS in clinical management of patients and the role of (drug resistance) DR genes in progression and disease outcome. It is conducted in collaboration with Kibong&apos;oto Infectious Diseases Hospital and Muhimbili University of Health and Allied Sciences and University College London, United Kingdom.
                </p>
              </div>
            </section>

            {/* Background */}
            <section className="edctp-content-section">
              <h3 className="edctp-subsection-title">
                <span className="edctp-subsection-icon">▼</span>
                Background
              </h3>
              <div className="edctp-content-text">
                <p>
                  TMA2018CDF-2363 research project, hosted at COSTECH will determine the clinical application of whole genome sequencing in multidrug resistance tuberculosis patients. The study will utilize whole genome sequencing of multidrug resistance tuberculosis (MDR-TB) in diagnosis and treatment of TB in Tanzania while providing stringent strain discrimination. The study enrolls 153 multidrug resistance tuberculosis patients attending health services at TB dedicated Kibong&apos;oto Hospital (KIDH) and TB health clinics in Dar es Salaam. Whole genome sequencing (WGS) and bioinformatics analysis will be performed to determine mutations that predict phenotypic resistance to anti-TB drugs. Patient&apos;s clinical information and outcomes are obtained and compared to phenotypic and genetic data. This study will provide an insight into the role of WGS in clinical management of patients and the role of (drug resistance) DR genes in progression and disease outcome. It is conducted in collaboration with Kibong&apos;oto Infectious Diseases Hospital and Muhimbili University of Health and Allied Sciences and University College London, United Kingdom.
                </p>
              </div>
            </section>

            {/* Objectives */}
            <section className="edctp-content-section">
              <h3 className="edctp-subsection-title">
                <span className="edctp-subsection-icon">▼</span>
                Objectives
              </h3>
              <div className="edctp-content-text">
                <h4>Primary Objective</h4>
                <p>
                  To describe the incidence of drug resistance mutations in MDR-TB patients in Tanzania, establish epidemiological associations and evaluate the clinical application of this approach.
                </p>
                <h4>Secondary Objectives</h4>
                <ul>
                  <li>To describe drug susceptibility against first and second line antituberculosis drugs</li>
                  <li>To identify molecular markers associated with drug resistance M. tuberculosis in these population isolates</li>
                  <li>To describe associations between drug resistance genotype and clinical outcome</li>
                  <li>To determine the genetic relatedness of drug resistance M. tuberculosis isolates</li>
                  <li>To determine the genetic relatedness and phylogenetic relationship of drug resistance M. tuberculosis isolates</li>
                  <li>Determination of the role of genotypic mutation alone or in combination in clinical outcome.</li>
                  <li>To monitor the microevolution events in drug resistance genes during antituberculosis therapy</li>
                </ul>
              </div>
            </section>

            {/* Eligibility Criteria */}
            <section className="edctp-content-section">
              <h3 className="edctp-subsection-title">
                <span className="edctp-subsection-icon">▼</span>
                Eligibility Criteria
              </h3>
              <div className="edctp-content-text">
                <h4>Inclusion Criteria</h4>
                <p>
                  TB patients aged ≥18 years, confirmed either as MDR-TB or non MDRTB using DST, Xpert® MTB/RIF assay GeneXpert® (Cepheid, Sunnyvale, CA, USA), GenoType MTBDRplus (Hain Life science, GmbH, Nehren) with willingness to sign a written informed consent and provide sputum samples for laboratory analysis.
                </p>
                <h4>Exclusion Criteria</h4>
                <p>
                  TB patients aged &lt;18 years, with non-confirmed MDR-TB or extensively drug-resistant tuberculosis (XDR-TB) and those who will refuse to sign a written informed consent will be excluded from the study.
                </p>
              </div>
            </section>

            {/* Expected Outcomes */}
            <section className="edctp-content-section">
              <h3 className="edctp-subsection-title">
                <span className="edctp-subsection-icon">▼</span>
                Expected Outcomes
              </h3>
              <div className="edctp-content-text">
                <ul>
                  <li>The research will have impact on understanding the molecular basis/biomarkers of drug resistance TB isolates from different regions in the country</li>
                  <li>Improve understanding of the role played by mutation alone or in combination in prediction of clinical manifestations/ diseases progression/ identifying patients at early stages of disease</li>
                  <li>Improvement in turnaround time (TAT) for informed decision making on course of infection control and improve patient treatment</li>
                </ul>
              </div>
            </section>

            {/* Project Details Table */}
            <section className="edctp-content-section">
              <h3 className="edctp-subsection-title">
                <span className="edctp-subsection-icon">▼</span>
                Project Details
              </h3>
              <div className="edctp-content-text">
                <div className="edctp-table-container">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeadCell>Detail</TableHeadCell>
                        <TableHeadCell>Description</TableHeadCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                      {projectDetails.map((detail, index) => (
                        <TableRow key={`${detail.title}-${index}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div className="edctp-table-title">
                              <span className="edctp-table-icon">{detail.icon}</span>
                              {detail.title}
                        </div>
                          </TableCell>
                          <TableCell>{detail.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>

            {/* Collaborators */}
            <section className="edctp-content-section">
              <h3 className="edctp-subsection-title">
                <span className="edctp-subsection-icon">▼</span>
                Collaborators
              </h3>
              <div className="edctp-content-text">
                <div className="edctp-table-container">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeadCell>Organization</TableHeadCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                      {collaborators.map((collaborator, index) => (
                        <TableRow key={`${collaborator}-${index}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <TableCell>
                            <div className="edctp-table-title">
                              <span className="edctp-table-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                  <circle cx="9" cy="7" r="4" />
                                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                              </span>
                              {collaborator}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>

            {/* Logos */}
            <section className="edctp-content-section edctp-logos-section">
              <div className="edctp-logos">
                <img src="/assets/img/edctp.png" alt="EDCTP Logo" className="edctp-logo" />
                <img src="/assets/img/eulogo.png" alt="European Union Logo" className="edctp-logo" />
              </div>
              <p className="edctp-footer-note">
                This project TMA2018CDF-2363 is part of the EDCTP2 programme supported by the European Union
              </p>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
};

export default EDCTPPage;
