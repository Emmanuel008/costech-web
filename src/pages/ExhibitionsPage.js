import React, { useState } from 'react';
import '../styles/pages/ExhibitionsPage.css';

const ExhibitionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const itemsPerPage = 10;

  // Exhibitions data
  const exhibitionsData = [
    {
      id: 1,
      name: 'Dar es Salaam International Trade Fair (DITF)',
      popularName: 'Sabasaba',
      host: 'TANTRADE',
      focus: 'All',
      dates: '28th June-13th July 2026',
      location: 'Dar es Salaam',
      link: 'https://tradefair.tantrade.go.tz'
    },
    {
      id: 2,
      name: 'Science, Technology and Innovation Conference and Exhibitions',
      popularName: 'STICE',
      host: 'COSTECH',
      focus: 'STI',
      dates: '3-4 September 2026',
      location: 'Dar es Salaam',
      link: 'https://stice.costech.or.tz'
    },
    {
      id: 3,
      name: 'Nanenane International Agricultural Exhibition',
      popularName: 'Nanenane',
      host: 'MOA',
      focus: 'Showcasing Agricultural Excellence',
      dates: '1–8 Aug 2026 (projected)',
      location: 'Dodoma & zones nationwide',
      link: 'https://nanenane.kilimo.go.tz'
    },
    {
      id: 4,
      name: 'Research & Innovation Week (UDSM)',
      popularName: '-',
      host: 'UDSM',
      focus: 'Innovation & Research Exhibitions',
      dates: 'May / Jun 2026 (projected)',
      location: 'Dar es Salaam',
      link: 'https://www.udsm.ac.tz/'
    },
    {
      id: 5,
      name: 'Innovation Week',
      popularName: '',
      host: 'MUST',
      focus: 'Technology & innovation',
      dates: 'Sep 2026 (projected)',
      location: 'Mbeya',
      link: 'https://must.ac.tz/'
    },
    {
      id: 6,
      name: 'Research Week / Innovation Expo',
      popularName: '-',
      host: 'Sokoine University of Agriculture (SUA)',
      focus: 'Agriculture research & innovation',
      dates: 'Jul 2026 (projected)',
      location: 'Morogoro',
      link: 'https://www.sua.ac.tz'
    },
    {
      id: 7,
      name: 'Innovation & Research Week',
      popularName: '-',
      host: 'NM-AIST',
      focus: 'Science & technology innovation',
      dates: 'Jun /Jul 2026 (projected)',
      location: 'Arusha',
      link: 'https://nm-aist.ac.tz'
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

  const sortedData = [...exhibitionsData].sort((a, b) => {
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
    <section className="exhibitions-page">
      <div className="exhibitions-hero">
        <div className="exhibitions-hero-overlay" />
        <div className="exhibitions-hero-content">
          <h1>Exhibitions</h1>
          <p>Conference and Exhibitions in Tanzania December from January 2026 to December 2026</p>
        </div>
      </div>

      <div className="exhibitions-body">
        <div className="exhibitions-table-container">
          <div className="exhibitions-search-container">
            <input
              type="text"
              className="exhibitions-search-input"
              placeholder="Write here to filter exhibition records"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          <div className="exhibitions-table-wrapper">
            <table className="exhibitions-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th className="sortable" onClick={() => handleSort('name')}>
                    Name of the Exhibitions {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('popularName')}>
                    Popular Name {sortColumn === 'popularName' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('host')}>
                    Host Institution {sortColumn === 'host' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('focus')}>
                    Focus {sortColumn === 'focus' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('dates')}>
                    Tentative Dates {sortColumn === 'dates' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('location')}>
                    Location {sortColumn === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('link')}>
                    Link {sortColumn === 'link' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.popularName || '-'}</td>
                      <td>{item.host}</td>
                      <td>{item.focus}</td>
                      <td>{item.dates}</td>
                      <td>{item.location}</td>
                      <td>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="exhibition-link">
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
                      No exhibitions found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="exhibitions-pagination">
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

export default ExhibitionsPage;
