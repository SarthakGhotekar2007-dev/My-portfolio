import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserAstronaut, FaBrain, FaCode, FaBolt, FaPuzzlePiece } from 'react-icons/fa';
import '../styles/about.css';

const HighlightCard = ({ icon, title, description, delay, gradientClass }) => {
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
      className="highlight-card-wrapper"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="highlight-card"
        style={!isMobile ? {
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`
        } : {}}
      >
        <div className={`card-border-gradient ${gradientClass}`}></div>
        <div className="highlight-inner-content">
          <div className={`highlight-icon ${gradientClass}-icon`}>{icon}</div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  // 3D Tilt for Profile Card
  const profileCardRef = useRef(null);
  const [profileRotate, setProfileRotate] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      setIsMobile(true);
    }
  }, []);

  const handleProfileMouseMove = (e) => {
    if (isMobile) return;
    if (!profileCardRef.current) return;

    const card = profileCardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Profile card tilt is slightly less aggressive because it's larger
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    setProfileRotate({ x: rotateX, y: rotateY });

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleProfileMouseLeave = () => {
    if (isMobile) return;
    setProfileRotate({ x: 0, y: 0 });
    if (profileCardRef.current) {
      profileCardRef.current.style.setProperty('--mouse-x', '50%');
      profileCardRef.current.style.setProperty('--mouse-y', '50%');
    }
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* Background */}
      <div className="about-bg-elements">
        <div className="bg-glow about-blue-glow"></div>
        <div className="bg-glow about-violet-glow"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="about-container">
        <div className="about-layout">

          {/* Left: Profile Card */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="premium-profile-card"
              ref={profileCardRef}
              onMouseMove={handleProfileMouseMove}
              onMouseLeave={handleProfileMouseLeave}
              style={!isMobile ? {
                transform: `perspective(1000px) rotateX(${profileRotate.x}deg) rotateY(${profileRotate.y}deg) scale3d(1, 1, 1)`
              } : {}}
            >
              <div className="profile-border-gradient"></div>
              <div className="about-card-content">
                <div className="profile-image-wrapper">
                  <img src="/sarthak-profile.jpg" alt="Sarthak Ghotekar" className="profile-image" />
                </div>
                <div className="profile-details">
                  <h3>Sarthak Ghotekar</h3>
                  <div className="profile-info-list">
                    <div className="info-item">
                      <span className="info-label">Currently</span>
                      <span className="info-value">AI Full Stack Developer</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Based in</span>
                      <span className="info-value">Maharashtra, India</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Focus</span>
                      <span className="info-value">Web & Mobile Development</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Available for</span>
                      <span className="info-value highlight-text">Internship / Freelance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="about-right">

            <motion.div
              className="section-badge"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              ABOUT ME
            </motion.div>

            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Building Digital Experiences <span className="text-gradient">That Matter</span>
            </motion.h2>

            <motion.p
              className="about-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              My development journey spans across React, Python, FastAPI, and AI/LLM technologies. I'm passionate about building modern web and AI-powered applications, with a goal to solve meaningful problems and create real-world value through scalable software.
            </motion.p>

            {/* Compact Grid of Highlights using 3D Cards */}
            <div className="highlights-grid">
              <HighlightCard
                icon={<FaBrain />}
                title="AI Applications"
                description="Building intelligent systems and AI-powered apps (2026+)"
                delay={0.3}
                gradientClass="cyan"
              />
              <HighlightCard
                icon={<FaCode />}
                title="Full Stack Development"
                description="Scalable web apps with React, Python and PostgreSQL (2025)"
                delay={0.4}
                gradientClass="blue"
              />
              <HighlightCard
                icon={<FaBolt />}
                title="Performance Optimization"
                description="Fast, responsive and optimized user interfaces."
                delay={0.5}
                gradientClass="violet"
              />
              <HighlightCard
                icon={<FaPuzzlePiece />}
                title="Architecture Design"
                description="Clean, maintainable and modular code structures."
                delay={0.6}
                gradientClass="cyan"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
