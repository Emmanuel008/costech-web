import React from 'react';
import './SectionDivider.css';

const SectionDivider = () => {
  return (
    <div className="section-divider">
      <div className="divider-line"></div>
      <div className="divider-icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#b97c07" strokeWidth="2" fill="none"/>
          <path d="M15 20L18 23L25 16" stroke="#b97c07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="divider-line"></div>
    </div>
  );
};

export default SectionDivider;

