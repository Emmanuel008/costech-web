import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsItems } from '../data/newsItems';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const newsItem = newsItems.find((item) => item.slug === slug || String(item.id) === slug);

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
            <Link to="/news" className="news-detail-back-btn">
              Rudi kwenye kurasa ya Habari
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedNews = newsItems
    .filter((item) => item.id !== newsItem.id)
    .slice(0, 4);

  return (
    <section className="news-detail-section">
      <div className="news-detail-container">
        <div className="news-detail-main">
          <article className="news-detail-card">
            <div className="news-detail-meta">
              <span className="news-detail-date">{newsItem.date}</span>
            </div>
            <h1 className="news-detail-title">{newsItem.title}</h1>
            <div className="news-detail-hero">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="news-detail-image"
                loading="lazy"
              />
            </div>
            <div className="news-detail-content">
              {newsItem.content?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
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


