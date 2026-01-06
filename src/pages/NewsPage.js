import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsItems } from '../data/newsItems';
import '../styles/components/News.css';
import { getNewsList, generateSlug, formatDate } from '../services/api';

const NewsPage = () => {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 NewsPage: Starting to fetch news from API...');
        
        // Fetch news from API
        const apiNews = await getNewsList();
        
        console.log('📊 NewsPage: Received news from API:', apiNews);
        
        if (apiNews && apiNews.length > 0) {
          console.log(`✅ NewsPage: Using ${apiNews.length} items from API`);
          
          // Map API data to component structure (show all items, not just 4)
          const mappedNews = apiNews.map((item) => ({
            id: item.id,
            slug: generateSlug(item.title),
            image: item.image || '/assets/img/miradi.jpg',
            title: item.title,
            date: formatDate(item.created_at || item.date),
            summary: item.content ? item.content.substring(0, 150) + '...' : null,
            content: item.content ? [item.content] : [],
          }));
          
          console.log('📝 NewsPage: Mapped news items:', mappedNews);
          setAllNews(mappedNews);
        } else {
          console.warn('⚠️ NewsPage: API returned empty array, using static data');
          // Fallback to static data if API returns empty
          setAllNews(newsItems);
        }
      } catch (err) {
        console.error('❌ NewsPage: Error fetching news:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        // Fallback to static data on error
        console.warn('⚠️ NewsPage: Falling back to static data due to error');
        setAllNews(newsItems);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="news-section news-page">
      <div className="news-container">
        <div className="news-page-header">
          <h1>News &amp; Updates</h1>
          <p>
            Fahamu matukio muhimu, programu za utafiti na taarifa za maendeleo ya teknolojia kutoka
            COSTECH na wadau wake nchini.
          </p>
        </div>

        {loading ? (
          <div className="news-loading">
            <p>Loading news...</p>
          </div>
        ) : error && allNews.length === 0 ? (
          <div className="news-error">
            <p>Unable to load news. Please try again later.</p>
          </div>
        ) : (
          <div className="news-page-grid">
            {allNews.map((item) => (
              <article key={item.id} className="news-card news-card-link">
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
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-date">{item.date}</p>
                    {item.summary && (
                      <p className="news-summary visible">
                        {item.summary}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsPage;


