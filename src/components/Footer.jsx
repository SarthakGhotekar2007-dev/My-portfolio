import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
  };

  return (
    <footer className="footer-section">
      {/* Background Elements */}
      <div className="footer-bg-grid"></div>
      <div className="footer-glow-left"></div>
      <div className="footer-glow-right"></div>

      {/* Main Footer (Full Width, No Card) */}
      <motion.div
        className="footer-main"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ perspective: 1000 }}
      >
        <motion.div className="footer-brand" variants={itemVariants}>
          <div className="footer-logo">
            <img src="/logo.png" alt="Sarthak Logo" className="footer-logo-img" />
            <span className="footer-logo-text">Sarthak Ghotekar</span>
          </div>
          <p className="footer-tagline">AI & Full Stack Developer<br />Building modern digital experiences with code.</p>
        </motion.div>

        <motion.div className="footer-social-wrapper" variants={itemVariants}>
          <h4>Connect</h4>
          <div className="footer-social-icons">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="social-icon-link">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Sarthak Ghotekar. All rights reserved.
        </p>
        <button onClick={scrollToTop} className="btn-back-to-top">
          <FaArrowUp className="top-arrow" /> Back to top
        </button>
      </motion.div>

      {/* Animated Bottom Border */}
      <div className="footer-bottom-border"></div>
    </footer>
  );
};

export default Footer;
