import React, { useState, useEffect } from 'react';
import '../styles/components/Hero.css';
import BlurText from './BlurText';
import RotatingText from './RotatingText';
import { getHero } from '../services/api';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroItems, setHeroItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default hero slides as fallback
  const defaultSlides = [
    {
      id: 1,
      title: "Advancing Innovation and Technology for Tanzania's Future",
      description: "COSTECH is committed to coordinate, promote and facilitate science, technology and innovation in the country by meeting legal and customer requirements and even exceeding customer expectations.",
      badge: "COSTECH",
      image: `${process.env.PUBLIC_URL}/assets/img/hero.jpg`,
      rotatingWords: ['Innovation', 'Science', 'Research'],
      showRotatingText: true
    },
    {
      id: 2,
      title: "COSTECH Yasisitiza Ulinzi wa Bunifu Kabla ya Kubiasharisha",
      description: "COSTECH emphasizes the protection of innovation before commercialization to ensure intellectual property rights and support sustainable development.",
      badge: null,
      image: `${process.env.PUBLIC_URL}/assets/img/ubunifu.jpeg`,
      rotatingWords: null,
      showRotatingText: false
    }
  ];

  // Fetch hero data from API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        const data = await getHero();
        if (data && data.length > 0) {
          setHeroItems(data);
        } else {
          // Use default slides if API returns empty
          setHeroItems(defaultSlides);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        // Use default slides on error
        setHeroItems(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use API data or fallback to default slides
  const slides = heroItems.length > 0 ? heroItems : defaultSlides;
  const totalSlides = slides.length;

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      if (slide.image || slide.image_url) {
        const img = new Image();
        img.src = slide.image || slide.image_url;
      }
    });
  }, [slides]);

  const handleAnimationComplete = () => {};

  useEffect(() => {
    if (totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get image URL from hero item (handle various field names)
  const getImageUrl = (slide) => {
    if (slide.image_url) return slide.image_url;
    if (slide.image) return slide.image;
    if (slide.background_image) return slide.background_image;
    return `${process.env.PUBLIC_URL}/assets/img/hero.jpg`; // Default fallback
  };

  // Get title from hero item
  const getTitle = (slide) => {
    return slide.title || slide.heading || slide.name || '';
  };

  // Get description from hero item
  const getDescription = (slide) => {
    return slide.description || slide.desc || slide.text || '';
  };

  // Get badge from hero item
  const getBadge = (slide) => {
    return slide.badge || slide.tag || slide.label || null;
  };

  // Get rotating words if applicable
  const getRotatingWords = (slide) => {
    if (slide.rotating_words && Array.isArray(slide.rotating_words)) {
      return slide.rotating_words;
    }
    if (slide.rotatingWords && Array.isArray(slide.rotatingWords)) {
      return slide.rotatingWords;
    }
    return null;
  };

  // Check if rotating text should be shown
  const shouldShowRotatingText = (slide) => {
    return slide.show_rotating_text !== false && getRotatingWords(slide) !== null;
  };

  // Render title with optional rotating text
  const renderTitle = (slide, index) => {
    const title = getTitle(slide);
    const rotatingWords = getRotatingWords(slide);
    const showRotating = shouldShowRotatingText(slide);

    if (!showRotating || !rotatingWords) {
      // Simple title without rotating text
      const words = title.split(' ');
      return (
        <h1 className="hero-title">
          {words.map((word, i) => (
            <BlurText
              key={i}
              text={word + (i < words.length - 1 ? ' ' : '')}
              delay={150 + i * 100}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
            />
          ))}
        </h1>
      );
    }

    // Title with rotating text (similar to default slide 1)
    const titleParts = title.split(rotatingWords.join('|'));
    return (
      <h1 className="hero-title">
        {titleParts[0] && (
          <BlurText
            text={titleParts[0].trim()}
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
          />
        )}
        {' '}
        <RotatingText
          words={rotatingWords}
          interval={2000}
          className="rotating-text"
          animationType="fade"
        />
        {' '}
        {titleParts[1] && (
          <>
            <BlurText
              text={titleParts[1].trim()}
              delay={300}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
            />
          </>
        )}
      </h1>
    );
  };

  if (loading) {
    return (
      <section className="hero">
        <div className="hero-carousel">
          <div className="hero-slide active" style={{ backgroundImage: `url('${defaultSlides[0].image}')` }}>
            <div className="hero-content">
              <div className="hero-content-card">
                <h1 className="hero-title">Loading...</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero-carousel">
        {slides.map((slide, index) => {
          const imageUrl = getImageUrl(slide);
          const slideStyle = {
            backgroundImage: `url('${imageUrl}')`,
          };

          return (
            <div
              key={slide.id || slide.hero_id || index}
              className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
              style={slideStyle}
            >
              <div className="hero-content">
                <div className="hero-content-card">
                  {getBadge(slide) && (
                    <div className="hero-badge-tag">{getBadge(slide)}</div>
                  )}
                  {renderTitle(slide, index)}
                  <p className="hero-description">{getDescription(slide)}</p>
                  <div className="hero-cta-buttons">
                    {slide.button_text && (
                      <button className="hero-btn-primary">{slide.button_text}</button>
                    )}
                    {!slide.button_text && (
                      <button className="hero-btn-primary">Learn More</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      {totalSlides > 1 && (
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
      )}
    </section>
  );
};

export default Hero;
