import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/News.css';
import { getNewsList, generateSlug, formatDate } from '../services/api';

const News = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        // Fetch news from API
        const apiNews = await getNewsList();
        
        
        if (apiNews && apiNews.length > 0) {
          
          // Map API data to component structure
          const mappedNews = apiNews.slice(0, 4).map((item) => {
            // Handle image URL - if relative, prepend base URL
            let imageUrl = item.image || '';
            if (item.image && !item.image.startsWith('http') && !item.image.startsWith('/')) {
              imageUrl = `https://costech.kingdomsolutions.co.tz/${item.image}`;
            } else if (item.image && item.image.startsWith('http')) {
              imageUrl = item.image;
            }
            
            return {
              id: item.id,
              slug: generateSlug(item.title),
              image: imageUrl,
              title: item.title || 'Untitled News',
              date: formatDate(item.created_at || item.date || item.createdAt || null),
              summary: item.content ? (typeof item.content === 'string' ? item.content.substring(0, 150) + '...' : null) : null,
              content: item.content ? (Array.isArray(item.content) ? item.content : [item.content]) : [],
            };
          });
          
          setFeaturedNews(mappedNews);
        } else {
          setFeaturedNews([]);
        }
      } catch (err) {
        console.error('News component: Error fetching news:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        setFeaturedNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const backgroundStyle = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/assets/img/emblem.webp')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '400px auto',
    backgroundAttachment: 'fixed',
  };

  return (
    <section className="news-section news-section-homepage" style={backgroundStyle}>
      <div className="news-container">
        <div className="news-header">
          <h2 className="news-section-title">News</h2>
          <Link to="/media/news" className="news-view-all-link">View All</Link>
        </div>
        {loading ? (
          <div className="news-loading">
            <p>Loading news...</p>
          </div>
        ) : error && featuredNews.length === 0 ? (
          <div className="news-error">
            <p>Unable to load news. Please try again later.</p>
          </div>
        ) : (
          <div className="news-cards">
            {featuredNews.map((item) => (
              <div key={item.id} className="news-card news-card-link">
                <Link to={`/news/${item.slug}`} className="news-card-anchor">
                  <div className="news-image-container">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="news-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="news-content">
                    <p className="news-date">{item.date}</p>
                    <h3 className="news-title">{item.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;

