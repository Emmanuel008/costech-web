import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/News.css';
import { newsItems } from '../data/newsItems';
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
        
        console.log('🔄 News component: Starting to fetch news from API...');
        
        // Fetch news from API
        const apiNews = await getNewsList();
        
        console.log('📊 News component: Received news from API:', apiNews);
        
        if (apiNews && apiNews.length > 0) {
          console.log(`✅ News component: Using ${apiNews.length} items from API`);
          
          // Map API data to component structure
          const mappedNews = apiNews.slice(0, 4).map((item) => ({
            id: item.id,
            slug: generateSlug(item.title),
            image: item.image || '/assets/img/miradi.jpg',
            title: item.title,
            date: formatDate(item.created_at || item.date),
            summary: item.content ? item.content.substring(0, 150) + '...' : null,
            content: item.content ? [item.content] : [],
          }));
          
          console.log('📝 News component: Mapped news items:', mappedNews);
          setFeaturedNews(mappedNews);
        } else {
          console.warn('⚠️ News component: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setFeaturedNews(newsItems.slice(0, 4));
        }
      } catch (err) {
        console.error('❌ News component: Error fetching news:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('⚠️ News component: Falling back to static data due to error');
        setFeaturedNews(newsItems.slice(0, 4));
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
                        e.target.src = '/assets/img/miradi.jpg';
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

