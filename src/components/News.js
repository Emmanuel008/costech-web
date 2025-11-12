import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import { newsItems } from '../data/newsItems';

const News = () => {
  const featuredNews = newsItems.slice(0, 3);

  return (
    <section 
      className="news-section"
      style={{
        backgroundImage: `url('/assets/img/emblem.webp')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: '400px auto',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="news-container">
        <h2 className="news-section-title">News</h2>
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
                />
              </div>
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <p className="news-date">{item.date}</p>
              </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="news-button-container">
          <Link to="/media/news" className="news-view-more-btn">View More</Link>
        </div>
      </div>
    </section>
  );
};

export default News;

