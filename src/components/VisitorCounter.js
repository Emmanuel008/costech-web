import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/components/VisitorCounter.css';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: '-50px' });

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        const namespace = 'costech-or-tz';
        const key = 'website-visits';
        const alreadyCounted = sessionStorage.getItem('costech_visitor_counted');

        if (!alreadyCounted) {
          // Increment (hit) the counter
          const response = await fetch(
            `https://api.countapi.xyz/hit/${namespace}/${key}`
          );
          if (response.ok) {
            const data = await response.json();
            setCount(data.value);
            localStorage.setItem('costech_visitor_count', data.value);
            sessionStorage.setItem('costech_visitor_counted', 'true');
          } else {
            throw new Error('CountAPI unavailable');
          }
        } else {
          // Already counted this session, just get current value
          const response = await fetch(
            `https://api.countapi.xyz/get/${namespace}/${key}`
          );
          if (response.ok) {
            const data = await response.json();
            setCount(data.value);
            localStorage.setItem('costech_visitor_count', data.value);
          } else {
            throw new Error('CountAPI unavailable');
          }
        }
      } catch (error) {
        console.warn('Visitor counter fallback to localStorage:', error.message);
        // Fallback to localStorage
        const stored = parseInt(localStorage.getItem('costech_visitor_count') || '0', 10);
        const alreadyCounted = sessionStorage.getItem('costech_visitor_counted');
        if (!alreadyCounted) {
          const newCount = stored + 1;
          localStorage.setItem('costech_visitor_count', newCount);
          sessionStorage.setItem('costech_visitor_counted', 'true');
          setCount(newCount);
        } else {
          setCount(stored);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndIncrement();
  }, []);

  // Animate the count number when in view
  useEffect(() => {
    if (count === null || !isInView) return;

    const duration = 1500; // ms
    const startTime = performance.now();
    const startVal = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startVal + (count - startVal) * eased);
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayCount(count);
      }
    };

    requestAnimationFrame(animate);
  }, [count, isInView]);

  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  const digits = formatNumber(displayCount).split('');

  return (
    <motion.div
      ref={counterRef}
      className="visitor-counter"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="visitor-counter-inner">
        <div className="visitor-counter-icon">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div className="visitor-counter-content">
          <span className="visitor-counter-label">Total Visitors</span>
          <div className="visitor-counter-digits" aria-live="polite">
            {loading ? (
              <span className="visitor-counter-loading">
                <span className="visitor-dot"></span>
                <span className="visitor-dot"></span>
                <span className="visitor-dot"></span>
              </span>
            ) : (
              digits.map((digit, index) => (
                <motion.span
                  key={`${index}-${digit}`}
                  className={`visitor-digit ${digit === ',' ? 'visitor-separator' : ''}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  {digit}
                </motion.span>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
