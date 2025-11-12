import React, { useState, useMemo } from 'react';
import './StrategicPlanPage.css';

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

const strategicPlans = [
  {
    id: 1,
    name: 'COSTECH Strategic Plan 2021/22 – 2025/2026',
    publishedDate: '2021-07-01',
    downloadUrl: '#',
  },
  {
    id: 2,
    name: 'COSTECH Strategic Plan 2016/17 – 2020/2021',
    publishedDate: '2016-07-01',
    downloadUrl: '#',
  },
  {
    id: 3,
    name: 'COSTECH Strategic Plan 2011/12 – 2015/2016',
    publishedDate: '2011-07-01',
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

const StrategicPlanPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(strategicPlans.length / itemsPerPage);

  const paginatedPlans = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return strategicPlans.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="strategic-plan-page">
      <div className="strategic-plan-hero">
        <div className="strategic-plan-hero-overlay" />
        <div className="strategic-plan-hero-content">
          <h1>Strategic Plan</h1>
          <p>
            Access COSTECH&apos;s strategic plans that outline our vision, mission, goals, and
            strategic objectives for advancing science, technology and innovation in Tanzania.
          </p>
        </div>
      </div>

      <div className="strategic-plan-body">
        <div className="strategic-plan-table-container">
          <div className="strategic-plan-table-wrapper">
            <table className="strategic-plan-table">
              <thead className="strategic-plan-table-head">
                <tr className="strategic-plan-table-row">
                  <th className="strategic-plan-table-head-cell">Name of the Strategic Plan</th>
                  <th className="strategic-plan-table-head-cell">Published Date</th>
                  <th className="strategic-plan-table-head-cell">
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody className="strategic-plan-table-body">
                {paginatedPlans.map((plan) => (
                  <tr key={plan.id} className="strategic-plan-table-row">
                    <td className="strategic-plan-table-cell strategic-plan-table-cell--name">
                      {plan.name}
                    </td>
                    <td className="strategic-plan-table-cell">{formatDate(plan.publishedDate)}</td>
                    <td className="strategic-plan-table-cell">
                      <a
                        href={plan.downloadUrl}
                        className="strategic-plan-download-link"
                        download
                        aria-label={`Download ${plan.name}`}
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
          <div className="strategic-plan-pagination-wrapper">
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

export default StrategicPlanPage;

