import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence, useSpring } from 'framer-motion';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Map sub-sections to main nav links so the active state doesn't disappear
            const sectionMap = {
              'whatido': 'about',
              'github': 'projects'
            };
            setActiveSection(sectionMap[id] || id);
          }
        });
      },
      { threshold: 0.3 } // Element is considered active when 30% visible
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={(e) => {
          if (window.location.hash === '#home' || !window.location.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            e.preventDefault();
          }
        }}>
          <img src="/logo.png" alt="Sarthak Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">Sarthak Ghotekar</span>
        </a>

        <div className="nav-links">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`nav-item ${activeSection === link.href.substring(1) ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a href="#contact" className="lets-talk-btn">
            Let's Talk <span className="arrow">→</span>
          </a>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-item ${activeSection === link.href.substring(1) ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="mobile-lets-talk-btn" onClick={() => setIsOpen(false)}>
              Let's Talk <span className="arrow">→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
    </motion.nav>
  );
};

export default Navbar;
