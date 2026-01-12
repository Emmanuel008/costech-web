import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/CostechFundedProjectsPage.css';
import { getCostechFundedProjects, getFunders, getPrograms, getProjectStatuses, getGenders } from '../services/api';

const CostechFundedProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter states (using IDs)
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [funderFilter, setFunderFilter] = useState('');
  
  // Filter options from API
  const [funders, setFunders] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoadingFilters(true);
        const [fundersData, programsData, statusesData, gendersData] = await Promise.all([
          getFunders(),
          getPrograms(),
          getProjectStatuses(),
          getGenders(),
        ]);
        
        setFunders(fundersData);
        
        // Filter programs to only show "Research Program" and "Innovation Program"
        // The user wants "Research and Innovation" which means both programs should be available
        const researchProgram = programsData.filter(program => {
          if (!program.name) return false;
          const nameLower = program.name.toLowerCase();
          return nameLower === 'research program' || nameLower === 'innovation program';
        });
        setPrograms(researchProgram);
        
        // Filter statuses to only show "Completed" and "Pending"
        // Note: API returns "On Going" instead of "Pending", so we include "On Going" and map it
        const filteredStatuses = statusesData.filter(status => {
          if (!status.name) return false;
          const nameLower = status.name.toLowerCase();
          return nameLower === 'completed' || nameLower === 'on going';
        });
        // Map "On Going" to display as "Pending" for user
        const mappedStatuses = filteredStatuses.map(status => {
          if (status.name.toLowerCase() === 'on going') {
            return { ...status, name: 'Pending' };
          }
          return status;
        });
        setStatuses(mappedStatuses);
        
        // Filter genders to only show "Male" and "Female" (case-insensitive match)
        const filteredGenders = gendersData.filter(gender => {
          if (!gender.name) return false;
          const nameLower = gender.name.toLowerCase();
          return nameLower === 'male' || nameLower === 'female';
        });
        setGenders(filteredGenders);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch projects with filters
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        const filters = {
          page_no: currentPage,
          page_size: itemsPerPage,
          ...(programFilter && { program_id: parseInt(programFilter) }),
          ...(genderFilter && { gender_id: parseInt(genderFilter) }),
          ...(statusFilter && { status_id: parseInt(statusFilter) }),
          ...(funderFilter && { funder_id: parseInt(funderFilter) }),
        };
        
        const result = await getCostechFundedProjects(filters);
        
        
        if (result && result.projects && Array.isArray(result.projects)) {
          setProjects(result.projects);
          setTotalProjects(result.pagination?.total || result.projects.length);
          setTotalPages(result.pagination?.total_pages || 1);
        } else {
          console.warn('CostechFundedProjectsPage: API returned empty array');
          setProjects([]);
          setTotalProjects(0);
          setTotalPages(1);
        }
      } catch (err) {
        console.error('CostechFundedProjectsPage: Error fetching projects:', err);
        setError(err.message);
        setProjects([]);
        setTotalProjects(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentPage, itemsPerPage, programFilter, genderFilter, statusFilter, funderFilter]);

  // Client-side search filter (since API doesn't support search)
  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) {
      return projects;
    }

    const search = searchTerm.toLowerCase();
    return projects.filter(project => {
      const researcherName = project.researcher?.name?.toLowerCase() || '';
      const projectTitle = project.research_title?.toLowerCase() || '';
      const programName = project.program?.name?.toLowerCase() || '';
      const funderName = project.funder?.name?.toLowerCase() || '';
      
      return researcherName.includes(search) ||
             projectTitle.includes(search) ||
             programName.includes(search) ||
             funderName.includes(search);
    });
  }, [projects, searchTerm]);

  const paginatedProjects = filteredProjects;

  useEffect(() => {
    setCurrentPage(1);
  }, [genderFilter, statusFilter, programFilter, funderFilter, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationNumbers = () => {
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
    <section className="costech-funded-projects-page">
      <div className="costech-funded-projects-hero">
        <div className="costech-funded-projects-hero-overlay" />
        <div className="costech-funded-projects-hero-content">
          <h1>COSTECH Funded Projects</h1>
          <p>
            Browse through COSTECH funded research projects, view project details, and explore
            research initiatives across various sectors.
          </p>
        </div>
      </div>

      <div className="costech-funded-projects-body">
        {loading ? (
          <div className="costech-funded-projects-loading">
            <p>Loading projects...</p>
          </div>
        ) : error && projects.length === 0 ? (
          <div className="costech-funded-projects-error">
            <p>Unable to load projects. Please try again later.</p>
          </div>
        ) : (
          <>
            {/* Filters Section */}
            <div className="projects-filters-container">
              <div className="projects-filters-row">
                <div className="filter-group">
                  <label htmlFor="gender-filter">Gender:</label>
                  <select
                    id="gender-filter"
                    className="filter-select"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    disabled={loadingFilters}
                  >
                    <option value="">All</option>
                    {genders.map((gender) => (
                      <option key={gender.id} value={gender.id}>
                        {gender.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="status-filter">Completion Status:</label>
                  <select
                    id="status-filter"
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    disabled={loadingFilters}
                  >
                    <option value="">All</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="program-filter">Program:</label>
                  <select
                    id="program-filter"
                    className="filter-select"
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    disabled={loadingFilters}
                  >
                    <option value="">All</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="funder-filter">Funder:</label>
                  <select
                    id="funder-filter"
                    className="filter-select"
                    value={funderFilter}
                    onChange={(e) => setFunderFilter(e.target.value)}
                    disabled={loadingFilters}
                  >
                    <option value="">All</option>
                    {funders.map((funder) => (
                      <option key={funder.id} value={funder.id}>
                        {funder.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search and Entries Section */}
            <div className="projects-controls-container">
              <div className="projects-entries-control">
                <label htmlFor="entries-select">Show</label>
                <select
                  id="entries-select"
                  className="entries-select"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
              </div>

              <div className="projects-search-control">
                <label htmlFor="search-input">Search all fields:</label>
                <input
                  id="search-input"
                  type="text"
                  className="projects-search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table Section */}
            <div className="projects-table-container">
              <div className="projects-table-wrapper">
                <table className="projects-table">
                  <thead className="projects-table-head">
                    <tr className="projects-table-row">
                      <th className="projects-table-head-cell sortable">
                        Grantee
                        <span className="sort-icon">↕</span>
                      </th>
                      <th className="projects-table-head-cell sortable">
                        Project Title
                        <span className="sort-icon">↕</span>
                      </th>
                      <th className="projects-table-head-cell sortable">
                        Status
                        <span className="sort-icon">↕</span>
                      </th>
                      <th className="projects-table-head-cell sortable">
                        Actions
                        <span className="sort-icon">↕</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="projects-table-body">
                    {paginatedProjects.length === 0 ? (
                      <tr className="projects-table-row">
                        <td colSpan="4" className="projects-table-cell projects-empty-cell">
                          No projects found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedProjects.map((project) => {
                        // Map "On Going" to "Ongoing" for display
                        const statusName = project.status?.name || 'N/A';
                        const displayStatus = statusName.toLowerCase() === 'on going' ? 'Ongoing' : statusName;
                        
                        return (
                          <tr key={project.id} className="projects-table-row">
                            <td className="projects-table-cell projects-table-cell--grantee">
                              {project.researcher?.name || 'N/A'}
                            </td>
                            <td className="projects-table-cell projects-table-cell--title">
                              {project.research_title || 'Untitled Project'}
                            </td>
                            <td className="projects-table-cell projects-table-cell--status">
                              {displayStatus}
                            </td>
                            <td className="projects-table-cell projects-table-cell--actions">
                              <Link
                                to={`/projects/costech-funded/${project.id}`}
                                className="preview-button"
                              >
                                Preview
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Section */}
            <div className="projects-pagination-container">
              <div className="projects-pagination-info">
                {searchTerm.trim() ? (
                  <>
                    Showing {filteredProjects.length === 0 ? 0 : 1} to {filteredProjects.length} of {filteredProjects.length} entries
                  </>
                ) : (
                  <>
                    Showing {filteredProjects.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, totalProjects)} of {totalProjects} entries
                  </>
                )}
              </div>

              {totalPages > 1 && (
                <div className="projects-pagination-controls">
                  <button
                    className="pagination-button pagination-button--prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>

                  <div className="pagination-pages">
                    {getPaginationNumbers().map((page, index) => {
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
                          className={`pagination-button pagination-button--page ${
                            currentPage === page ? 'pagination-button--active' : ''
                          }`}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="pagination-button pagination-button--next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CostechFundedProjectsPage;

