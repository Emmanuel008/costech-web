import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardCarousel.css';

function CardCarousel() {
  const cards = [
    {
      id: 1,
      title: 'Innovation per Sub-Program',
      chartType: 'donut',
      data: [
        { label: 'ICT', value: 45, color: '#b97c07' },
        { label: 'Agriculture', value: 35, color: '#a06d06' },
        { label: 'Energy', value: 20, color: '#b97c07' }
      ]
    },
    {
      id: 2,
      title: 'Permit per Region',
      chartType: 'bar',
      data: [
        { label: 'Dar', value: 120, color: '#b97c07' },
        { label: 'Arusha', value: 80, color: '#a06d06' },
        { label: 'Dodoma', value: 60, color: '#b97c07' },
        { label: 'Mbeya', value: 90, color: '#a06d06' }
      ]
    },
    {
      id: 3,
      title: 'Research per Sub-Program',
      chartType: 'donut',
      data: [
        { label: 'Agriculture', value: 45, color: '#b97c07' },
        { label: 'Health', value: 35, color: '#a06d06' },
        { label: 'Environment', value: 20, color: '#b97c07' }
      ]
    },
    {
      id: 4,
      title: 'Projects by Status',
      chartType: 'bar',
      data: [
        { label: 'Active', value: 85, color: '#b97c07' },
        { label: 'Pending', value: 65, color: '#a06d06' },
        { label: 'Completed', value: 100, color: '#b97c07' }
      ]
    },
    {
      id: 5,
      title: 'Project Status Overview',
      chartType: 'donut',
      data: [
        { label: 'Active', value: 50, color: '#b97c07' },
        { label: 'Pending', value: 30, color: '#a06d06' },
        { label: 'Completed', value: 20, color: '#b97c07' }
      ]
    },
    {
      id: 6,
      title: 'Applications by District',
      chartType: 'bar',
      data: [
        { label: 'District A', value: 110, color: '#b97c07' },
        { label: 'District B', value: 75, color: '#a06d06' },
        { label: 'District C', value: 95, color: '#b97c07' },
        { label: 'District D', value: 55, color: '#a06d06' }
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
            <div key={card.id} className="card-wrapper">
              <div className="carousel-card">
                <h3 className="card-title">{card.title}</h3>
                {card.subtitle && (
                  <p className="card-subtitle">{card.subtitle}</p>
                )}
                <div className="card-content">
                  {card.chartType === 'bar' ? (
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
                              stroke="rgba(185, 124, 7, 0.1)"
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
                              fill="#b97c07"
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
                                  fill="#b97c07"
                                >
                                  {item.label}
                                </text>
                                <text
                                  x={xPosition + adjustedBarWidth / 2}
                                  y={110 - barHeight - 3}
                                  textAnchor="middle"
                                  fontSize="8"
                                  fill="#b97c07"
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
                            stroke="#b97c07"
                            strokeWidth="1.5"
                          />
                          {/* X-axis line */}
                          <line
                            x1="30"
                            y1="110"
                            x2="190"
                            y2="110"
                            stroke="#b97c07"
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
                            stroke="rgba(185, 124, 7, 0.1)"
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
    </section>
  );
}

export default CardCarousel;

