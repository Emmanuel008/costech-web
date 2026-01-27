import React, { useState, useEffect } from 'react';
import '../styles/pages/JournalsPage.css';
import { getJournals } from '../services/api';

const JournalsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiJournals = await getJournals();
        
        // Map API data to component structure
        const mappedJournals = apiJournals.map((item) => ({
          id: item.id,
          issn: item.issn || '-',
          title: item.title || '-',
          publisher: item.publisher || '-',
          mode: item.mode || '-',
          frequency: item.frequency || '-',
          subject: item.subject || '-',
          url: item.url || '',
          language: item.language || '-',
          indexed: item.indexed || '-',
          university: item.university || '-'
        }));
        
        setJournals(mappedJournals);
      } catch (err) {
        console.error('Error fetching journals:', err);
        setError(err.message || 'Failed to load journals');
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  // Repository data - Tanzania Journals categorized by University
  const repositoryData = journals;

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...repositoryData].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn] || '';
    const bValue = b[sortColumn] || '';
    if (sortDirection === 'asc') {
      return String(aValue).localeCompare(String(bValue));
    } else {
      return String(bValue).localeCompare(String(aValue));
    }
  });

  const filteredData = sortedData.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
  return (
    <section className="journals-page">
      <div className="journals-hero">
        <div className="journals-hero-overlay" />
        <div className="journals-hero-content">
          <h1>Journals</h1>
          <p>
            Explore a comprehensive list of Tanzanian academic journals from various universities and research institutions.
          </p>
        </div>
      </div>
        <div className="journals-body">
          <div className="journals-loading">
            <p>Loading journals...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="journals-page">
        <div className="journals-hero">
          <div className="journals-hero-overlay" />
          <div className="journals-hero-content">
            <h1>Journals</h1>
            <p>
              Explore a comprehensive list of Tanzanian academic journals from various universities and research institutions.
            </p>
          </div>
        </div>
        <div className="journals-body">
          <div className="journals-error">
            <p>Unable to load journals. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="journals-page">
      <div className="journals-hero">
        <div className="journals-hero-overlay" />
        <div className="journals-hero-content">
          <h1>Journals</h1>
          <p>
            Explore a comprehensive list of Tanzanian academic journals from various universities and research institutions.
          </p>
        </div>
      </div>

      <div className="journals-body">
        <div className="journals-table-container">
          <div className="journals-table-title">
            <h3>LIST OF TANZANIA JOURNALS</h3>
          </div>
          
          <div className="journals-search-container">
            <input
              type="text"
              className="journals-search-input"
              placeholder="Write here to filter journal records"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="journals-table-wrapper">
            <table className="journals-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th className="sortable" onClick={() => handleSort('issn')}>
                    ISSN {sortColumn === 'issn' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('title')}>
                    Title {sortColumn === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('publisher')}>
                    Publisher {sortColumn === 'publisher' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('mode')}>
                    Mode {sortColumn === 'mode' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('frequency')}>
                    Frequency {sortColumn === 'frequency' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('subject')}>
                    Subject {sortColumn === 'subject' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('url')}>
                    URL {sortColumn === 'url' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('language')}>
                    Language {sortColumn === 'language' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('indexed')}>
                    Indexed {sortColumn === 'indexed' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('university')}>
                    University {sortColumn === 'university' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.issn || '-'}</td>
                      <td>{item.title}</td>
                      <td>{item.publisher}</td>
                      <td>{item.mode || '-'}</td>
                      <td>{item.frequency || '-'}</td>
                      <td>{item.subject}</td>
                      <td>
                        {item.url && item.url !== '-' ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="journal-link">
                            {item.url.length > 40 ? item.url.substring(0, 40) + '...' : item.url}
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>{item.language || '-'}</td>
                      <td>{item.indexed || '-'}</td>
                      <td>{item.university}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="no-data">
                      No journals found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="journals-pagination">
            <div className="pagination-info">
              Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalsPage;
