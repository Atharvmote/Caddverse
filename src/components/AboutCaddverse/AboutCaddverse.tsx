import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { PenTool, Cpu, Building2, GraduationCap, Briefcase, Eye, Target } from 'lucide-react';
import './aboutcaddverse.css';

export const AboutCaddverse: React.FC = () => {
  // Stagger animation container config
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about-us" className="about-wrapper section">
      {/* Mesh Ambient Glow Lights */}
      <div className="about-glow-mesh-1" />
      <div className="about-glow-mesh-2" />

      <div className="container">
        
        {/* Centered Section Header */}
        <div className="about-header-centered">
          <h2 className="section-title about-title">
            About <span className="text-highlight">Caddverse</span>
          </h2>
          <p className="about-subtitle">
            A trusted partner in engineering excellence and professional development
          </p>
          <div className="about-divider" />
        </div>

        <motion.div 
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Left Column: Interactive Grid Visual Card */}
          <motion.div className="about-visual-container" variants={cardVariants}>
            
            {/* Technical Blueprint Vector Accents behind Card */}
            <div className="about-blueprint-bg">
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                <circle cx="50" cy="50" r="45" stroke="rgba(37, 99, 235, 0.05)" strokeWidth="0.3" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="30" stroke="rgba(37, 99, 235, 0.03)" strokeWidth="0.2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(37, 99, 235, 0.02)" strokeWidth="0.2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(37, 99, 235, 0.02)" strokeWidth="0.2" />
              </svg>
            </div>

            <div className="about-main-card">
              <div className="about-inner-grid">
                
                {/* 1. Design Card */}
                <motion.div 
                  className="about-feature-box"
                  whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="about-feature-icon-wrapper">
                    <PenTool size={22} className="about-icon" />
                  </div>
                  <span className="about-feature-title">DESIGN</span>
                </motion.div>

                {/* 2. Analysis Card */}
                <motion.div 
                  className="about-feature-box"
                  whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="about-feature-icon-wrapper">
                    <Cpu size={22} className="about-icon" />
                  </div>
                  <span className="about-feature-title">ANALYSIS</span>
                </motion.div>

                {/* 3. Build Card */}
                <motion.div 
                  className="about-feature-box"
                  whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="about-feature-icon-wrapper">
                    <Building2 size={22} className="about-icon" />
                  </div>
                  <span className="about-feature-title">BUILD</span>
                </motion.div>

                {/* 4. Train Card */}
                <motion.div 
                  className="about-feature-box"
                  whileHover={{ y: -6, borderColor: 'rgba(255, 255, 255, 0.25)', backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="about-feature-icon-wrapper">
                    <GraduationCap size={22} className="about-icon" />
                  </div>
                  <span className="about-feature-title">TRAIN</span>
                </motion.div>

              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="about-floating-badge"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="badge-icon-container">
                <Briefcase size={18} />
              </div>
              <div className="badge-text-container">
                <span className="badge-number">8+</span>
                <span className="badge-label">Service Areas</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: About Content */}
          <motion.div className="about-content" variants={itemVariants}>
            <p className="about-desc">
              Founded in 2013, Caddverse is a premier engineering design and training institute dedicated to delivering innovative consultancy and professional training solutions across various engineering disciplines.
            </p>
            
            <p className="about-desc">
              We help businesses optimize their design processes while enabling students and professionals to acquire industry-relevant CAD, BIM, and CAE skills. Our mission is to create a strong ecosystem where engineering expertise, innovation, and practical learning come together to drive career growth and success.
            </p>

            {/* Vision and Mission Split */}
            <div className="vision-mission-grid">
              
              {/* Vision Card */}
              <motion.div 
                className="vision-mission-card"
                whileHover={{ y: -5, borderColor: 'rgba(0, 68, 255, 0.15)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="vm-icon-header">
                  <div className="vm-icon-wrapper">
                    <Eye size={18} />
                  </div>
                  <h3 className="vm-title">OUR VISION</h3>
                </div>
                <p className="vm-desc">
                  To become a trusted global leader in engineering training and consultancy, empowering the next generation of designers and engineers.
                </p>
              </motion.div>

              {/* Mission Card */}
              <motion.div 
                className="vision-mission-card"
                whileHover={{ y: -5, borderColor: 'rgba(0, 68, 255, 0.15)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="vm-icon-header">
                  <div className="vm-icon-wrapper">
                    <Target size={18} />
                  </div>
                  <h3 className="vm-title">OUR MISSION</h3>
                </div>
                <p className="vm-desc">
                  To deliver world-class training, placement assistance, and industry-oriented programs that bridge the gap between academia and industry requirements.
                </p>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
