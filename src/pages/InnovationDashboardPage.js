import React, { useState } from 'react';
import '../styles/pages/InnovationDashboardPage.css';

const InnovationDashboardPage = () => {
  const [activeReport, setActiveReport] = useState('sectors');

  const reports = {
    sectors: {
      title: 'Innovation per Sectors',
      description: 'View innovation distribution across different sectors',
      data: [
        { sector: 'Agriculture', percentage: 45, color: '#b97c07' },
        { sector: 'ICT', percentage: 20, color: '#1e40af' },
        { sector: 'Other', percentage: 35, color: '#000000' }
      ]
    },
    region: {
      title: 'Innovation per Region',
      description: 'Explore innovation activities by region',
      data: [
        { region: 'Dar es Salaam', count: 52, percentage: 40 },
        { region: 'Arusha', count: 28, percentage: 22 },
        { region: 'Dodoma', count: 20, percentage: 15 },
        { region: 'Mwanza', count: 15, percentage: 12 },
        { region: 'Mbeya', count: 10, percentage: 8 },
        { region: 'Others', count: 3, percentage: 3 }
      ]
    },
    gender: {
      title: 'Innovation per Gender',
      description: 'Innovation participation by gender distribution',
      data: [
        { gender: 'Male', percentage: 60 },
        { gender: 'Female', percentage: 40 }
      ]
    },
    funded: {
      title: 'Funded Projects',
      description: 'Overview of funded innovation projects',
      data: [
        { project: 'Tech Startup Incubator', amount: 500000, status: 'Active' },
        { project: 'Digital Innovation Hub', amount: 750000, status: 'Active' },
        { project: 'Agricultural Tech Solutions', amount: 400000, status: 'Completed' },
        { project: 'Renewable Energy Initiative', amount: 600000, status: 'Active' },
        { project: 'Healthcare Innovation Program', amount: 350000, status: 'Active' }
      ]
    },
    status: {
      title: 'Innovation Project by Status',
      description: 'Distribution of innovation projects by completion status',
      data: [
        { status: 'Completed', percentage: 60, color: '#b97c07' },
        { status: 'Ongoing', percentage: 40, color: '#1e40af' }
      ]
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(amount);
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
                  {key === 'funded' ? (
                    <div className="funded-projects-list">
                      {report.data.map((item, index) => (
                        <div key={index} className="funded-project-card">
                          <div className="funded-project-header">
                            <h3 className="funded-project-name">{item.project}</h3>
                            <span className={`funded-project-status funded-project-status--${item.status.toLowerCase()}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="funded-project-amount">
                            {formatCurrency(item.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : key === 'sectors' || key === 'status' ? (
                    <div className="pie-chart-container">
                      <div className="pie-chart-wrapper">
                        <svg className="pie-chart" viewBox="0 0 200 200">
                          {(() => {
                            let currentAngle = -90;
                            return report.data.map((item, index) => {
                              const angle = (item.percentage / 100) * 360;
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
                                  fill={item.color}
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                />
                              );
                            });
                          })()}
                        </svg>
                      </div>
                      <div className="pie-chart-legend">
                        {report.data.map((item, index) => (
                          <div key={index} className="pie-chart-legend-item">
                            <div
                              className="pie-chart-legend-color"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="pie-chart-legend-label">
                              {key === 'sectors' ? item.sector : item.status}
                            </span>
                            <span className="pie-chart-legend-value">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bar-chart-container">
                      <div className="bar-chart-wrapper">
                        <div className="bar-chart-y-axis">
                          <div className="bar-chart-y-axis-label">Percentage</div>
                          {(() => {
                            const yAxisValues = key === 'gender' 
                              ? [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
                              : [0, 10, 20, 30, 40, 50, 60, 70, 80];
                            return yAxisValues.map((value) => (
                              <div key={value} className="bar-chart-y-tick">
                                <span className="bar-chart-y-label">{value}</span>
                                <div className="bar-chart-grid-line"></div>
                              </div>
                            ));
                          })()}
                        </div>
                        <div className="bar-chart-bars-container">
                          {report.data.map((item, index) => {
                            const label = key === 'region' ? item.region : item.gender;
                            // For gender chart: Male = primary color, Female = blue
                            // For region chart: alternate colors
                            let barColor;
                            if (key === 'gender') {
                              barColor = label === 'Male' ? '#b97c07' : '#1e40af';
                            } else {
                              barColor = index % 2 === 0 ? '#b97c07' : '#1e40af';
                            }
                            // Calculate height based on max value of 100 for percentage
                            const maxValue = key === 'gender' ? 100 : 80;
                            // Calculate pixel height based on container height (300px)
                            const containerHeight = 300;
                            const barHeightPx = (item.percentage / maxValue) * containerHeight;
                            return (
                              <div key={index} className="bar-chart-bar-item">
                                <div className="bar-chart-bar-wrapper">
                                  <div
                                    className="bar-chart-bar"
                                    style={{
                                      height: `${barHeightPx}px`,
                                      backgroundColor: barColor
                                    }}
                                  >
                                    <span className="bar-chart-bar-value">{item.percentage}%</span>
                                  </div>
                                </div>
                                <div className="bar-chart-x-label">{label}</div>
                              </div>
                            );
                          })}
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

