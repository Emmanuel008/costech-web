import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsItems } from '../data/newsItems';
import '../styles/pages/NewsDetailPage.css';
import { getNewsList, getNewsById, generateSlug, formatDate } from '../services/api';

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
        
        
        // First, fetch all news to find the item and get related news
        const apiNews = await getNewsList();
        
        
        if (apiNews && apiNews.length > 0) {
            // Map API data to component structure for finding the item
          const mappedNews = apiNews.map((item) => {
            // Handle image URL - if relative, prepend base URL
            let imageUrl = item.image || '/assets/img/miradi.jpg';
            if (item.image && !item.image.startsWith('http') && !item.image.startsWith('/')) {
              imageUrl = `https://costech.kingdomsolutions.co.tz/${item.image}`;
            } else if (item.image && item.image.startsWith('http')) {
              imageUrl = item.image;
            }
            
            // Check for content in various possible fields
            const content = item.content || item.description || item.body || item.text || item.article || null;
            
            return {
              id: item.id,
              slug: generateSlug(item.title),
              image: imageUrl,
              title: item.title || 'Untitled News',
              date: formatDate(item.created_at || item.date || item.createdAt || null),
              summary: content ? (typeof content === 'string' ? content.substring(0, 150) + '...' : null) : null,
              content: content ? (Array.isArray(content) ? content : [content]) : [],
            };
          });
          
          // Find the current news item by slug or ID
          const foundItem = mappedNews.find((item) => item.slug === slug || String(item.id) === slug);
          
          if (foundItem) {
            
            // Try to fetch full details with content by ID
            try {
              const fullDetails = await getNewsById(foundItem.id);
              
              
              if (fullDetails) {
                // Check for content in various possible fields (try multiple field names)
                const fullContent = fullDetails.content || 
                                   fullDetails.description || 
                                   fullDetails.body || 
                                   fullDetails.text || 
                                   fullDetails.article ||
                                   fullDetails.details ||
                                   fullDetails.full_content ||
                                   fullDetails.fullContent ||
                                   null;
                
                
                if (fullContent) {
                  // Use the full details with content
                  let contentArray = [];
                  if (Array.isArray(fullContent)) {
                    contentArray = fullContent;
                  } else if (typeof fullContent === 'string') {
                    // Split by double newlines to create paragraphs, but preserve HTML if present
                    if (fullContent.includes('<p>') || fullContent.includes('<div>')) {
                      // If it's HTML, keep as single item
                      contentArray = [fullContent];
                    } else {
                      // Split by double newlines to create paragraphs
                      contentArray = fullContent.split(/\n\n+/).filter(p => p.trim().length > 0);
                      if (contentArray.length === 0) {
                        contentArray = [fullContent];
                      }
                    }
                  }
                  
                  // Handle image URL for full details
                  let imageUrl = fullDetails.image || foundItem.image || '/assets/img/miradi.jpg';
                  if (fullDetails.image && !fullDetails.image.startsWith('http') && !fullDetails.image.startsWith('/')) {
                    imageUrl = `https://costech.kingdomsolutions.co.tz/${fullDetails.image}`;
                  } else if (fullDetails.image && fullDetails.image.startsWith('http')) {
                    imageUrl = fullDetails.image;
                  }
                  
                  const newsItemWithContent = {
                    ...foundItem,
                    content: contentArray.length > 0 ? contentArray : foundItem.content,
                    image: imageUrl,
                    title: fullDetails.title || foundItem.title,
                    date: formatDate(fullDetails.created_at || fullDetails.date || fullDetails.createdAt || foundItem.date),
                  };
                  
                  setNewsItem(newsItemWithContent);
                } else {
                  // Check if content exists in the list item
                  if (foundItem.content && foundItem.content.length > 0) {
                    setNewsItem(foundItem);
                  } else {
                    setNewsItem(foundItem);
                  }
                }
              } else {
                // Use the item from list if detail endpoint returns null
                setNewsItem(foundItem);
              }
            } catch (detailErr) {
              console.warn('NewsDetailPage: Could not fetch detail, using list item:', detailErr);
              console.warn('Error details:', detailErr.message);
              // Use the item from list if detail fetch fails
              setNewsItem(foundItem);
            }
            
            // Get related news (exclude current item)
            const related = mappedNews
              .filter((item) => item.id !== foundItem.id)
              .slice(0, 4);
            setRelatedNews(related);
          } else {
            console.warn('NewsDetailPage: News item not found in API data, trying static data');
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
          console.warn('NewsDetailPage: API returned empty array, using static data');
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
        console.error('NewsDetailPage: Error fetching news:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        setError(err.message);
        
        // Fallback to static data on error
        console.warn('NewsDetailPage: Falling back to static data due to error');
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
                newsItem.content.map((paragraph, index) => {
                  // Handle both string paragraphs and HTML content
                  if (typeof paragraph === 'string') {
                    // Check if content contains HTML tags
                    if (paragraph.includes('<') && paragraph.includes('>')) {
                      // Render HTML content
                      return (
                        <div 
                          key={index} 
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                          className="news-detail-html-content"
                        />
                      );
                    } else {
                      // Render plain text as paragraph
                      return <p key={index}>{paragraph}</p>;
                    }
                  } else {
                    return <p key={index}>{String(paragraph)}</p>;
                  }
                })
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


