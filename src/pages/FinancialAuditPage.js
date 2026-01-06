import React, { useState, useEffect } from 'react';
import '../styles/pages/FinancialAuditPage.css';
import { getFinancialReports } from '../services/api';

// Fallback static data
const fallbackStatements = [
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

const FinancialAuditPage = () => {
  const [financialStatements, setFinancialStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 FinancialAuditPage: Starting to fetch financial reports from API...');
        
        // Fetch financial reports from API
        const apiReports = await getFinancialReports();
        
        console.log('📊 FinancialAuditPage: Received financial reports from API:', apiReports);
        
        if (apiReports && apiReports.length > 0) {
          console.log(`✅ FinancialAuditPage: Using ${apiReports.length} reports from API`);
          
          // Map API data to component structure
          const mappedReports = apiReports.map((item) => {
            // Extract year from title if possible (e.g., "financial year 2026")
            const yearMatch = item.title.match(/\d{4}/);
            const year = yearMatch ? yearMatch[0] : new Date().getFullYear().toString();
            
            // Extract filename from document URL
            const documentUrl = item.document || '';
            const fileName = documentUrl.split('/').pop() || `financial-report-${year}.pdf`;
            
            return {
              id: item.id,
              year: year,
              title: item.title || `COSTECH Audited Financial Statement for the Year Ended 30th June ${year}`,
              description: item.description || '',
              file: fileName,
              previewUrl: documentUrl || '#',
              downloadUrl: documentUrl || '#'
            };
          });
          
          console.log('📝 FinancialAuditPage: Mapped financial reports:', mappedReports);
          setFinancialStatements(mappedReports);
        } else {
          console.warn('⚠️ FinancialAuditPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setFinancialStatements(fallbackStatements);
        }
      } catch (err) {
        console.error('❌ FinancialAuditPage: Error fetching financial reports:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('⚠️ FinancialAuditPage: Falling back to static data due to error');
        setFinancialStatements(fallbackStatements);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialReports();
  }, []);

  const handleDownload = (statement) => {
    // Handle download action
    if (statement.downloadUrl && statement.downloadUrl !== '#') {
      // Open in new tab for download
      window.open(statement.downloadUrl, '_blank');
    } else {
      console.warn('No download URL available for:', statement.title);
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
        {loading ? (
          <div className="financial-loading">
            <p>Loading financial reports...</p>
          </div>
        ) : error && financialStatements.length === 0 ? (
          <div className="financial-error">
            <p>Unable to load financial reports. Please try again later.</p>
          </div>
        ) : (
          <div className="financial-statements-grid">
            {financialStatements.map((statement) => (
              <div key={statement.id} className="financial-statement-card">
                <div className="statement-header">
                  <h3 className="statement-year">Year Ended 30th June {statement.year}</h3>
                  <p className="statement-title">{statement.title}</p>
                  {statement.description && (
                    <p className="statement-description">{statement.description}</p>
                  )}
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
        )}
      </div>
    </section>
  );
};

export default FinancialAuditPage;

