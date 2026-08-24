import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { FaGithub, FaCodeBranch, FaStar, FaCode } from 'react-icons/fa';
import '../styles/githubsection.css';

const GitHubSection = () => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsMobile(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotate({ x: rotateX, y: rotateY });
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setRotate({ x: 0, y: 0 });
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mouse-x', '50%');
      cardRef.current.style.setProperty('--mouse-y', '50%');
    }
  };

  return (
    <section id="github" className="github-section">
      <div className="floating-bg-elements">
        <div className="bg-orb blue-orb"></div>
        <div className="bg-orb violet-orb"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="github-container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">OPEN SOURCE</div>
          <h2 className="section-title">GitHub <span className="text-gradient">Activity</span></h2>
          <h3 style={{ fontSize: '1.4rem', color: '#F8FAFC', margin: '15px 0 10px 0' }}>Code. Build. <span className="text-gradient">Commit. Repeat.</span></h3>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginTop: '0' }}
          >
            A glimpse into my development journey and open-source work.
          </motion.p>
        </motion.div>

        <motion.div 
          className="github-card-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div 
            ref={cardRef}
            className="github-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={!isMobile ? {
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`
            } : {}}
          >
            <div className="card-border-gradient"></div>
            <div className="github-card-content card-inner-content">
              <FaGithub className="github-bg-icon" />
              <div className="github-info">
                <h3>Check out my code</h3>
                <p>Explore my open-source projects, contributions, and coding activity on GitHub.</p>
                
                <div className="github-stats-mock">
                  <div className="stat-pill"><FaCode /> Repositories</div>
                  <div className="stat-pill"><FaCodeBranch /> Commits</div>
                  <div className="stat-pill"><FaStar /> Projects</div>
                </div>

                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="github-btn">
                  Visit GitHub Profile <span className="explore-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
