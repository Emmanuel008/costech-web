import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/pages/ConnectivityDashboardPage.css';
import { getHerinStatsByCategory, getHerinStatsByRegion } from '../services/api';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ConnectivityDashboardPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [institutionStats, setInstitutionStats] = useState({
    hli: 0,
    tvet: 0,
    ttcs: 0,
    regulators: 0,
    rd: 0,
  });
  const [connectedInstitutionsByRegion, setConnectedInstitutionsByRegion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map coordinates for Tanzania regions
  const regionCoordinates = {
    'Dar es Salaam': [-6.7924, 39.2083],
    'Arusha': [-3.3869, 36.6830],
    'Dodoma': [-6.1630, 35.7516],
    'Mwanza': [-2.5164, 32.9176],
    'Mbeya': [-8.9000, 33.4500],
    'Morogoro': [-6.8167, 37.6667],
    'Tanga': [-5.0667, 39.1000],
    'Iringa': [-7.7667, 35.7000],
    'Tabora': [-5.0167, 32.8000],
    'Mtwara': [-10.2667, 40.1833],
    'Kigoma': [-4.8769, 29.6267],
    'Manyara': [-4.3167, 36.6833],
    'Mara': [-1.5000, 33.8000],
    'Pwani': [-7.7667, 39.1833], // Coastal region
    'Pwani (Coast)': [-7.7667, 39.1833], // API returns this format
    'Coast': [-7.7667, 39.1833], // Alternative name for Pwani
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [categoryData, regionData] = await Promise.all([
          getHerinStatsByCategory(),
          getHerinStatsByRegion(),
        ]);

        // Map category data to institutionStats
        if (categoryData && categoryData.length > 0) {
          const stats = {
            hli: 0,
            tvet: 0,
            ttcs: 0,
            regulators: 0,
            rd: 0,
          };

          categoryData.forEach((item) => {
            const category = item.category?.toUpperCase() || '';
            const count = parseInt(item.count) || 0;

            if (category === 'HLI') {
              stats.hli = count;
            } else if (category === 'TVET') {
              stats.tvet = count;
            } else if (category === 'TTC') {
              stats.ttcs = count;
            } else if (category === 'REGULATOR') {
              stats.regulators = count;
            } else if (category === 'R&D') {
              stats.rd = count;
            }
          });

          setInstitutionStats(stats);
        }

        // Map region data to connectedInstitutionsByRegion
        if (regionData && regionData.length > 0) {
          const regions = regionData
            .map((item) => {
              const regionName = item.region || '';
              const count = parseInt(item.count) || 0;
              const coordinates = regionCoordinates[regionName] || regionCoordinates[regionName.replace(' (Coast)', '')];

              return {
                region: regionName,
                count,
                coordinates,
              };
            })
            .filter((region) => region.coordinates); // Only include regions with coordinates

          setConnectedInstitutionsByRegion(regions);
        }
      } catch (err) {
        console.error('Error fetching connectivity data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInstitutionColor = (count) => {
    if (count >= 5) return '#1e40af'; // Blue for higher counts
    if (count >= 2) return '#3b82f6'; // Medium blue
    return '#b97c07'; // Golden for lower counts
  };

  const maxInstitutions = Math.max(...connectedInstitutionsByRegion.map(r => r.count), 1);

  return (
    <section className="connectivity-dashboard-page">
      <div className="connectivity-dashboard-container">
        <div className="connectivity-dashboard-header">
          <a href="/dashboard" className="back-link">← Back to Dashboard</a>
          <h1 className="connectivity-dashboard-title">Connectivity Dashboard</h1>
          <p className="connectivity-dashboard-subtitle">
            HERIN - Higher Education Research Infrastructure Network
          </p>
        </div>

        <div className="herin-content">
          <div className="herin-card">
            {/* HERIN Overview Section */}
            <div className="herin-section">
              <h2 className="herin-section-title">HERIN Introduction</h2>
              <div className="herin-description">
                <p>
                  The Higher Education Research Infrastructure Network (HERIN) serves as Tanzania's National Research and Education Network (NREN), providing a trusted, high-capacity digital backbone that enables Higher Education and Research Institutions (HERIs) to securely interconnect and share digital services. Through HERIN, institutions can leverage shared infrastructure such as high-speed connectivity, data centers, cloud and hosting platforms, identity and access management, research collaboration tools, and value-added services that would be costly or impractical to deploy individually. This shared service model reduces duplication of investments, optimizes utilization of national digital resources, strengthens inter-institutional collaboration, and enhances access to teaching, learning, and research platforms, thereby collectively improving the efficiency, quality, and global competitiveness of Tanzania's higher education and research ecosystem.
                </p>
              </div>
            </div>

            {/* Network Description Section */}
            <div className="herin-section">
              <h2 className="herin-section-title">Network Description</h2>
              <div className="herin-description">
                <p>HERIN comprises of the following infrastructure:</p>
                <ol className="herin-list">
                  <li>National ICT Backbone (NICTBB) as a national carrier between regions</li>
                  <li>Point of Presence connecting the NICTBB to the last mile</li>
                  <li>Last mile connectivity from regional POPs to HERIs at a capacity subscribed by particular institution</li>
                  <li>Capacity landed at COSTECH Kijitonyama from service providers</li>
                </ol>
              </div>
            </div>

            {/* Services Offered and Coming Soon Table Section */}
            <div className="herin-section">
              <div className="services-table-container">
                <table className="services-table">
                  <thead>
                    <tr>
                      <th className="services-table-header">Services Offered upon Request</th>
                      <th className="services-table-header">Coming Soon</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="services-table-cell">
                        <ol className="herin-list">
                          <li>Internet Bandwidth</li>
                          <li>Video Conference</li>
                          <li>GOVNET services for public institutions</li>
                          <li>MPLS VPN connectivity between campuses, branches</li>
                        </ol>
                      </td>
                      <td className="services-table-cell">
                        <ol className="herin-list">
                          <li>Turnitin</li>
                          <li>Data Storage</li>
                        </ol>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="herin-section">
              <h2 className="herin-section-title">Statistics</h2>
              
              {/* Number of Institutions by Category */}
              <div className="statistics-subsection">
                <h3 className="statistics-subtitle">Number of Institutions (Category)</h3>
                {loading ? (
                  <div className="statistics-loading">
                    <p>Loading statistics...</p>
                  </div>
                ) : error ? (
                  <div className="statistics-error">
                    <p>Unable to load statistics. Please try again later.</p>
                  </div>
                ) : (
                  <div className="statistics-cards-grid">
                    <div className="statistics-card">
                      <div className="statistics-card-label">HLI</div>
                      <div className="statistics-card-value">{institutionStats.hli}</div>
                    </div>
                    <div className="statistics-card">
                      <div className="statistics-card-label">TVET</div>
                      <div className="statistics-card-value">{institutionStats.tvet}</div>
                    </div>
                    <div className="statistics-card">
                      <div className="statistics-card-label">TTCs</div>
                      <div className="statistics-card-value">{institutionStats.ttcs}</div>
                    </div>
                    <div className="statistics-card">
                      <div className="statistics-card-label">Regulators</div>
                      <div className="statistics-card-value">{institutionStats.regulators}</div>
                    </div>
                    <div className="statistics-card">
                      <div className="statistics-card-label">R&D</div>
                      <div className="statistics-card-value">{institutionStats.rd}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Graphs Section */}
              <div className="statistics-graphs">
                {/* Connected Institutions by Region Map */}
                <div className="graph-container">
                  <h3 className="graph-title">HERIN Connectivity Footprint by Region</h3>
                  {loading ? (
                    <div className="map-loading">
                      <p>Loading map data...</p>
                    </div>
                  ) : error ? (
                    <div className="map-error">
                      <p>Unable to load map data. Please try again later.</p>
                    </div>
                  ) : connectedInstitutionsByRegion.length === 0 ? (
                    <div className="map-empty">
                      <p>No region data available.</p>
                    </div>
                  ) : (
                    <div className="map-container-wrapper">
                      <MapContainer
                        center={[-6.3690, 34.8888]}
                        zoom={6}
                        style={{ height: '500px', width: '100%', borderRadius: '8px' }}
                        scrollWheelZoom={true}
                        dragging={true}
                        touchZoom={true}
                        doubleClickZoom={true}
                        zoomControl={true}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {connectedInstitutionsByRegion.map((region) => {
                          if (!region.coordinates) return null;
                          const color = getInstitutionColor(region.count);
                          const radius = maxInstitutions > 0 ? 8 + (region.count / maxInstitutions) * 15 : 8;
                          return (
                            <CircleMarker
                              key={region.region}
                              center={region.coordinates}
                              radius={radius}
                              pathOptions={{
                                color,
                                fillColor: color,
                                fillOpacity: 0.85,
                                weight: 2,
                              }}
                              eventHandlers={{
                                click: () => {
                                  setSelectedRegion(region);
                                },
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <Tooltip
                                direction="top"
                                offset={[0, -8]}
                                opacity={1}
                                permanent
                                className="herin-map-tooltip"
                              >
                                <div className="herin-tooltip-content">
                                  <div className="herin-tooltip-region">{region.region}</div>
                                  <div className="herin-tooltip-count">{region.count} {region.count === 1 ? 'institution' : 'institutions'}</div>
                                </div>
                              </Tooltip>
                            </CircleMarker>
                          );
                        })}
                      </MapContainer>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Region Detail Modal */}
      {selectedRegion && (
        <div className="herin-region-modal-overlay" onClick={() => setSelectedRegion(null)}>
          <div className="herin-region-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="herin-region-modal-header">
              <h3 className="herin-region-modal-title">{selectedRegion.region}</h3>
              <button 
                className="herin-region-modal-close"
                onClick={() => setSelectedRegion(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="herin-region-modal-body">
              <div className="herin-region-stat">
                <span className="herin-region-stat-label">Number of Institutions:</span>
                <span className="herin-region-stat-value">{selectedRegion.count}</span>
              </div>
              <div className="herin-region-details">
                <p>
                  This region has <strong>{selectedRegion.count}</strong> {selectedRegion.count === 1 ? 'institution' : 'institutions'} 
                  connected to the HERIN network, providing high-speed connectivity and access to shared digital services 
                  for higher education and research activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConnectivityDashboardPage;
