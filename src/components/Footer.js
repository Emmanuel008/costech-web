import React, { useState, useEffect } from 'react';
import '../styles/components/Footer.css';
import { 
  getSocialMediaPlatforms, 
  getFooterEresources, 
  getFooterContactUs, 
  getFooterQuickLinks 
} from '../services/api';

// Component to handle social media icon with image fallback
const SocialIcon = ({ url, iconUrl, platformName, svgIcon, ariaLabel }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href={url}
      target="_blank" 
      rel="noopener noreferrer"
      className="social-icon" 
      aria-label={ariaLabel}
    >
      {iconUrl && !imageError ? (
        <img 
          src={iconUrl} 
          alt={ariaLabel} 
          className="social-icon-img"
          onError={() => setImageError(true)}
        />
      ) : (
        svgIcon
      )}
    </a>
  );
};

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [eresources, setEresources] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);

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

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Fetch all footer data in parallel
        const [socialData, quickLinksData, eresourcesData, contactData] = await Promise.all([
          getSocialMediaPlatforms(),
          getFooterQuickLinks(),
          getFooterEresources(),
          getFooterContactUs()
        ]);

        setSocialMedia(socialData || []);
        setQuickLinks(quickLinksData || []);
        setEresources(eresourcesData || []);
        setContactInfo(contactData || []);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Set empty arrays on error to prevent crashes
        setSocialMedia([]);
        setQuickLinks([]);
        setEresources([]);
        setContactInfo([]);
      }
    };

    fetchFooterData();
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
                {socialMedia.length > 0 ? (
                  socialMedia.map((platform) => {
                    const platformName = (platform.name || platform.platform_name || '').toLowerCase();
                    const url = platform.url || platform.link || '#';
                    
                    // Check for icon/image from API (could be icon, image, icon_url, image_url, logo, attachment, etc.)
                    let iconUrl = platform.icon || platform.image || platform.icon_url || platform.image_url || platform.logo || platform.attachment || null;
                    
                    // If icon URL is relative, prepend base URL
                    if (iconUrl && !iconUrl.startsWith('http') && !iconUrl.startsWith('/')) {
                      iconUrl = `https://costech.kingdomsolutions.co.tz/${iconUrl}`;
                    }
                    
                    // Get SVG icon based on platform name (fallback)
                    const getSvgIcon = () => {
                      if (platformName.includes('twitter') || platformName.includes('x')) {
                        return (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                        );
                      } else if (platformName.includes('facebook')) {
                        return (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                        );
                      } else if (platformName.includes('instagram')) {
                        return (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"/>
                  </svg>
                        );
                      } else if (platformName.includes('youtube')) {
                        return (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                        );
                      } else if (platformName.includes('linkedin')) {
                        return (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        );
                      }
                      // Default icon for unknown platforms
                      return (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      );
                    };

                    return (
                      <SocialIcon
                        key={platform.id}
                        url={url}
                        iconUrl={iconUrl}
                        platformName={platformName}
                        svgIcon={getSvgIcon()}
                        ariaLabel={platform.name || platform.platform_name || 'Social Media'}
                      />
                    );
                  })
                ) : null}
              </div>
            </div>

            {/* Second Column - Quick Links */}
            <div className="footer-column">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.length > 0 ? (
                  quickLinks.map((link) => {
                    const url = link.url || link.link || '#';
                    const title = link.title || link.name || 'Link';
                    const isExternal = url.startsWith('http://') || url.startsWith('https://');
                    
                    return (
                      <li key={link.id}>
                        <a 
                          href={url} 
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          {title}
                        </a>
                      </li>
                    );
                  })
                ) : null}
              </ul>
            </div>

            {/* Third Column - E-Resources */}
            <div className="footer-column">
              <h4 className="footer-heading">E-Resources</h4>
              <ul className="footer-links">
                {eresources.length > 0 ? (
                  eresources.map((resource) => {
                    const url = resource.url || resource.link || '#';
                    const title = resource.title || resource.name || 'Resource';
                    const isExternal = url.startsWith('http://') || url.startsWith('https://');
                    
                    return (
                      <li key={resource.id}>
                        <a 
                          href={url} 
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          {title}
                        </a>
                      </li>
                    );
                  })
                ) : null}
              </ul>
            </div>

            {/* Fourth Column - Contact Us */}
            <div className="footer-column">
              <h4 className="footer-heading">Contact Us</h4>
              <div className="footer-contact">
                {contactInfo.length > 0 ? (
                  contactInfo.map((item, index) => {
                    // Handle nested contact object structure
                    const contact = item.contact || item;
                    const contactId = item.id || contact.id || index;
                    
                    // Extract contact information from nested structure
                    const location = contact.location || item.location || '';
                    const phoneNumber = contact.phone_number || contact.phoneNumber || contact.phone || item.phone_number || item.phone || '';
                    const email = contact.email || item.email || '';
                    
                    const elements = [];
                    
                    // Display location/address
                    if (location) {
                      elements.push(
                        <p key={`${contactId}-location`} className="footer-address">
                          {location}
                        </p>
                      );
                    }
                    
                    // Display phone number - display as-is from backend
                    if (phoneNumber) {
                      // Convert to string to handle both integer and string values
                      const phoneStr = String(phoneNumber);
                      // Extract phone number for tel: link (only digits and +)
                      const cleanPhone = phoneStr.replace(/[^\d+]/g, '');
                      elements.push(
                        <p key={`${contactId}-phone`} className="footer-contact-item">
                          <strong>Phone:</strong> <a href={`tel:${cleanPhone}`}>{phoneStr}</a>
                        </p>
                      );
                    }
                    
                    // Display email
                    if (email) {
                      elements.push(
                        <p key={`${contactId}-email`} className="footer-contact-item">
                          <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
                        </p>
                      );
                    }
                    
                    return elements;
                  }).flat().filter(item => item !== null)
                ) : (
                  <p className="footer-contact-item">No contact information available</p>
                )}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>© Copyright {new Date().getFullYear()} COSTECH. All Rights Reserved</p>
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

