import React, { useState, useMemo, useEffect } from 'react';
import '../styles/pages/GuidelinesPage.css';
import { getGuidelineDocuments } from '../services/api';

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
const fallbackGuidelines = [
  {
    id: 1,
    name: 'COSTECH Research Grant Application Guidelines 2024',
    publishedDate: '2024-01-15',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'Innovation Fund Window Guidelines and Procedures',
    publishedDate: '2023-11-20',
    downloadUrl: '#',
  },
  {
    id: 3,
    name: 'Technology Transfer Agreement Guidelines',
    publishedDate: '2023-09-10',
    downloadUrl: '#',
  },
  {
    id: 4,
    name: 'Research Ethics and Compliance Guidelines',
    publishedDate: '2023-08-05',
    downloadUrl: '#',
  },
  {
    id: 5,
    name: 'Innovation Space Registration Guidelines',
    publishedDate: '2023-07-18',
    downloadUrl: '#',
  },
  {
    id: 6,
    name: 'Cluster Initiative Development Guidelines',
    publishedDate: '2023-06-12',
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

const GuidelinesPage = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 GuidelinesPage: Starting to fetch guideline documents from API...');
        
        // Fetch guideline documents from API
        const apiGuidelines = await getGuidelineDocuments();
        
        console.log('📊 GuidelinesPage: Received guideline documents from API:', apiGuidelines);
        
        if (apiGuidelines && apiGuidelines.length > 0) {
          console.log(`✅ GuidelinesPage: Using ${apiGuidelines.length} guideline documents from API`);
          
          // Map API data to component structure
          const mappedGuidelines = apiGuidelines.map((item) => ({
            id: item.id,
            name: item.title || 'Guideline Document',
            publishedDate: item.date || new Date().toISOString().split('T')[0],
            downloadUrl: item.document || '#',
          }));
          
          console.log('📝 GuidelinesPage: Mapped guideline documents:', mappedGuidelines);
          setGuidelines(mappedGuidelines);
        } else {
          console.warn('⚠️ GuidelinesPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setGuidelines(fallbackGuidelines);
        }
      } catch (err) {
        console.error('❌ GuidelinesPage: Error fetching guideline documents:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('⚠️ GuidelinesPage: Falling back to static data due to error');
        setGuidelines(fallbackGuidelines);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelines();
  }, []);

  const totalPages = Math.ceil(guidelines.length / itemsPerPage);

  const paginatedGuidelines = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return guidelines.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, guidelines]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (e, guideline) => {
    if (guideline.downloadUrl && guideline.downloadUrl !== '#') {
      e.preventDefault();
      window.open(guideline.downloadUrl, '_blank');
    }
  };

  return (
    <section className="guidelines-page">
      <div className="guidelines-hero">
        <div className="guidelines-hero-overlay" />
        <div className="guidelines-hero-content">
          <h1>Guidelines</h1>
          <p>
            Access COSTECH&apos;s comprehensive guidelines and procedures for research grants,
            innovation funding, technology transfer, and other programs that support science,
            technology and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="guidelines-body">
        {loading ? (
          <div className="guidelines-loading">
            <p>Loading guideline documents...</p>
          </div>
        ) : error && guidelines.length === 0 ? (
          <div className="guidelines-error">
            <p>Unable to load guideline documents. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="guidelines-table-container">
              <div className="guidelines-table-wrapper">
                <table className="guidelines-table">
                  <thead className="guidelines-table-head">
                    <tr className="guidelines-table-row">
                      <th className="guidelines-table-head-cell">Name of the Guideline</th>
                      <th className="guidelines-table-head-cell">Published Date</th>
                      <th className="guidelines-table-head-cell">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="guidelines-table-body">
                    {paginatedGuidelines.map((guideline) => (
                      <tr key={guideline.id} className="guidelines-table-row">
                        <td className="guidelines-table-cell guidelines-table-cell--name">
                          {guideline.name}
                        </td>
                        <td className="guidelines-table-cell">{formatDate(guideline.publishedDate)}</td>
                        <td className="guidelines-table-cell">
                          <a
                            href={guideline.downloadUrl}
                            className="guidelines-download-link"
                            onClick={(e) => handleDownload(e, guideline)}
                            aria-label={`Download ${guideline.name}`}
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
              <div className="guidelines-pagination-wrapper">
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

export default GuidelinesPage;

