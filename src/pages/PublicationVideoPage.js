import React from 'react';
import LatestVideo from '../components/LatestVideo';
import './PublicationVideoPage.css';

const PublicationVideoPage = () => {
  return (
    <div className="publication-video-page">
      <div className="publication-video-hero">
        <div className="publication-video-hero-content">
          <h1>Publication Videos</h1>
          <p>
            Watch our latest videos featuring important events, research programs, and technology
            development updates from COSTECH and its partners.
          </p>
        </div>
      </div>
      <LatestVideo />
    </div>
  );
};

export default PublicationVideoPage;

