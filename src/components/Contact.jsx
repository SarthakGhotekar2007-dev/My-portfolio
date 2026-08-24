import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaGithub, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import '../styles/contact.css';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle, sending, sent, error
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );
      setFormState('sent');
      setToastMessage('✓ Message sent successfully!');
      setTimeout(() => {
        setFormState('idle');
        setToastMessage('');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormState('error');
      setToastMessage('❌ Failed to send message.');
      setTimeout(() => {
        setFormState('idle');
        setToastMessage('');
      }, 4000);
    }
  };

  const contactItems = [
    {
      id: "phone",
      icon: <FaPhoneAlt />,
      title: "Phone",
      detail: personalInfo.phone,
      href: `tel:+918087615815`,
      target: "_self"
    },
    {
      id: "email",
      icon: <FaEnvelope />,
      title: "Email",
      detail: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      target: "_self"
    },
    {
      id: "location",
      icon: <FaMapMarkerAlt />,
      title: "Location",
      detail: "Sinnar, Nashik",
      href: "https://maps.google.com/?q=Sinnar,Nashik",
      target: "_blank"
    },
    {
      id: "linkedin",
      icon: <FaLinkedin />,
      title: "LinkedIn",
      detail: "View Profile",
      href: "https://www.linkedin.com/in/sarthak-ghotekar-137845389",
      target: "_blank"
    },
    {
      id: "github",
      icon: <FaGithub />,
      title: "GitHub",
      detail: "View Profile",
      href: "https://github.com/SarthakGhotekar2007-dev",
      target: "_blank"
    },

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="contact">
      {/* Background Layer */}
      <div className="contact-bg-grid"></div>
      <div className="contact-orb orb-cyan"></div>
      <div className="contact-orb orb-violet"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="contact-header"
      >
        <h2 className="contact-title">Have a project in mind? <span className="title-gradient">Let's build something together.</span></h2>
        <p className="contact-subtitle">
          Whether you have a project, an opportunity, or just want to connect, I'd love to hear from you.
        </p>
      </motion.div>

      <div className="contact-container">
        {/* Contact Cards */}
        <motion.div
          className="contact-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              className="contact-card-link"
              variants={itemVariants}
            >
              <div className="contact-card">
                <div className="card-content">
                  <div className="card-icon">{item.icon}</div>
                  <div className="card-details">
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </div>
                <FaArrowRight className="card-arrow" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter Your Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter Your Email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                placeholder="Enter Your Subject" 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                placeholder="Enter Your Message" 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`btn-submit ${formState === 'sent' ? 'success' : ''} ${formState === 'error' ? 'error' : ''}`}
              disabled={formState === 'sending' || formState === 'sent'}
            >
              {formState === 'idle' && (
                <>SEND MESSAGE <FaArrowRight className="btn-arrow" /></>
              )}
              {formState === 'sending' && 'SENDING... ⟳'}
              {formState === 'sent' && 'MESSAGE SENT ✓'}
              {formState === 'error' && 'TRY AGAIN ↻'}
            </button>
          </form>
        </motion.div>
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className="toast-notification"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
