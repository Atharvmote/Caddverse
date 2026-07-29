import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import nsdcLogo from '../../assets/nsdc.jpeg';
import skillindiaLogo from '../../assets/skillindia.jpeg';
import aicsmLogo from '../../assets/aicsm.jpeg';
import isoLogo from '../../assets/iso.jpeg';
import msmeLogo from '../../assets/msme.jpeg';
import './certifications.css';

interface Certification {
  title: string;
  subtitle: string;
  description: string;
  logoUrl: string;
}

export const Certifications: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const certs: Certification[] = [
    {
      title: 'NSDC Partner',
      subtitle: 'National Skill Development Corp.',
      description: 'Officially recognized training partner supporting skills enhancement across engineering domains.',
      logoUrl: nsdcLogo,
    },
    {
      title: 'SKILL INDIA',
      subtitle: 'National Skill Initiative',
      description: 'Empowering engineering students with job-ready industrial CAD, BIM, and drafting expertise.',
      logoUrl: skillindiaLogo,
    },
    {
      title: 'AICSM Council',
      subtitle: 'Professional Education Standards',
      description: 'Registered council certification ensuring structural design courses match international blueprints.',
      logoUrl: aicsmLogo,
    },
    {
      title: 'ISO 9001:2015',
      subtitle: 'Quality Management Certified',
      description: 'Certified standard technical education delivery, curriculum design, and mock lab facilities.',
      logoUrl: isoLogo,
    },
    {
      title: 'MSME Certification',
      subtitle: 'Ministry of MSME',
      description: 'Government of India certification validating professional standard skills training under enterprise development.',
      logoUrl: msmeLogo,
    },
  ];

  return (
    <section id="certifications" className="section cert-wrapper" ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="cert-header">
          <h2 className="section-title">
            Accredited &amp; <span className="text-highlight">Certified By</span>
          </h2>
          <div className="cert-divider" />
          <p className="section-desc">
            Authorized training validations checking all professional CAD and BIM curriculam
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="cert-grid">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.title}
              className="cert-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Graphic Logo Badge */}
              <div className="cert-badge-wrapper">
                <img src={cert.logoUrl} alt={cert.title} className="cert-logo-img" />
              </div>

              {/* Title Info */}
              <div className="cert-info">
                <h3 className="cert-title-text">{cert.title}</h3>
                <span className="cert-subtitle-text">{cert.subtitle}</span>
                <p className="cert-desc-text">{cert.description}</p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
