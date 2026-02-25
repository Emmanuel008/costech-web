import React, { useState, useEffect, useCallback } from 'react';
import '../styles/components/Navbar.css';
import { getOnlineServices } from '../services/api';

const MegaMenuItem = ({ item, onClose, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems && item.subItems.length > 0) {
    return (
      <div className={`mega-menu-item ${level > 0 ? 'mega-menu-item-nested' : ''}`}>
        <div className="mega-menu-item-header">
          {item.href ? (
            <a 
              href={item.href} 
              className="mega-menu-item-link" 
              onClick={onClose}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              {item.text}
            </a>
          ) : (
            <span className="mega-menu-item-text">{item.text}</span>
          )}
          <button
            className="mega-menu-item-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? '−' : '+'}
          </button>
        </div>
        {isOpen && (
          <div className="mega-menu-item-submenu">
            {item.subItems.map((subItem, subIndex) => (
              <MegaMenuItem key={subIndex} item={subItem} onClose={onClose} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mega-menu-item ${level > 0 ? 'mega-menu-item-nested' : ''}`}>
      {item.href ? (
        <a 
          href={item.href} 
          className="mega-menu-item-link" 
          onClick={onClose}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
        >
          {item.text}
        </a>
      ) : (
        <span className="mega-menu-item-text">{item.text}</span>
      )}
    </div>
  );
};

const DropdownMenuItem = ({ item, onClose, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems && item.subItems.length > 0) {
    return (
      <div className={`dropdown-item-wrapper ${level > 0 ? 'dropdown-item-nested' : ''}`}>
        <div className="dropdown-item-header">
          {item.href ? (
            <a 
              href={item.href} 
              className="dropdown-item" 
              onClick={onClose}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              {item.text}
            </a>
          ) : (
            <span className="dropdown-item-text">{item.text}</span>
          )}
          <button
            className="dropdown-item-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? '−' : '+'}
          </button>
        </div>
        {isOpen && (
          <div className="dropdown-submenu">
            {item.subItems.map((subItem, subIndex) => (
              <DropdownMenuItem key={subIndex} item={subItem} onClose={onClose} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className="dropdown-item"
      onClick={onClose}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
    >
      {item.text}
    </a>
  );
};

// Fallback static online services
const fallbackOnlineServicesItems = [
  { text: 'STI Information portal(NISSTI)', href: '/nissti' },
  { text: 'Innovation Space', href: '/technology/innovation-spaces' },
  { text: 'Research Clearance Portal', href: '/research-clearance' },
  { text: 'Union Catalog', href: '/union-catalog' },
  { text: 'TanBIF', href: '/tanbif' },
  { text: 'National Interlinked Research Repository', href: '/research-repository' },
  { text: 'Research Funding', href: '/research-funding' },
  { text: 'Customer Survey Form', href: '/customer-survey' },
];

const Navbar = () => {
  const [activeSecondDropdown, setActiveSecondDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = useCallback((index) => {
    setActiveSecondDropdown((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.second-navbar-container')) {
        setActiveSecondDropdown(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrolled = scrollPosition > 50;
      setIsScrolled(scrolled);
      
      // Add/remove class to body for CSS adjustments
      if (scrolled) {
        document.body.classList.add('navbar-scrolled');
      } else {
        document.body.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('navbar-scrolled');
    };
  }, []);

  const aboutUsDropdownItems = [
    { text: 'Vision, Mission, Quality Policy', href: '/about/vision-mission' },
    { text: 'Organizational Structure', href: '/about/organogram' },
    { text: 'Management Team', href: '/about/top-management' },
    { text: 'Board of Commission', href: '/about/commission-members' },
    { text: 'Directorates', href: '/directorates' },
    { text: 'Our Services', href: '/what-we-offer' },
    { text: 'Contact Us', href: '/contact' },
  ];


  const publicationsEventsItems = [
    {
      type: 'section',
      title: 'Publications',
      items: [
        { text: 'Journals', href: '/publications/journals' },
        { text: 'Magazine', href: '/publications/magazine' },
        { text: 'Books', href: '/publications/books' },
        { text: 'Reports', href: '/publications/reports' },
        { text: 'Acts & Legal', href: '/publications/acts-legal' },
        { text: 'Policies', href: '/publications/policies' },
        { text: 'Strategic Plan', href: '/publications/strategic-plan' },
        { text: 'Guideline and Documents', href: '/publications/guidelines-documents' },
      ],
    },
    {
      type: 'section',
      title: 'Events',
      items: [
        { text: 'Conference', href: '/events/conferences' },
        { text: 'Exhibitions', href: '/events/exhibitions' },
        { text: 'STI Marathon (STIthon)', href: '/events/community-engagements' },
      ],
    },
  ];

  const mediaCentreItems = [
    { text: 'News & Updates', href: '/media/news-updates' },
    { text: 'Press Release', href: '/media/press-release' },
    { text: 'Statements', href: '/media/statements' },
    { text: 'NewsLetter', href: '/media/newsletter' },
    { text: 'Costech Videos', href: '/media/costech-videos' },
  ];

  const projectsItems = [
    { text: 'HEET', href: 'https://heet.costech.or.tz/', external: true },
    { text: 'Ongoing Program', href: '/projects#ongoing' },
    { text: 'COSTECH Funded Projects', href: '/projects/costech-funded' },
    { text: 'Area for Partnership', href: '/projects#partnership' },
  ];

  const incubationItems = [
    { text: 'Buni Hub', href: 'https://bunihub.or.tz/', external: true },
    { text: 'DTBi', href: 'https://teknohama.or.tz/', external: true },
  ];

  const [onlineServicesItems, setOnlineServicesItems] = useState(fallbackOnlineServicesItems);

  // Fetch online services from API
  useEffect(() => {
    const fetchOnlineServices = async () => {
      try {
        
        // Fetch online services from API
        const apiServices = await getOnlineServices();
        
        
        if (apiServices && apiServices.length > 0) {
          
          // Map API response to component structure
          const mappedServices = apiServices.map((service) => {
            // Handle URL - could be in url, link, website, or external_url field
            const url = service.url || service.link || service.website || service.external_url || service.href || '#';
            
            // Check if URL is external (starts with http:// or https://)
            const isExternal = url.startsWith('http://') || url.startsWith('https://');
            
            return {
              text: service.title || service.name || service.text || 'Untitled Service',
              href: url,
              external: isExternal
            };
          });
          
          setOnlineServicesItems(mappedServices);
        } else {
          console.warn('Navbar: API returned empty array, using fallback');
          setOnlineServicesItems(fallbackOnlineServicesItems);
        }
      } catch (err) {
        console.error('Navbar: Error fetching online services:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          stack: err.stack
        });
        // Use fallback on error
        setOnlineServicesItems(fallbackOnlineServicesItems);
      }
    };

    fetchOnlineServices();
  }, []);

  const englishNavItems = [
    { text: 'Home', hasDropdown: false, href: '/' },
    { text: 'About us', hasDropdown: true, href: '/about', dropdownItems: aboutUsDropdownItems },
    { text: 'Online Services', hasDropdown: true, href: '#', dropdownItems: onlineServicesItems },
    { text: 'Info Portal', hasDropdown: false, href: '/dashboard' },
    { text: 'Publication & Events', hasDropdown: true, href: '/publications', dropdownItems: publicationsEventsItems, isMegaMenu: true },
    { text: 'Media Centre', hasDropdown: true, href: '/media', dropdownItems: mediaCentreItems },
    { text: 'Projects & Program', hasDropdown: true, href: '/projects', dropdownItems: projectsItems },
    { text: 'Incubation', hasDropdown: true, href: '#', dropdownItems: incubationItems },
      { text: 'Funding Opportunities', hasDropdown: false, href: '/fellowships-grants' },
    { text: 'FAQs', hasDropdown: false, href: '/faqs' },
  ];

  return (
    <>
      {/* Top Header Section */}
      <div className={`top-header ${isScrolled ? 'top-header--hidden' : ''}`}>
        <div className="header-container">
          <div className="header-left">
            <img 
              src="/assets/img/emblem.webp" 
              alt="Tanzania Emblem" 
              className="emblem-logo"
            />
          </div>
          
          <div className="header-center">
            <div className="header-text">
              TANZANIA COMMISSION FOR SCIENCE AND TECHNOLOGY
              <br />
              (COSTECH)
            </div>
          </div>
          
          <div className="header-right">
            <img 
              src="/assets/img/costechlogonew.png" 
              alt="COSTECH Logo" 
              className="costech-logo"
            />
          </div>
        </div>
      </div>

      {/* Second Navbar - English Menu */}
      <nav className={`second-navbar ${isScrolled ? 'second-navbar--scrolled' : ''}`}>
        <div className="second-navbar-container">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'hamburger--open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <div className={`second-navbar-menu ${isMobileMenuOpen ? 'second-navbar-menu--open' : ''}`}>
            {englishNavItems.map((item, index) => (
              <div key={index} className="second-nav-item">
                {item.hasDropdown ? (
                  <button
                    type="button"
                    className="second-nav-link second-nav-link--button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDropdownToggle(index);
                    }}
                  >
                    {item.text}
                    <span className="dropdown-chevron">▼</span>
                  </button>
                ) : (
                  <a 
                    href={item.href} 
                    className="second-nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.text}
                  </a>
                )}
                {item.hasDropdown && activeSecondDropdown === index && (
                  <div className={`second-dropdown-menu ${item.isMegaMenu ? 'mega-menu' : ''}`}>
                    {item.isMegaMenu ? (
                      <div className="mega-menu-content">
                        {item.dropdownItems && item.dropdownItems.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mega-menu-section">
                            <h3 className="mega-menu-section-title">{section.title}</h3>
                            <div className="mega-menu-items">
                              {section.items && section.items.map((menuItem, itemIndex) => (
                                <MegaMenuItem
                                  key={itemIndex}
                                  item={menuItem}
                                  onClose={() => setIsMobileMenuOpen(false)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      item.dropdownItems && item.dropdownItems.map((dropdownItem, dropdownIndex) => {
                        // Handle nested mega menu items
                        if (dropdownItem.isMegaMenu && dropdownItem.dropdownItems) {
                          return (
                            <div key={dropdownIndex} className="dropdown-item-wrapper">
                              <div className="dropdown-item-header">
                                {dropdownItem.href ? (
                                  <a href={dropdownItem.href} className="dropdown-item" onClick={() => setIsMobileMenuOpen(false)}>
                                    {dropdownItem.text}
                                  </a>
                                ) : (
                                  <span className="dropdown-item-text">{dropdownItem.text}</span>
                                )}
                              </div>
                              <div className="mega-menu-content mega-menu-content--nested">
                                {dropdownItem.dropdownItems.map((section, sectionIndex) => (
                                  <div key={sectionIndex} className="mega-menu-section">
                                    <h3 className="mega-menu-section-title">{section.title}</h3>
                                    <div className="mega-menu-items">
                                      {section.items && section.items.map((menuItem, itemIndex) => (
                                        <MegaMenuItem
                                          key={itemIndex}
                                          item={menuItem}
                                          onClose={() => setIsMobileMenuOpen(false)}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        // Regular dropdown items
                        return (
                        <DropdownMenuItem
                        key={dropdownIndex}
                          item={dropdownItem}
                          onClose={() => setIsMobileMenuOpen(false)}
                        />
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

