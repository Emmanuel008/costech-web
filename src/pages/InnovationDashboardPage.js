import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/pages/InnovationDashboardPage.css';
import {
  getInnovationPerGender,
  getInnovationTotalFundsPerFunder,
  getInnovationTotalFundsPerProgram,
  getInnovationPerStatus,
} from '../services/api';

const InnovationDashboardPage = () => {
  const [searchParams] = useSearchParams();
  const reportParam = searchParams.get('report');
  const [activeReport, setActiveReport] = useState(reportParam || 'gender');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    gender: null,
    funder: null,
    program: null,
    status: null,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        const [genderData, funderData, programData, statusData] = await Promise.all([
          getInnovationPerGender(),
          getInnovationTotalFundsPerFunder(),
          getInnovationTotalFundsPerProgram(),
          getInnovationPerStatus(),
        ]);

        setStats({
          gender: genderData,
          funder: funderData,
          program: programData,
          status: statusData,
        });
      } catch (err) {
        console.error('Error fetching innovation statistics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Update active report when query parameter changes
  useEffect(() => {
    if (reportParam && ['gender', 'funder', 'program', 'status'].includes(reportParam)) {
      setActiveReport(reportParam);
    }
  }, [reportParam]);

  // Transform API data to chart format
  const reports = {
    gender: {
      title: 'Gender composition for innovation projects’ lead innovators',
      description: 'Gender Profile of lead innovators for the supported innovation projects through the National Fund for Advancement of Science and Technology since 2017',
      data: stats.gender
        ? [
            { gender: 'Male', count: stats.gender.male || 0 },
            { gender: 'Female', count: stats.gender.female || 0 },
          ]
        : [],
    },
    funder: {
      title: ' Innovation investment profile',
      description: 'Composition of Innovation Funds in the National Fund for Advancement of Science and Technology mobilized from the government, development partners and other stakeholders since 2017',
      data: stats.funder
        ? Object.entries(stats.funder)
            .map(([funder, amount]) => ({
              funder,
              amount: parseFloat(amount) || 0,
            }))
            .filter((item) => item.amount > 0)
        : [],
    },
    program: {
      title: 'Research and Innovation funding allocation',
      description: 'Allocation of NFAST funding across research and innovation programmes since 2011 ',
      data: stats.program
        ? Object.entries(stats.program).map(([program, amount]) => ({
            program,
            amount: parseFloat(amount) || 0,
          }))
        : [],
    },
    status: {
      title: 'Composition of ongoing and completed supported innovation projects',
      description: ' Proportion of ongoing and completed innovation projects funded through the National Fund for Advancement of Science and Technology since 2017',
      data: stats.status
        ? Object.entries(stats.status).map(([status, count]) => ({
            status,
            count: parseInt(count) || 0,
          }))
        : [],
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatFunderName = (name) => {
    if (name === 'GOT') {
      return 'GOT(Government of Tanzania)';
    }
    return name;
  };

  return (
    <section className="innovation-dashboard-page">
      <div className="innovation-dashboard-container">
        <div className="innovation-dashboard-header">
          <a href="/dashboard" className="back-link">← Back to Dashboard</a>
          <h1 className="innovation-dashboard-title">Innovation Dashboard</h1>
          <p className="innovation-dashboard-subtitle">
            Comprehensive insights into innovation metrics, projects, and technology transfer initiatives
          </p>
        </div>

        <div className="innovation-reports-tabs">
          {Object.keys(reports).map((key) => (
            <button
              key={key}
              className={`innovation-report-tab ${activeReport === key ? 'active' : ''}`}
              onClick={() => setActiveReport(key)}
            >
              {reports[key].title}
            </button>
          ))}
        </div>

        <div className="innovation-reports-content">
          {Object.keys(reports).map((key) => {
            const report = reports[key];
            if (activeReport !== key) return null;

            return (
              <div key={key} className="innovation-report-section">
                <div className="innovation-report-header">
                  <h2 className="innovation-report-title">{report.title}</h2>
                  <p className="innovation-report-description">{report.description}</p>
                </div>

                <div className="innovation-report-data">
                  {loading ? (
                    <div className="loading-message">Loading statistics...</div>
                  ) : error ? (
                    <div className="error-message">Error loading statistics: {error}</div>
                  ) : report.data.length === 0 ? (
                    <div className="no-data-message">No data available</div>
                  ) : key === 'funder' || key === 'program' ? (
                    <div className="funded-projects-list">
                      {report.data.map((item, index) => (
                        <div key={index} className="funded-project-card">
                          <div className="funded-project-header">
                            <h3 className="funded-project-name">{formatFunderName(item.funder || item.program)}</h3>
                          </div>
                          <div className="funded-project-amount">
                            {formatCurrency(item.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : key === 'status' || key === 'gender' ? (
                    <div className="pie-chart-container">
                      <div className="pie-chart-wrapper">
                        <svg className="pie-chart" viewBox="0 0 200 200">
                          {(() => {
                            const total = report.data.reduce((sum, item) => sum + item.count, 0);
                            if (total === 0) return null;
                            
                            const colors = key === 'gender' 
                              ? ['#b97c07', '#1e40af'] // Male: golden, Female: blue
                              : ['#b97c07', '#1e40af', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
                            let currentAngle = -90;
                            return report.data.map((item, index) => {
                              const percentage = (item.count / total) * 100;
                              const angle = (percentage / 100) * 360;
                              const startAngle = currentAngle;
                              const endAngle = currentAngle + angle;
                              currentAngle += angle;

                              const startAngleRad = (startAngle * Math.PI) / 180;
                              const endAngleRad = (endAngle * Math.PI) / 180;
                              const x1 = 100 + 80 * Math.cos(startAngleRad);
                              const y1 = 100 + 80 * Math.sin(startAngleRad);
                              const x2 = 100 + 80 * Math.cos(endAngleRad);
                              const y2 = 100 + 80 * Math.sin(endAngleRad);
                              const largeArcFlag = angle > 180 ? 1 : 0;

                              const pathData = [
                                `M 100 100`,
                                `L ${x1} ${y1}`,
                                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                `Z`
                              ].join(' ');

                              return (
                                <path
                                  key={index}
                                  d={pathData}
                                  fill={colors[index % colors.length]}
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                />
                              );
                            });
                          })()}
                        </svg>
                      </div>
                      <div className="pie-chart-legend">
                        {(() => {
                          const total = report.data.reduce((sum, item) => sum + item.count, 0);
                          const colors = key === 'gender' 
                              ? ['#b97c07', '#1e40af'] // Male: golden, Female: blue
                              : ['#b97c07', '#1e40af', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
                          return report.data.map((item, index) => {
                            const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : 0;
                            const label = key === 'gender' ? item.gender : item.status;
                            return (
                          <div key={index} className="pie-chart-legend-item">
                            <div
                              className="pie-chart-legend-color"
                                  style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                                <span className="pie-chart-legend-label">{label}</span>
                                <span className="pie-chart-legend-value">{item.count} ({percentage}%)</span>
                          </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  ) : (
                    <div className="bar-chart-container">
                      <div className="bar-chart-wrapper">
                        <div className="bar-chart-y-axis">
                          <div className="bar-chart-y-axis-label">Count</div>
                          {(() => {
                            const maxCount = Math.max(...report.data.map(item => item.count), 1);
                            const step = Math.max(1, Math.ceil(maxCount / 10));
                            const yAxisValues = [];
                            // Always start from 0
                            for (let i = 0; i <= maxCount; i += step) {
                              yAxisValues.push(i);
                            }
                            // Ensure maxCount is included if not already
                            if (yAxisValues[yAxisValues.length - 1] < maxCount) {
                              yAxisValues.push(maxCount);
                            }
                            return yAxisValues.map((value) => (
                              <div key={value} className="bar-chart-y-tick">
                                <span className="bar-chart-y-label">{value}</span>
                                <div className="bar-chart-grid-line"></div>
                              </div>
                            ));
                          })()}
                        </div>
                        <div className="bar-chart-bars-container">
                          {(() => {
                            const maxCount = Math.max(...report.data.map(item => item.count), 1);
                            const total = report.data.reduce((sum, item) => sum + item.count, 0);
                            return report.data.map((item, index) => {
                              const label = item.gender;
                              const barColor = label === 'Male' 
                                ? 'linear-gradient(180deg, #d4a017 0%, #b97c07 100%)' 
                                : 'linear-gradient(180deg, #60a5fa 0%, #1e40af 100%)';
                              const containerHeight = 320;
                              const barHeightPx = (item.count / maxCount) * containerHeight;
                              const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : 0;
                            return (
                              <div key={index} className="bar-chart-bar-item">
                                <div className="bar-chart-bar-wrapper">
                                  <div
                                    className="bar-chart-bar"
                                    style={{
                                      height: `${barHeightPx}px`,
                                        background: barColor
                                    }}
                                  >
                                      <span className="bar-chart-bar-value">{item.count} ({percentage}%)</span>
                                    </div>
                                  </div>
                                  <div className="bar-chart-x-label">{label}</div>
                              </div>
                            );
                            });
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InnovationDashboardPage;

