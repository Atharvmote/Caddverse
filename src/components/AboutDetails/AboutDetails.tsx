import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Compass, Briefcase, Cpu, Award, Target } from 'lucide-react';
import './aboutdetails.css';

interface AboutDetailsProps {
  onBack: () => void;
}

export const AboutDetails: React.FC<AboutDetailsProps> = ({ onBack }) => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className="about-details-section">
      {/* Decorative background grid and blurs */}
      <div className="about-details-glow-1" />
      <div className="about-details-glow-2" />

      <div className="container">
        {/* Back Button */}
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Heading Block */}
        <div className="details-header">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="details-tag font-gradient">WHO WE ARE</span>
            <h1 className="details-title">About <span className="text-highlight">CADDverse Techlabs</span></h1>
            <div className="details-underline" />
            <p className="details-subtitle">
              Transforming Engineering Aspirations into Industry-Ready Excellence
            </p>
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="details-grid">
          {/* Card 1: Core Platform */}
          <motion.div 
            className="details-card main-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="card-icon-wrapper">
              <Compass size={24} />
            </div>
            <h3>Core Platform & Vision</h3>
            <p>
              CADDverse Techlabs is a next-generation Engineering Technology platform committed to nurturing skilled professionals and delivering innovative design solutions through advanced CAD-driven methodologies. We empower students, engineers, and organizations with industry-aligned knowledge, cutting-edge tools, and practical expertise to thrive in the evolving engineering landscape.
            </p>
          </motion.div>

          {/* Card 2: Our Foundations */}
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card-icon-wrapper">
              <Target size={24} />
            </div>
            <h3>Our Engineering Foundations</h3>
            <p>
              With a strong foundation in Computer-Aided Design (CAD), Computer-Aided Engineering (CAE), Computer-Aided Manufacturing (CAM), Building Information Modeling (BIM), and Product Development, we specialize in creating a bridge between theoretical learning and real-world engineering applications. Our training programs are meticulously designed to enhance technical proficiency, design thinking, and problem-solving capabilities through hands-on projects and industry-oriented practices.
            </p>
          </motion.div>

          {/* Card 3: Beyond Conventional Training */}
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-icon-wrapper">
              <BookOpen size={24} />
            </div>
            <h3>Beyond Conventional Training</h3>
            <p>
              At CADDverse Techlabs, we go beyond conventional training by fostering an environment of innovation, creativity, and continuous learning. Our expert-led programs enable learners to master industry-leading software platforms and develop the confidence required to excel in sectors such as Automotive, Mechanical Design, Manufacturing, Construction, Infrastructure, and Product Engineering.
            </p>
          </motion.div>

          {/* Card 4: Design & Consulting Services */}
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card-icon-wrapper">
              <Cpu size={24} />
            </div>
            <h3>Engineering Design & Consulting</h3>
            <p>
              Alongside our training excellence, we provide comprehensive Engineering Design & Consulting Services, supporting industries with solutions in 3D Modeling, CAD Drafting, Design Optimization, BIM Coordination, Engineering Documentation, and Digital Product Development. Our approach combines technical expertise, engineering precision, and modern design practices to deliver reliable and efficient solutions.
            </p>
          </motion.div>

          {/* Card 5: Career Development */}
          <motion.div 
            className="details-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="card-icon-wrapper">
              <Briefcase size={24} />
            </div>
            <h3>Career Development Initiatives</h3>
            <p>
              We believe professional success is built beyond technical knowledge. Therefore, our career development initiatives focus on enhancing employability through industry mentorship, project exposure, interview preparation, professional communication, and career guidance, enabling individuals to confidently transition into the engineering workforce.
            </p>
          </motion.div>

          {/* Card 6: Future-Ready Ecosystem */}
          <motion.div 
            className="details-card main-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card-icon-wrapper">
              <Award size={24} />
            </div>
            <h3>Future-Ready Ecosystem</h3>
            <p>
              Driven by innovation and future-ready technologies, CADDverse Techlabs continues to expand its capabilities across Digital Engineering, Automation, Industry 4.0, and emerging technology domains, creating a complete ecosystem where learning, engineering, and innovation converge.
            </p>
            <div className="card-tagline">
              CADDverse Techlabs — Empowering Engineers. Enabling Innovation. Shaping the Future of Design.
            </div>
          </motion.div>
        </div>

        {/* Footer Back Button */}
        <div className="details-footer-action">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};
