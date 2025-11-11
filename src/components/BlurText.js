import React, { useState, useEffect, useRef } from 'react';

const BlurText = ({
  text,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (animateBy === 'words') {
      const words = text.split(' ');
      setAnimatedItems(words);
    } else if (animateBy === 'characters') {
      const chars = text.split('');
      setAnimatedItems(chars);
    } else {
      setAnimatedItems([text]);
    }
  }, [text, animateBy]);

  useEffect(() => {
    if (isVisible && animatedItems.length > 0) {
      const totalDuration = animatedItems.length * 50 + 500; // 50ms per item + 500ms for blur
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, totalDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, animatedItems.length, onAnimationComplete]);

  const getTransform = (index) => {
    if (!isVisible) {
      switch (direction) {
        case 'top':
          return 'translateY(-20px)';
        case 'bottom':
          return 'translateY(20px)';
        case 'left':
          return 'translateX(-20px)';
        case 'right':
          return 'translateX(20px)';
        default:
          return 'translateY(-20px)';
      }
    }
    return 'translate(0, 0)';
  };

  const getOpacity = (index) => {
    if (!isVisible) return 0;
    return 1;
  };

  const getFilter = (index) => {
    if (!isVisible) return 'blur(3px)';
    return 'blur(0px)';
  };

  const getTransitionDelay = (index) => {
    return `${index * 50}ms`;
  };

  return (
    <div ref={containerRef} className={className} style={{ display: 'inline-block' }}>
      {animatedItems.map((item, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            transform: getTransform(index),
            opacity: getOpacity(index),
            filter: getFilter(index),
            transition: `all 0.3s ease-out ${getTransitionDelay(index)}`,
            marginRight: animateBy === 'words' ? '0.25em' : '0',
          }}
        >
          {item}
          {animateBy === 'words' && index < animatedItems.length - 1 && ' '}
        </span>
      ))}
    </div>
  );
};

export default BlurText;

