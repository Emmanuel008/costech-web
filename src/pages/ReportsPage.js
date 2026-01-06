import React, { useState, useMemo, useEffect } from 'react';
import '../styles/pages/ReportsPage.css';
import { getReports } from '../services/api';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <nav className="pagination-nav" aria-label="Page navigation">
        <button
          type="button"
          className="pagination-button pagination-button--prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg className="pagination-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                type="button"
                className={`pagination-button pagination-button--page ${
                  currentPage === page ? 'pagination-button--active' : ''
                }`}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="pagination-button pagination-button--next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg className="pagination-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

// Fallback static data
const fallbackReports = [
  {
    id: 1,
    name: 'COSTECH Annual Report 2022-2023',
    publishedDate: '2023-10-01',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'COSTECH Strategic Plan 2021/22 – 2025/2026',
    publishedDate: '2021-07-01',
    downloadUrl: '#',
  },
  {
    id: 3,
    name: 'Research and Innovation Statistics Report 2023',
    publishedDate: '2023-11-15',
    downloadUrl: '#',
  },
];

/**
 * Format date from API (format: "05/01/2026") or standard date string
 * @param {string} dateString - Date string from API or standard format
 * @returns {string} - Formatted date
 */
const formatDate = (dateString) => {
  if (!dateString) {
    return 'Date not available';
  }

  try {
    let date;
    
    // Check if date is in "DD/MM/YYYY" format (from API)
    if (dateString.includes('/') && dateString.split('/').length === 3) {
      const [day, month, year] = dateString.split('/');
      date = new Date(`${year}-${month}-${day}`);
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      return dateString; // Return original if parsing fails
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString; // Return original if error
  }
};

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 ReportsPage: Starting to fetch reports from API...');
        
        // Fetch reports from API
        const apiReports = await getReports();
        
        console.log('📊 ReportsPage: Received reports from API:', apiReports);
        
        if (apiReports && apiReports.length > 0) {
          console.log(`✅ ReportsPage: Using ${apiReports.length} reports from API`);
          
          // Map API data to component structure
          const mappedReports = apiReports.map((item) => ({
            id: item.id,
            name: item.title || 'Report',
            publishedDate: item.date || new Date().toISOString().split('T')[0],
            downloadUrl: item.document || '#',
          }));
          
          console.log('📝 ReportsPage: Mapped reports:', mappedReports);
          setReports(mappedReports);
        } else {
          console.warn('⚠️ ReportsPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setReports(fallbackReports);
        }
      } catch (err) {
        console.error('❌ ReportsPage: Error fetching reports:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('⚠️ ReportsPage: Falling back to static data due to error');
        setReports(fallbackReports);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reports.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, reports]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (e, report) => {
    if (report.downloadUrl && report.downloadUrl !== '#') {
      e.preventDefault();
      window.open(report.downloadUrl, '_blank');
    }
  };

  return (
    <section className="reports-page">
      <div className="reports-hero">
        <div className="reports-hero-overlay" />
        <div className="reports-hero-content">
          <h1>Reports</h1>
          <p>
            Access COSTECH&apos;s annual reports, financial statements, strategic plans, and other
            publications that document our work in advancing science, technology and innovation in
            Tanzania.
          </p>
        </div>
      </div>

      <div className="reports-body">
        {loading ? (
          <div className="reports-loading">
            <p>Loading reports...</p>
          </div>
        ) : error && reports.length === 0 ? (
          <div className="reports-error">
            <p>Unable to load reports. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="reports-table-container">
              <div className="reports-table-wrapper">
                <table className="reports-table">
                  <thead className="reports-table-head">
                    <tr className="reports-table-row">
                      <th className="reports-table-head-cell">Name of the Report</th>
                      <th className="reports-table-head-cell">Published Date</th>
                      <th className="reports-table-head-cell">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="reports-table-body">
                    {paginatedReports.map((report) => (
                      <tr key={report.id} className="reports-table-row">
                        <td className="reports-table-cell reports-table-cell--name">
                          {report.name}
                        </td>
                        <td className="reports-table-cell">{formatDate(report.publishedDate)}</td>
                        <td className="reports-table-cell">
                          <a
                            href={report.downloadUrl}
                            className="reports-download-link"
                            onClick={(e) => handleDownload(e, report)}
                            aria-label={`Download ${report.name}`}
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="reports-pagination-wrapper">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ReportsPage;

