import React from 'react';
import '../styles/pages/FinancialAuditPage.css';

const FinancialAuditPage = () => {
  const financialStatements = [
    {
      id: 1,
      year: '2023',
      title: 'COSTECH Audited Financial Statement for the Year Ended 30th June 2023',
      file: 'costech-audited-financial-statement-2023.pdf',
      previewUrl: '#',
      downloadUrl: '#'
    },
    {
      id: 2,
      year: '2024',
      title: 'COSTECH Audited Financial Statement for the Year Ended 30th June 2024',
      file: 'costech-audited-financial-statement-2024.pdf',
      previewUrl: '#',
      downloadUrl: '#'
    },
    {
      id: 3,
      year: '2025',
      title: 'COSTECH Audited Financial Statement for the Year Ended 30th June 2025',
      file: 'costech-audited-financial-statement-2025.pdf',
      previewUrl: '#',
      downloadUrl: '#'
    }
  ];

  const handleDownload = (statement) => {
    // Handle download action
    if (statement.downloadUrl && statement.downloadUrl !== '#') {
      const link = document.createElement('a');
      link.href = statement.downloadUrl;
      link.download = statement.file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="financial-audit-page">
      <div className="financial-audit-hero">
        <div className="financial-audit-hero-overlay" />
        <div className="financial-audit-hero-content">
          <h1>Financial Audit Reports</h1>
          <p>
            Access COSTECH's audited financial statements for transparency and accountability.
          </p>
        </div>
      </div>

      <div className="financial-audit-body">
        <div className="financial-statements-grid">
          {financialStatements.map((statement) => (
            <div key={statement.id} className="financial-statement-card">
              <div className="statement-header">
                <h3 className="statement-year">Year Ended 30th June {statement.year}</h3>
                <p className="statement-title">{statement.title}</p>
              </div>
              <div className="statement-actions">
                <button
                  className="action-btn download-btn"
                  onClick={() => handleDownload(statement)}
                  aria-label="Download"
                  title="Download"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialAuditPage;

