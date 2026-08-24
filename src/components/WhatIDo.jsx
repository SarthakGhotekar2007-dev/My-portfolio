import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { whatIDo } from '../data/portfolioData';
import { FaGlobe, FaMobileAlt, FaServer, FaPalette } from 'react-icons/fa';
import '../styles/whatido.css';

const iconMap = {
  web: <FaGlobe />,
  mobile: <FaMobileAlt />,
  backend: <FaServer />,
  uiux: <FaPalette />
};

const ServiceCard = ({ item }) => {
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
    <div
      ref={cardRef}
      className="whatido-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={!isMobile ? {
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`
      } : {}}
    >
      <div className="card-border-gradient"></div>
      <div className="card-inner-content">
        <div className="whatido-icon-container">
          {iconMap[item.icon]}
        </div>
        <h3 className="whatido-title">{item.title}</h3>
        <p className="whatido-desc">{item.description}</p>
        
        <div className="whatido-explore">
          Explore Service <span className="explore-arrow">→</span>
        </div>
      </div>
    </div>
  );
};

const WhatIDo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="whatido" className="whatido-section">
      <div className="floating-bg-elements">
        <div className="bg-orb blue-orb"></div>
        <div className="bg-orb violet-orb"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="whatido-container">
        <div className="section-header center">
          <motion.div 
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHAT I DO
          </motion.div>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Building Digital Solutions <span className="text-gradient">That Matter</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Combining modern development, clean design and scalable technologies to build meaningful digital experiences.
          </motion.p>
        </div>

        <motion.div 
          className="whatido-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {whatIDo.map((item, index) => (
            <motion.div key={item.id || index} variants={itemVariants} className="card-wrapper">
              <ServiceCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIDo;
