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
        },
        {
          id: 'cdtt-8',
          question: 'What types of technologies does CDTT support?',
          answer: 'CDTT supports technologies in all sectors including agriculture, health, manufacturing, energy, ICT, environment, and emerging fields such as AI, robotics, and biotechnology.'
        },
        {
          id: 'cdtt-9',
          question: 'Does CDTT work with both public and private institutions?',
          answer: 'Yes. CDTT collaborates with government agencies, universities, R&D institutions, private sector companies, and international partners.'
        },
        {
          id: 'cdtt-10',
          question: 'What is technology scouting and how does CDTT conduct it?',
          answer: 'CDTT identifies promising technologies through market research, global databases, partnerships, and innovation networks.'
        },
        {
          id: 'cdtt-11',
          question: 'How can an institution request support for technology acquisition?',
          answer: 'Requests can be submitted through the CDTT service form, email, or office visit.'
        },
        {
          id: 'cdtt-12',
          question: 'Does CDTT help identify international technologies suitable for Tanzania?',
          answer: 'Yes. CDTT works with embassies, global innovation hubs, and international partners.'
        },
        {
          id: 'cdtt-13',
          question: 'What criteria are used to evaluate technologies for acquisition?',
          answer: 'Evaluation considers cost, scalability, adaptability, environmental impact, market demand, and alignment with national priorities.'
        },
        {
          id: 'cdtt-17',
          question: 'What support does CDTT offer for commercialization?',
          answer: 'CDTT provides market assessments, business development support, commercialization roadmaps, investor linkages, and IP advisory.'
        },
        {
          id: 'cdtt-19',
          question: 'What documents are required for commercialization support?',
          answer: 'Technology description, Prototype or proof of concept, Problem statement, IP documentation (if any), Business model (optional).'
        },
        {
          id: 'cdtt-20',
          question: 'Can CDTT assist with market assessments and feasibility studies?',
          answer: 'Yes. CDTT conducts market research and feasibility studies.'
        },
        {
          id: 'cdtt-21',
          question: 'Does CDTT provide IP advisory services?',
          answer: 'Yes. CDTT offers IP advisory in collaboration with BRELA.'
        },
        {
          id: 'cdtt-22',
          question: 'How does CDTT collaborate with BRELA on IP matters?',
          answer: 'Through patent searches, trademark support, and IP protection strategies.'
        },
        {
          id: 'cdtt-23',
          question: 'What types of IP protection are available for innovators?',
          answer: 'Patents, utility models, trademarks, copyrights, trade secrets, and plant varieties.'
        },
        {
          id: 'cdtt-24',
          question: 'Can CDTT help with patent searches or prior-art analysis?',
          answer: 'Yes. CDTT assists with prior-art searches.'
        },
        {
          id: 'cdtt-25',
          question: 'What is Innovation Foresight and why is it important?',
          answer: 'It identifies future technological trends to guide national planning and investment.'
        },
        {
          id: 'cdtt-26',
          question: 'How can institutions request a foresight briefing or advisory?',
          answer: 'Through the CDTT office or online portal.'
        },
        {
          id: 'cdtt-27',
          question: 'What training programs does CDTT offer?',
          answer: 'Training in innovation management, technology transfer, IP, commercialization, and prototyping.'
        },
        {
          id: 'cdtt-28',
          question: 'How can I register for workshops?',
          answer: 'Through the CDTT website, email, or office.'
        },
        {
          id: 'cdtt-29',
          question: 'Does CDTT provide customized training for institutions?',
          answer: 'Yes. CDTT offers tailored programs.'
        },
        {
          id: 'cdtt-31',
          question: 'How does CDTT facilitate collaboration between industry and academia?',
          answer: 'Through joint R&D programs, innovation challenges, and exhibitions.'
        },
        {
          id: 'cdtt-34',
          question: 'Does CDTT provide funding for technology development?',
          answer: 'CDTT may provide technical support, seed funding, or linkages to funding partners, depending on program availability.'
        },
        {
          id: 'cdtt-35',
          question: 'What types of support are available for startups and innovators?',
          answer: 'Technical advisory, prototyping, commercialization support, IP guidance, and investor linkages.'
        },
        {
          id: 'cdtt-36',
          question: 'How can I apply for CDTT support programs?',
          answer: 'Through the CDTT portal or office.'
        },
        {
          id: 'cdtt-37',
          question: 'Are there eligibility criteria for accessing CDTT services?',
          answer: 'Yes. Criteria include relevance, feasibility, national impact, and readiness level.'
        },
        {
          id: 'cdtt-38',
          question: 'How do I submit a request for CDTT support?',
          answer: 'Via the online form, email, or office visit.'
        },
        {
          id: 'cdtt-39',
          question: 'What documents are required when applying?',
          answer: 'Concept note, Technology description, Prototype (if available), Applicant or institutional profile.'
        },
        {
          id: 'cdtt-40',
          question: 'How long does it take to receive feedback?',
          answer: 'Typically 7 working days.'
        },
        {
          id: 'cdtt-41',
          question: 'Can services be accessed online?',
          answer: 'Yes. Most services start online, though some require physical assessment.'
        },
        {
          id: 'cdtt-42',
          question: 'Where is the CDTT office located?',
          answer: 'COSTECH Building, Kijitonyama, Dar es Salaam.'
        },
        {
          id: 'cdtt-43',
          question: 'What are the working hours?',
          answer: 'Monday–Friday, 7:30 AM – 3:30 PM.'
        },
        {
          id: 'cdtt-43b',
          question: 'Is there a dedicated email or hotline for innovators?',
          answer: 'Yes (details to be inserted).'
        },
        {
          id: 'cdtt-44',
          question: 'How can I book a consultation with CDTT experts?',
          answer: 'Through the online booking system, email, or office visit.'
        },
        {
          id: 'cdtt-45',
          question: 'What is innovation?',
          answer: 'Innovation is a new or significantly improved product or process introduced to the market or put into use.'
        },
        {
          id: 'cdtt-46',
          question: 'What is an invention?',
          answer: 'An invention is the creation of a product or process for the first time.'
        },
        {
          id: 'cdtt-47',
          question: 'What is the difference between invention and innovation?',
          answer: 'Invention = creation of something entirely new. Innovation = practical application or improvement of an invention or existing solution.'
        },
        {
          id: 'cdtt-48',
          question: 'When does an idea become an invention or innovation?',
          answer: 'When it meets criteria defined in national laws, treaties, and conventions.'
        },
        {
          id: 'cdtt-49',
          question: 'Who is an innovator or inventor?',
          answer: 'A person or entity from whom an innovation or invention originates.'
        },
        {
          id: 'cdtt-50',
          question: 'Where can an innovation or invention originate?',
          answer: 'Formal R&D institutions, Grassroots innovators, Traditional knowledge systems.'
        },
        {
          id: 'cdtt-51',
          question: 'Can an innovation be legally owned?',
          answer: 'Yes, once registered under relevant IP laws.'
        },
        {
          id: 'cdtt-52',
          question: 'Does COSTECH provide support to innovators?',
          answer: 'Yes—technical, financial, and linkage support.'
        },
        {
          id: 'cdtt-53',
          question: 'What stages of innovation does COSTECH support?',
          answer: 'Prototype development, Technology development, Commercialization.'
        },
        {
          id: 'cdtt-54',
          question: 'How does COSTECH identify and support innovations?',
          answer: 'Through TASTA awards, walk-in innovations program, exhibitions, MAKISATU, and innovation challenges.'
        },
        {
          id: 'cdtt-55',
          question: 'What is Intellectual Property (IP)?',
          answer: 'IP refers to creations of the mind, such as inventions, artistic works, symbols, names, and images used in commerce.'
        },
        {
          id: 'cdtt-56',
          question: 'What does IP protection mean?',
          answer: 'Legal protection granted to creators to control the use of their creations.'
        },
        {
          id: 'cdtt-57',
          question: 'What are the types of IP?',
          answer: 'Industrial Property: patents, trademarks, industrial designs, geographical indications, trade secrets. Copyright: literary, artistic, musical, software, films, architecture.'
        },
        {
          id: 'cdtt-58',
          question: 'How can an invention/innovation be protected?',
          answer: 'Through IP rights once legal criteria are met.'
        },
        {
          id: 'cdtt-59',
          question: 'What are Intellectual Property Rights (IPRs)?',
          answer: 'Exclusive rights granted to creators over their creations.'
        },
        {
          id: 'cdtt-60',
          question: 'Who is a right holder?',
          answer: 'A person or entity with legally granted exclusive rights.'
        },
        {
          id: 'cdtt-61',
          question: 'What exclusive rights does a right holder have?',
          answer: 'To use, reproduce, sell, license, assign, distribute, export, import, translate, or adapt the protected work.'
        },
        {
          id: 'cdtt-62',
          question: 'What is copyright?',
          answer: 'Protection for original works of authorship fixed in a tangible medium.'
        },
        {
          id: 'cdtt-63',
          question: 'What does copyright protect?',
          answer: 'Literary, musical, artistic works, software, films, architecture.'
        },
        {
          id: 'cdtt-64',
          question: 'When is my work protected?',
          answer: 'Automatically upon creation.'
        },
        {
          id: 'cdtt-65',
          question: 'Must I register for copyright?',
          answer: 'No, but registration is recommended for legal proof.'
        },
        {
          id: 'cdtt-66',
          question: 'How is copyright different from patents or trademarks?',
          answer: 'Copyright = creative works. Patents = inventions. Trademarks = brand identifiers.'
        },
        {
          id: 'cdtt-67',
          question: 'How do I protect software?',
          answer: 'Through copyright.'
        },
        {
          id: 'cdtt-68',
          question: 'Does COSTECH register IP?',
          answer: 'No. Registration is done through BRELA, COSOTA, BPRA, or COSOZA.'
        },
        {
          id: 'cdtt-69',
          question: 'Where do I register copyright?',
          answer: 'COSOTA (Mainland) or COSOZA (Zanzibar).'
        },
        {
          id: 'cdtt-70',
          question: 'Are there criteria for IP protection?',
          answer: 'Yes—each IP type has specific criteria.'
        },
        {
          id: 'cdtt-71',
          question: 'How do I register industrial property?',
          answer: 'Through BRELA (Mainland) or BPRA (Zanzibar).'
        },
        {
          id: 'cdtt-72',
          question: 'Do I have to register industrial property?',
          answer: 'Yes. Protection is territorial.'
        },
        {
          id: 'cdtt-73',
          question: 'What is the duration of IP protection?',
          answer: 'Copyright: life + 50 years. Patents: 20 years. Trademarks: 7 years (renewable).'
        },
        {
          id: 'cdtt-74',
          question: 'Are there fees for IP registration?',
          answer: 'Yes. Fees vary by IP type and authority.'
        },
        {
          id: 'cdtt-75',
          question: 'Is there worldwide patent protection?',
          answer: 'No. Patents must be filed in each country or region.'
        },
        {
          id: 'cdtt-76',
          question: 'How do I protect my invention in several countries?',
          answer: 'National route, Regional route (ARIPO, EPO, OAPI), International route (PCT).'
        },
        {
          id: 'cdtt-77',
          question: 'Can I transfer my IPRs?',
          answer: 'Yes—through sale, licensing, or assignment.'
        },
        {
          id: 'cdtt-78',
          question: 'Can IPRs be inherited?',
          answer: 'YES: IPR can be inherited by the beneficiaries, after approval by relevant national authorities.'
        },
        {
          id: 'cdtt-79',
          question: 'What happens when IP protection expires?',
          answer: 'The work enters the public domain.'
        },
        {
          id: 'cdtt-80',
          question: 'Who monitors protection of my IPR?',
          answer: 'The right holder, supported by national enforcement systems.'
        },
        {
          id: 'cdtt-81',
          question: 'What is IP commercialization?',
          answer: 'Turning IP into market value through licensing, sale, or revenue generation.'
        },
        {
          id: 'cdtt-82',
          question: 'What should I do before applying for IP protection?',
          answer: 'Seek professional advice, Understand your IP type, Keep your idea confidential, Ensure ownership is clear, Prepare for costs, Study your market.'
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

