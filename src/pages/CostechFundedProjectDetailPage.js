import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/pages/CostechFundedProjectDetailPage.css';
import { getCostechFundedProjectDetail } from '../services/api';

// Format date to "DD MMM, YYYY" format (e.g., "03 Feb, 2020")
const formatDateShort = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day.toString().padStart(2, '0')} ${month}, ${year}`;
  } catch (error) {
    return dateString;
  }
};

const CostechFundedProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        const projectDetail = await getCostechFundedProjectDetail(id);
        
        
        if (projectDetail) {
          setProject(projectDetail);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('CostechFundedProjectDetailPage: Error fetching project detail:', err);
        setError(err.message || 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="costech-funded-project-detail-page">
        <div className="detail-container">
          <div className="detail-loading">
            <p>Loading project details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error && !project) {
    return (
      <section className="costech-funded-project-detail-page">
        <div className="detail-container">
          <div className="detail-error">
            <h1>Project Not Found</h1>
            <p>{error}</p>
            <Link to="/projects/costech-funded" className="back-link">
              ← Back to COSTECH Funded Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="costech-funded-project-detail-page">
        <div className="detail-container">
          <div className="detail-error">
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
            <Link to="/projects/costech-funded" className="back-link">
              ← Back to COSTECH Funded Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="costech-funded-project-detail-page">
      <div className="detail-hero">
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <div className="detail-header">
            <h1>{project.research_title || 'Project Details'}</h1>
            <p className="detail-grantee-name">{project.researcher?.name || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-container">
          <div className="detail-content">
            {/* Project Overview */}
            <div className="detail-section">
              <h2>Project Overview</h2>
              <div className="detail-table-container">
                <table className="detail-table">
                  <tbody className="detail-table-body">
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Researcher</td>
                      <td className="detail-table-value">{project.researcher?.name || 'N/A'}</td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Funder</td>
                      <td className="detail-table-value">{project.funder?.name || 'N/A'}</td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Program</td>
                      <td className="detail-table-value">{project.program?.name || 'N/A'}</td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Sub Program</td>
                      <td className="detail-table-value">{project.subprogram?.name || 'N/A'}</td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Sector</td>
                      <td className="detail-table-value">{project.sector?.name || 'N/A'}</td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Status</td>
                      <td className="detail-table-value">
                        <span className={`status-pill status-pill--${project.status?.name?.toLowerCase().replace(/\s+/g, '-') || 'default'}`}>
                          {project.status?.name || 'N/A'}
                        </span>
                      </td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Start Date</td>
                      <td className="detail-table-value">{formatDateShort(project.start_date)}</td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">End Date</td>
                      <td className="detail-table-value">{formatDateShort(project.end_date)}</td>
                    </tr>
                    <tr className="detail-table-row">
                      <td className="detail-table-label">Startup Registered</td>
                      <td className="detail-table-value">
                        <span className={`status-pill status-pill--${project.is_startup_registered ? 'yes' : 'no'}`}>
                          {project.is_startup_registered ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                    {project.background && (
                      <tr className="detail-table-row">
                        <td className="detail-table-label">Background</td>
                        <td className="detail-table-value">{project.background}</td>
                      </tr>
                    )}
                    {project.objective && (
                      <tr className="detail-table-row">
                        <td className="detail-table-label">Objective</td>
                        <td className="detail-table-value">{project.objective}</td>
                      </tr>
                    )}
                    {project.result && (
                      <tr className="detail-table-row">
                        <td className="detail-table-label">Results</td>
                        <td className="detail-table-value">{project.result}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostechFundedProjectDetailPage;

