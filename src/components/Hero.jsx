import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import SceneWrapper from '../components3D/SceneWrapper';
import Hero3D from '../components3D/Hero3D';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };



  return (
    <section id="home" className="hero" onMouseMove={handleMouseMove}>
      <div className="hero-bg">
        <div className="radial-glow"></div>
        <div className="violet-glow"></div>
        <div className="fine-grid"></div>
      </div>

      <div 
        className="cursor-glow" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px` 
        }}
      ></div>

      <div className="hero-content-wrapper">
        <motion.div 
          className="hero-content" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.h1 className="hero-title" variants={childVariants}>
            <span className="greeting">Hi, I'm</span>
            <br />
            <span className="name-gradient">{personalInfo.name}</span>
          </motion.h1>
          
          <motion.div className="hero-subtitle-container" variants={childVariants}>
            <h2 className="hero-subtitle">
              {personalInfo.titles[0]}
            </h2>
          </motion.div>
          
          <motion.p className="hero-description" variants={childVariants}>
            {personalInfo.tagline}
          </motion.p>

          <motion.div className="hero-stats" variants={childVariants}>
            <div className="stat-item">
              <h3>05+</h3>
              <p>Projects</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Technologies</p>
            </div>
            <div className="stat-item">
              <h3>05+</h3>
              <p>Certifications</p>
            </div>
          </motion.div>
          
          <motion.div className="hero-buttons" variants={childVariants}>
            <motion.a 
              href="#projects" 
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work <FaArrowRight className="btn-icon" />
            </motion.a>
            <motion.a 
              href="/resume.pdf" 
              download="Sarthak_Ghotekar_Resume.pdf"
              className="btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume <FaDownload className="btn-icon" />
            </motion.a>
          </motion.div>

          <motion.div className="hero-socials" variants={childVariants}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`}><FaEnvelope /> Email</a>
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-3d-wrapper">
        <SceneWrapper>
          <Hero3D />
        </SceneWrapper>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <div className="scroll-line">
          <motion.div 
            className="scroll-dot"
            animate={{ y: [0, 24, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
