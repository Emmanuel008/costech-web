import React, { useState, useMemo } from 'react';
import './ResearchInnovationMagazinePage.css';

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

const magazines = [
  {
    id: 1,
    name: 'Research and Innovation Magazine - Volume 15, Issue 3 (2024)',
    publishedDate: '2024-03-15',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'Research and Innovation Magazine - Volume 15, Issue 2 (2024)',
    publishedDate: '2024-01-20',
    downloadUrl: '#',
  },
  {
    id: 3,
    name: 'Research and Innovation Magazine - Volume 15, Issue 1 (2024)',
    publishedDate: '2023-11-10',
    downloadUrl: '#',
  },
  {
    id: 4,
    name: 'Research and Innovation Magazine - Volume 14, Issue 4 (2023)',
    publishedDate: '2023-09-25',
    downloadUrl: '#',
  },
  {
    id: 5,
    name: 'Research and Innovation Magazine - Volume 14, Issue 3 (2023)',
    publishedDate: '2023-07-18',
    downloadUrl: '#',
  },
  {
    id: 6,
    name: 'Research and Innovation Magazine - Volume 14, Issue 2 (2023)',
    publishedDate: '2023-05-12',
    downloadUrl: '#',
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const ResearchInnovationMagazinePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(magazines.length / itemsPerPage);

  const paginatedMagazines = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return magazines.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="magazine-page">
      <div className="magazine-hero">
        <div className="magazine-hero-overlay" />
        <div className="magazine-hero-content">
          <h1>Research and Innovation Magazine</h1>
          <p>
            Explore our quarterly magazine featuring research highlights, innovation stories, policy
            updates, and insights from Tanzania&apos;s science, technology and innovation ecosystem.
          </p>
        </div>
      </div>

      <div className="magazine-body">
        <div className="magazine-table-container">
          <div className="magazine-table-wrapper">
            <table className="magazine-table">
              <thead className="magazine-table-head">
                <tr className="magazine-table-row">
                  <th className="magazine-table-head-cell">Name of the Magazine</th>
                  <th className="magazine-table-head-cell">Published Date</th>
                  <th className="magazine-table-head-cell">
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody className="magazine-table-body">
                {paginatedMagazines.map((magazine) => (
                  <tr key={magazine.id} className="magazine-table-row">
                    <td className="magazine-table-cell magazine-table-cell--name">
                      {magazine.name}
                    </td>
                    <td className="magazine-table-cell">{formatDate(magazine.publishedDate)}</td>
                    <td className="magazine-table-cell">
                      <a
                        href={magazine.downloadUrl}
                        className="magazine-download-link"
                        download
                        aria-label={`Download ${magazine.name}`}
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
          <div className="magazine-pagination-wrapper">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchInnovationMagazinePage;

