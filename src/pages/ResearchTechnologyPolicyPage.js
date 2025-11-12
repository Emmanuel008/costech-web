import React, { useState, useMemo } from 'react';
import './ResearchTechnologyPolicyPage.css';

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

const policies = [
  {
    id: 1,
    name: 'National Science, Technology and Innovation Policy 2021',
    publishedDate: '2021-03-15',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'Research and Technology Policy Framework 2018',
    publishedDate: '2018-06-20',
    downloadUrl: '#',
  },
  {
    id: 3,
    name: 'Technology Transfer Policy Guidelines 2019',
    publishedDate: '2019-09-10',
    downloadUrl: '#',
  },
  {
    id: 4,
    name: 'Innovation and Entrepreneurship Policy 2020',
    publishedDate: '2020-11-05',
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

const ResearchTechnologyPolicyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(policies.length / itemsPerPage);

  const paginatedPolicies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return policies.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="research-policy-page">
      <div className="research-policy-hero">
        <div className="research-policy-hero-overlay" />
        <div className="research-policy-hero-content">
          <h1>Research and Technology Policy</h1>
          <p>
            Access national policies, frameworks, and guidelines that shape research, technology
            development, and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="research-policy-body">
        <div className="research-policy-table-container">
          <div className="research-policy-table-wrapper">
            <table className="research-policy-table">
              <thead className="research-policy-table-head">
                <tr className="research-policy-table-row">
                  <th className="research-policy-table-head-cell">Name of the Policy</th>
                  <th className="research-policy-table-head-cell">Published Date</th>
                  <th className="research-policy-table-head-cell">
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody className="research-policy-table-body">
                {paginatedPolicies.map((policy) => (
                  <tr key={policy.id} className="research-policy-table-row">
                    <td className="research-policy-table-cell research-policy-table-cell--name">
                      {policy.name}
                    </td>
                    <td className="research-policy-table-cell">{formatDate(policy.publishedDate)}</td>
                    <td className="research-policy-table-cell">
                      <a
                        href={policy.downloadUrl}
                        className="research-policy-download-link"
                        download
                        aria-label={`Download ${policy.name}`}
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
          <div className="research-policy-pagination-wrapper">
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

export default ResearchTechnologyPolicyPage;

