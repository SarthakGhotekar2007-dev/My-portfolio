import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GitHubSection from './components/GitHubSection';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { motion } from 'framer-motion';

function App() {
  return (
    <>
      <CustomCursor />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Navbar />
      <main>
        <Hero />
        <About />
        <WhatIDo />
        <Skills />
        <Experience />
        <Projects />
        <GitHubSection />
        <Education />
        <Contact />
      </main>
      <Footer />
      </motion.div>
    </>
  );
}

export default App;
