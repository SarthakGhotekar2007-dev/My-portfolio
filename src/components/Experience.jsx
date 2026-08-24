import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';
import { FaBriefcase } from 'react-icons/fa';
import '../styles/experience.css';

const ExperienceCard = ({ item, index }) => {
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
    <motion.div 
      className="timeline-item"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="timeline-dot">
        <FaBriefcase />
      </div>
      <div className="timeline-content-wrapper">
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="timeline-content"
          style={!isMobile ? {
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`
          } : {}}
        >
          <div className="card-border-gradient"></div>
          <div className="experience-inner-content">
            <h3 className="timeline-role">{item.role}</h3>
            <h4 className="timeline-company">{item.company}</h4>
            <span className="timeline-duration">{item.duration}</span>
            <p className="timeline-desc">{item.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      {/* Background Elements */}
      <div className="experience-bg-grid"></div>
      <div className="experience-glow left"></div>
      <div className="experience-glow right"></div>

      <div className="experience-container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">CAREER</div>
          <h2 className="section-title">My <span className="text-gradient">Experience</span></h2>
        </motion.div>

        <div className="experience-timeline">
          {experience.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
