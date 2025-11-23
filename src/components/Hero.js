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

  const handleAnimationComplete = () => {};

  const rotatingWords = ['Innovation', 'Technology', 'Science', 'Research'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero">
      <div className="hero-carousel">
        {/* Slide 1 */}
        <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`} style={heroImageStyle}>
          <div className="hero-slide-overlay"></div>
      <div className="hero-content">
            <div className="hero-content-card">
              <div className="hero-badge-tag">COSTECH</div>
          <h1 className="hero-title">
                  <BlurText
                    text="Advancing"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
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
                  />
                  <br />
                  <BlurText
                    text="for Tanzania's Future"
                    delay={600}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                  />
                </h1>
                <p className="hero-description">
                  COSTECH is committed to coordinate, promote and facilitate science, technology and innovation in the country by meeting legal and customer requirements and even exceeding customer expectations.
                </p>
              <div className="hero-cta-buttons">
                <button className="hero-btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`} style={heroImageStyle2}>
          <div className="hero-slide-overlay"></div>
          <div className="hero-content">
            <div className="hero-content-card">
              <div className="hero-badge-tag">FAAS Platform</div>
              <h1 className="hero-title">
                Foreign Awards
            <br />
                Assessment System
          </h1>
              <p className="hero-description">
                An online platform for the evaluation of foreign awards and recognition of qualifications. Streamline your credential verification process with our comprehensive assessment system.
              </p>
              <div className="hero-cta-buttons">
                <button className="hero-btn-primary">Learn More</button>
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
