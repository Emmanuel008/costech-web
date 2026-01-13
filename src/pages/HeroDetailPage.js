import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/pages/HeroDetailPage.css';
import { getHero } from '../services/api';

const HeroDetailPage = () => {
  const { id } = useParams();
  const [heroItem, setHeroItem] = useState(null);
  const [relatedHeroItems, setRelatedHeroItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const heroData = await getHero();
        
        if (heroData && heroData.length > 0) {
          // Try to find by ID first
          let item = heroData.find(h => 
            (h.id && h.id.toString() === id) || 
            (h.hero_id && h.hero_id.toString() === id)
          );
          
          // If not found by ID, try by index (for index-based navigation like /hero/0)
          if (!item && !isNaN(id)) {
            const index = parseInt(id, 10);
            if (index >= 0 && index < heroData.length) {
              item = heroData[index];
            }
          }
          
          if (item) {
            setHeroItem(item);
            
            // Get related hero items (exclude current item)
            // Use index if navigation was by index, otherwise use ID
            let currentIndex = -1;
            if (!isNaN(id)) {
              currentIndex = parseInt(id, 10);
            } else {
              currentIndex = heroData.findIndex(h => 
                (h.id && h.id.toString() === id) || 
                (h.hero_id && h.hero_id.toString() === id)
              );
            }
            
            const related = heroData
              .filter((h, index) => index !== currentIndex)
              .slice(0, 4)
              .map((h, index) => ({
                id: h.id || h.hero_id || index,
                title: h.title || h.heading || h.name || 'Untitled',
                image: h.image_url || h.image || h.background_image || '',
                slug: h.id || h.hero_id || index,
              }));
            setRelatedHeroItems(related);
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
    return '';
  };

  // Get title from hero item
  const getTitle = (item) => {
    return item?.title || item?.heading || item?.name || 'Hero Information';
  };

  // Get content from hero item (full content)
  const getContent = (item) => {
    return item?.content || item?.full_content || item?.body || '';
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
  const content = getContent(heroItem);

  return (
    <section className="hero-detail-section">
      <div className="hero-detail-container">
        <div className="hero-detail-main">
          <article className="hero-detail-card">
            <h1 className="hero-detail-title">{title}</h1>
            
            {imageUrl && (
              <div className="hero-detail-image-container">
                <img
                  src={imageUrl}
                  alt={title}
                  className="hero-detail-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="hero-detail-content">
              {content && (
                <div className="hero-detail-body">
                  {typeof content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
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
          </article>
        </div>
        
        {relatedHeroItems.length > 0 && (
          <aside className="hero-detail-sidebar">
            <div className="hero-related-card">
              <h2>Related</h2>
              <ul className="hero-related-list">
                {relatedHeroItems.map((item) => (
                  <li key={item.id} className="hero-related-item">
                    <Link to={`/hero/${item.slug}`} className="hero-related-link">
                      {item.image && (
                        <div className="hero-related-thumb">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="hero-related-info">
                        <h3>{item.title}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
};

export default HeroDetailPage;

