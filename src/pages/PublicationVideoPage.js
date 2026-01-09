import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/pages/PublicationVideoPage.css';
import { getCostechVideos } from '../services/api';

/**
 * Extract YouTube video ID from URL
 * @param {string} url - YouTube URL
 * @returns {string|null} - YouTube video ID or null
 */
const getYouTubeVideoId = (url) => {
  if (!url || url === '#') return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Get YouTube thumbnail URL
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Thumbnail URL
 */
const getYouTubeThumbnail = (videoId) => {
  if (!videoId) return '/assets/img/hero2.jpeg'; // Fallback image
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Fallback static data
const fallbackVideos = [
  {
    id: 1,
    title: 'COSTECH Video - January 2024',
    description: 'Watch our latest video featuring important updates from COSTECH',
    video_link: '#',
  },
];

const PublicationVideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 PublicationVideoPage: Starting to fetch videos from API...');
        
        // Fetch videos from API
        const apiVideos = await getCostechVideos();
        
        console.log('📊 PublicationVideoPage: Received videos from API:', apiVideos);
        
        if (apiVideos && apiVideos.length > 0) {
          console.log(`✅ PublicationVideoPage: Using ${apiVideos.length} videos from API`);
          setVideos(apiVideos);
        } else {
          console.warn('⚠️ PublicationVideoPage: API returned empty array, using static data');
          setVideos(fallbackVideos);
        }
      } catch (err) {
        console.error('❌ PublicationVideoPage: Error fetching videos:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        console.warn('⚠️ PublicationVideoPage: Falling back to static data due to error');
        setVideos(fallbackVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    if (video.video_link && video.video_link !== '#') {
      window.open(video.video_link, '_blank');
    }
  };

  return (
    <section className="publication-video-page">
      <div className="publication-video-hero">
        <div className="publication-video-hero-overlay" />
        <div className="publication-video-hero-content">
          <h1>COSTECH Videos</h1>
          <p>
            Watch our latest videos featuring important events, research programs, and technology
            development updates from COSTECH and its partners.
          </p>
        </div>
      </div>

      <div className="publication-video-body">
        {loading ? (
          <div className="publication-video-loading">
            <p>Loading videos...</p>
          </div>
        ) : error && videos.length === 0 ? (
          <div className="publication-video-error">
            <p>Unable to load videos. Please try again later.</p>
          </div>
        ) : (
          <div className="publication-video-carousel-wrapper">
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
              pauseOnHover={true}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]}
            >
              {videos.map((video) => {
                const videoId = getYouTubeVideoId(video.video_link);
                const thumbnail = getYouTubeThumbnail(videoId);
                
                return (
                  <div key={video.id} className="publication-video-card-wrapper">
                    <div
                      className="publication-video-card"
                      onClick={() => handleVideoClick(video)}
                    >
                      <div className="publication-video-image-container">
                        <img 
                          src={thumbnail} 
                          alt={video.title || 'Video'}
                          className="publication-video-image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/assets/img/hero2.jpeg';
                          }}
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
                      <div className="publication-video-content">
                        <p className="publication-video-title">
                          {video.title || 'COSTECH Video'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default PublicationVideoPage;

