import React from 'react';
import './LatestVideo.css';

const LatestVideo = () => {
  const videoItems = [
    {
      id: 1,
      image: '/assets/img/hero.jpg',
      description: 'Usipitwe na Taarifa hii/Yaliyojiri siku ya pili ya Mkutano wa Serikali Mtandao'
    },
    {
      id: 2,
      image: '/assets/img/hero2.jpeg',
      description: 'Tazama walichokisema washiriki hawa wa Mkutano wa Tano wa Serikali Mtandao',
      isVideo: true
    },
    {
      id: 3,
      image: '/assets/img/miradi.jpg',
      description: 'Alichokisema Makamu wa Rais Dkt.Mpango baada ya kuwasili kwenye Mkutano wa Tano wa Serikali Mtandao'
    }
  ];

  return (
    <section className="latest-video-section">
      <div className="latest-video-container">
        <div className="latest-video-grid">
          {videoItems.map((item, index) => (
            <div
              key={item.id}
              className={`latest-video-card ${item.isVideo ? 'video-center' : ''}`}
            >
              <div className="latest-video-image-container">
                <img 
                  src={item.image} 
                  alt={item.description}
                  className="latest-video-image"
                  loading="lazy"
                />
                <div className="play-button-overlay">
                  <div className="play-button">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="#f4d03f" opacity="0.9"/>
                      <path d="M22 18L42 30L22 42V18Z" fill="#000000"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="latest-video-content">
                <p className="latest-video-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideo;

