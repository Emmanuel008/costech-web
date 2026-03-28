import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsItems } from '../data/newsItems';
import '../styles/pages/NewsDetailPage.css';
import { getNewsList, getNewsById, generateSlug, formatDate } from '../services/api';

const FALLBACK_IMAGE = '/assets/img/miradi.jpg';
const API_ASSET_BASE_URL = 'https://costech.kingdomsolutions.co.tz/';

const normalizeImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') {
    return '';
  }

  const trimmedPath = imagePath.trim();
  if (!trimmedPath) {
    return '';
  }

  if (trimmedPath.startsWith('http') || trimmedPath.startsWith('/')) {
    return trimmedPath;
  }

  return `${API_ASSET_BASE_URL}${trimmedPath}`;
};

const toImageString = (value) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'object') {
    const objectPath = value.image || value.path || value.url || value.src || '';
    return typeof objectPath === 'string' ? objectPath.trim() : '';
  }

  return '';
};

const extractOtherImages = (otherImageField) => {
  if (!otherImageField) {
    return [];
  }

  if (Array.isArray(otherImageField)) {
    return otherImageField
      .map((value) => toImageString(value))
      .filter(Boolean);
  }

  if (typeof otherImageField === 'string') {
    const trimmed = otherImageField.trim();
    if (!trimmed) {
      return [];
    }

    // Handle JSON-encoded arrays like ["a.jpg","b.jpg"].
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed)
          ? parsed.map((value) => toImageString(value)).filter(Boolean)
          : [];
      } catch (e) {
        return [];
      }
    }

    return trimmed
      .split(',')
      .map((value) => toImageString(value))
      .filter(Boolean);
  }

  if (typeof otherImageField === 'object') {
    const oneImage = toImageString(otherImageField);
    return oneImage ? [oneImage] : [];
  }

  return [];
};

const getOtherImagesFromItem = (item) => {
  if (!item || typeof item !== 'object') {
    return [];
  }

  return [
    ...extractOtherImages(item.other_image),
    ...extractOtherImages(item.otherImages),
    ...extractOtherImages(item.otherImage),
    ...extractOtherImages(item['other image']),
  ];
};

const NewsDetailPage = () => {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
            const imageUrl = normalizeImageUrl(item.image) || FALLBACK_IMAGE;
            const additionalImages = getOtherImagesFromItem(item)
              .map((img) => normalizeImageUrl(img))
              .filter(Boolean);
            const gallery = [...new Set([imageUrl, ...additionalImages])];
            
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
              gallery,
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
                  
                  const imageUrl = normalizeImageUrl(fullDetails.image) || foundItem.image || FALLBACK_IMAGE;
                  const detailOtherImages = getOtherImagesFromItem(fullDetails)
                    .map((img) => normalizeImageUrl(img))
                    .filter(Boolean);
                  const mergedGallery = [...new Set([imageUrl, ...(foundItem.gallery || []), ...detailOtherImages])];
                  
                  const newsItemWithContent = {
                    ...foundItem,
                    content: contentArray.length > 0 ? contentArray : foundItem.content,
                    image: imageUrl,
                    title: fullDetails.title || foundItem.title,
                    date: formatDate(fullDetails.created_at || fullDetails.date || fullDetails.createdAt || foundItem.date),
                    gallery: mergedGallery.length > 0 ? mergedGallery : (foundItem.gallery || [imageUrl]),
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

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [newsItem?.id]);

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

  const imageGallery = (newsItem.gallery && newsItem.gallery.length > 0)
    ? newsItem.gallery
    : [newsItem.image || FALLBACK_IMAGE];
  const hasMultipleImages = imageGallery.length > 1;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.length);
  };

  return (
    <section className="news-detail-section">
      <div className="news-detail-container">
        <div className="news-detail-main">
          <article className="news-detail-card">
            <div className="news-detail-meta">
              <span className="news-detail-date">{newsItem.date}</span>
            </div>
            <h1 className="news-detail-title">{newsItem.title}</h1>
            {imageGallery.length > 0 && (
            <div className="news-detail-hero">
              <img
                src={imageGallery[currentImageIndex]}
                alt={newsItem.title}
                className="news-detail-image"
                loading="lazy"
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
              />
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    className="news-detail-carousel-btn news-detail-carousel-btn-prev"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    &#10094;
                  </button>
                  <button
                    type="button"
                    className="news-detail-carousel-btn news-detail-carousel-btn-next"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    &#10095;
                  </button>
                  <div className="news-detail-carousel-dots">
                    {imageGallery.map((image, index) => (
                      <button
                        type="button"
                        key={`${image}-${index}`}
                        className={`news-detail-carousel-dot ${currentImageIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
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


