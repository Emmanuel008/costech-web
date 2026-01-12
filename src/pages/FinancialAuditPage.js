import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/pages/FinancialAuditPage.css';
import { getFinancialReports } from '../services/api';

// Fallback static data
const fallbackStatements = [
  {
    id: 1,
    title: 'COSTECH Audited Financial Statement for the Year Ended 30th June 2023',
    date: '2023-06-30',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: 'COSTECH Audited Financial Statement for the Year Ended 30th June 2024',
    date: '2024-06-30',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'COSTECH Audited Financial Statement for the Year Ended 30th June 2025',
    date: '2025-06-30',
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
        
        
        // Fetch financial reports from API
        const apiReports = await getFinancialReports();
        
        
        if (apiReports && apiReports.length > 0) {
          
          // Map API data to component structure
          const mappedReports = apiReports.map((item) => {
            // Extract filename from document URL
            const documentUrl = item.document || '';
            
            return {
              id: item.id,
              title: item.title || 'Financial Report',
              date: item.date || item.created_at || new Date().toISOString().split('T')[0],
              downloadUrl: documentUrl || '#'
            };
          });
          
          setFinancialStatements(mappedReports);
        } else {
          console.warn('FinancialAuditPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setFinancialStatements(fallbackStatements);
        }
      } catch (err) {
        console.error('FinancialAuditPage: Error fetching financial reports:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('FinancialAuditPage: Falling back to static data due to error');
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

  const handleCardClick = (statement) => {
    handleDownload(statement);
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
          <div className="financial-carousel-wrapper">
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
              pauseOnHover={true}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]}
            >
            {financialStatements.map((statement) => (
                <div key={statement.id} className="financial-card-wrapper">
                  <div 
                    className="financial-statement-card"
                    onClick={() => handleCardClick(statement)}
                  >
                    <div className="statement-content">
                      <h3 className="statement-title">{statement.title}</h3>
                      <div className="statement-download-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
                    </svg>
                      </div>
                    </div>
                </div>
              </div>
            ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinancialAuditPage;

