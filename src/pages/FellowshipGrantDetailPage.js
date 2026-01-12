import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/pages/FellowshipGrantDetailPage.css';
import { getFellowshipGrants } from '../services/api';

const FellowshipGrantDetailPage = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiGrants = await getFellowshipGrants();
        
        if (apiGrants && apiGrants.length > 0) {
          // Find the program by ID
          const foundProgram = apiGrants.find(
            (grant) => String(grant.id || grant.grant_id) === String(id)
          );
          
          if (foundProgram) {
            // Map API response to component structure
            let status = 'open';
            let statusText = 'Open';
            
            if (foundProgram.status) {
              const statusLower = foundProgram.status.toLowerCase();
              if (statusLower.includes('open') || statusLower === 'active') {
                status = 'open';
                statusText = foundProgram.status || 'Open';
              } else if (statusLower.includes('closed') || statusLower === 'inactive') {
                status = 'closed';
                statusText = foundProgram.status || 'Closed';
              } else {
                statusText = foundProgram.status;
              }
            } else if (foundProgram.deadline) {
              statusText = `Open until ${foundProgram.deadline}`;
            }
            
            const mappedProgram = {
              id: foundProgram.id || foundProgram.grant_id,
              status,
              statusText,
              title: foundProgram.title || foundProgram.name || 'Untitled Grant',
              description: foundProgram.description || foundProgram.desc || '',
              fullDescription: foundProgram.full_description || foundProgram.fullDescription || foundProgram.description || foundProgram.desc || '',
              url: foundProgram.url || foundProgram.link || foundProgram.website || foundProgram.external_url || '#'
            };
            
            setProgram(mappedProgram);
          } else {
            setProgram(null);
          }
        } else {
          setProgram(null);
        }
      } catch (err) {
        console.error('FellowshipGrantDetailPage: Error fetching fellowship grant:', err);
        setError(err.message);
        setProgram(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgram();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="fellowship-grant-detail-page">
        <div className="detail-container">
          <p>Loading program details...</p>
        </div>
      </section>
    );
  }

  if (error || !program) {
    return (
      <section className="fellowship-grant-detail-page">
        <div className="detail-container">
          <h1>Program Not Found</h1>
          <p>{error || 'The requested program could not be found.'}</p>
          <Link to="/fellowships-grants" className="back-link">← Back to Fellowships and Grants</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="fellowship-grant-detail-page">
      <div className="detail-hero">
        <div className="detail-hero-content">
          <Link to="/fellowships-grants" className="back-link">← Back to Fellowships and Grants</Link>
          <div className="detail-header">
            <span className={`detail-status ${program.status}`}>
              {program.statusText}
            </span>
            <h1>{program.title}</h1>
          </div>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-container">
          <div className="detail-content">
            <p className="detail-description">{program.fullDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FellowshipGrantDetailPage;

