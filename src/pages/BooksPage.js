import React, { useState, useMemo, useEffect } from 'react';
import '../styles/pages/BooksPage.css';
import { getBooks } from '../services/api';

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
const fallbackBooks = [
  {
    id: 1,
    name: 'Science and Technology in Tanzania - Volume 1',
    publishedDate: '2024-01-15',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'Innovation and Research Guidebook',
    publishedDate: '2023-11-20',
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

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        // Fetch books from API
        const apiBooks = await getBooks();
        
        
        if (apiBooks && apiBooks.length > 0) {
          
          // Map API data to component structure
          const mappedBooks = apiBooks.map((item) => ({
            id: item.id,
            name: item.title || 'Book',
            publishedDate: item.date || new Date().toISOString().split('T')[0],
            downloadUrl: item.document || '#',
          }));
          
          setBooks(mappedBooks);
        } else {
          console.warn('BooksPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setBooks(fallbackBooks);
        }
      } catch (err) {
        console.error('BooksPage: Error fetching books:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('BooksPage: Falling back to static data due to error');
        setBooks(fallbackBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return books.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, books]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = (e, book) => {
    if (book.downloadUrl && book.downloadUrl !== '#') {
      e.preventDefault();
      window.open(book.downloadUrl, '_blank');
    }
  };

  return (
    <section className="books-page">
      <div className="books-hero">
        <div className="books-hero-overlay" />
        <div className="books-hero-content">
          <h1>Books</h1>
          <p>
            Explore our collection of books featuring research publications, innovation guides, and
            comprehensive resources on science, technology and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="books-body">
        {loading ? (
          <div className="books-loading">
            <p>Loading books...</p>
          </div>
        ) : error && books.length === 0 ? (
          <div className="books-error">
            <p>Unable to load books. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="books-table-container">
              <div className="books-table-wrapper">
                <table className="books-table">
                  <thead className="books-table-head">
                    <tr className="books-table-row">
                      <th className="books-table-head-cell">Name of the Book</th>
                      <th className="books-table-head-cell">Published Date</th>
                      <th className="books-table-head-cell">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="books-table-body">
                    {paginatedBooks.map((book) => (
                      <tr key={book.id} className="books-table-row">
                        <td className="books-table-cell books-table-cell--name">
                          {book.name}
                        </td>
                        <td className="books-table-cell">{formatDate(book.publishedDate)}</td>
                        <td className="books-table-cell">
                          <a
                            href={book.downloadUrl}
                            className="books-download-link"
                            onClick={(e) => handleDownload(e, book)}
                            aria-label={`Download ${book.name}`}
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
              <div className="books-pagination-wrapper">
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

export default BooksPage;

