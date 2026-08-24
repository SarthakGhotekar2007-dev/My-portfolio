import React, { useRef, useState, useEffect } from 'react';
import { skills } from '../data/portfolioData';
import { motion } from 'framer-motion';
import { 
  FaLaptopCode, FaReact, FaServer, FaDatabase, FaCloud, FaTools, FaBrain,
  FaHtml5, FaCss3Alt, FaKey, FaGitAlt, FaGithub, FaCode 
} from 'react-icons/fa';
import { 
  SiPython, SiJavascript, SiBootstrap, SiTailwindcss, SiVite, SiFastapi,
  SiPostgresql, SiSupabase, SiMongodb, SiVercel, SiRender, SiFirebase,
  SiPostman, SiDart, SiNodedotjs
} from 'react-icons/si';
import '../styles/skills.css';

// Map skill names to icons
const getSkillIcon = (skillName) => {
  const iconMap = {
    "Dart": <SiDart />,
    "Python": <SiPython />,
    "JavaScript": <SiJavascript />,
    "Node.js": <SiNodedotjs />,
    "SQL": <FaDatabase />,
    "HTML": <FaHtml5 />,
    "CSS": <FaCss3Alt />,
    "HTML5": <FaHtml5 />,
    "CSS3": <FaCss3Alt />,
    "React": <FaReact />,
    "Flutter": <FaReact />,
    "React.js": <FaReact />,
    "Bootstrap": <SiBootstrap />,
    "Tailwind CSS": <SiTailwindcss />,
    "Vite": <SiVite />,
    "FastAPI": <SiFastapi />,
    "REST API": <FaServer />,
    "JWT Authentication": <FaKey />,
    "PostgreSQL": <SiPostgresql />,
    "Supabase": <SiSupabase />,
    "MongoDB": <SiMongodb />,
    "Vercel": <SiVercel />,
    "Render": <SiRender />,
    "Firebase": <SiFirebase />,
    "Git": <FaGitAlt />,
    "GitHub": <FaGithub />,
    "VS Code": <FaCode />,
    "Postman": <SiPostman />
  };
  return iconMap[skillName] || <FaLaptopCode />;
};

// Map categories to icons
const getCategoryIcon = (category) => {
  const iconMap = {
    programming: <FaLaptopCode />,
    frontend: <FaReact />,
    backend: <FaServer />,
    database: <FaDatabase />,
    cloud: <FaCloud />,
    tools: <FaTools />,
    additional: <FaBrain />
  };
  return iconMap[category.toLowerCase()] || <FaLaptopCode />;
};

const SkillCard = ({ category, items, index }) => {
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

  const isFeatured = category.toLowerCase() === 'programming';

  return (
    <motion.div 
      className={`skill-card-wrapper ${isFeatured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="skill-category"
        style={!isMobile ? {
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`
        } : {}}
      >
        <div className="card-border-gradient"></div>
        <div className="skill-inner-content">
          <div className="category-header">
            <div className="category-icon-wrapper">
              <div className="category-icon">{getCategoryIcon(category)}</div>
            </div>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          </div>
          
          <div className="skills-list">
            {items.map((skill, idx) => (
              <div key={idx} className="skill-tag">
                <span className="skill-icon">{getSkillIcon(skill)}</span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="floating-bg-elements">
        <div className="bg-orb blue-orb"></div>
        <div className="bg-orb violet-orb"></div>
        <div className="bg-grid"></div>
      </div>

      <motion.div
        className="section-header center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-badge">EXPERTISE</div>
        <h2 className="section-title">Technical <span className="text-gradient">Skills</span></h2>
        <p className="section-subtitle">Technologies and tools I use to build modern digital products.</p>
      </motion.div>
      
      <div className="skills-container">
        {['frontend', 'backend', 'database', 'programming', 'tools', 'cloud']
          .filter(category => skills[category])
          .map((category, idx) => (
            <SkillCard key={category} category={category} items={skills[category]} index={idx} />
        ))}
      </div>

      <motion.div 
        className="currently-exploring"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h4 className="exploring-title">Currently Exploring</h4>
        <div className="exploring-list">
          {["Artificial Intelligence", "Advanced React", "FastAPI", "Cloud Architectures"].map((item, idx) => (
            <div key={idx} className="exploring-item">
              <div className="pulsing-dot"></div>
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
