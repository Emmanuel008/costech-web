import React from 'react';
import './CommissionMembersPage.css';

const members = [
  {
    name: 'Prof. John Wajanga Kondoro',
    title: 'Commission Chairperson',
    image: '/assets/img/kandoro.jpg',
  },
  {
    name: 'Prof. Charles D. Kihampa',
    title: 'Commission Member',
    image: '/assets/img/kihampa.jpeg',
  },
  {
    name: 'Dr. Amos Muhunda Nungu',
    title: 'Commission Secretary',
    image: '/assets/img/dg.jpg',
  },
  {
    name: 'Dr. Mashaka E. Mdangi',
    title: 'Commission Member',
    image: '/assets/img/mdangi.png',
  },
  {
    name: 'Eng. Thabitha G. Etutu',
    title: 'Commission Member',
    image: '/assets/img/etutu.jpg',
  },
  {
    name: 'Adam Y. Mshangama',
    title: 'Commission Member',
    image: '/assets/img/mshangama.png',
  },
  {
    name: 'Dr. Abdulla R. Abdulla',
    title: 'Commission Vice Chairperson',
    image: '/assets/img/abdulla.jpg',
  },
  {
    name: 'Prof. Mohamed Ally Sheikh',
    title: 'Commission Member',
    image: '/assets/img/sheikh.jpg',
  },
];

const CommissionMembersPage = () => {
  return (
    <section className="commission-page">
      <div className="commission-container">
        <header className="commission-header">
          <h1>Commission Members</h1>
          <p>
            Meet the distinguished members of the COSTECH Commission who provide strategic
            leadership and oversight for the advancement of science, technology and innovation in
            Tanzania.
          </p>
        </header>

        <div className="commission-grid">
          {members.map((member) => (
            <article key={member.name} className="commission-card">
              <div className="commission-card-content">
                <div className="commission-image-wrapper">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="commission-card-body">
                  <h2>{member.name}</h2>
                  <p>{member.title}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommissionMembersPage;
