import React, { useMemo, useState, useEffect } from 'react';
import './InnovationSpacesPage.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <nav className="pagination-nav" aria-label="Page navigation">
        <button
          type="button"
          className="pagination-button pagination-button--prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg className="pagination-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                type="button"
                className={`pagination-button pagination-button--page ${
                  currentPage === page ? 'pagination-button--active' : ''
                }`}
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="pagination-button pagination-button--next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg className="pagination-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};

const spaces = [
  {
    id: 1,
    name: 'SmartPark Innovation',
    sector: 'ICT',
    type: 'Incubator',
    location: 'Dodoma, Tanzania',
    yearEstablished: '2022',
    audience: 'Early-stage startups',
    beneficiaries: 'Young founders in Dodoma & surrounding regions',
    description:
      'SmartPark Innovation and Recreational Park supports emerging founders with incubation programs, mentorship, and access to local partners within Dodoma.',
    supportNeeded: 'Funding for equipment, technology resources, and market access',
    collaborations: 'Universities, NGOs, Investors, Tech communities',
    challenges: 'Infrastructure and equipment expansion',
    interestedTraining: 'Yes',
    capacityBuilding: 'STEM skills, leadership & pitching, corporate strategy',
    interestedEvents: 'Yes',
    eventFocus: 'Tech innovations, social impact startups, green innovation',
    partnerships: 'Yes',
    partnershipTypes: 'Government agencies, NGOs, Private companies, Universities, Investors',
    image: '/assets/img/hero2.jpeg',
    contact: {
      person: 'Eng. Vedasto Biyaka',
      email: 'vedasto.biyaka@katubuka.com',
      phone: '+255 716 893 830',
    },
  },
  {
    id: 2,
    name: 'KIBOHUB Tanzania',
    sector: 'ICT',
    type: 'Accelerator',
    location: 'Dar es Salaam, Tanzania',
    yearEstablished: '2020',
    audience: 'Growth-stage startups',
    beneficiaries: 'Entrepreneurship & Business Development, Digital Skills & Technology',
    description:
      'KIBOHUB empowers digital ventures through acceleration programs, investment readiness training, and an active network of tech mentors.',
    supportNeeded: 'Funding/Grants',
    collaborations: 'Access to funding (grants, seed capital, investors)',
    challenges: 'Lack of funds to run programs',
    interestedTraining: 'Yes',
    capacityBuilding: 'Business development, compliance, pitching',
    interestedEvents: 'Yes',
    eventFocus: 'Tech innovations',
    partnerships: 'Yes',
    partnershipTypes: 'Investors, NGOs, Government Agencies',
    image: '/assets/img/miradi.jpg',
    contact: {
      person: 'Adamu Mwinyikayoka',
      email: 'kibohub@gmail.com',
      phone: '+255 768 825 770',
    },
  },
  {
    id: 3,
    name: 'Shamba Box',
    sector: 'Agriculture',
    type: 'Research & Development Hub',
    location: 'Morogoro, Tanzania',
    yearEstablished: '2019',
    audience: 'Youth entrepreneurs',
    beneficiaries: 'Smallholder farmers and agripreneurs nationwide',
    description:
      'Shamba Box transforms Tanzania’s food systems by supporting agripreneurs with market insights, field labs, and business development support.',
    supportNeeded: 'Funding support and sector experts',
    collaborations: 'Partnerships with CGIAR, agri-innovation stakeholders',
    challenges: 'Limited funds and access to experts',
    interestedTraining: 'Yes',
    capacityBuilding: 'Agribusiness development, leadership, pitching, marketing',
    interestedEvents: 'Yes',
    eventFocus: 'Agriculture & food systems innovation',
    partnerships: 'No',
    partnershipTypes: '—',
    image: '/assets/img/hero.jpg',
    contact: {
      person: 'Seth Charles Mkisi',
      email: 'info@shambabox.org',
      phone: '+255 756 492 406',
    },
  },
  {
    id: 4,
    name: 'Taifa Tekk',
    sector: 'Education',
    type: 'Maker Space',
    location: 'Arusha, Tanzania',
    yearEstablished: '2022',
    audience: 'Makers & Early-stage startups',
    beneficiaries: 'Students, hobbyists, early-stage hardware startups',
    description:
      'Taifa Tekk equips innovators with maker tools, hardware prototyping support, and STEM-focused bootcamps for young technologists.',
    supportNeeded: 'Tools, mentorship, and sustainable funding for labs',
    collaborations: 'Policy advocacy, market access, university partnerships',
    challenges: 'Foundational business and technical skill gaps',
    interestedTraining: 'Yes',
    capacityBuilding: 'Hardware prototyping, business planning, EdTech skills',
    interestedEvents: 'Yes',
    eventFocus: 'Education technology & electronics innovation',
    partnerships: 'No',
    partnershipTypes: '—',
    image: '/assets/img/miradi.jpg',
    contact: {
      person: 'Said Hozza',
      email: 'sahozza@tatechhub.com',
      phone: '+255 684 736 765',
    },
  },
  {
    id: 5,
    name: 'MEI Centre',
    sector: 'Manufacturing',
    type: 'Incubator',
    location: 'Arusha, Tanzania',
    yearEstablished: '2020',
    audience: 'Youth entrepreneurs',
    beneficiaries: 'Young manufacturing-focused entrepreneurs',
    description:
      'MEI Centre guides youth-led manufacturing ventures with business advisory, access to equipment, and hands-on incubation programs.',
    supportNeeded: 'Funding/grants and MVP development facilities',
    collaborations: 'Workshops and boot camps',
    challenges: 'Limited funds, lack of MVP facilities, operational manuals',
    interestedTraining: 'Yes',
    capacityBuilding: 'Idea pitching, innovation program development, service marketing',
    interestedEvents: 'Yes',
    eventFocus: 'Manufacturing and innovation bootcamps',
    partnerships: 'Yes',
    partnershipTypes: 'COSTECH, MOEST, UNDP, UNESCO, StartHub Africa, WFP, NGOs',
    image: '/assets/img/giz.jpeg',
    contact: {
      person: 'Winnie Donald',
      email: 'wdonald@irdp.ac.tz',
      phone: '+255 782 761 872',
    },
  },
  {
    id: 6,
    name: 'Makonda Renewable Hub',
    sector: 'Clean Energy',
    type: 'Maker Space',
    location: 'Mwanza, Tanzania',
    yearEstablished: '2018',
    audience: 'Youth & community innovators',
    beneficiaries: 'Rural youth & community innovators transitioning to renewable energy',
    description:
      'Makonda Renewable Hub nurtures green energy solutions through mentorship, prototyping labs, and access to renewable energy experts.',
    supportNeeded: 'Equipment for renewable energy prototyping',
    collaborations: 'Workshops, technical support partnerships',
    challenges: 'Limited equipment and infrastructure',
    interestedTraining: 'Yes',
    capacityBuilding: 'Business development training for green ventures',
    interestedEvents: 'Yes',
    eventFocus: 'Green innovation & renewable energy',
    partnerships: 'Yes',
    partnershipTypes: 'Investors, renewable energy programs, NGOs',
    image: '/assets/img/undp.jpeg',
    contact: {
      person: 'Emilian John Shija',
      email: 'shijaemilian@gmail.com',
      phone: '+255 750 324 942',
    },
  },
  {
    id: 7,
    name: 'Gunzert House',
    sector: 'Creative Industries',
    type: 'Cultural Incubator',
    location: 'Mwanza, Tanzania',
    yearEstablished: '2022',
    audience: 'Creative entrepreneurs',
    beneficiaries: 'Artists, cultural entrepreneurs, sustainable tourism actors',
    description:
      'Gunzert House revitalises creative industries by offering collaborative studio space, residency programs, and cultural entrepreneurship labs.',
    supportNeeded: 'Market access and visibility support',
    collaborations: 'Funding partners, cultural institutions, creative mentors',
    challenges: 'Limited market access and artist support systems',
    interestedTraining: 'Yes',
    capacityBuilding: 'Cultural entrepreneurship, digital marketing, sustainable tourism',
    interestedEvents: 'Yes',
    eventFocus: 'Creative industries, sustainable tourism, cultural innovation',
    partnerships: 'Yes',
    partnershipTypes: 'Investors, tourism boards, creative networks',
    image: '/assets/img/wfp.jpeg',
    contact: {
      person: 'Dr. Delphine Kessy',
      email: 'delphinekessy@gmail.com',
      phone: '+255 754 819 590',
    },
  },
  {
    id: 8,
    name: 'Agriedo Hub',
    sector: 'Agriculture',
    type: 'Incubator & Co-working',
    location: 'Iringa, Tanzania',
    yearEstablished: '2023',
    audience: 'Youth & women entrepreneurs',
    beneficiaries: 'Grassroots agribusinesses, youth & women founders',
    description:
      'Agriedo Hub accelerates agribusiness ventures with training on value chains, market access support, and strong community partnerships.',
    supportNeeded: 'Infrastructure, networking, and capacity-building support',
    collaborations: 'Grants, seed capital, mentorship programs, bootcamps',
    challenges: 'Sustainability gaps and misuse of funds in the ecosystem',
    interestedTraining: 'Yes',
    capacityBuilding: 'Agribusiness, compliance, export readiness',
    interestedEvents: 'Yes',
    eventFocus: 'Donor engagement, university partnerships, agribusiness',
    partnerships: 'Yes',
    partnershipTypes: 'Donors, NGOs, Universities',
    image: '/assets/img/idrc.jpeg',
    contact: {
      person: 'Hadija Jabir Pherri',
      email: 'agriedoltd@gmail.com',
      phone: '+255 756 999 118',
    },
  },
];

