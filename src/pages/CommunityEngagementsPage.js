import React from 'react';
import '../styles/pages/CommunityEngagementsPage.css';

const CommunityEngagementsPage = () => {
  const communityEngagements = [
    {
      id: 'stithon',
      title: 'STIthon',
      description: 'STIthon is an innovative community engagement initiative that brings together students, researchers, innovators, and the general public to participate in science, technology, and innovation challenges. This event promotes problem-solving, creativity, and collaboration in addressing local and national challenges through STI solutions.'
    }
  ];

  return (
    <section className="community-engagements-page">
      <div className="community-engagements-hero">
        <div className="community-engagements-hero-overlay" />
        <div className="community-engagements-hero-content">
          <h1>Community Engagements</h1>
          <p>
            Connecting science, technology, and innovation with communities through interactive
            events and initiatives
          </p>
        </div>
      </div>

      <div className="community-engagements-body">
        <div className="community-engagements-content">
          <div className="community-engagements-main-card">
            <h2>About Community Engagements</h2>
            <p>
              COSTECH organizes various community engagement activities to bridge the gap between
              scientific research, technological innovation, and the communities they serve. These
              initiatives aim to promote public understanding of STI, encourage community
              participation in innovation, and create platforms for dialogue between researchers,
              innovators, and the public.
            </p>
            <p>
              Through community engagements, COSTECH fosters a culture of innovation, raises
              awareness about the importance of STI in daily life, and empowers communities to
              actively participate in Tanzania's scientific and technological development.
            </p>

            <div className="community-engagements-list">
              {communityEngagements.map((engagement) => (
                <div key={engagement.id} className="community-engagement-card">
                  <h3 className="community-engagement-title">{engagement.title}</h3>
                  <p className="community-engagement-description">{engagement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityEngagementsPage;

