import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/pages/ResearchDashboardPage.css';
import {
  getResearchPerGender,
  getResearchTotalFundsPerFunder,
  getResearchTotalFundsPerProgram,
  getResearchPerStatus,
  getPermitPerGender,
  getPermitPerCountry,
  getPermitPerSector,
} from '../services/api';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ResearchDashboardPage = () => {
  const [activeReport, setActiveReport] = useState('gender');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOtherSectors, setShowOtherSectors] = useState(false);
  const [otherSectorsList, setOtherSectorsList] = useState([]);
  const [stats, setStats] = useState({
    gender: null,
    funder: null,
    program: null,
    status: null,
    permitGender: null,
    permitCountry: null,
    permitSector: null,
  });

  // Country coordinates mapping
  const countryCoordinates = {
    'UNITED REPUBLIC OF TANZANIA': [-6.3690, 34.8888],
    'UNITED STATES OF AMERICA': [39.8283, -98.5795],
    'UNITED KINGDOM': [54.7024, -3.2766],
    'SPAIN': [40.4637, -3.7492],
    'ITALY': [41.8719, 12.5674],
    'GERMANY': [51.1657, 10.4515],
    'JAPAN': [36.2048, 138.2529],
    'CHINA': [35.8617, 104.1954],
    'SWITZERLAND': [46.8182, 8.2275],
    'NETHERLANDS': [52.1326, 5.2913],
    'DENMARK': [56.2639, 9.5018],
    'NORWAY': [60.4720, 8.4689],
    'FRANCE': [46.2276, 2.2137],
    'SWEDEN': [60.1282, 18.6435],
    'AUSTRALIA': [-25.2744, 133.7751],
    'CANADA': [56.1304, -106.3468],
    'SOUTH AFRICA': [-30.5595, 22.9375],
    'KENYA': [-0.0236, 37.9062],
    'UGANDA': [1.3733, 32.2903],
    'INDIA': [20.5937, 78.9629],
    'BRAZIL': [-14.2350, -51.9253],
    'MEXICO': [23.6345, -102.5528],
    'CHILE': [-35.6751, -71.5430],
    'COLOMBIA': [4.5709, -74.2973],
    'BELGIUM': [50.5039, 4.4699],
    'AUSTRIA': [47.5162, 14.5501],
    'FINLAND': [61.9241, 25.7482],
    'POLAND': [51.9194, 19.1451],
    'ROMANIA': [45.9432, 24.9668],
    'TURKEY': [38.9637, 35.2433],
    'GHANA': [7.9465, -1.0232],
    'ETHIOPIA': [9.1450, 38.7667],
    'RWANDA': [-1.9441, 29.8739],
    'SUDAN': [12.8628, 30.2176],
    'ZIMBABWE': [-19.0154, 29.1549],
    'NEW ZEALAND': [-40.9006, 174.8860],
    'KOREA, REPUBLIC OF': [35.9078, 127.7669],
    'RUSSIAN FEDERATION': [61.5240, 105.3188],
    'CZECH REPUBLIC': [49.8175, 15.4730],
    'HUNGARY': [47.1625, 19.5033],
    'Democratic Republic of the Congo': [-4.0383, 21.7587],
  };

  const getCountryColor = (count) => {
    if (count >= 500) return '#1e40af'; // Blue for very high counts
    if (count >= 100) return '#3b82f6'; // Light blue for high counts
    if (count >= 50) return '#60a5fa'; // Lighter blue for medium counts
    return '#b97c07'; // Golden for lower counts
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        const [genderData, funderData, programData, statusData, permitGenderData, permitCountryData, permitSectorData] = await Promise.all([
          getResearchPerGender(),
          getResearchTotalFundsPerFunder(),
          getResearchTotalFundsPerProgram(),
          getResearchPerStatus(),
          getPermitPerGender().catch(err => {
            console.error('Error fetching permit per gender:', err);
            return [];
          }),
          getPermitPerCountry().catch(err => {
            console.error('Error fetching permit per country:', err);
            return [];
          }),
          getPermitPerSector().catch(err => {
            console.error('Error fetching permit per sector:', err);
            return [];
          }),
        ]);

        console.log('Permit statistics data:', {
          permitGender: permitGenderData,
          permitCountry: permitCountryData,
          permitSector: permitSectorData,
        });

        setStats({
          gender: genderData,
          funder: funderData,
          program: programData,
          status: statusData,
          permitGender: permitGenderData,
          permitCountry: permitCountryData,
          permitSector: permitSectorData,
        });
      } catch (err) {
        console.error('Error fetching research statistics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Extract other sectors from permitSector data for modal display
  useEffect(() => {
    if (stats.permitSector) {
      const sectors = stats.permitSector
        .map(item => {
          const sector = Object.keys(item)[0];
          const count = Object.values(item)[0];
          return {
            sector,
            count: parseInt(count) || 0,
          };
        });
      
      const otherSectors = sectors.filter(s => s.count < 100);
      setOtherSectorsList(otherSectors);
    } else {
      setOtherSectorsList([]);
    }
  }, [stats.permitSector]);

  // Transform API data to chart format
  const reports = {
    gender: {
      title: 'Research per Gender',
      description: 'Research distribution by gender',
      data: stats.gender
        ? [
            { gender: 'Male', count: stats.gender.male || 0 },
            { gender: 'Female', count: stats.gender.female || 0 },
          ]
        : [],
    },
    funder: {
      title: 'Total Funds per Funder',
      description: 'Total funding distribution by funder',
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
      title: 'Total Funds per Program',
      description: 'Total funding distribution by program',
      data: stats.program
        ? Object.entries(stats.program).map(([program, amount]) => ({
            program,
            amount: parseFloat(amount) || 0,
          }))
        : [],
    },
    status: {
      title: 'Research per Status',
      description: 'Distribution of research projects by completion status',
      data: stats.status
        ? Object.entries(stats.status).map(([status, count]) => ({
            status,
            count: parseInt(count) || 0,
          }))
        : [],
    },
    permitGender: {
      title: 'Permit per Gender',
      description: 'Distribution of research permits by gender',
      data: stats.permitGender
        ? stats.permitGender.map(item => {
            const gender = Object.keys(item)[0];
            const count = Object.values(item)[0];
            return {
              gender: gender === 'MALE' ? 'Male' : gender === 'FEMALE' ? 'Female' : gender,
              count: parseInt(count) || 0,
            };
          })
        : [],
    },
    permitCountry: {
      title: 'Permit per Country',
      description: 'Distribution of research permits by country',
      data: stats.permitCountry
        ? stats.permitCountry
            .map(item => {
              const country = Object.keys(item)[0];
              const count = Object.values(item)[0];
              return {
                country,
                count: parseInt(count) || 0,
              };
            })
            .sort((a, b) => b.count - a.count)
        : [],
    },
    permitSector: {
      title: 'Permit per Sector',
      description: 'Distribution of research permits by sector',
      data: stats.permitSector
        ? (() => {
            const sectors = stats.permitSector
              .map(item => {
                const sector = Object.keys(item)[0];
                const count = Object.values(item)[0];
                return {
                  sector,
                  count: parseInt(count) || 0,
                };
              })
              .sort((a, b) => b.count - a.count);
            
            // Group sectors with count < 100 as "Other"
            const mainSectors = sectors.filter(s => s.count >= 100);
            const otherSectors = sectors.filter(s => s.count < 100);
            const otherCount = otherSectors.reduce((sum, s) => sum + s.count, 0);
            
            // Store other sectors for modal display (will be set via useEffect)
            if (otherCount > 0) {
              // Store in a ref or use a different approach - we'll use a useEffect
              return [...mainSectors, { sector: 'Other', count: otherCount, isOther: true, otherSectors }];
            }
            return mainSectors;
          })()
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
                  ) : key === 'permitCountry' ? (
                    <div className="map-container-wrapper">
                      <MapContainer
                        center={[-6.3690, 34.8888]}
                        zoom={3}
                        style={{ height: '500px', width: '100%' }}
                        scrollWheelZoom={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {report.data
                          .filter(item => countryCoordinates[item.country])
                          .map((item, index) => {
                            const coordinates = countryCoordinates[item.country];
                            const color = getCountryColor(item.count);
                            const maxCount = Math.max(...report.data.map(i => i.count), 1);
                            const radius = 8 + (item.count / maxCount) * 15;
                            return (
                              <CircleMarker
                                key={index}
                                center={coordinates}
                                radius={radius}
                                pathOptions={{
                                  color,
                                  fillColor: color,
                                  fillOpacity: 0.7,
                                  weight: 2,
                                }}
                              >
                                <Tooltip
                                  direction="top"
                                  offset={[0, -4]}
                                  opacity={1}
                                  permanent={false}
                                >
                                  <div style={{ textAlign: 'center' }}>
                                    <strong>{item.country}</strong>
                                    <br />
                                    <span>{item.count} {item.count === 1 ? 'permit' : 'permits'}</span>
                                  </div>
                                </Tooltip>
                              </CircleMarker>
                            );
                          })}
                      </MapContainer>
                    </div>
                  ) : key === 'status' || key === 'gender' || key === 'permitGender' || key === 'permitSector' ? (
                    <div className="pie-chart-container">
                      <div className="pie-chart-wrapper">
                        <svg className="pie-chart" viewBox="0 0 200 200">
                          {(() => {
                            const total = report.data.reduce((sum, item) => sum + item.count, 0);
                            if (total === 0) return null;
                            
                            const colors = (key === 'gender' || key === 'permitGender')
                              ? ['#b97c07', '#1e40af'] // Male: golden, Female: blue
                              : ['#b97c07', '#1e40af', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#a855f7'];
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
                          const colors = key === 'gender' || key === 'permitGender'
                              ? ['#b97c07', '#1e40af'] // Male: golden, Female: blue
                              : ['#b97c07', '#1e40af', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#a855f7'];
                          return report.data.map((item, index) => {
                            const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : 0;
                            const label = key === 'gender' || key === 'permitGender' 
                              ? item.gender 
                              : key === 'permitSector' 
                                ? item.sector 
                                : item.status;
                            const isOther = key === 'permitSector' && item.isOther;
                            return (
                          <div 
                            key={index} 
                            className={`pie-chart-legend-item ${isOther ? 'pie-chart-legend-item--clickable' : ''}`}
                            onClick={isOther ? () => setShowOtherSectors(true) : undefined}
                            style={isOther ? { cursor: 'pointer' } : {}}
                          >
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
                      {key === 'permitSector' && showOtherSectors && otherSectorsList.length > 0 && (
                        <div className="other-sectors-modal">
                          <div className="other-sectors-modal-overlay" onClick={() => setShowOtherSectors(false)}></div>
                          <div className="other-sectors-modal-content">
                            <div className="other-sectors-modal-header">
                              <h3>Sectors in "Other" (Count &lt; 100)</h3>
                              <button 
                                className="other-sectors-modal-close"
                                onClick={() => setShowOtherSectors(false)}
                                aria-label="Close"
                              >
                                ×
                              </button>
                            </div>
                            <div className="other-sectors-list">
                              {otherSectorsList
                                .sort((a, b) => b.count - a.count)
                                .map((sector, idx) => (
                                  <div key={idx} className="other-sectors-item">
                                    <span className="other-sectors-name">{sector.sector}</span>
                                    <span className="other-sectors-count">{sector.count} {sector.count === 1 ? 'permit' : 'permits'}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      )}
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

export default ResearchDashboardPage;
