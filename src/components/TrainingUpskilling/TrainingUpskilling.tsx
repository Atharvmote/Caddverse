import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Check, 
  Award, 
  Cpu, 
  Users, 
  Layers, 
  Bookmark, 
  Rocket 
} from 'lucide-react';
import './trainingupskilling.css';

export const TrainingUpskilling: React.FC = () => {
  // Motion Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 16 }
    }
  };

  return (
    <section id="upskilling" className="section upskilling-wrapper">
      {/* Background elements */}
      <div className="upskilling-glow-1" />
      <div className="upskilling-glow-2" />

      <div className="container">
        
        {/* Section Header */}
        <div className="upskilling-header">
          <h2 className="section-title upskilling-title">
            Professional Training & <span className="text-highlight">Corporate Upskilling</span>
          </h2>
          <p className="upskilling-subtitle">
            Our training programs are designed to equip students, professionals, and organizations with practical skills and industry knowledge required in today's competitive environment.
          </p>
          <div className="upskilling-divider" />
        </div>

        {/* Training Cards Grid */}
        <motion.div 
          className="upskilling-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Card 1: Student Training */}
          <motion.div className="upskilling-card" variants={itemVariants}>
            <div className="card-top-icon">
              <GraduationCap size={24} />
            </div>
            <h3 className="card-title">STUDENT TRAINING</h3>
            <p className="card-desc">
              Industry-ready skills for engineering students and fresh graduates
            </p>
            
            <ul className="card-list">
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                CAD Training
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                CAE Training
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                BIM Training
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Product Design Training
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Industry Projects
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Internship Programs
              </li>
            </ul>

            <a href="#courses" className="btn btn-card-action">
              Enroll Now
            </a>
          </motion.div>

          {/* Card 2: Corporate Training */}
          <motion.div className="upskilling-card" variants={itemVariants}>
            <div className="card-top-icon">
              <Briefcase size={22} />
            </div>
            <h3 className="card-title">CORPORATE TRAINING</h3>
            <p className="card-desc">
              Customized upskilling programs for organizations and professionals
            </p>
            
            <ul className="card-list">
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Customized Corporate Programs
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Engineering Software Training
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Product Development Workshops
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Technology Upskilling Programs
              </li>
              <li>
                <span className="list-icon-wrapper"><Check size={14} /></span>
                Industry-Specific Certifications
              </li>
            </ul>

            <a href="#contact" className="btn btn-card-action btn-outline">
              Get Quote
            </a>
          </motion.div>

          {/* Card 3: Training Benefits */}
          <motion.div className="benefits-card" variants={itemVariants}>
            <h3 className="benefits-title">TRAINING BENEFITS</h3>
            
            <div className="benefits-grid">
              
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Award size={18} />
                </div>
                <div className="benefit-text">
                  <h4>Industry-Oriented Curriculum</h4>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Cpu size={18} />
                </div>
                <div className="benefit-text">
                  <h4>Hands-on Learning</h4>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Users size={18} />
                </div>
                <div className="benefit-text">
                  <h4>Expert Trainers</h4>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Layers size={18} />
                </div>
                <div className="benefit-text">
                  <h4>Real-World Projects</h4>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Bookmark size={18} />
                </div>
                <div className="benefit-text">
                  <h4>Certification Programs</h4>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Rocket size={18} />
                </div>
                <div className="benefit-text">
                  <h4>Career Development Support</h4>
                </div>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
