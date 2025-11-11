import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* First Column - COSTECH Branding */}
            <div className="footer-column footer-branding">
              <h3 className="footer-brand-title">COSTECH</h3>
              <p className="footer-brand-subtitle">Tanzania Commission for Science and Technology</p>
              <div className="footer-logo-container">
                <img 
                  src="/assets/img/costechlogonew.png" 
                  alt="COSTECH Logo" 
                  className="footer-logo"
                />
              </div>
              <div className="footer-social">
                <a 
                  href="https://twitter.com/costechTANZANIA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon" 
                  aria-label="X (Twitter)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://web.facebook.com/costechTanzania?_rdc=1&_rdr#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon" 
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/costech_tz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon" 
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UC9byXvSjO4MC72nJ7SMJM_w" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon" 
                  aria-label="YouTube"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Second Column - Quick Links */}
            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/faqs">FAQs</a></li>
                <li><a href="/moest">MoEST</a></li>
                <li><a href="/research-clearance">Research clearance portal</a></li>
              </ul>
            </div>

            {/* Third Column - E-Resources */}
            <div className="footer-column">
              <h4 className="footer-heading">E-Resources</h4>
              <ul className="footer-links">
                <li><a href="/e-library">E-Library</a></li>
                <li><a href="/web-mail">Web Mail</a></li>
                <li><a href="/helpdesk">Helpdesk</a></li>
              </ul>
            </div>

            {/* Fourth Column - Contact Us */}
            <div className="footer-column">
              <h4 className="footer-heading">Contact Us</h4>
              <div className="footer-contact">
                <p className="footer-address">
                  P.O. Box 4302, Ali Hassan Mwinyi Road, Kijitonyama (Sayansi) COSTECH Building, Dar es Salaam, Tanzania,
                </p>
                <p className="footer-contact-item">
                  <strong>DG Phone:</strong> <a href="tel:+255738746509">+255 738746509</a>
                </p>
                <p className="footer-contact-item">
                  <strong>DG Email:</strong> <a href="mailto:dg@costech.or.tz">dg@costech.or.tz</a>
                </p>
                <p className="footer-contact-item">
                  <strong>HERIN Phone:</strong> <a href="tel:+255738746510">+255 738746510</a>
                </p>
                <p className="footer-contact-item">
                  <strong>HERIN Email:</strong> <a href="mailto:herin@costech.or.tz">herin@costech.or.tz</a>
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>© Copyright 2025 COSTECH. All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}
    </>
  );
};

export default Footer;

