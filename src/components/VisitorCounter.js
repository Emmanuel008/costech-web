import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/components/VisitorCounter.css';

const VisitorCounter = () => {
  const [counts, setCounts] = useState({
    month: null,
    today: null,
  });
  const [displayCounts, setDisplayCounts] = useState({
    month: 0,
    today: 0,
  });
  const [loading, setLoading] = useState(true);
  const [counterUnavailable, setCounterUnavailable] = useState(false);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: '-50px' });

  useEffect(() => {
    const getPeriodKeys = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');

      return {
        month: `${year}-${month}`,
        today: `${year}-${month}-${day}`,
      };
    };

    const getCachedCount = (storageKey) => {
      const stored = parseInt(localStorage.getItem(storageKey) || '', 10);
      return Number.isNaN(stored) ? null : stored;
    };

    const fetchAndIncrement = async () => {
      const namespace = 'costech-or-tz';
      const counterApiBaseUrl = 'https://api.counterapi.dev/v1';
      const periods = getPeriodKeys();
      const visitorPeriods = [
        {
          id: 'month',
          countKey: `website-visits-month-${periods.month}`,
          sessionKey: `costech_counterapi_visitor_counted_month_${periods.month}`,
          storageKey: `costech_counterapi_count_month_${periods.month}`,
        },
        {
          id: 'today',
          countKey: `website-visits-day-${periods.today}`,
          sessionKey: `costech_counterapi_visitor_counted_day_${periods.today}`,
          storageKey: `costech_counterapi_count_day_${periods.today}`,
        },
      ];

      try {
        const periodCounts = await Promise.all(
          visitorPeriods.map(async (period) => {
            const alreadyCounted = sessionStorage.getItem(period.sessionKey);
            const action = alreadyCounted ? '/' : '/up';
            const response = await fetch(
              `${counterApiBaseUrl}/${namespace}/${period.countKey}${action}`
            );

            if (!response.ok) {
              throw new Error('CounterAPI unavailable');
            }

            const data = await response.json();
            const count = data.count;

            if (typeof count !== 'number') {
              throw new Error('CounterAPI returned an invalid count');
            }

            localStorage.setItem(period.storageKey, count);

            if (!alreadyCounted) {
              sessionStorage.setItem(period.sessionKey, 'true');
            }

            return {
              id: period.id,
              count,
            };
          })
        );

        const nextCounts = periodCounts.reduce((resolvedCounts, period) => ({
          ...resolvedCounts,
          [period.id]: period.count,
        }), {});

        setCounterUnavailable(false);
        setCounts(nextCounts);
      } catch (error) {
        console.warn('Visitor counter unavailable:', error.message);
        setCounterUnavailable(true);
        setCounts(
          visitorPeriods.reduce((nextCounts, period) => ({
            ...nextCounts,
            [period.id]: getCachedCount(period.storageKey),
          }), {})
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAndIncrement();
  }, []);

  // Animate the count number when in view
  useEffect(() => {
    if (counts.month === null || counts.today === null || !isInView) return;

    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCounts({
        month: Math.floor(counts.month * eased),
        today: Math.floor(counts.today * eased),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayCounts(counts);
      }
    };

    requestAnimationFrame(animate);
  }, [counts, isInView]);

  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  const renderDigits = (value) => {
    return formatNumber(value).split('').map((digit, index) => (
      <motion.span
        key={`${index}-${digit}`}
        className={`visitor-digit ${digit === ',' ? 'visitor-separator' : ''}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
      >
        {digit}
      </motion.span>
    ));
  };

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
          <span className="visitor-counter-label">Visitors</span>
          <div className="visitor-counter-stats" aria-live="polite">
            {loading ? (
              <span className="visitor-counter-loading">
                <span className="visitor-dot"></span>
                <span className="visitor-dot"></span>
                <span className="visitor-dot"></span>
              </span>
            ) : counterUnavailable && counts.month === null && counts.today === null ? (
              <span className="visitor-counter-unavailable">Temporarily unavailable</span>
            ) : (
              <>
                <div className="visitor-counter-stat">
                  <span className="visitor-counter-period">This Month</span>
                  <div className="visitor-counter-digits">
                    {renderDigits(displayCounts.month)}
                  </div>
                </div>
                <span className="visitor-counter-divider" aria-hidden="true"></span>
                <div className="visitor-counter-stat">
                  <span className="visitor-counter-period">Today</span>
                  <div className="visitor-counter-digits">
                    {renderDigits(displayCounts.today)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;
