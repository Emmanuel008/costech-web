import React from 'react';
import '../styles/pages/DisseminationDashboardPage.css';

const DisseminationDashboardPage = () => {
  // Subject distribution data from screenshot
  const subjectData = [
    {
      subject: 'Social Science',
      percentage: 56,
      color: '#4CAF50'
    },
    {
      subject: 'Business and Management',
      percentage: 15,
      color: '#2196F3'
    },
    {
      subject: 'Natural Sciences',
      percentage: 9,
      color: '#1976D2'
    },
    {
      subject: 'Medical and Health Sciences',
      percentage: 6,
      color: '#FFC107'
    },
    {
      subject: 'Law',
      percentage: 5,
      color: '#9E9E9E'
    },
    {
      subject: 'Engineering and Technology',
      percentage: 4,
      color: '#FF9800'
    },
    {
      subject: 'Others',
      percentage: 4,
      color: '#03A9F4'
    }
  ];

  return (
    <section className="dissemination-dashboard-page">
      <div className="dissemination-dashboard-container">
        <div className="dissemination-dashboard-header">
          <a href="/dashboard" className="back-link">← Back to Dashboard</a>
          <h1 className="dissemination-dashboard-title">Dissemination Dashboard</h1>
          <p className="dissemination-dashboard-subtitle">
            Access and explore research repositories and knowledge databases
          </p>
        </div>

        <div className="dissemination-content">
          {/* Pie Chart Section */}
          <div className="journals-pie-chart-section">
            <h3 className="pie-chart-title">Journals per subject</h3>
            <div className="pie-chart-container">
              <div className="pie-chart-wrapper">
                <svg className="pie-chart" viewBox="0 0 200 200">
                  {(() => {
                    let currentAngle = -90;
                    return subjectData.map((item, index) => {
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
                {subjectData.map((item, index) => (
                  <div key={index} className="pie-chart-legend-item">
                    <div
                      className="pie-chart-legend-color"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="pie-chart-legend-label">
                      {item.subject}
                    </span>
                    <span className="pie-chart-legend-value">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisseminationDashboardPage;
