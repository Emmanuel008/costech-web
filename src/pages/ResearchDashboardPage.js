import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/pages/ResearchDashboardPage.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ResearchDashboardPage = () => {
  const [activeReport, setActiveReport] = useState('sectors');

  const reports = {
    sectors: {
      title: 'Research per Sectors',
      description: 'View research distribution across different sectors',
      data: [
        { sector: 'Agriculture', percentage: 45, color: '#b97c07' },
        { sector: 'ICT', percentage: 20, color: '#1e40af' },
        { sector: 'Other', percentage: 35, color: '#000000' }
      ]
    },
    region: {
      title: 'Permit per Region',
      description: 'Explore research permit distribution by location',
      chartType: 'map',
      data: [
        { name: 'Arusha', permits: 85, coordinates: [-3.3869, 36.6830] },
        { name: 'Dar es Salaam', permits: 150, coordinates: [-6.7924, 39.2083] },
        { name: 'Dodoma', permits: 65, coordinates: [-6.1630, 35.7516] },
        { name: 'Geita', permits: 45, coordinates: [-2.8667, 32.1667] },
        { name: 'Iringa', permits: 70, coordinates: [-7.7667, 35.7000] },
        { name: 'Kagera', permits: 55, coordinates: [-1.3333, 31.8000] },
        { name: 'Katavi', permits: 40, coordinates: [-6.3333, 31.1333] },
        { name: 'Kigoma', permits: 50, coordinates: [-4.8769, 29.6267] },
        { name: 'Kilimanjaro', permits: 95, coordinates: [-3.0667, 37.3500] },
        { name: 'Lindi', permits: 60, coordinates: [-9.9967, 39.7167] },
        { name: 'Manyara', permits: 55, coordinates: [-4.3167, 36.6833] },
        { name: 'Mara', permits: 65, coordinates: [-1.5000, 33.8000] },
        { name: 'Mbeya', permits: 80, coordinates: [-8.9000, 33.4500] },
        { name: 'Morogoro', permits: 75, coordinates: [-6.8167, 37.6667] },
        { name: 'Mtwara', permits: 55, coordinates: [-10.2667, 40.1833] },
        { name: 'Mwanza', permits: 70, coordinates: [-2.5164, 32.9176] },
        { name: 'Njombe', permits: 50, coordinates: [-9.3333, 34.7667] },
        { name: 'Pemba North', permits: 35, coordinates: [-5.0333, 39.7667] },
        { name: 'Pemba South', permits: 30, coordinates: [-5.3167, 39.7000] },
        { name: 'Pwani', permits: 65, coordinates: [-7.7667, 39.1833] },
        { name: 'Rukwa', permits: 45, coordinates: [-8.0167, 31.6167] },
        { name: 'Ruvuma', permits: 60, coordinates: [-10.6833, 35.6500] },
        { name: 'Shinyanga', permits: 60, coordinates: [-3.6667, 33.4167] },
        { name: 'Simiyu', permits: 50, coordinates: [-2.6333, 33.9833] },
        { name: 'Singida', permits: 55, coordinates: [-4.8167, 34.7500] },
        { name: 'Songwe', permits: 45, coordinates: [-9.3333, 33.9833] },
        { name: 'Tabora', permits: 60, coordinates: [-5.0167, 32.8000] },
        { name: 'Tanga', permits: 75, coordinates: [-5.0667, 39.1000] },
        { name: 'Unguja North', permits: 40, coordinates: [-5.8333, 39.3000] },
        { name: 'Unguja South', permits: 35, coordinates: [-6.1667, 39.3500] },
        { name: 'Zanzibar North', permits: 30, coordinates: [-5.9000, 39.3167] },
        { name: 'Zanzibar South and Central', permits: 35, coordinates: [-6.2000, 39.3667] }
      ]
    },
    gender: {
      title: 'Research per Gender',
      description: 'Research participation by gender distribution',
      data: [
        { gender: 'Male', percentage: 60 },
        { gender: 'Female', percentage: 40 }
      ]
    },
    funded: {
      title: 'Funded Projects',
      description: 'Overview of funded research projects',
      data: [
        { project: 'Tech Startup Incubator', amount: 500000, status: 'Active' },
        { project: 'Digital Innovation Hub', amount: 750000, status: 'Active' },
        { project: 'Agricultural Tech Solutions', amount: 400000, status: 'Completed' },
        { project: 'Renewable Energy Initiative', amount: 600000, status: 'Active' },
        { project: 'Healthcare Innovation Program', amount: 350000, status: 'Active' }
      ]
    },
    status: {
      title: 'Research Project by Status',
      description: 'Distribution of research projects by completion status',
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

  const getPermitColor = (value) => {
    if (value >= 70 && value <= 150) return '#1e40af'; // Blue for 150-70
    return '#b97c07'; // Yellow/Golden for 70 and below
  };

  return (
    <section className="research-dashboard-page">
      <div className="research-dashboard-container">
        <div className="research-dashboard-header">
          <a href="/dashboard" className="back-link">← Back to Dashboard</a>
          <h1 className="research-dashboard-title">Research Dashboard</h1>
          <p className="research-dashboard-subtitle">
            Comprehensive insights into research metrics, projects, and research coordination initiatives
          </p>
        </div>

        <div className="research-reports-tabs">
          {Object.keys(reports).map((key) => (
            <button
              key={key}
              className={`research-report-tab ${activeReport === key ? 'active' : ''}`}
              onClick={() => setActiveReport(key)}
            >
              {reports[key].title}
            </button>
          ))}
        </div>

        <div className="research-reports-content">
          {Object.keys(reports).map((key) => {
            const report = reports[key];
            if (activeReport !== key) return null;

            return (
              <div key={key} className="research-report-section">
                <div className="research-report-header">
                  <h2 className="research-report-title">{report.title}</h2>
                  <p className="research-report-description">{report.description}</p>
                </div>

                <div className="research-report-data">
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
                  ) : key === 'region' && report.chartType === 'map' ? (
                    <div className="map-chart-container">
                      <MapContainer
                        center={[-6.1630, 35.7516]}
                        zoom={6}
                        style={{ height: '500px', width: '100%', borderRadius: '12px' }}
                        scrollWheelZoom={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {report.data.map((region, index) => (
                          <CircleMarker
                            key={index}
                            center={region.coordinates}
                            radius={Math.max(8, Math.min(20, region.permits / 5))}
                            fillColor={getPermitColor(region.permits)}
                            color="#ffffff"
                            weight={2}
                            fillOpacity={0.7}
                          >
                            <Tooltip>
                              <div style={{ textAlign: 'center' }}>
                                <strong>{region.name}</strong>
                                <br />
                                Permits: {region.permits}
                              </div>
                            </Tooltip>
                          </CircleMarker>
                        ))}
                      </MapContainer>
                      <div className="map-legend">
                        <h4 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: 600 }}>Permit Count Key</h4>
                        <div className="map-legend-items">
                          <div className="map-legend-item">
                            <div
                              className="map-legend-color"
                              style={{ backgroundColor: '#1e40af' }}
                            ></div>
                            <span className="map-legend-label">150 - 70</span>
                          </div>
                          <div className="map-legend-item">
                            <div
                              className="map-legend-color"
                              style={{ backgroundColor: '#b97c07' }}
                            ></div>
                            <span className="map-legend-label">70 and below</span>
                          </div>
                        </div>
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
                            const label = item.gender;
                            // For gender chart: Male = primary color, Female = blue
                            let barColor;
                            if (key === 'gender') {
                              barColor = label === 'Male' ? '#b97c07' : '#1e40af';
                            }
                            // Calculate height based on max value of 100 for percentage
                            const maxValue = 100;
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

export default ResearchDashboardPage;
