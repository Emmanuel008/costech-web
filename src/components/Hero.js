import React, { useState, useEffect } from 'react';
import './Hero.css';
import BlurText from './BlurText';
import RotatingText from './RotatingText';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  const heroImageStyle = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/assets/img/hero.jpg')`,
  };

  const heroImageStyle2 = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/assets/img/hero2.jpeg')`,
  };

  const handleAnimationComplete = () => {
    // Animation completed
  };

  const rotatingWords = ['Innovation', 'Technology', 'Science', 'Research'];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero">
      <div className="hero-carousel">
        {/* Slide 1 - Original Design */}
        <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`}>
          {/* Abstract Background Shapes */}
          <div className="hero-abstract-shapes">
            <div className="hero-shape-circle hero-shape-1"></div>
            <div className="hero-shape-circle hero-shape-2"></div>
            <div className="hero-shape-circle hero-shape-3"></div>
            <div className="hero-shape-circle hero-shape-4"></div>
            <div className="hero-shape-dots"></div>
            <div className="hero-shape-hexagon"></div>
            <div className="hero-shape-network"></div>
      </div>
      
      <div className="hero-content">
            {/* Left Side - Text Section */}
            <div className="hero-text-section">
              <div className="hero-yellow-bar"></div>
              <div className="hero-text-content">
          <h1 className="hero-title">
                  <BlurText
                    text="Advancing"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className=""
                  />{' '}
                  <RotatingText
                    words={rotatingWords}
                    interval={2000}
                    className="rotating-text"
                    animationType="fade"
                  />{' '}
                  <BlurText
                    text="and Technology"
                    delay={300}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className=""
                  />
                  <br />
                  <BlurText
                    text="for Tanzania's Future"
                    delay={600}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className=""
                  />
                </h1>
                <p className="hero-description">
                  COSTECH is committed to coordinate, promote and facilitate science, technology and innovation in the country by meeting legal and customer requirements and even exceeding customer expectations.
                </p>
                <div className="hero-underline"></div>
              </div>
            </div>

            {/* Right Side - Circular Image Section */}
            <div className="hero-image-section">
              <div className="hero-circular-frame">
                <div className="hero-circular-outer"></div>
                <div className="hero-circular-inner">
                  <div className="hero-image-container" style={heroImageStyle}></div>
                </div>
              </div>
              
              {/* Floating Icons */}
              <div className="hero-floating-icon hero-icon-1">
                <div className="hero-icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    <path d="M8 7h8M8 11h8M8 15h4"/>
                  </svg>
                </div>
                <div className="hero-icon-connector"></div>
              </div>
              
              <div className="hero-floating-icon hero-icon-2">
                <div className="hero-icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
              </div>
              
              <div className="hero-floating-icon hero-icon-3">
                <div className="hero-icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div className="hero-icon-connector"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - New Design with Split Layout */}
        <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`}>
          {/* Abstract Background Shapes for Slide 2 */}
          <div className="hero-abstract-shapes hero-abstract-shapes-2">
            <div className="hero-shape-x hero-shape-x-1">✕</div>
            <div className="hero-shape-x hero-shape-x-2">✕</div>
            <div className="hero-shape-x hero-shape-x-3">✕</div>
            <div className="hero-shape-x hero-shape-x-4">✕</div>
            <div className="hero-shape-network-2"></div>
            <div className="hero-shape-hexagon-2 hero-hex-1"></div>
            <div className="hero-shape-hexagon-2 hero-hex-2"></div>
            <div className="hero-shape-wave"></div>
          </div>

          <div className="hero-content hero-content-2">
            {/* Left Side - Text Section */}
            <div className="hero-text-section-2">
              <h1 className="hero-title-2">
                Foreign Awards
            <br />
                Assessment System{' '}
                <span className="hero-badge">(FAAS)</span>
          </h1>
              <div className="hero-description-wrapper">
                <div className="hero-yellow-bar-2"></div>
                <p className="hero-description-2">
                  An online platform for the evaluation of foreign awards and recognition of qualifications.
                </p>
              </div>
            </div>

            {/* Right Side - Photo with Frame */}
            <div className="hero-image-section-2">
              <div className="hero-photo-frame">
                <div className="hero-photo-overlay hero-overlay-orange"></div>
                <div className="hero-photo-overlay hero-overlay-green"></div>
                <div className="hero-photo-container" style={heroImageStyle2}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="hero-slide-indicators">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

