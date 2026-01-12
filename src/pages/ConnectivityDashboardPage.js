import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/pages/ConnectivityDashboardPage.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ConnectivityDashboardPage = () => {

  // Placeholder data - these should be replaced with actual API data
  const institutionStats = {
    hli: 20, // Number of Higher Learning Institutions
    tvet: 30, // Number of TVET institutions
    ttcs: 25, // Number of Teachers Training Colleges
    regulators: 10, // Number of Regulators
    rd: 22, // Number of R&D institutions
  };

  // Placeholder data for graphs - should be replaced with actual API data
  // Map coordinates for Tanzania regions
  const regionCoordinates = {
    'Dar es Salaam': [-6.7924, 39.2083],
    'Arusha': [-3.3869, 36.6830],
    'Dodoma': [-6.1630, 35.7516],
    'Mwanza': [-2.5164, 32.9176],
    'Mbeya': [-8.9000, 33.4500],
    'Morogoro': [-6.8167, 37.6667],
    'Tanga': [-5.0667, 39.1000],
    'Zanzibar': [-6.1650, 39.1997],
  };

  const getInstitutionColor = (count) => {
    if (count >= 10) return '#1e40af'; // Blue for higher counts
    return '#b97c07'; // Golden for lower counts
  };

  const connectedInstitutionsByRegion = [
    { region: 'Dar es Salaam', count: 0, coordinates: regionCoordinates['Dar es Salaam'] },
    { region: 'Arusha', count: 0, coordinates: regionCoordinates['Arusha'] },
    { region: 'Dodoma', count: 0, coordinates: regionCoordinates['Dodoma'] },
    { region: 'Mwanza', count: 0, coordinates: regionCoordinates['Mwanza'] },
    { region: 'Mbeya', count: 0, coordinates: regionCoordinates['Mbeya'] },
    { region: 'Morogoro', count: 0, coordinates: regionCoordinates['Morogoro'] },
    { region: 'Tanga', count: 0, coordinates: regionCoordinates['Tanga'] },
    { region: 'Zanzibar', count: 0, coordinates: regionCoordinates['Zanzibar'] },
  ];

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
              </div>

              {/* Graphs Section */}
              <div className="statistics-graphs">
                {/* Connected Institutions by Region Map */}
                <div className="graph-container">
                  <h3 className="graph-title">HERIN Connectivity Footprint by Region</h3>
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
                          >
                            <Tooltip
                              direction="top"
                              offset={[0, -4]}
                              opacity={1}
                              permanent
                              className="map-badge"
                            >
                              <span style={{ color, fontWeight: 'bold' }}>{region.count}</span>
                            </Tooltip>
                          </CircleMarker>
                        );
                      })}
                    </MapContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectivityDashboardPage;
