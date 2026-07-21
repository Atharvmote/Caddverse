import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './partners.css';

interface Recruiter {
  name: string;
  logo: React.ReactNode;
}

export const Partners: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const recruiters: Recruiter[] = [
    {
      name: 'L&T Construction',
      logo: (
        <svg className="partner-svg" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="140" height="40" rx="4" fill="transparent" />
          <path d="M20 10 H32 V14 H25 V30 H20 Z" fill="#F59E0B" />
          <path d="M37 20 H45 V24 H37 Z" fill="#F59E0B" />
          <path d="M50 10 H62 V14 H56 V30 H50 Z" fill="#1E3A8A" />
          <text x="66" y="27" fontFamily="var(--font-heading)" fontWeight="900" fontSize="13" fill="#1E3A8A" letterSpacing="0.2">L&amp;T Construction</text>
        </svg>
      ),
    },
    {
      name: 'AECOM',
      logo: (
        <svg className="partner-svg" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="28" fontFamily="var(--font-heading)" fontWeight="900" fontSize="24" fill="#004B87" letterSpacing="-1">AECOM</text>
          <circle cx="112" cy="20" r="6" fill="#3B82F6" />
        </svg>
      ),
    },
    {
      name: 'Tata Projects',
      logo: (
        <svg className="partner-svg" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="28" fontFamily="var(--font-heading)" fontWeight="900" fontSize="20" fill="#1E3A8A" letterSpacing="0.5">TATA</text>
          <text x="68" y="28" fontFamily="var(--font-body)" fontWeight="500" fontSize="13" fill="#475569" letterSpacing="0.2">PROJECTS</text>
        </svg>
      ),
    },
    {
      name: 'Wipro',
      logo: (
        <svg className="partner-svg" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wipro colorful dots surrounding typography */}
          <circle cx="20" cy="20" r="10" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="6" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="2" fill="#F59E0B" />
          <text x="38" y="27" fontFamily="var(--font-heading)" fontWeight="900" fontSize="18" fill="#0F172A">wipro</text>
        </svg>
      ),
    },
    {
      name: 'Hafele',
      logo: (
        <svg className="partner-svg" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="27" fontFamily="var(--font-heading)" fontWeight="900" fontSize="22" fill="#E30613" letterSpacing="0.2">HÄFELE</text>
        </svg>
      ),
    },
    {
      name: 'Jacobs',
      logo: (
        <svg className="partner-svg" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="10" y="28" fontFamily="var(--font-heading)" fontWeight="900" fontSize="22" fill="#007CC2" letterSpacing="-0.5">Jacobs</text>
        </svg>
      ),
    },
    {
      name: 'Arcadis',
      logo: (
        <svg className="partner-svg" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Arcadis stylized logo */}
          <path d="M12 12 H30 V18 H18 V30 H12 Z" fill="#FF5000" />
          <text x="36" y="27" fontFamily="var(--font-heading)" fontWeight="900" fontSize="18" fill="#FF5000" letterSpacing="-0.5">ARCADIS</text>
        </svg>
      ),
    },
  ];

  return (
    <section className="partners-wrapper" ref={containerRef}>
      <div className="container">
        <div className="partners-title">Our Recruitment Partners</div>
        <div className="partners-slider">
          {recruiters.map((recruiter, idx) => (
            <motion.div
              key={recruiter.name}
              className="partner-logo-box"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              {recruiter.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
