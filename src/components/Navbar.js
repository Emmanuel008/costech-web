import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeSecondDropdown, setActiveSecondDropdown] = useState(null);

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

  const aboutUsDropdownItems = [
    { text: 'Establishment', href: '/about/establishment' },
    { text: 'Vision and Mission', href: '/about/vision-mission' },
    { text: 'Organogram', href: '/about/organogram' },
    { text: 'Commission Members', href: '/about/commission-members' },
    { text: 'Top Management', href: '/about/top-management' },
  ];

  const onlineServicesDropdownItems = [
    { text: 'Research Clearance Portal', href: '/services/research-clearance' },
    { text: 'National Interlinked Research Repository', href: '/services/research-repository' },
    { text: 'E-library', href: '/services/e-library' },
    { text: 'TanBIF', href: '/services/tanbif' },
    { text: 'Union Catalog', href: '/services/union-catalog' },
    { text: 'Research funding', href: '/services/research-funding' },
    { text: 'Customer Survey Form', href: '/services/customer-survey' },
    { text: 'HEET Project', href: '/services/heet-project' },
    { text: 'Research and Innovation Magazine', href: '/services/magazine' },
    { text: 'Buni Hub', href: '/services/buni-hub' },
  ];

  const researchDropdownItems = [
    { text: 'EDCTP', href: '/research/edctp' },
    { text: 'Research Chairs', href: '/research/chairs' },
    { text: 'National Research Priorities', href: '/research/priorities' },
    { text: 'Research Coordination', href: '/research/coordination' },
    { text: 'Research Ethical Committees', href: '/research/ethical-committees' },
    { text: 'Research Institutions Network (HERIN)', href: '/research/herin' },
  ];

  const technologyInnovationDropdownItems = [
    { text: 'Cluster Initiative', href: '/technology/cluster-initiative' },
    { text: 'Funding', href: '/technology/funding' },
    { text: 'Incubation', href: '/technology/incubation' },
    { text: 'Innovation Spaces', href: '/technology/innovation-spaces' },
    { text: 'Buni Hub', href: '/technology/buni-hub' },
  ];

  const conferencesEventsDropdownItems = [
    { text: 'Conferences', href: '/events/conferences' },
    { text: 'Exhibitions', href: '/events/exhibitions' },
    { text: 'Workshops & Seminars', href: '/events/workshops-seminars' },
  ];

  const publicationDropdownItems = [
    { text: 'Research/Technology Policy', href: '/publication/policy' },
    { text: 'Strategic Plans', href: '/publication/strategic-plans' },
    { text: 'Guidelines and Manuals', href: '/publication/guidelines' },
    { text: 'Research & Innovation Magazine', href: '/publication/magazine' },
    { text: 'Reports', href: '/publication/reports' },
  ];

  const mediaRoomDropdownItems = [
    { text: 'News and Updates', href: '/media/news' },
    { text: 'Costech Tv', href: '/media/costech-tv' },
    { text: 'Newsletter', href: '/media/newsletter' },
    { text: 'Gallery', href: '/media/gallery' },
  ];

  const englishNavItems = [
    { text: 'Home', hasDropdown: false, href: '/' },
    { text: 'About us', hasDropdown: true, href: '/about', dropdownItems: aboutUsDropdownItems },
    { text: 'Online services', hasDropdown: true, href: '/services', dropdownItems: onlineServicesDropdownItems },
    { text: 'Research', hasDropdown: true, href: '/research', dropdownItems: researchDropdownItems },
    { text: 'Technology & Innovation', hasDropdown: true, href: '/technology', dropdownItems: technologyInnovationDropdownItems },
    { text: 'Conferences & Events', hasDropdown: true, href: '/events', dropdownItems: conferencesEventsDropdownItems },
    { text: 'Publication', hasDropdown: true, href: '/publication', dropdownItems: publicationDropdownItems },
    { text: 'Media Room', hasDropdown: true, href: '/media', dropdownItems: mediaRoomDropdownItems },
    { text: 'Contact us', hasDropdown: false, href: '/contact' },
  ];

  return (
    <>
      {/* Top Header Section */}
      <div className="top-header">
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
      <nav className="second-navbar">
        <div className="second-navbar-container">
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
                <a href={item.href} className="second-nav-link">
                  {item.text}
                </a>
              )}
              {item.hasDropdown && activeSecondDropdown === index && (
                <div className="second-dropdown-menu">
                  {item.dropdownItems && item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                    <a
                      key={dropdownIndex}
                      href={dropdownItem.href}
                      className="dropdown-item"
                    >
                      {dropdownItem.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

