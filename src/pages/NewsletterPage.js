import React, { useState, useMemo, useEffect } from 'react';
import '../styles/pages/NewsletterPage.css';
import { getNewsletters } from '../services/api';

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
const fallbackNewsletters = [
  {
    id: 1,
    name: 'COSTECH Newsletter - January 2024',
    publishedDate: '2024-01-15',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'COSTECH Newsletter - December 2023',
    publishedDate: '2023-12-20',
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

const NewsletterPage = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        // Fetch newsletters from API
        const apiNewsletters = await getNewsletters();
        
        
        if (apiNewsletters && apiNewsletters.length > 0) {
          
          // Map API data to component structure
          const mappedNewsletters = apiNewsletters.map((item) => ({
            id: item.id,
            name: item.title || 'Newsletter',
            publishedDate: item.date || new Date().toISOString().split('T')[0],
            downloadUrl: item.document || '#',
          }));
          
          setNewsletters(mappedNewsletters);
        } else {
          console.warn('NewsletterPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setNewsletters(fallbackNewsletters);
        }
      } catch (err) {
        console.error('NewsletterPage: Error fetching newsletters:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('NewsletterPage: Falling back to static data due to error');
        setNewsletters(fallbackNewsletters);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const totalPages = Math.ceil(newsletters.length / itemsPerPage);

  const paginatedNewsletters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return newsletters.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, newsletters]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (e, newsletter) => {
    if (newsletter.downloadUrl && newsletter.downloadUrl !== '#') {
      e.preventDefault();
      window.open(newsletter.downloadUrl, '_blank');
    }
  };

  return (
    <section className="newsletter-page">
      <div className="newsletter-hero">
        <div className="newsletter-hero-overlay" />
        <div className="newsletter-hero-content">
          <h1>Newsletter</h1>
          <p>
            Stay updated with our latest newsletters featuring news, updates, and insights on science,
            technology and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="newsletter-body">
        {loading ? (
          <div className="newsletter-loading">
            <p>Loading newsletters...</p>
          </div>
        ) : error && newsletters.length === 0 ? (
          <div className="newsletter-error">
            <p>Unable to load newsletters. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="newsletter-table-container">
              <div className="newsletter-table-wrapper">
                <table className="newsletter-table">
                  <thead className="newsletter-table-head">
                    <tr className="newsletter-table-row">
                      <th className="newsletter-table-head-cell">Name of the Newsletter</th>
                      <th className="newsletter-table-head-cell">Published Date</th>
                      <th className="newsletter-table-head-cell">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="newsletter-table-body">
                    {paginatedNewsletters.map((newsletter) => (
                      <tr key={newsletter.id} className="newsletter-table-row">
                        <td className="newsletter-table-cell newsletter-table-cell--name">
                          {newsletter.name}
                        </td>
                        <td className="newsletter-table-cell">{formatDate(newsletter.publishedDate)}</td>
                        <td className="newsletter-table-cell">
                          <a
                            href={newsletter.downloadUrl}
                            className="newsletter-download-link"
                            onClick={(e) => handleDownload(e, newsletter)}
                            aria-label={`Download ${newsletter.name}`}
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
              <div className="newsletter-pagination-wrapper">
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

export default NewsletterPage;

