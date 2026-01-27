import React, { useState, useEffect } from 'react';
import '../styles/pages/ExhibitionsPage.css';
import { getExhibitions } from '../services/api';

const ExhibitionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiExhibitions = await getExhibitions();
        
        // Map API data to component structure
        const mappedExhibitions = apiExhibitions.map((item) => ({
          id: item.id,
          name: item.name || item.title || '-',
          popularName: item.popularName || item.popular_name || '-',
          host: item.host || item.organizer || '-',
          focus: item.focus || item.theme || '-',
          startDate: item.start_date || item.startDate || item.tentative_start_date || item.dates || '-',
          endDate: item.end_date || item.endDate || item.tentative_end_date || '-',
          location: item.location || '-',
          link: item.link || item.url || ''
        }));
        
        setExhibitions(mappedExhibitions);
      } catch (err) {
        console.error('Error fetching exhibitions:', err);
        setError(err.message || 'Failed to load exhibitions');
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  // Exhibitions data
  const exhibitionsData = exhibitions;

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

  if (loading) {
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
          <div className="exhibitions-loading">
            <p>Loading exhibitions...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
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
          <div className="exhibitions-error">
            <p>Unable to load exhibitions. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

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
                  <th className="sortable" onClick={() => handleSort('startDate')}>
                    Start Date {sortColumn === 'startDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="sortable" onClick={() => handleSort('endDate')}>
                    End Date {sortColumn === 'endDate' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.location}</td>
                      <td>
                        {item.link && item.link !== '-' ? (
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
                    <td colSpan="9" className="no-data">
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
