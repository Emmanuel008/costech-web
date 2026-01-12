import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/pages/HeroDetailPage.css';
import { getHero } from '../services/api';

const HeroDetailPage = () => {
  const { id } = useParams();
  const [heroItem, setHeroItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
        
        let heroData = [];
        try {
          heroData = await getHero();
        } catch (err) {
          console.warn('Failed to fetch hero from API, using default slides:', err);
        }
        
        // Use API data if available, otherwise use default slides
        const allHeroData = heroData && heroData.length > 0 ? heroData : defaultSlides;
        
        if (allHeroData && allHeroData.length > 0) {
          // Try to find by ID first
          let item = allHeroData.find(h => 
            (h.id && h.id.toString() === id) || 
            (h.hero_id && h.hero_id.toString() === id)
          );
          
          // If not found by ID, try by index (for index-based navigation like /hero/0)
          if (!item && !isNaN(id)) {
            const index = parseInt(id, 10);
            if (index >= 0 && index < allHeroData.length) {
              item = allHeroData[index];
            }
          }
          
          if (item) {
            setHeroItem(item);
          } else {
            setError('Hero item not found');
          }
        } else {
          setError('No hero data available');
        }
      } catch (err) {
        console.error('Error fetching hero detail:', err);
        setError('Failed to load hero information');
      } finally {
        setLoading(false);
      }
    };

    if (id !== undefined && id !== null) {
      fetchHeroDetail();
    }
  }, [id]);

  // Get image URL from hero item
  const getImageUrl = (item) => {
    if (item?.image_url) return item.image_url;
    if (item?.image) return item.image;
    if (item?.background_image) return item.background_image;
    return `${process.env.PUBLIC_URL}/assets/img/hero.jpg`;
  };

  // Get title from hero item
  const getTitle = (item) => {
    return item?.title || item?.heading || item?.name || 'Hero Information';
  };

  // Get description from hero item
  const getDescription = (item) => {
    return item?.description || item?.desc || item?.text || '';
  };

  // Get date from hero item
  const getDate = (item) => {
    if (item?.date) {
      // If date is already a string, return it
      if (typeof item.date === 'string') {
        return item.date;
      }
      // If it's a Date object, format it
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    if (item?.created_at) {
      const date = new Date(item.created_at);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get content from hero item (full content)
  const getContent = (item) => {
    return item?.content || item?.full_content || item?.body || getDescription(item);
  };

  if (loading) {
    return (
      <section className="hero-detail-section">
        <div className="hero-detail-container">
          <div className="hero-detail-loading">Loading...</div>
        </div>
      </section>
    );
  }

  if (error || !heroItem) {
    return (
      <section className="hero-detail-section">
        <div className="hero-detail-container">
          <div className="hero-detail-error">
            <p>{error || 'Hero item not found'}</p>
            <Link to="/" className="hero-detail-back-btn">← Back to Home</Link>
          </div>
        </div>
      </section>
    );
  }

  const imageUrl = getImageUrl(heroItem);
  const title = getTitle(heroItem);
  const description = getDescription(heroItem);
  const date = getDate(heroItem);
  const content = getContent(heroItem);

  return (
    <section className="hero-detail-section">
      <div className="hero-detail-container">
        <div className="hero-detail-card">
          <div className="hero-detail-meta">
            <span className="hero-detail-date">{typeof date === 'string' ? date.toUpperCase() : date}</span>
          </div>
          
          <h1 className="hero-detail-title">{title}</h1>
          
          {imageUrl && (
            <div className="hero-detail-image-container">
              <img
                src={imageUrl}
                alt={title}
                className="hero-detail-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = `${process.env.PUBLIC_URL}/assets/img/hero.jpg`;
                }}
              />
            </div>
          )}
          
          <div className="hero-detail-content">
            {description && (
              <p className="hero-detail-description">{description}</p>
            )}
            
            {content && content !== description && (
              <div className="hero-detail-body">
                {typeof content === 'string' ? (
                  <p>{content}</p>
                ) : Array.isArray(content) ? (
                  content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{String(content)}</p>
                )}
              </div>
            )}
          </div>
          
          <div className="hero-detail-actions">
            <Link to="/" className="hero-detail-back-btn">← Back to Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDetailPage;

