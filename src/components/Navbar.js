import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';

const MegaMenuItem = ({ item, onClose, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.subItems && item.subItems.length > 0) {
    return (
      <div className={`mega-menu-item ${level > 0 ? 'mega-menu-item-nested' : ''}`}>
        <div className="mega-menu-item-header">
          {item.href ? (
            <a href={item.href} className="mega-menu-item-link" onClick={onClose}>
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
        <a href={item.href} className="mega-menu-item-link" onClick={onClose}>
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
            <a href={item.href} className="dropdown-item" onClick={onClose}>
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
    >
      {item.text}
    </a>
  );
};

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
    { text: 'Contact Us', href: '/contact' },
  ];

  const dashboardDropdownItems = [
    { text: 'COSTECH Funded projects', href: '/dashboard/funded-projects' },
    { text: 'Research permits statistics', href: '/dashboard/research-permits-statistics', subItems: [
      { text: 'By Category', href: '/dashboard/research-permits-statistics/category' },
      { text: 'By Gender', href: '/dashboard/research-permits-statistics/gender' },
      { text: 'By Nationality', href: '/dashboard/research-permits-statistics/nationality' },
      { text: 'By Discipline', href: '/dashboard/research-permits-statistics/discipline' },
    ]},
    { text: 'R&D expenditure', href: '/dashboard/rd-expenditure' },
    { text: 'Innovation index indicators', href: '/dashboard/innovation-index' },
    { text: 'Number of active projects', href: '/dashboard/active-projects' },
    { text: 'Projects by Sector', href: '/dashboard/projects-by-sector' },
    { text: 'Projects by Region', href: '/dashboard/projects-by-region' },
    { text: 'Projects by Program', href: '/dashboard/projects-by-program' },
    { text: 'Projects by Budget', href: '/dashboard/projects-by-budget' },
    { text: 'Project status tracking', href: '/dashboard/project-status-tracking', subItems: [
      { text: 'Ongoing', href: '/dashboard/project-status-tracking/ongoing' },
      { text: 'Completed', href: '/dashboard/project-status-tracking/completed' },
    ]},
    { text: 'Institutions involved in STI', href: '/dashboard/institutions-sti', subItems: [
      { text: 'HLI', href: '/dashboard/institutions-sti/hli' },
      { text: 'R&D', href: '/dashboard/institutions-sti/rd' },
      { text: 'TSC', href: '/dashboard/institutions-sti/tsc' },
    ]},
    { text: 'Graph Researcher Per Gender', href: '/dashboard/graph-researcher-gender' },
    { text: 'Graph of Research Permits per Sector and Gender', href: '/dashboard/graph-permits-sector-gender' },
    { text: 'Graph of COSTECH funded projects per gender, sector, Institution', href: '/dashboard/graph-funded-projects' },
    { text: 'Graph of Total Funds supported by COSTECH per Institution', href: '/dashboard/graph-funds-institution' },
    { text: 'Graph of Funded Projects per Program (Innovation vs Research)', href: '/dashboard/graph-projects-program' },
  ];

  const resourcesPublicationsItems = [
    { text: 'Policies', href: '/resources/policies' },
    { text: 'Acts & legal documents', href: '/resources/acts-legal' },
    { text: 'Strategic plans', href: '/resources/strategic-plans' },
    { text: 'Guidelines and Frameworks', href: '/resources/guidelines-frameworks' },
    { text: 'Audited Financial Reports', href: '/resources/financial-reports' },
    { text: 'News section', href: '/resources/news' },
    { text: 'Publication video', href: '/resources/publication-video' },
  ];

  const directoratesSectionsItems = [
    {
      type: 'section',
      title: 'Directorates',
      items: [
        {
          text: 'Corporate Services',
          href: '/directorates/corporate-services',
        },
        {
          text: 'Research Coordination and Promotion',
          href: '/directorates/research-coordination',
          subItems: [
            {
              text: 'Research Permit',
              href: '/directorates/research-permit',
              subItems: [
                { text: 'Requirements & Guidelines', href: '/directorates/research-permit/requirements' },
                {
                  text: 'Permit Categories',
                  href: '/directorates/research-permit/categories',
                  subItems: [
                    { text: 'Local Researchers', href: '/directorates/research-permit/categories/local' },
                    { text: 'Foreign Researchers', href: '/directorates/research-permit/categories/foreign' },
                    { text: 'Students', href: '/directorates/research-permit/categories/students' },
                    { text: 'Institutions', href: '/directorates/research-permit/categories/institutions' },
                  ],
                },
                { text: 'Application Process Workflow', href: '/directorates/research-permit/workflow' },
                { text: 'Frequently Asked Questions', href: '/directorates/research-permit/faq' },
                { text: 'Contact for Support', href: '/directorates/research-permit/contact' },
              ],
            },
            { text: 'Research Promotion', href: '/directorates/research-promotion' },
          ],
        },
        {
          text: 'Centre for Development in Technology Transfer',
          href: '/directorates/technology-transfer',
          subItems: [
            {
              text: 'Innovation',
              href: '/directorates/innovation',
              subItems: [
                { text: 'Technology Transfer Services', href: '/directorates/innovation/transfer-services' },
                { text: 'Innovation Support Programs', href: '/directorates/innovation/support-programs' },
                 { text: 'Innovation Space', href: '/technology/innovation-spaces' },
    { text: 'Incubation', href: '/technology/incubation' },
                { text: 'Local Tech Startups/Success Stories', href: '/directorates/innovation/startups' },
                { text: 'Patent & IP Advisory Services', href: '/directorates/innovation/patent-ip' },
                { text: 'Digital Transformation Initiatives', href: '/directorates/innovation/digital-transformation' },
              ],
            },
            
            {
              text: 'Technology Transfer and Management',
              href: '/directorates/technology-management',
              subItems: [
                { text: 'Technology Acquisition and Management', href: '/directorates/technology-management/acquisition' },
              ],
            },
          ],
        },
        {
          text: 'Knowledge Management',
          href: '/directorates/knowledge-management',
          subItems: [
            { text: 'ISNS', href: '/directorates/knowledge-management/isns' },
            { text: 'DPM', href: '/directorates/knowledge-management/dpm' },
          ],
        },
      ],
    },
    {
      type: 'section',
      title: 'Units',
      items: [
        {
          text: 'National Fund for Advancement of Science and Technology',
          href: '/sections/nfast',
          subItems: [
            {
              text: 'Grants',
              href: '/sections/nfast/grants',
              subItems: [
                { text: 'Calls for Proposals', href: '/sections/nfast/grants/calls' },
                { text: 'Eligibility Criteria', href: '/sections/nfast/grants/eligibility' },
                { text: 'Application Portal', href: '/sections/nfast/grants/portal' },
                { text: 'Guidelines & Downloads', href: '/sections/nfast/grants/guidelines' },
                { text: 'Past Winners & Beneficiaries', href: '/sections/nfast/grants/winners' },
              ],
            },
            { text: 'Loans', href: '/sections/nfast/loans' },
          ],
        },
      ],
    },
  ];

  const englishNavItems = [
    { text: 'Home', hasDropdown: false, href: '/' },
    { text: 'About us', hasDropdown: true, href: '/about', dropdownItems: aboutUsDropdownItems },
    { text: 'Directorates and Units', hasDropdown: true, href: '/directorates', dropdownItems: directoratesSectionsItems, isMegaMenu: true },
    { text: 'NISSTI', hasDropdown: false, href: '/nissti' },
    { text: 'Dashboard', hasDropdown: true, href: '/dashboard', dropdownItems: dashboardDropdownItems },
    { text: 'Resources / Publications', hasDropdown: true, href: '/resources', dropdownItems: resourcesPublicationsItems },
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
                      item.dropdownItems && item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <DropdownMenuItem
                        key={dropdownIndex}
                          item={dropdownItem}
                          onClose={() => setIsMobileMenuOpen(false)}
                        />
                      ))
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

