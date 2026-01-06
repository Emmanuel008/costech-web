import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsItems } from '../data/newsItems';
import '../styles/pages/NewsDetailPage.css';
import { getNewsList, generateSlug, formatDate } from '../services/api';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 NewsDetailPage: Starting to fetch news from API...');
        
        // Fetch news from API
        const apiNews = await getNewsList();
        
        console.log('📊 NewsDetailPage: Received news from API:', apiNews);
        
        if (apiNews && apiNews.length > 0) {
          console.log(`✅ NewsDetailPage: Using ${apiNews.length} items from API`);
          
          // Map API data to component structure
          const mappedNews = apiNews.map((item) => {
            // Handle content - could be string or array
            let contentArray = [];
            if (item.content) {
              if (Array.isArray(item.content)) {
                contentArray = item.content;
              } else if (typeof item.content === 'string') {
                // Split by newlines or paragraphs if needed
                // For now, treat as single paragraph
                contentArray = [item.content];
              }
            }
            
            return {
              id: item.id,
              slug: generateSlug(item.title),
              image: item.image || '/assets/img/miradi.jpg',
              title: item.title,
              date: formatDate(item.created_at || item.date),
              summary: item.content ? (typeof item.content === 'string' ? item.content.substring(0, 150) + '...' : null) : null,
              content: contentArray,
            };
          });
          
          // Find the current news item by slug
          const foundItem = mappedNews.find((item) => item.slug === slug || String(item.id) === slug);
          
          if (foundItem) {
            console.log('✅ NewsDetailPage: Found news item:', foundItem);
            setNewsItem(foundItem);
            
            // Get related news (exclude current item)
            const related = mappedNews
              .filter((item) => item.id !== foundItem.id)
              .slice(0, 4);
            setRelatedNews(related);
          } else {
            console.warn('⚠️ NewsDetailPage: News item not found in API data, trying static data');
            // Fallback to static data
            const staticItem = newsItems.find((item) => item.slug === slug || String(item.id) === slug);
            if (staticItem) {
              setNewsItem(staticItem);
              const related = newsItems
                .filter((item) => item.id !== staticItem.id)
                .slice(0, 4);
              setRelatedNews(related);
            } else {
              setError('News not found');
            }
          }
        } else {
          console.warn('⚠️ NewsDetailPage: API returned empty array, using static data');
          // Fallback to static data
          const staticItem = newsItems.find((item) => item.slug === slug || String(item.id) === slug);
          if (staticItem) {
            setNewsItem(staticItem);
            const related = newsItems
              .filter((item) => item.id !== staticItem.id)
              .slice(0, 4);
            setRelatedNews(related);
          } else {
            setError('News not found');
          }
        }
      } catch (err) {
        console.error('❌ NewsDetailPage: Error fetching news:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        
        // Fallback to static data on error
        console.warn('⚠️ NewsDetailPage: Falling back to static data due to error');
        const staticItem = newsItems.find((item) => item.slug === slug || String(item.id) === slug);
        if (staticItem) {
          setNewsItem(staticItem);
          const related = newsItems
            .filter((item) => item.id !== staticItem.id)
            .slice(0, 4);
          setRelatedNews(related);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug]);

  if (loading) {
    return (
      <section className="news-detail-section">
        <div className="news-detail-container">
          <div className="news-detail-card">
            <div className="news-loading">
              <p>Loading news...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && !newsItem) {
    return (
      <section className="news-detail-section">
        <div className="news-detail-container">
          <div className="news-detail-card">
            <h1 className="news-detail-title">News not found</h1>
            <p className="news-detail-summary">
              Samahani, taarifa uliyochagua haipatikani kwa sasa. Tafadhali rudi kwenye kurasa ya
              habari na ujaribu tena.
            </p>
            <Link to="/media/news" className="news-detail-back-btn">
              Rudi kwenye kurasa ya Habari
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!newsItem) {
    return (
      <section className="news-detail-section">
        <div className="news-detail-container">
          <div className="news-detail-card">
            <h1 className="news-detail-title">News not found</h1>
            <p className="news-detail-summary">
              Samahani, taarifa uliyochagua haipatikani kwa sasa. Tafadhali rudi kwenye kurasa ya
              habari na ujaribu tena.
            </p>
            <Link to="/media/news" className="news-detail-back-btn">
              Rudi kwenye kurasa ya Habari
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="news-detail-section">
      <div className="news-detail-container">
        <div className="news-detail-main">
          <article className="news-detail-card">
            <div className="news-detail-meta">
              <span className="news-detail-date">{newsItem.date}</span>
            </div>
            <h1 className="news-detail-title">{newsItem.title}</h1>
            {newsItem.image && (
              <div className="news-detail-hero">
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="news-detail-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/img/miradi.jpg';
                  }}
                />
              </div>
            )}
            <div className="news-detail-content">
              {newsItem.content && newsItem.content.length > 0 ? (
                newsItem.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>No content available for this news item.</p>
              )}
            </div>
          </article>
        </div>
        <aside className="news-detail-sidebar">
          <div className="news-related-card">
            <h2>Related News</h2>
            <ul className="news-related-list">
              {relatedNews.map((item) => (
                <li key={item.id} className="news-related-item">
                  <Link to={`/news/${item.slug}`} className="news-related-link">
                    <div className="news-related-thumb">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="news-related-info">
                      <h3>{item.title}</h3>
                      <span>{item.date}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default NewsDetailPage;


