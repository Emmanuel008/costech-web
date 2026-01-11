import React, { useState } from 'react';
import '../styles/pages/FAQsPage.css';

const FAQsPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      id: 'research-1',
      section: 'A. Research Permit',
      question: '1. What is a Research Permit?',
      answer: 'A Research Permit is an official authorization issued by the Tanzania Commission for Science and Technology (COSTECH) that allows researchers to conduct research activities in the United Republic of Tanzania.'
    },
    {
      id: 'research-2',
      section: 'A. Research Permit',
      question: '2. Who is required to obtain a Research Permit from COSTECH?',
      answer: 'All researchers intending to conduct research in Tanzania must obtain a Research Permit from COSTECH, including:\n• Foreign researchers\n• Local researchers affiliated with institutions\n• Independent researchers\n• Visiting scholars and students conducting academic research'
    },
    {
      id: 'research-3',
      section: 'A. Research Permit',
      question: '3. Are Tanzanian citizens required to apply for a Research Permit?',
      answer: 'Yes. Tanzanian researchers are required to register their research projects with COSTECH and obtain a Research Permit, particularly for nationally coordinated, funded, or published research.'
    },
    {
      id: 'research-4',
      section: 'A. Research Permit',
      question: '4. How do I apply for a Research Permit?',
      answer: 'Applications are submitted online through the COSTECH Research Permit System. Applicants must complete the application form and upload all required documents before submission.'
    },
    {
      id: 'research-5',
      section: 'A. Research Permit',
      question: '5. What documents are required for a Research Permit application?',
      answer: 'Commonly required documents include:\n• Detailed research proposal\n• Curriculum Vitae (CV) of the principal researcher\n• Introduction or support letter from host institution (for foreign researchers)\n• Ethical clearance (where applicable)\n• Passport copy (for foreign researchers)\n• Payment proof of applicable fees'
    },
    {
      id: 'research-6',
      section: 'A. Research Permit',
      question: '6. How long does it take to process a Research Permit?',
      answer: 'Processing time normally takes up to 14 working days after receipt of a complete application and payment. Delays may occur if additional clarification or documentation is required.'
    },
    {
      id: 'research-7',
      section: 'A. Research Permit',
      question: '7. How much does a Research Permit cost?',
      answer: 'Research Permit fees vary depending on the applicant category (local or foreign researcher) and the duration of the research. Current fees are published on the COSTECH website and the online application system.'
    },
    {
      id: 'research-8',
      section: 'A. Research Permit',
      question: '8. Is ethical clearance required?',
      answer: 'Yes, ethical clearance is required for research involving:\n• Human subjects\n• Animals\n• Biological materials\n• Applicants must obtain clearance from a recognized ethics committee before submitting their application to COSTECH.'
    },
    {
      id: 'research-9',
      section: 'A. Research Permit',
      question: '9. Can a Research Permit be extended?',
      answer: 'Yes. Researchers may apply for an extension before the expiry of the current permit by submitting justification and updated research progress through the system.'
    },
    {
      id: 'research-10',
      section: 'A. Research Permit',
      question: '10. Does a Research Permit allow me to work or be employed in Tanzania?',
      answer: 'No. A Research Permit does not replace a work permit or residence permit. Foreign researchers must also comply with immigration requirements issued by relevant authorities.'
    },
    {
      id: 'research-11',
      section: 'A. Research Permit',
      question: '11. Can students apply for Research Permits?',
      answer: 'Yes. Undergraduate, Master\'s, and PhD students conducting research in Tanzania must apply for a Research Permit through COSTECH, supported by their academic institution.'
    },
    {
      id: 'research-12',
      section: 'A. Research Permit',
      question: '12. What happens if I conduct research without a Research Permit?',
      answer: 'Conducting research without a valid permit is a violation of national regulations and may result in:\n• Termination of the research\n• Legal action\n• Denial of future research approvals'
    },
    {
      id: 'research-13',
      section: 'A. Research Permit',
      question: '13. Am I required to submit research reports to COSTECH?',
      answer: 'Yes. All researchers are required to submit:\n• Progress reports (if requested)\n• A final research report upon completion\nThis supports national research coordination and knowledge management.'
    },
    {
      id: 'research-14',
      section: 'A. Research Permit',
      question: '14. Can COSTECH assist with ethical clearance from other institutions?',
      answer: 'Yes. COSTECH coordinates with relevant Ministries, Departments, Agencies (MDAs), and research institutions and may issue introduction letters where necessary.'
    },
    {
      id: 'research-15',
      section: 'A. Research Permit',
      question: '15. Who can I contact for support or clarification?',
      answer: 'For assistance, contact:\n• Email and phone contacts as provided on the COSTECH website'
    },
    {
      id: 'nfast-1',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '1. What is NFAST?',
      answer: 'The National Fund for Advancement of Science and Technology (NFAST) is a Government fund established to support and promote research, innovation, and technology development in Tanzania in line with national development priorities.'
    },
    {
      id: 'nfast-2',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '2. What is the main objective of NFAST?',
      answer: 'The main objective of NFAST is to finance high-quality research and innovation projects that contribute to:\n• Socio-economic development\n• Industrialization and value addition\n• Scientific and technological advancement\n• Evidence-based policy and decision-making'
    },
    {
      id: 'nfast-3',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '3. Who manages NFAST?',
      answer: 'NFAST is administered and managed by the Tanzania Commission for Science and Technology (COSTECH) on behalf of the Government of the United Republic of Tanzania.'
    },
    {
      id: 'nfast-4',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '4. Who is eligible to apply for NFAST funding?',
      answer: 'Eligibility depends on the specific call, but generally includes:\n• Tanzanian researchers\n• Research institutions and universities\n• Public and private research organizations\n• Innovators and technology developers\n• Multi-disciplinary and collaborative research teams\nSpecific eligibility criteria are provided in each funding call.'
    },
    {
      id: 'nfast-5',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '5. What kind of support does NFAST offer?',
      answer: 'NFAST supports projects such as:\n• Scientific research and experimental development\n• Technology development and adaptation\n• Innovation and commercialization initiatives\n• Proof-of-concept and pilot studies\n• Capacity building in science, technology, and innovation (STI)'
    },
    {
      id: 'nfast-6',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '6. How can one apply for NFAST funding?',
      answer: 'Applications are submitted online through the COSTECH grant management portal avaailable officially once calls for proposals are announced. Applicants must follow the guidelines provided in each call.'
    },
    {
      id: 'nfast-7',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '7. When are Calls for Proposals announced?',
      answer: 'Calls for Proposals are announced periodically and published through:\n• COSTECH website\n• Official Government communication channels\n• Media announcements\n• Applicants are encouraged to regularly check COSTECH platforms for updates.'
    },
    {
      id: 'nfast-8',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '8. What are the support approaches through NFAST?',
      answer: 'NFAST supports competitive and non-competitive research and innovation projects.'
    },
    {
      id: 'nfast-9',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '9. What is the review and selection process?',
      answer: 'Proposals undergo:\n• Technical and administrative screening\n• Independent peer review\n• Final approval is made by the Commission in accordance with Research and Innovation Grant Manual.'
    },
    {
      id: 'nfast-10',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '10. Are collaborative and multi-institutional projects encouraged?',
      answer: 'Yes. NFAST encourages collaborative projects involving:\n• Multiple institutions\n• Industry–academia partnerships\n• Public–private sector collaboration\nSuch projects enhance impact, sustainability, and knowledge transfer.'
    },
    {
      id: 'nfast-11',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '11. Is co-funding or counterpart contribution required?',
      answer: 'Some Calls for Proposals may require or encourage co-funding or in-kind contributions. This requirement will be clearly stated in the respective call guidelines.'
    },
    {
      id: 'nfast-12',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '12. How are funds disbursed?',
      answer: 'Approved funds are disbursed in installment as per:\n• Signed funding agreement\n• Approved project milestones\n• Submission of satisfactory technical and financial reports\n• The funds are disbursed through host institutions'
    },
    {
      id: 'nfast-13',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '13. What are Host Institutions?',
      answer: 'These are designated Institutions responsible for administering technical and /or inancial project obligations. These are approved upon successful due dilligence.'
    },
    {
      id: 'nfast-14',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '14. What reporting obligations do funded projects have?',
      answer: 'Beneficiaries are required to submit:\n• Periodic technical progress reports biannually\n• Financial accountability reports biannually\n• Final project report upon completion\n• Failure to comply may affect future funding eligibility.'
    },
    {
      id: 'nfast-15',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '15. Who owns the intellectual property (IP) resulting from NFAST-funded projects?',
      answer: 'Intellectual property ownership is governed by:\n• Host Institution Laws and Policies\n• Terms and conditions of the funding agreement\nBeneficiaries are encouraged to protect and commercialize results for national benefit.'
    },
    {
      id: 'nfast-16',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '16. Can NFAST-funded research be published?',
      answer: 'Yes. Researchers are encouraged to publish results in reputable outlets, while acknowledging NFAST and COSTECH support, and complying with IP and confidentiality provisions.'
    },
    {
      id: 'nfast-17',
      section: 'B. What is the National Fund for Advancement of Science and Technology (NFAST)',
      question: '17. Where can I get more information or assistance?',
      answer: 'For more information, contact:\n• nfast@costech.or.tz\n• Official contacts provided on the COSTECH website'
    }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  // Format answer text to handle bullet points
  const formatAnswer = (answer) => {
    return answer.split('\n').map((line, index) => {
      if (line.trim().startsWith('•')) {
        return (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      );
    });
  };

  return (
    <section className="faqs-page">
      <div className="faqs-hero">
        <div className="faqs-hero-overlay" />
        <div className="faqs-hero-content">
          <h1>Frequently Asked Questions (FAQs)</h1>
        </div>
      </div>
      <div className="faqs-body">
        <div className="faqs-content">
                <div className="faqs-questions">
            {faqs.map((faq) => (
                    <div key={faq.id} className="faqs-question-item">
                      <button
                        className={`faqs-question-header ${openQuestion === faq.id ? 'active' : ''}`}
                        onClick={() => toggleQuestion(faq.id)}
                      >
                  <span className="faqs-question-text">
                    <span className="faqs-section-label">{faq.section}</span>
                    <span className="faqs-question-number">{faq.question}</span>
                  </span>
                        <span className="faqs-question-toggle">
                          {openQuestion === faq.id ? '−' : '+'}
                        </span>
                      </button>
                      {openQuestion === faq.id && (
                        <div className="faqs-answer">
                    <p>{formatAnswer(faq.answer)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsPage;
