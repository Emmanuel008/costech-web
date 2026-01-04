import React, { useState } from 'react';
import '../styles/pages/FAQsPage.css';

const FAQsPage = () => {
  const [openDepartment, setOpenDepartment] = useState('drcp');
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqsByDepartment = {
    drcp: {
      name: 'Directorate of Research Coordination and Promotion (DRCP)',
      questions: [
        {
          id: 'drcp-1',
          question: 'How to Apply for a Research Permit?',
          answer: 'Prepare your research proposal required supporting documents in English language. Register and submit your application to COSTECH via ',
          answerLink: {
            text: 'https://rclearance.costech.or.tz/auth/login',
            url: 'https://rclearance.costech.or.tz/auth/login'
          },
          answerAfter: '. Pay required application fees. Undergo review and approval processes. Pay required research permit fees. Permit issuance.'
        },
        {
          id: 'drcp-2',
          question: 'Who needs a research permit?',
          answer: 'Any person or organization intending to conduct research on the mainland of Tanzania, including Tanzanian and Non-Tanzanian citizens including Tanzanians studying abroad who return to Tanzania to conduct research as part of their degree or project.'
        },
        {
          id: 'drcp-3',
          question: 'How long does it take to get a permit?',
          answer: 'Eight (8) weeks from the date of submission of a complete application for normal application procedure and Two (2) weeks for fast track procedure.'
        },
        {
          id: 'drcp-4',
          question: 'What is ethical clearance?',
          answer: 'Ethical clearance is an official approval confirming that a research study has been reviewed and found to comply with accepted ethical principles and standards for conducting research.'
        },
        {
          id: 'drcp-5',
          question: 'How do I apply for ethical clearance?',
          answer: 'Identify and apply to a recognized Research Ethics Committee (REC) or Institutional Review Board (IRB) relevant to your field, such as TARI, NIMR, TAWIRI, TAFORI, TAFIRI etc.'
        },
        {
          id: 'drcp-6',
          question: 'What are the penalties for non-compliance?',
          answer: 'Suspension or cancellation of the research permit, Immediate stoppage of the research activity, Rejection of current or future research applications, Confiscation of research data or materials obtained unlawfully, Legal or administrative action under applicable laws and regulations, Immigration sanctions for foreign researchers, including fines, visa cancellation, or deportation, Reputational damage and loss of professional credibility.'
        },
        {
          id: 'drcp-7',
          question: 'How do foreign researchers collaborate with local institutions?',
          answer: 'Foreign researchers collaborate with local institutions through structured, legally recognized arrangements that ensure compliance, knowledge sharing, and local participation.'
        },
        {
          id: 'drcp-8',
          question: 'Registration of Researchers',
          answer: 'Researcher registration is the formal process through which individuals intending to conduct research in researchers are registered with the Tanzania Commission for Science and Technology (COSTECH).'
        },
        {
          id: 'drcp-9',
          question: 'Registration of R&D Institutions',
          answer: 'Registration is the formal process by which research and development institutions, organizations, and centers are officially recognized and recorded by the Tanzania Commission for Science and Technology (COSTECH).'
        },
        {
          id: 'drcp-10',
          question: 'What is the Physical Sciences Section?',
          answer: 'Physical Sciences Section is a section under the directorate of research coordination and promotion that deals with non-living systems and phenomena, focusing on the physical world. These involve issues such as water, industry, energy, and infrastructure.'
        },
        {
          id: 'drcp-11',
          question: 'What is the Life Sciences Section?',
          answer: 'Life Sciences Section refers to the specialized division within DRCP that focuses on the biological and living systems. This section covers a wide range of scientific disciplines related to life and living processes.'
        },
        {
          id: 'drcp-12',
          question: 'What is the Social Sciences Section?',
          answer: 'Refers to a specialized division within DRCP that focuses on human society and social relationships. It encompasses disciplines that explore social behavior, structures, cultural norms, economic systems, governance, and human interactions such as sociology, anthropology, economics, political science, psychology, education and human geography.'
        }
      ]
    },
    cdtt: {
      name: 'Centre for Development and Transfer of Technology (CDTT)',
      questions: [
        {
          id: 'cdtt-1',
          question: 'What is the role of CDTT within COSTECH?',
          answer: 'CDTT is the principal organ of COSTECH responsible for technology development, innovation, and technology transfer.'
        },
        {
          id: 'cdtt-2',
          question: 'Who can engage with CDTT?',
          answer: 'Innovators, startups, higher learning institutions, R&D institutions, industry, MDAs, and development partners.'
        },
        {
          id: 'cdtt-3',
          question: 'Does CDTT fund innovations or spin-off companies?',
          answer: 'CDTT provides technical guidance, coordination, and facilitation. Funding support is accessed through specific programmes, incubators, and partnerships.'
        },
        {
          id: 'cdtt-4',
          question: 'How does CDTT support spin-off company formation?',
          answer: 'By guiding technology selection, IP assignment mechanisms, business plan and business model development, and linkages to incubation, investment, and markets.'
        },
        {
          id: 'cdtt-5',
          question: 'How are Technology Transfer Agreements registered?',
          answer: 'Technology Transfer Agreements are registered and monitored by CDTT in accordance with the National Framework and Tools for Technology Transfer and Management, which provide procedures, assessment criteria, and compliance requirements.'
        },
        {
          id: 'cdtt-6',
          question: 'What programmes are offered under Buni Innovation Hub?',
          answer: 'Buni Innovation Hub, coordinated by CDTT, offers incubation and acceleration programmes that support innovators and startups through capacity building, mentorship, access to technology, market linkages, and investment readiness, with a focus on youth, women, and technology-driven enterprises.'
        },
        {
          id: 'cdtt-7',
          question: 'How does CDTT support the development of indigenous technologies?',
          answer: 'CDTT supports indigenous technologies by identifying national technological needs, facilitating technology development and piloting, guiding value-chain development, and supporting commercialisation and technology transfer in line with national policies and frameworks.'
        }
      ]
    }
  };

  const toggleDepartment = (departmentKey) => {
    setOpenDepartment(openDepartment === departmentKey ? null : departmentKey);
    setOpenQuestion(null);
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <section className="faqs-page">
      <div className="faqs-hero">
        <div className="faqs-hero-overlay" />
        <div className="faqs-hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to common questions about COSTECH's services, programs, and procedures. 
            Select a directorate below to view relevant FAQs.
          </p>
        </div>
      </div>
      <div className="faqs-body">
        <div className="faqs-tabs-container">
          <div className="faqs-tabs">
            {Object.entries(faqsByDepartment).map(([key, department]) => (
              <button
                key={key}
                className={`faqs-tab ${openDepartment === key ? 'active' : ''}`}
                onClick={() => toggleDepartment(key)}
              >
                {department.name}
              </button>
            ))}
          </div>
        </div>

        <div className="faqs-content">
          {Object.entries(faqsByDepartment).map(([key, department]) => (
            openDepartment === key && (
              <div key={key} className="faqs-department-content">
                <div className="faqs-questions">
                  {department.questions.map((faq) => (
                    <div key={faq.id} className="faqs-question-item">
                      <button
                        className={`faqs-question-header ${openQuestion === faq.id ? 'active' : ''}`}
                        onClick={() => toggleQuestion(faq.id)}
                      >
                        <span className="faqs-question-text">{faq.question}</span>
                        <span className="faqs-question-toggle">
                          {openQuestion === faq.id ? '−' : '+'}
                        </span>
                      </button>
                      {openQuestion === faq.id && (
                        <div className="faqs-answer">
                          <p>
                            {faq.answer}
                            {faq.answerLink && (
                              <>
                                {' '}
                                <a 
                                  href={faq.answerLink.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="faqs-link"
                                >
                                  {faq.answerLink.text}
                                </a>
                              </>
                            )}
                            {faq.answerAfter}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsPage;

