import React, { useRef, useState, useEffect } from 'react';
import { projects } from '../data/portfolioData';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaTimes } from 'react-icons/fa';
import '../styles/projects.css';

// Modal Component for Case Study
const CaseStudyModal = ({ project, isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>
            
            {project.image && (
              <img src={project.image} alt={project.name} className="modal-image" />
            )}
            
            <div className="modal-body">
              <h2>{project.name}</h2>
              <div className="project-badge" style={{ marginBottom: '20px' }}>
                ✦ {project.type}
              </div>
              
              <p>{project.description}</p>
              
              <h3>Key Features</h3>
              <ul className="modal-features">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              
              <div className="project-tech" style={{ marginTop: '30px', marginBottom: '0' }}>
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="modal-footer">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="action-link primary">
                    Live Demo <FaExternalLinkAlt size={14} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="action-link">
                    GitHub <FaGithub size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, index, isFeatured, onViewCaseStudy }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Constrained 3D tilt effect (max 5-7 deg)
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`project-card-wrapper ${isFeatured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1500 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card"
        style={{ rotateX, rotateY }}
      >
        {project.image && (
          <div className="project-image-container">
            <img src={project.image} alt={project.name} className="project-image" />
            <div className="project-image-overlay">
              <button 
                className="overlay-btn"
                onClick={() => onViewCaseStudy(project)}
              >
                View Case Study <FaArrowRight size={12} />
              </button>
            </div>
          </div>
        )}
        
        <div className="project-content">
          <span className="project-badge">✦ {project.type}</span>
          <h3 className="project-title">{project.name}</h3>
          
          <p className="project-description">
            {isFeatured 
              ? project.description 
              : project.description.length > 100 
                ? `${project.description.substring(0, 100)}...` 
                : project.description}
          </p>
          
          <div className="project-tech">
            {project.tech.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>

          {project.features && (
            <div className="project-features-container">
              <h4 className="features-title">Key Features:</h4>
              <ul className="project-impact-list">
                {project.features.slice(0, 4).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-actions">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="action-link-btn">
                Live Demo ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="action-link-btn">
                GitHub ↗
              </a>
            )}
            <button 
              className="action-link" 
              style={{ border: 'none', background: 'transparent', marginLeft: 'auto', padding: 0 }}
              onClick={() => onViewCaseStudy(project)}
            >
              View Case Study →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openCaseStudy = (project) => {
    setSelectedProject(project);
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-bg-grid"></div>

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured <span className="title-gradient">Projects</span></h2>
        <p className="section-subtitle">
          Things I've built & worked on. A selection of projects showcasing my development and problem-solving skills.
        </p>
        <div className="section-line"></div>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            isFeatured={false} 
            onViewCaseStudy={openCaseStudy}
          />
        ))}
      </div>

      <CaseStudyModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={closeCaseStudy} 
      />
    </section>
  );
};

export default Projects;
