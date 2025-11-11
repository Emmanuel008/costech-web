import React from 'react';
import { Link } from 'react-router-dom';
import { newsItems } from '../data/newsItems';
import '../components/News.css';

const NewsPage = () => {
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

        <div className="news-page-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card news-card-link">
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
      </div>
    </section>
  );
};

export default NewsPage;


