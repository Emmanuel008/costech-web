import React, { useState, useMemo, useEffect } from 'react';
import '../styles/pages/ActsAndLegalPage.css';
import { getActsAndLegal } from '../services/api';

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
const fallbackActsAndLegal = [
  {
    id: 1,
    name: 'Science and Technology Act',
    publishedDate: '2021-01-15',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'Research and Innovation Legal Framework',
    publishedDate: '2020-06-20',
    downloadUrl: '#',
  },
];

/**
 * Format date from API (format: "06/01/2026") or standard date string
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

const ActsAndLegalPage = () => {
  const [actsAndLegal, setActsAndLegal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchActsAndLegal = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        // Fetch acts and legal documents from API
        const apiActsAndLegal = await getActsAndLegal();
        
        
        if (apiActsAndLegal && apiActsAndLegal.length > 0) {
          
          // Map API data to component structure
          const mappedActsAndLegal = apiActsAndLegal.map((item) => ({
            id: item.id,
            name: item.title || 'Act and Legal Document',
            publishedDate: item.date || new Date().toISOString().split('T')[0],
            downloadUrl: item.document || '#',
          }));
          
          setActsAndLegal(mappedActsAndLegal);
        } else {
          console.warn('ActsAndLegalPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setActsAndLegal(fallbackActsAndLegal);
        }
      } catch (err) {
        console.error('ActsAndLegalPage: Error fetching acts and legal documents:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('ActsAndLegalPage: Falling back to static data due to error');
        setActsAndLegal(fallbackActsAndLegal);
      } finally {
        setLoading(false);
      }
    };

    fetchActsAndLegal();
  }, []);

  const totalPages = Math.ceil(actsAndLegal.length / itemsPerPage);

  const paginatedActsAndLegal = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return actsAndLegal.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, actsAndLegal]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (e, document) => {
    if (document.downloadUrl && document.downloadUrl !== '#') {
      e.preventDefault();
      window.open(document.downloadUrl, '_blank');
    }
  };

  return (
    <section className="acts-legal-page">
      <div className="acts-legal-hero">
        <div className="acts-legal-hero-overlay" />
        <div className="acts-legal-hero-content">
          <h1>Acts & Legal</h1>
          <p>
            Access official acts, legal frameworks, and regulatory documents that govern science,
            technology, and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="acts-legal-body">
        {loading ? (
          <div className="acts-legal-loading">
            <p>Loading acts and legal documents...</p>
          </div>
        ) : error && actsAndLegal.length === 0 ? (
          <div className="acts-legal-error">
            <p>Unable to load acts and legal documents. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="acts-legal-table-container">
              <div className="acts-legal-table-wrapper">
                <table className="acts-legal-table">
                  <thead className="acts-legal-table-head">
                    <tr className="acts-legal-table-row">
                      <th className="acts-legal-table-head-cell">Name of the Document</th>
                      <th className="acts-legal-table-head-cell">Published Date</th>
                      <th className="acts-legal-table-head-cell">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="acts-legal-table-body">
                    {paginatedActsAndLegal.map((document) => (
                      <tr key={document.id} className="acts-legal-table-row">
                        <td className="acts-legal-table-cell acts-legal-table-cell--name">
                          {document.name}
                        </td>
                        <td className="acts-legal-table-cell">{formatDate(document.publishedDate)}</td>
                        <td className="acts-legal-table-cell">
                          <a
                            href={document.downloadUrl}
                            className="acts-legal-download-link"
                            onClick={(e) => handleDownload(e, document)}
                            aria-label={`Download ${document.name}`}
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
              <div className="acts-legal-pagination-wrapper">
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

export default ActsAndLegalPage;

