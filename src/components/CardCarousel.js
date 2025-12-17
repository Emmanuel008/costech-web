import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/components/CardCarousel.css';

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function CardCarousel() {
  const [showMapKey, setShowMapKey] = useState(false);
  const [mapKeyData, setMapKeyData] = useState(null);
  // All 31 regions of Tanzania with permit data and coordinates
  const tanzaniaRegions = [
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
  ];

  const getPermitColor = (value) => {
    if (value >= 70 && value <= 150) return '#1e40af'; // Blue for 150-70
    return '#b97c07'; // Yellow/Golden for 70 and below
  };

  const cards = [
    {
      id: 1,
      title: 'Innovation per Sub-Program',
      chartType: 'donut',
      data: [
        { label: 'ICT', value: 45, color: '#b97c07' },
        { label: 'Agriculture', value: 35, color: '#1e40af' },
        { label: 'Energy', value: 20, color: '#b97c07' }
      ]
    },
    {
      id: 2,
      title: 'Permit per Region',
      chartType: 'map',
      data: tanzaniaRegions
    },
    {
      id: 3,
      title: 'Research per Sub-Program',
      chartType: 'donut',
      data: [
        { label: 'Agriculture', value: 45, color: '#1e40af' },
        { label: 'Health', value: 35, color: '#b97c07' },
        { label: 'Environment', value: 20, color: '#1e40af' }
      ]
    },
    {
      id: 4,
      title: 'Projects by Status',
      chartType: 'bar',
      data: [
        { label: 'Active', value: 85, color: '#b97c07' },
        { label: 'Pending', value: 65, color: '#1e40af' },
        { label: 'Completed', value: 100, color: '#b97c07' }
      ]
    },
    {
      id: 5,
      title: 'Project Status Overview',
      chartType: 'donut',
      data: [
        { label: 'Active', value: 50, color: '#1e40af' },
        { label: 'Pending', value: 30, color: '#b97c07' },
        { label: 'Completed', value: 20, color: '#1e40af' }
      ]
    },
    {
      id: 6,
      title: 'Applications by District',
      chartType: 'bar',
      data: [
        { label: 'District A', value: 110, color: '#b97c07' },
        { label: 'District B', value: 75, color: '#1e40af' },
        { label: 'District C', value: 95, color: '#b97c07' },
        { label: 'District D', value: 55, color: '#1e40af' }
      ]
    }
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipe: false,
    touchMove: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          swipe: false,
          touchMove: false,
          draggable: false,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true
        }
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          swipe: false,
          touchMove: false,
          draggable: false,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          swipe: true,
          touchMove: true,
          draggable: true,
          autoplay: true,
          autoplaySpeed: 5000,
          pauseOnHover: true
        }
      }
    ]
  };

  return (
    <section className="card-carousel-section" id="stats">
      <div className="card-carousel-container">
        <Slider {...settings}>
          {cards.map((card) => (
            <div key={card.id} className={`card-wrapper ${card.chartType === 'map' ? 'map-card-wrapper' : ''}`}>
              <div className={`carousel-card ${card.chartType === 'map' ? 'map-card' : ''}`}>
                <h3 className="card-title">{card.title}</h3>
                {card.subtitle && (
                  <p className="card-subtitle">{card.subtitle}</p>
                )}
                <div className="card-content">
                  {card.chartType === 'map' ? (
                    <>
                      <div 
                        className="card-chart map-chart" 
                        onClick={() => {
                          setMapKeyData(card.data);
                          setShowMapKey(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
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
                          {card.data.map((region) => {
                            if (!region.coordinates) return null;
                            const color = getPermitColor(region.permits);
                            const maxPermits = Math.max(...card.data.map((r) => r.permits));
                            const radius = 6 + (region.permits / maxPermits) * 6;
                            return (
                              <CircleMarker
                                key={region.name}
                                center={region.coordinates}
                                radius={radius}
                                pathOptions={{
                                  color,
                                  fillColor: color,
                                  fillOpacity: 0.85,
                                  weight: 1,
                                }}
                              >
                                <Tooltip
                                  direction="top"
                                  offset={[0, -4]}
                                  opacity={1}
                                  permanent
                                  className="map-badge"
                                >
                                  <span style={{ color }}>{region.permits}</span>
                                </Tooltip>
                              </CircleMarker>
                            );
                          })}
                        </MapContainer>
                        <div className="map-click-hint">
                          <span>Click to view all regions</span>
                        </div>
                      </div>
                    </>
                  ) : card.chartType === 'bar' ? (
                    <>
                      <div className="card-chart bar-chart">
                        <svg viewBox="0 0 200 120" className="bar-chart-svg">
                          {/* Grid lines */}
                          {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
                            <line
                              key={tick}
                              x1="30"
                              y1={110 - (tick / 120) * 100}
                              x2="190"
                              y2={110 - (tick / 120) * 100}
                              stroke="rgba(0, 0, 0, 0.1)"
                              strokeWidth="1"
                            />
                          ))}
                          {/* Y-axis labels */}
                          {[0, 20, 40, 60, 80, 100, 120].map((tick) => (
                            <text
                              key={tick}
                              x="25"
                              y={110 - (tick / 120) * 100}
                              textAnchor="end"
                              fontSize="8"
                              fill="#000000"
                              alignmentBaseline="middle"
                            >
                              {tick}
                            </text>
                          ))}
                          {/* Bars */}
                          {card.data.map((item, index) => {
                            const maxValue = Math.max(...card.data.map(d => d.value));
                            const barHeight = (item.value / maxValue) * 100;
                            const barWidth = 30;
                            const barSpacing = 10;
                            const chartWidth = 160;
                            const totalBars = card.data.length;
                            const totalSpacing = (totalBars - 1) * barSpacing;
                            const availableWidth = chartWidth - totalSpacing;
                            const adjustedBarWidth = Math.min(barWidth, availableWidth / totalBars);
                            const xPosition = 40 + index * (adjustedBarWidth + barSpacing);
                            return (
                              <g key={item.label}>
                                <rect
                                  x={xPosition}
                                  y={110 - barHeight}
                                  width={adjustedBarWidth}
                                  height={barHeight}
                                  fill={item.color}
                                  rx="2"
                                />
                                <text
                                  x={xPosition + adjustedBarWidth / 2}
                                  y={115}
                                  textAnchor="middle"
                                  fontSize="7"
                                  fill="#000000"
                                >
                                  {item.label}
                                </text>
                                <text
                                  x={xPosition + adjustedBarWidth / 2}
                                  y={110 - barHeight - 3}
                                  textAnchor="middle"
                                  fontSize="8"
                                  fill="#000000"
                                  fontWeight="600"
                                >
                                  {item.value}
                                </text>
                              </g>
                            );
                          })}
                          {/* Y-axis line */}
                          <line
                            x1="30"
                            y1="10"
                            x2="30"
                            y2="110"
                            stroke="#000000"
                            strokeWidth="1.5"
                          />
                          {/* X-axis line */}
                          <line
                            x1="30"
                            y1="110"
                            x2="190"
                            y2="110"
                            stroke="#000000"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="card-chart">
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
                            const total = card.data.reduce((sum, d) => sum + d.value, 0);
                            const percentage = (item.value / total) * 100;
                            const circumference = 2 * Math.PI * 60;
                            const offset = card.data
                              .slice(0, index)
                              .reduce((sum, d) => sum + (d.value / total) * circumference, 0);
                            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                            const strokeDashoffset = -offset;
                            return (
                              <circle
                                key={item.label}
                                cx="75"
                                cy="75"
                                r="60"
                                fill="none"
                                stroke={item.color}
                                strokeWidth="15"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                transform="rotate(-90 75 75)"
                              />
                            );
                          })}
                        </svg>
                      </div>
                      <div className="card-legend">
                        {card.data.map((item) => (
                          <div key={item.label} className="legend-item">
                            <span
                              className="legend-color"
                              style={{ backgroundColor: item.color }}
                            ></span>
                            <span className="legend-label">{item.label}</span>
                            <span className="legend-value">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      {showMapKey && mapKeyData && (
        <div className="map-key-modal" onClick={() => setShowMapKey(false)}>
          <div className="map-key-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="map-key-close"
              onClick={() => setShowMapKey(false)}
              aria-label="Close key"
            >
              ×
            </button>
            <h3 className="map-key-title">Permits per region</h3>
            <div className="map-key-wrapper">
              <div className="map-key-map-container">
                <MapContainer
                  center={[-6.3690, 34.8888]}
                  zoom={6}
                  style={{ height: '100%', width: '100%' }}
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
                  {mapKeyData.map((region) => {
                    if (!region.coordinates) return null;
                    const color = getPermitColor(region.permits);
                    const maxPermits = Math.max(...mapKeyData.map((r) => r.permits));
                    const radius = 8 + (region.permits / maxPermits) * 10;
                    return (
                      <CircleMarker
                        key={region.name}
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
                          <span style={{ color }}>{region.permits}</span>
                        </Tooltip>
                      </CircleMarker>
                    );
                  })}
                </MapContainer>
              </div>
              <div className="map-key-legend-panel">
                <h4 className="map-key-legend-title">Permit Count Key</h4>
                <div className="map-key-regions-list">
                  <div className="map-key-region-item">
                    <div 
                      className="map-key-region-color" 
                      style={{ backgroundColor: '#1e40af' }}
                    ></div>
                    <span className="map-key-region-name">150 - 70</span>
                  </div>
                  <div className="map-key-region-item">
                    <div 
                      className="map-key-region-color" 
                      style={{ backgroundColor: '#b97c07' }}
                    ></div>
                    <span className="map-key-region-name">70 and below</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CardCarousel;

