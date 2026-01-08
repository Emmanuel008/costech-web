import React, { useState } from 'react';
import '../styles/pages/ConferencePage.css';

const ConferencePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 10;

  // Conference data
  const conferencesData = [
    {
      id: 1,
      name: 'Science, Technology and Innovation Conference and Exhibitions',
      abbreviation: 'STICE',
      host: 'COSTECH',
      theme: 'From Legacy…..',
      dates: '3-4 September 2026',
      location: 'Dar es Salaam',
      link: 'https://stice.costech.or.tz'
    },
    {
      id: 2,
      name: 'Research & Innovation Week (UDSM)',
      abbreviation: '-',
      host: 'Univ. of Dar es Salaam',
      theme: 'Research excellence & innovation (multidisciplinary)',
      dates: 'May/Jun 2026 (projected)',
      location: 'Dar es Salaam',
      link: 'https://www.udsm.ac.tz'
    },
    {
      id: 3,
      name: 'Tanzania Society of Animal Production Annual Scientific Conference',
      abbreviation: 'TSAP Conf',
      host: 'TSAP',
      theme: 'Animal & Livestock Science',
      dates: 'October 2026 (projected)',
      location: 'Arusha',
      link: 'https://tsap.or.tz'
    },
    {
      id: 4,
      name: 'International Conference on Education Policy & Curricular Reforms',
      abbreviation: '–',
      host: 'University of Dar es Salaam',
      theme: 'Education & Policy',
      dates: 'March 2026 (projected)',
      location: 'Dar es Salaam',
      link: 'http://ww.udsm.ac.tz'
    }
  ];

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...conferencesData].sort((a, b) => {
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

  return (
    <section className="conference-page">
      <div className="conference-hero">
        <div className="conference-hero-overlay" />
        <div className="conference-hero-content">
          <h1>Conferences</h1>
          <p>Conference and Exhibitions in Tanzania December from January 2026 to December 2026</p>
        </div>
      </div>

      <div className="conference-body">
        <div className="conference-table-container">
          <div className="conference-table-title">
            <h3>A: Conference</h3>
          </div>

          <div className="conference-search-container">
            <input
              type="text"
              className="conference-search-input"
              placeholder="Write here to filter conference records"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            </div>

          <div className="conference-table-wrapper">
            <table className="conference-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th className="sortable" onClick={() => handleSort('name')}>
                    Name of the Conference {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('abbreviation')}>
                    Abbreviation {sortColumn === 'abbreviation' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('host')}>
                    Host/Organizer {sortColumn === 'host' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('theme')}>
                    Theme / Focus {sortColumn === 'theme' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('dates')}>
                    Tentative Dates {sortColumn === 'dates' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('location')}>
                    Location {sortColumn === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('link')}>
                    Link / Source {sortColumn === 'link' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.abbreviation}</td>
                      <td>{item.host}</td>
                      <td>{item.theme}</td>
                      <td>{item.dates}</td>
                      <td>{item.location}</td>
                      <td>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="conference-link">
                            {item.link.length > 40 ? item.link.substring(0, 40) + '...' : item.link}
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No conferences found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
              </div>

          <div className="conference-pagination">
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

export default ConferencePage;
