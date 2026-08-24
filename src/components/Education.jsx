import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { FaGraduationCap, FaSchool, FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { education } from '../data/portfolioData';
import '../styles/education.css';

const AnimatedCounter = ({ value }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100
  });

  const [displayValue, setDisplayValue] = useState("0.00");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(2));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}%</span>;
};

const Education = () => {
  // Mapping icons based on degree type
  const getIcon = (degree) => {
    if (degree.toLowerCase().includes('bachelor')) return <FaGraduationCap />;
    if (degree.toLowerCase().includes('higher')) return <FaSchool />;
    return <FaBookOpen />;
  };

  return (
    <section id="education" className="education-section">
      {/* Background Effects */}
      <div className="edu-bg-grid"></div>
      <div className="edu-glow-cyan"></div>

      {/* Header */}
      <div className="edu-header">
        <motion.h2 
          className="edu-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>
        <motion.p 
          className="edu-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My Academic Journey
        </motion.p>
      </div>

      <div className="timeline-container">
        {/* Animated Center Line */}
        <motion.div 
          className="timeline-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></motion.div>

        {education.map((edu, index) => {
          const isLeft = index % 2 === 0;
          const isCurrent = edu.status === "Currently Pursuing";
          
          return (
            <div key={index} className={`timeline-item ${isLeft ? 'left' : 'right'} ${isCurrent ? 'current' : ''}`}>
              
              <div className="timeline-empty"></div>
              
              <motion.div 
                className="timeline-node"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              ></motion.div>

              <motion.div 
                className="timeline-content"
                initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.2, type: "spring", stiffness: 70 }}
              >
                <div className={`edu-card ${isCurrent ? 'highlight' : ''}`}>
                  {isCurrent && (
                    <div className="current-badge">
                      <span className="dot"></span> CURRENT
                    </div>
                  )}
                  
                  {!isCurrent && (
                    <span className="edu-year">{edu.year}</span>
                  )}

                  <div className="edu-degree-wrapper">
                    <span className="edu-icon">{getIcon(edu.degree)}</span>
                    <h3 className="edu-degree">{edu.degree}</h3>
                  </div>
                  
                  <p className="edu-inst">{edu.institution}</p>
                  
                  <div className="edu-footer">
                    {isCurrent ? (
                      <>
                        <span className="edu-year" style={{ margin: 0 }}>{edu.year}</span>
                        <span className="edu-status">
                          {edu.status} <FaArrowRight />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="edu-muted">{edu.status.split(':')[0]}</span>
                        <span className="edu-percentage">
                          {edu.status.split(':')[1]}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <motion.div 
        className="edu-connection"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p>From academic foundations to building real-world applications.</p>
      </motion.div>
    </section>
  );
};

export default Education;
