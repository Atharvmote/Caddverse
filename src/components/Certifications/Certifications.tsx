import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './certifications.css';

interface Certification {
  title: string;
  subtitle: string;
  description: string;
  graphic: React.ReactNode;
}

export const Certifications: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const certs: Certification[] = [
    {
      title: 'NSDC Partner',
      subtitle: 'National Skill Development Corp.',
      description: 'Officially recognized training partner supporting skills enhancement across engineering domains.',
      graphic: (
        <svg className="cert-logo-svg" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="48" stroke="url(#goldGrad)" strokeWidth="2.5" />
          <path d="M 60 22 L 85 35 L 85 70 L 60 98 L 35 70 L 35 35 Z" fill="rgba(212, 175, 55, 0.05)" stroke="url(#goldGrad)" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="60" cy="52" r="10" stroke="url(#goldGrad)" strokeWidth="2" />
          <path d="M 45 76 Q 60 62 75 76" stroke="url(#goldGrad)" strokeWidth="2" fill="none" />
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA7C11" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      title: 'SKILL INDIA',
      subtitle: 'National Skill Initiative',
      description: 'Empowering engineering students with job-ready industrial CAD, BIM, and drafting expertise.',
      graphic: (
        <svg className="cert-logo-svg" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="45" stroke="var(--royal-blue)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="30" stroke="var(--electric-blue)" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="8" fill="var(--accent-blue)" />
          <path d="M 60 15 L 60 105 M 15 60 L 105 60 M 28 28 L 92 92 M 28 92 L 92 28" stroke="var(--electric-blue)" strokeWidth="1" opacity="0.5" />
          <circle cx="60" cy="30" r="3" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
          <circle cx="60" cy="90" r="3" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
          <circle cx="30" cy="60" r="3" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
          <circle cx="90" cy="60" r="3" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'AICSM Council',
      subtitle: 'Professional Education Standards',
      description: 'Registered council certification ensuring structural design courses match international blueprints.',
      graphic: (
        <svg className="cert-logo-svg" viewBox="0 0 120 120" fill="none">
          <polygon points="60,18 72,43 100,47 79,67 84,95 60,82 36,95 41,67 20,47 48,43" stroke="var(--royal-blue)" strokeWidth="2" fill="rgba(37, 99, 235, 0.05)" />
          <circle cx="60" cy="60" r="46" stroke="var(--border)" strokeWidth="0.8" />
          <circle cx="60" cy="60" r="42" stroke="var(--border)" strokeWidth="0.8" />
          <path d="M 32 40 Q 60 15 88 40" stroke="var(--royal-blue)" strokeWidth="1" strokeDasharray="1 2" />
          <circle cx="60" cy="57" r="6" fill="var(--accent-blue)" />
        </svg>
      ),
    },
    {
      title: 'ISO 9001:2015',
      subtitle: 'Quality Management Certified',
      description: 'Certified standard technical education delivery, curriculum design, and mock lab facilities.',
      graphic: (
        <svg className="cert-logo-svg" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="44" stroke="var(--electric-blue)" strokeWidth="2" />
          <circle cx="60" cy="60" r="38" stroke="var(--electric-blue)" strokeWidth="1" strokeDasharray="2 1" />
          <path d="M 42 60 L 53 72 L 78 45" stroke="var(--electric-blue)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="30" y="82" width="60" height="15" rx="3" fill="var(--royal-blue)" />
          <text x="60" y="92" fill="var(--white)" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="var(--font-heading)">ISO 9001</text>
        </svg>
      ),
    },
  ];

  return (
    <section id="certifications" className="section cert-wrapper" ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="cert-header">
          <span className="section-tag">Recognitions</span>
          <h2 className="section-title">
            Accredited &amp; <span className="text-highlight">Certified By</span>
          </h2>
          <p className="section-desc">
            Authorized training validations checking all professional CAD and BIM curricula
          </p>
          <div className="cert-divider" />
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
                {cert.graphic}
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
