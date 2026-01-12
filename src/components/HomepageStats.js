import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/components/HomepageStats.css';
import {
  getInnovationPerGender,
  getInnovationTotalFundsPerProgram,
  getResearchPerGender,
  getPermitPerGender,
  getPermitPerCountry,
  getPermitPerSector,
  getPermitPerRegion,
} from '../services/api';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HomepageStats = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    innovationGender: null,
    totalFundPerProgram: null,
    permitSector: null,
    permitGender: null,
    permitCountry: null,
    permitRegion: null, // TODO: Add API integration for permit per region
    researcherGender: null,
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
    'FRANCE': [46.2276, 2.2137],
    'NETHERLANDS': [52.1326, 5.2913],
    'BELGIUM': [50.5039, 4.4699],
    'SWEDEN': [60.1282, 18.6435],
    'NORWAY': [60.4720, 8.4689],
    'DENMARK': [56.2639, 9.5018],
    'FINLAND': [61.9241, 25.7482],
    'AUSTRALIA': [-25.2744, 133.7751],
    'CANADA': [56.1304, -106.3468],
    'SOUTH AFRICA': [-30.5595, 22.9375],
    'KENYA': [-0.0236, 37.9062],
    'UGANDA': [1.3733, 32.2903],
    'RWANDA': [-1.9403, 29.8739],
    'ETHIOPIA': [9.1450, 38.7667],
    'INDIA': [20.5937, 78.9629],
    'BRAZIL': [-14.2350, -51.9253],
  };

  // Tanzania region coordinates for connected institutions
  const tanzaniaRegionCoordinates = {
    'Dar es Salaam': [-6.7924, 39.2083],
    'Arusha': [-3.3869, 36.6830],
    'Dodoma': [-6.1630, 35.7516],
    'Mwanza': [-2.5164, 32.9176],
    'Mbeya': [-8.9000, 33.4500],
    'Morogoro': [-6.8167, 37.6667],
    'Tanga': [-5.0667, 39.1000],
    'Zanzibar': [-6.1650, 39.1997],
    'Kilimanjaro': [-3.0667, 37.3500],
    'Iringa': [-7.7667, 35.7000],
    'Tabora': [-5.0167, 32.8000],
    'Mtwara': [-10.2667, 40.1833],
    'Lindi': [-9.9967, 39.7167],
    'Rukwa': [-8.0167, 31.6167],
    'Ruvuma': [-10.6833, 35.6500],
    'Shinyanga': [-3.6667, 33.4167],
    'Singida': [-4.8167, 34.7500],
    'Kagera': [-1.3333, 31.8000],
    'Mara': [-1.5000, 33.8000],
    'Manyara': [-4.3167, 36.6833],
    'Njombe': [-9.3333, 34.7667],
    'Geita': [-2.8667, 32.1667],
    'Katavi': [-6.3333, 31.1333],
    'Simiyu': [-2.6333, 33.9833],
    'Songwe': [-9.3333, 33.9833],
    'Pemba North': [-5.0333, 39.7667],
    'Pemba South': [-5.3167, 39.7000],
    'Unguja North': [-5.8333, 39.3000],
    'Unguja South': [-6.1667, 39.3500],
    'Pwani': [-7.7667, 39.1833], // Coastal region
    'Kigoma': [-4.8769, 29.6267], // Added from API response
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const [
          innovationGenderData,
          innovationProgramData,
          researchGenderData,
          permitGenderData,
          permitCountryData,
          permitSectorData,
          permitRegionData,
        ] = await Promise.all([
          getInnovationPerGender().catch(() => null),
          getInnovationTotalFundsPerProgram().catch(() => null),
          getResearchPerGender().catch(() => null),
          getPermitPerGender().catch((err) => {
            console.error('Error fetching permit per gender:', err);
            return null;
          }),
          getPermitPerCountry().catch((err) => {
            console.error('Error fetching permit per country:', err);
            return null;
          }),
          getPermitPerSector().catch((err) => {
            console.error('Error fetching permit per sector:', err);
            return null;
          }),
          getPermitPerRegion().catch((err) => {
            console.error('Error fetching permit per region:', err);
            return []; // Return empty array instead of null for consistency
          }),
        ]);

        setStats({
          innovationGender: innovationGenderData,
          totalFundPerProgram: innovationProgramData,
          permitSector: permitSectorData,
          permitGender: permitGenderData,
          permitCountry: permitCountryData,
          permitRegion: permitRegionData,
          researcherGender: researchGenderData,
        });
      } catch (error) {
        console.error('Error fetching homepage statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCardClick = (dashboardPath, reportKey = null) => {
    const path = reportKey ? `${dashboardPath}?report=${reportKey}` : dashboardPath;
    navigate(path);
  };

  // Prepare data for cards - titles match dashboard page titles
  const cards = [
    {
      id: 1,
      title: "Gender composition for innovation projects' lead innovators",
      type: 'pie',
      data: stats.innovationGender
        ? [
            { label: 'Male', value: stats.innovationGender.male || 0, color: '#1e40af' },
            { label: 'Female', value: stats.innovationGender.female || 0, color: '#b97c07' },
          ]
        : [],
      onClick: () => handleCardClick('/dashboard/innovation', 'gender'),
    },
    {
      id: 2,
      title: 'Research and Innovation funding allocation',
      type: 'list',
      data: stats.totalFundPerProgram
        ? Object.entries(stats.totalFundPerProgram)
            .map(([program, amount]) => ({
              program,
              amount: parseFloat(amount) || 0,
            }))
            .filter((item) => item.amount > 0)
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 3) // Show top 3
        : [],
      onClick: () => handleCardClick('/dashboard/innovation', 'program'),
    },
    {
      id: 3,
      title: 'Sectoral distribution for the granted Research Permits',
      type: 'pie',
      data: stats.permitSector
        ? (() => {
            const sectors = stats.permitSector
              .map((item) => {
                const sector = Object.keys(item)[0];
                const count = Object.values(item)[0];
                return {
                  sector,
                  count: parseInt(count) || 0,
                  value: parseInt(count) || 0, // Add value for pie chart compatibility
                };
              })
              .sort((a, b) => b.count - a.count);
            const mainSectors = sectors.filter((s) => s.count >= 100);
            const otherSectors = sectors.filter((s) => s.count < 100);
            const otherCount = otherSectors.reduce((sum, s) => sum + s.count, 0);
            const colors = ['#b97c07', '#1e40af', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
            if (otherCount > 0) {
              return [
                ...mainSectors.slice(0, 2).map((s, i) => ({ ...s, color: colors[i % colors.length] })),
                { sector: 'Other', count: otherCount, value: otherCount, color: colors[2] },
              ];
            }
            return mainSectors.slice(0, 3).map((s, i) => ({ ...s, color: colors[i % colors.length] }));
          })()
        : [],
      onClick: () => handleCardClick('/dashboard/research', 'permitSector'),
    },
    {
      id: 4,
      title: 'Gender composition for the granted Research Permits',
      type: 'pie',
      data: stats.permitGender
        ? stats.permitGender.map((item) => {
            const gender = Object.keys(item)[0];
            const count = Object.values(item)[0];
            return {
              label: gender === 'MALE' ? 'Male' : gender === 'FEMALE' ? 'Female' : gender,
              value: parseInt(count) || 0,
              color: gender === 'MALE' ? '#1e40af' : '#b97c07',
            };
          })
        : [],
      onClick: () => handleCardClick('/dashboard/research', 'permitGender'),
    },
    {
      id: 5,
      title: 'Research permits granted to Tanzanians and Foreign researchers',
      type: 'map',
      data: stats.permitCountry
        ? stats.permitCountry
            .map((item) => {
              const country = Object.keys(item)[0];
              const count = Object.values(item)[0];
              return {
                country,
                count: parseInt(count) || 0,
                coordinates: countryCoordinates[country.toUpperCase()] || null,
              };
            })
            .filter((item) => item.coordinates && item.count > 0)
            .sort((a, b) => b.count - a.count)
            .slice(0, 10) // Show top 10
        : [],
      onClick: () => handleCardClick('/dashboard/research', 'permitCountry'),
    },
    {
      id: 6,
      title: 'Distribution of research permits across Tanzania Regions',
      type: 'tanzaniaMap',
      data: stats.permitRegion
        ? stats.permitRegion
            .map((item) => {
              const region = Object.keys(item)[0];
              const count = Object.values(item)[0];
              return {
                region,
                count: parseInt(count) || 0,
                coordinates: tanzaniaRegionCoordinates[region] || null,
              };
            })
            .filter((item) => item.coordinates && item.count > 0)
            .sort((a, b) => b.count - a.count)
        : [],
      onClick: () => handleCardClick('/dashboard/research', 'permitRegion'),
    },
    {
      id: 7,
      title: "Gender composition for research projects' principal investigators",
      type: 'pie',
      data: stats.researcherGender
        ? [
            { label: 'Male', value: stats.researcherGender.male || 0, color: '#1e40af' },
            { label: 'Female', value: stats.researcherGender.female || 0, color: '#b97c07' },
          ]
        : [],
      onClick: () => handleCardClick('/dashboard/research', 'gender'),
    },
    {
      id: 8,
      title: 'HERIN Connectivity Footprint by Region',
      type: 'tanzaniaMap',
      data: [
        { region: 'Dar es Salaam', count: 15, coordinates: tanzaniaRegionCoordinates['Dar es Salaam'] },
        { region: 'Arusha', count: 8, coordinates: tanzaniaRegionCoordinates['Arusha'] },
        { region: 'Dodoma', count: 12, coordinates: tanzaniaRegionCoordinates['Dodoma'] },
        { region: 'Mwanza', count: 10, coordinates: tanzaniaRegionCoordinates['Mwanza'] },
        { region: 'Mbeya', count: 7, coordinates: tanzaniaRegionCoordinates['Mbeya'] },
        { region: 'Morogoro', count: 6, coordinates: tanzaniaRegionCoordinates['Morogoro'] },
        { region: 'Tanga', count: 5, coordinates: tanzaniaRegionCoordinates['Tanga'] },
        { region: 'Zanzibar', count: 4, coordinates: tanzaniaRegionCoordinates['Zanzibar'] },
        { region: 'Kilimanjaro', count: 6, coordinates: tanzaniaRegionCoordinates['Kilimanjaro'] },
        { region: 'Iringa', count: 5, coordinates: tanzaniaRegionCoordinates['Iringa'] },
        { region: 'Tabora', count: 3, coordinates: tanzaniaRegionCoordinates['Tabora'] },
        { region: 'Mtwara', count: 4, coordinates: tanzaniaRegionCoordinates['Mtwara'] },
        { region: 'Lindi', count: 2, coordinates: tanzaniaRegionCoordinates['Lindi'] },
        { region: 'Rukwa', count: 2, coordinates: tanzaniaRegionCoordinates['Rukwa'] },
        { region: 'Ruvuma', count: 3, coordinates: tanzaniaRegionCoordinates['Ruvuma'] },
        { region: 'Shinyanga', count: 3, coordinates: tanzaniaRegionCoordinates['Shinyanga'] },
        { region: 'Singida', count: 2, coordinates: tanzaniaRegionCoordinates['Singida'] },
        { region: 'Kagera', count: 3, coordinates: tanzaniaRegionCoordinates['Kagera'] },
        { region: 'Mara', count: 2, coordinates: tanzaniaRegionCoordinates['Mara'] },
        { region: 'Manyara', count: 2, coordinates: tanzaniaRegionCoordinates['Manyara'] },
        { region: 'Njombe', count: 2, coordinates: tanzaniaRegionCoordinates['Njombe'] },
        { region: 'Geita', count: 1, coordinates: tanzaniaRegionCoordinates['Geita'] },
        { region: 'Katavi', count: 1, coordinates: tanzaniaRegionCoordinates['Katavi'] },
        { region: 'Simiyu', count: 1, coordinates: tanzaniaRegionCoordinates['Simiyu'] },
        { region: 'Songwe', count: 1, coordinates: tanzaniaRegionCoordinates['Songwe'] },
        { region: 'Pemba North', count: 1, coordinates: tanzaniaRegionCoordinates['Pemba North'] },
        { region: 'Pemba South', count: 1, coordinates: tanzaniaRegionCoordinates['Pemba South'] },
        { region: 'Unguja North', count: 1, coordinates: tanzaniaRegionCoordinates['Unguja North'] },
        { region: 'Unguja South', count: 1, coordinates: tanzaniaRegionCoordinates['Unguja South'] },
      ],
      onClick: () => handleCardClick('/dashboard/connectivity'),
    },
  ];

  const renderCardContent = (card) => {
    if (loading) {
      return <div className="stat-loading">Loading...</div>;
    }

    switch (card.type) {
      case 'pie':
        if (!card.data || card.data.length === 0) {
          return <div className="stat-no-data">No data available</div>;
        }
        const total = card.data.reduce((sum, item) => sum + item.value, 0);
        return (
          <>
            <div className="stat-chart">
              <svg viewBox="0 0 150 150" className="donut-chart">
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.1)"
                  strokeWidth="15"
                />
                {card.data.map((item, index) => {
                  const percentage = (item.value / total) * 100;
                  const circumference = 2 * Math.PI * 60;
                  const offset = card.data
                    .slice(0, index)
                    .reduce((sum, d) => sum + (d.value / total) * circumference, 0);
                  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -offset;
                  return (
                    <circle
                      key={item.label || item.sector}
                      cx="75"
                      cy="75"
                      r="60"
                      fill="none"
                      stroke={item.color || '#b97c07'}
                      strokeWidth="15"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 75 75)"
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  );
                })}
                {/* Center text showing total */}
                <text
                  x="75"
                  y="70"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#0f172a"
                  fontFamily="Aeonik Pro, Helvetica Neue, Helvetica, Arial, sans-serif"
                >
                  {total.toLocaleString()}
                </text>
                <text
                  x="75"
                  y="85"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="500"
                  fill="#64748b"
                  fontFamily="Aeonik Pro, Helvetica Neue, Helvetica, Arial, sans-serif"
                >
                  Total
                </text>
              </svg>
            </div>
            <div className="stat-legend">
              {card.data.map((item) => {
                const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
                const displayLabel = item.label || item.sector;
                const displayValue = item.value || item.count || 0;
                return (
                  <div key={displayLabel} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: item.color || '#b97c07' }}
                    ></span>
                    <div className="legend-info">
                      <span className="legend-label">{displayLabel}</span>
                      <span className="legend-details">
                        {displayValue.toLocaleString()} ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );

      case 'list':
        if (!card.data || card.data.length === 0) {
          return <div className="stat-no-data">No data available</div>;
        }
        return (
          <div className="stat-list">
            {card.data.map((item, index) => (
              <div key={index} className="stat-list-item">
                <span className="stat-list-label">{item.program.replace(' Program', '')}</span>
                <span className="stat-list-value">{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
        );

      case 'map':
        if (!card.data || card.data.length === 0) {
          return <div className="stat-no-data">No data available</div>;
        }
        const maxCount = Math.max(...card.data.map((item) => item.count), 1);
        return (
          <div className="stat-map">
            <MapContainer
              center={[-6.3690, 34.8888]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
              dragging={false}
              touchZoom={false}
              doubleClickZoom={false}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {card.data.map((item) => {
                if (!item.coordinates) return null;
                const radius = 4 + (item.count / maxCount) * 6;
                return (
                  <CircleMarker
                    key={item.country}
                    center={item.coordinates}
                    radius={radius}
                    pathOptions={{
                      color: '#b97c07',
                      fillColor: '#b97c07',
                      fillOpacity: 0.7,
                      weight: 1,
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -4]} opacity={1} permanent className="map-badge">
                      <span>{item.count}</span>
                    </Tooltip>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        );

      case 'tanzaniaMap':
        if (!card.data || card.data.length === 0) {
          return <div className="stat-no-data">No data available</div>;
        }
        const maxTanzaniaCount = Math.max(...card.data.map((item) => item.count), 1);
        // Color function - can be customized based on data type (institutions vs permits)
        const getMapColor = (count, isPermit = false) => {
          if (isPermit) {
            // For permits: blue for 70+, golden for below 70
            if (count >= 70) return '#1e40af';
            return '#b97c07';
          } else {
            // For institutions: blue for 10+, golden for below 10
            if (count >= 10) return '#1e40af';
            return '#b97c07';
          }
        };
        const isPermitMap = card.title.toLowerCase().includes('permit');
        return (
          <div className="stat-map">
            <MapContainer
              center={[-6.3690, 34.8888]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
              dragging={false}
              touchZoom={false}
              doubleClickZoom={false}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {card.data.map((item) => {
                if (!item.coordinates) return null;
                const radius = 5 + (item.count / maxTanzaniaCount) * 8;
                const color = getMapColor(item.count, isPermitMap);
                return (
                  <CircleMarker
                    key={item.region}
                    center={item.coordinates}
                    radius={radius}
                    pathOptions={{
                      color: color,
                      fillColor: color,
                      fillOpacity: 0.85,
                      weight: 1.5,
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -4]} opacity={1} permanent className="map-badge">
                      <span style={{ color: color, fontWeight: '700' }}>{item.count}</span>
                    </Tooltip>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        );

      case 'stat':
        return (
          <div className="stat-value-display">
            <div className="stat-value-number">{card.data.value}</div>
            <div className="stat-value-label">{card.data.label}</div>
          </div>
        );

      default:
        return <div className="stat-no-data">No data available</div>;
    }
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="homepage-stats-section" id="stats">
      <div className="homepage-stats-container">
        <Slider {...settings}>
          {cards.map((card) => (
            <div key={card.id} className="homepage-stat-card-wrapper">
              <div
                className="homepage-stat-card"
                onClick={card.onClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.onClick();
                  }
                }}
                aria-label={`Click to view ${card.title} in dashboard`}
              >
                <h3 className="stat-card-title">{card.title}</h3>
                <div className="stat-card-content">{renderCardContent(card)}</div>
                <div className="stat-card-click-hint">Click to view details →</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HomepageStats;

