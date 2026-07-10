import React, { useEffect, useMemo, useState } from 'react';
import '../styles/pages/ReportsPage.css';
import { getFinancialReports } from '../services/api';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
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

const resolveDocumentUrl = (url) => {
  if (!url) {
    return '#';
  }

  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }

  return `https://costech.kingdomsolutions.co.tz/${url}`;
};

const truncateWords = (text, limit = 50) => {
  if (!text) {
    return 'No description available';
  }

  const words = String(text).trim().split(/\s+/).filter(Boolean);
  if (words.length <= limit) {
    return words.join(' ');
  }

  return `${words.slice(0, limit).join(' ')}...`;
};

const AuditedReportsPage = () => {
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

        const apiReports = await getFinancialReports();
        const mappedReports = (apiReports || []).map((item) => ({
          id: item.id,
          name: item.title || item.name || item.report_name || 'Audited Report',
          description: item.description || item.summary || item.content || item.details || '',
          downloadUrl: resolveDocumentUrl(
            item.document || item.file || item.attachment || item.url || item.link
          ),
        }));

        setReports(mappedReports);
      } catch (err) {
        console.error('AuditedReportsPage: Error fetching audited reports:', err);
        setError(err.message);
        setReports([]);
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

  const handleDownload = (event, report) => {
    if (report.downloadUrl && report.downloadUrl !== '#') {
      event.preventDefault();
      window.open(report.downloadUrl, '_blank');
    }
  };

  return (
    <section className="reports-page">
      <div className="reports-hero">
        <div className="reports-hero-overlay" />
        <div className="reports-hero-content">
          <h1>Audited Reports</h1>
          <p>
            Access audited financial reports uploaded by COSTECH for public
            transparency and accountability.
          </p>
        </div>
      </div>

      <div className="reports-body">
        {loading ? (
          <div className="reports-loading">
            <p>Loading audited reports...</p>
          </div>
        ) : error && reports.length === 0 ? (
          <div className="reports-error">
            <p>Unable to load audited reports. Please try again later.</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="reports-empty">
            <p>No audited reports are available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="reports-table-container">
              <div className="reports-table-wrapper">
                <table className="reports-table">
                  <thead className="reports-table-head">
                    <tr className="reports-table-row">
                      <th className="reports-table-head-cell">Name of the Report</th>
                      <th className="reports-table-head-cell">Description</th>
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
                        <td className="reports-table-cell">
                          {truncateWords(report.description)}
                        </td>
                        <td className="reports-table-cell">
                          <a
                            href={report.downloadUrl}
                            className="reports-download-link"
                            onClick={(event) => handleDownload(event, report)}
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

export default AuditedReportsPage;
