import React from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import { newsItems } from '../data/newsItems';

const News = () => {
  const featuredNews = newsItems.slice(0, 4);

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
                  <p className="news-date">{item.date}</p>
                  <h3 className="news-title">{item.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;

