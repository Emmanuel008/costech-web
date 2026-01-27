import React, { useState, useEffect } from 'react';
import { getFAQs } from '../services/api';
import '../styles/pages/FAQsPage.css';

const FAQsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqsByCategory, setFaqsByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);

        const faqData = await getFAQs();

        if (faqData && faqData.length > 0) {
          // Transform API data to component format
          const transformedData = {};
          const categoryList = [];

          faqData.forEach((categoryItem) => {
            const categoryName = categoryItem.faq_category || '';
            const categoryKey = categoryName.toLowerCase();

            if (categoryItem.faqs && categoryItem.faqs.length > 0) {
              // Transform FAQs to match component format
              const transformedFAQs = categoryItem.faqs.map((faq, index) => ({
                id: `faq-${faq.id || index}`,
                question: faq.question || '',
                answer: faq.answer || '',
              }));

              // If category already exists, merge FAQs
              if (transformedData[categoryKey]) {
                transformedData[categoryKey] = [
                  ...transformedData[categoryKey],
                  ...transformedFAQs,
                ];
              } else {
                transformedData[categoryKey] = transformedFAQs;
                categoryList.push({
                  id: categoryKey,
                  name: categoryName,
                });
              }
            }
          });

          setFaqsByCategory(transformedData);
          setCategories(categoryList);

          // Set first category as active if available
          if (categoryList.length > 0) {
            setActiveCategory(categoryList[0].id);
          }
        } else {
          setFaqsByCategory({});
          setCategories([]);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
        setFaqsByCategory({});
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  // Format answer text to handle bullet points
  const formatAnswer = (answer) => {
    return answer.split('\n').map((line, index) => {
      if (line.trim().startsWith('•')) {
        return (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      );
    });
  };

  const currentFAQs = activeCategory ? (faqsByCategory[activeCategory] || []) : [];

  if (loading) {
    return (
      <section className="faqs-page">
        <div className="faqs-hero">
          <div className="faqs-hero-overlay" />
          <div className="faqs-hero-content">
            <h1>Frequently Asked Questions (FAQs)</h1>
            <p>The COSTECH FAQs page offers quick answers to common questions about COSTECH services, including research permits, innovation support, funding, and registration, helping users easily understand processes and requirements.</p>
          </div>
        </div>
        <div className="faqs-body">
          <div className="faqs-content">
            <div className="faqs-loading">
              <p>Loading FAQs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="faqs-page">
        <div className="faqs-hero">
          <div className="faqs-hero-overlay" />
          <div className="faqs-hero-content">
            <h1>Frequently Asked Questions (FAQs)</h1>
            <p>The COSTECH FAQs page offers quick answers to common questions about COSTECH services, including research permits, innovation support, funding, and registration, helping users easily understand processes and requirements.</p>
          </div>
        </div>
        <div className="faqs-body">
          <div className="faqs-content">
            <div className="faqs-error">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="faqs-page">
      <div className="faqs-hero">
        <div className="faqs-hero-overlay" />
        <div className="faqs-hero-content">
          <h1>Frequently Asked Questions (FAQs)</h1>
          <p>The COSTECH FAQs page offers quick answers to common questions about COSTECH services, including research permits, innovation support, funding, and registration, helping users easily understand processes and requirements.</p>
        </div>
      </div>
      <div className="faqs-body">
        <div className="faqs-content">
          {/* Category Tabs */}
          {categories.length > 0 && (
          <div className="faqs-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`faqs-category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenQuestion(null); // Close any open questions when switching categories
                }}
              >
                <span className="faqs-category-name">{category.name}</span>
              </button>
            ))}
        </div>
          )}

          {/* FAQs List */}
                <div className="faqs-questions">
            {currentFAQs.length > 0 ? (
              currentFAQs.map((faq) => (
                    <div key={faq.id} className="faqs-question-item">
                      <button
                        className={`faqs-question-header ${openQuestion === faq.id ? 'active' : ''}`}
                        onClick={() => toggleQuestion(faq.id)}
                      >
                    <span className="faqs-question-text">
                      <span className="faqs-question-number">{faq.question}</span>
                    </span>
                        <span className="faqs-question-toggle">
                          {openQuestion === faq.id ? '−' : '+'}
                        </span>
                      </button>
                      {openQuestion === faq.id && (
                        <div className="faqs-answer">
                      <p>{formatAnswer(faq.answer)}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="faqs-empty-state">
                <p>No FAQs available for this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsPage;
