import React, { useState, useEffect } from 'react';

const RotatingText = ({
  words = [],
  interval = 2000,
  className = '',
  animationType = 'fade',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 300); // Half of transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  if (words.length === 0) return null;

  return (
    <span className={className} style={{ display: 'inline-block', position: 'relative' }}>
      <span
        style={{
          display: 'inline-block',
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating 
            ? (animationType === 'slide' ? 'translateY(20px)' : 'scale(0.8)')
            : 'translateY(0) scale(1)',
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};

export default RotatingText;