const InnovationSpacesPage = () => {
  const [query, setQuery] = useState('');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredSpaces = useMemo(() => {
    if (!query.trim()) return spaces;

    const value = query.trim().toLowerCase();
    return spaces.filter(
      (space) =>
        space.name.toLowerCase().includes(value) ||
        space.sector.toLowerCase().includes(value) ||
        space.location.toLowerCase().includes(value)
    );
  }, [query]);

  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage);

  const paginatedSpaces = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSpaces.slice(startIndex, endIndex);
  }, [filteredSpaces, currentPage, itemsPerPage]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="innovation-page">
      <div className="innovation-hero">
        <div className="innovation-hero-content">
          <h1>Innovation Spaces Tanzania</h1>
          <p>
            Discover hubs, labs, and incubators powering Tanzania's innovation ecosystem. Explore
            their focus areas, connect with managers, and uncover collaboration opportunities across
            the country.
          </p>
          <a
            className="innovation-hero-button"
            href="https://forms.gle/hUpK5ueXcexATKpK6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Your Innovation Space
          </a>
        </div>
      </div>

      <div className="innovation-body">
        <div className="innovation-overview">
          <div className="innovation-overview-card">
            <h2>Building a Connected Innovation Ecosystem</h2>
            <p>
              COSTECH coordinates innovation spaces across the country to accelerate inclusive,
              sustainable growth. This catalogue highlights spaces that support startups, researchers,
              makers, students, and community innovators in sectors ranging from ICT and agriculture to
              creative industries and clean energy.
            </p>
            <p>
              Browse the map and featured spaces to learn more about their programs, facilities, and
              support needs. Reach out to collaborate, share resources, or spotlight new solutions
              emerging from Tanzania.
            </p>
          </div>

          <div className="innovation-map-card">
            <iframe
              title="Innovation spaces map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=29.0%2C-11.0%2C41.5%2C-1.0&layer=mapnik"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className="innovation-search">
        <input
          type="search"
          value={query}
          placeholder="Search spaces by name, sector, or location..."
          onChange={(event) => setQuery(event.target.value)}
        />
        </div>

        <div className="innovation-grid">
        {filteredSpaces.length === 0 ? (
          <div className="innovation-empty-state">
            No spaces matched your search. Try using a different keyword.
          </div>
        ) : (
          paginatedSpaces.map((space) => (
            <article key={space.id} className="innovation-card">
              <div className="innovation-card-image">
                <img src={space.image} alt={space.name} loading="lazy" />
              </div>
              <div className="innovation-card-content">
                <span className="innovation-card-tag">{space.type}</span>
                <h3>{space.name}</h3>
                <p className="innovation-card-sector">{space.sector}</p>
                <div className="innovation-card-footer">
                  <span>{space.location}</span>
                  <button type="button" onClick={() => setSelectedSpace(space)}>
                    More
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
        </div>

        {filteredSpaces.length > 0 && totalPages > 1 && (
        <div className="innovation-pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
        )}
      </div>

      {selectedSpace && (
        <div className="innovation-modal" onClick={() => setSelectedSpace(null)}>
          <div className="innovation-modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="innovation-modal-close"
              onClick={() => setSelectedSpace(null)}
              aria-label="Close details"
            >
              ×
            </button>
            <div className="innovation-modal-header">
              <h2>{selectedSpace.name}</h2>
              <span>{selectedSpace.location}</span>
            </div>
            <div className="innovation-modal-body">
              <ul className="innovation-modal-details">
                <li>
                  <strong>Space Name:</strong> {selectedSpace.name}
                </li>
                <li>
                  <strong>Sector:</strong> {selectedSpace.sector}
                </li>
                <li>
                  <strong>Type of Space:</strong> {selectedSpace.type}
                </li>
                <li>
                  <strong>Description / Programs:</strong> {selectedSpace.description}
                </li>
                <li>
                  <strong>Beneficiaries:</strong> {selectedSpace.beneficiaries}
                </li>
                <li>
                  <strong>Year Established:</strong> {selectedSpace.yearEstablished}
                </li>
                <li>
                  <strong>Target Audience:</strong> {selectedSpace.audience}
                </li>
                <li>
                  <strong>Support Needed:</strong> {selectedSpace.supportNeeded}
                </li>
                <li>
                  <strong>Collaborations:</strong> {selectedSpace.collaborations}
                </li>
                <li>
                  <strong>Main Challenges:</strong> {selectedSpace.challenges}
                </li>
                <li>
                  <strong>Interested in Training:</strong> {selectedSpace.interestedTraining}
                </li>
                <li>
                  <strong>Area of Capacity Building:</strong> {selectedSpace.capacityBuilding}
                </li>
                <li>
                  <strong>Interested in Events:</strong> {selectedSpace.interestedEvents}
                </li>
                <li>
                  <strong>Event Focus:</strong> {selectedSpace.eventFocus}
                </li>
                <li>
                  <strong>Open to Partnerships:</strong> {selectedSpace.partnerships}
                </li>
                <li>
                  <strong>Partnerships Types:</strong> {selectedSpace.partnershipTypes}
                </li>
              </ul>
              <div className="innovation-modal-contact">
                <h3>Contact Information</h3>
                <p>
                  <strong>Contact Person:</strong> {selectedSpace.contact.person}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${selectedSpace.contact.email}`}>{selectedSpace.contact.email}</a>
                </p>
                <p>
                  <strong>Phone:</strong> {selectedSpace.contact.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InnovationSpacesPage;


