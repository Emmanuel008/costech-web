import React, { useState } from 'react';
import '../styles/pages/FAQsPage.css';

const FAQsPage = () => {
  const [openDepartment, setOpenDepartment] = useState('research');
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqsByDepartment = {
    research: {
      name: 'Department of Research',
      questions: [
        {
          id: 'research-1',
          question: 'How to Apply for a Research Permit',
          answer: 'To apply for a research permit, you need to submit a complete application through the COSTECH online portal. The application should include your research proposal, CV, institutional affiliation letter, and any required supporting documents. Visit the Research Permit section under Directorates for detailed guidelines and access to the application portal.'
        },
        {
          id: 'research-2',
          question: 'Who needs a research permit?',
          answer: 'All researchers conducting research in Tanzania require a research permit from COSTECH. This includes local researchers, foreign researchers, students (both undergraduate and postgraduate), and institutions conducting research activities. The permit is mandatory regardless of the research duration or scope.'
        },
        {
          id: 'research-3',
          question: 'How long does it take to get a permit?',
          answer: 'The processing time for a research permit varies depending on the completeness of the application and the type of research. Typically, it takes 4-6 weeks for local researchers and 6-8 weeks for foreign researchers. Expedited processing may be available for urgent cases, subject to additional fees and approval.'
        },
        {
          id: 'research-4',
          question: 'Application Requirements?',
          answer: 'The application requirements include: (1) Completed application form, (2) Research proposal with clear objectives and methodology, (3) Curriculum Vitae of the principal investigator, (4) Institutional affiliation letter, (5) Ethical clearance certificate (if applicable), (6) Copies of academic certificates, (7) Passport photos, and (8) Application fee payment receipt. Additional documents may be required based on the nature of the research.'
        },
        {
          id: 'research-5',
          question: 'Processing Timelines?',
          answer: 'Standard processing timelines are: Local Researchers - 4-6 weeks, Foreign Researchers - 6-8 weeks, Student Researchers - 3-4 weeks, Institutional Permits - 6-8 weeks. These timelines start from the date of submission of a complete application with all required documents. Incomplete applications will delay the process.'
        },
        {
          id: 'research-6',
          question: 'What is ethical clearance?',
          answer: 'Ethical clearance is a certification that your research proposal has been reviewed and approved by an accredited ethical review body. It ensures that your research adheres to ethical standards, protects participants\' rights, and follows national and international research ethics guidelines. Ethical clearance is mandatory for research involving human subjects, animals, or sensitive data.'
        },
        {
          id: 'research-7',
          question: 'How do I apply for ethical clearance?',
          answer: 'To apply for ethical clearance, you must submit your research proposal to an accredited ethical review body in Tanzania. The list of accredited ethical bodies is available on the COSTECH website. The application process includes submitting your research protocol, informed consent forms, data collection tools, and paying the required fees. The ethical review process typically takes 4-8 weeks.'
        },
        {
          id: 'research-8',
          question: 'What are the penalties for non-compliance?',
          answer: 'Non-compliance with research permit regulations can result in serious penalties including: (1) Immediate revocation of research permit, (2) Legal prosecution and fines, (3) Ban from conducting future research in Tanzania, (4) Deportation for foreign researchers, (5) Blacklisting of institutions, and (6) Publication of non-compliance notices. It is essential to comply with all permit conditions and reporting requirements.'
        },
        {
          id: 'research-9',
          question: 'How do foreign researchers collaborate with local institutions',
          answer: 'Foreign researchers must collaborate with accredited local institutions in Tanzania. The collaboration should be formalized through a Memorandum of Understanding (MOU) or collaboration agreement. The local institution will serve as the host and must provide an institutional affiliation letter. The foreign researcher\'s application must include details of the collaboration, local counterpart researcher information, and the MOU or agreement document.'
        },
        {
          id: 'research-10',
          question: 'Registration of Researchers',
          answer: 'All researchers conducting research in Tanzania must be registered with COSTECH. Registration involves creating an account on the COSTECH online portal, providing personal and professional information, uploading required documents, and paying registration fees. Registered researchers receive a unique researcher ID that must be used in all research permit applications and reports.'
        },
        {
          id: 'research-11',
          question: 'Registration of R&D Institutions',
          answer: 'Research and Development institutions operating in Tanzania must register with COSTECH. The registration process requires submitting institutional information, accreditation certificates, organizational structure, research capacity details, and payment of registration fees. Registered institutions can apply for institutional research permits and participate in national R&D programs.'
        },
        {
          id: 'research-12',
          question: 'List of Accredited Ethical Bodies',
          answer: 'COSTECH maintains a list of accredited ethical review bodies in Tanzania. These bodies are authorized to review and approve research proposals requiring ethical clearance. The list is regularly updated and available on the COSTECH website under the Research Permit section. Researchers must ensure they apply to an accredited body for their ethical clearance.'
        },
        {
          id: 'research-13',
          question: 'Ethics Guidelines and Policies',
          answer: 'COSTECH has established comprehensive ethics guidelines and policies that govern research conduct in Tanzania. These guidelines cover informed consent, data protection, participant rights, animal research ethics, and research integrity. All researchers must familiarize themselves with these guidelines and ensure their research complies with all ethical requirements.'
        },
        {
          id: 'research-14',
          question: 'Roles of R&D Committees',
          answer: 'R&D Committees play a crucial role in coordinating research activities at institutional and national levels. Their roles include: (1) Reviewing and approving research proposals, (2) Monitoring research progress, (3) Ensuring compliance with regulations, (4) Facilitating collaboration, (5) Managing research resources, and (6) Reporting research outcomes to COSTECH.'
        },
        {
          id: 'research-15',
          question: 'Guidelines for Establishing Institutional R&D Committees',
          answer: 'Institutions wishing to establish R&D Committees must follow COSTECH guidelines which require: (1) Institutional commitment and support, (2) Qualified committee members with relevant expertise, (3) Clear terms of reference and operational procedures, (4) Adequate resources and infrastructure, (5) Registration with COSTECH, and (6) Regular reporting and compliance monitoring. Detailed guidelines are available on the COSTECH website.'
        },
        {
          id: 'research-16',
          question: 'National R&D Calendar and Events',
          answer: 'COSTECH maintains a national R&D calendar that includes important dates for research permit applications, reporting deadlines, training workshops, conferences, and other R&D events. The calendar is available on the COSTECH website and is regularly updated. Researchers are encouraged to check the calendar regularly to stay informed about important dates and opportunities.'
        },
        {
          id: 'research-17',
          question: 'R&D Reports and Downloads',
          answer: 'Researchers are required to submit regular reports on their research progress and outcomes. These reports include progress reports, final reports, and impact assessment reports. All report templates and guidelines are available for download from the COSTECH website. Reports must be submitted through the online portal within specified deadlines.'
        }
      ]
    },
    // Additional departments can be added here
    innovation: {
      name: 'Department of Innovation',
      questions: [
        {
          id: 'innovation-1',
          question: 'How to apply for innovation support?',
          answer: 'Innovation support applications can be submitted through the COSTECH online portal. The application process includes submitting your innovation proposal, proof of concept, market analysis, and business plan. Detailed guidelines are available under the Innovation section.'
        }
      ]
    },
    technology: {
      name: 'Department of Technology Transfer',
      questions: [
        {
          id: 'technology-1',
          question: 'What is technology transfer?',
          answer: 'Technology transfer involves the process of transferring knowledge, skills, and technologies from research institutions to industry and society. COSTECH facilitates this process through various programs and services.'
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
                          <p>{faq.answer}</p>
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

