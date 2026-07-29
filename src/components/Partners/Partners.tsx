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
        <div className="partner-logo-inner">
          <svg className="partner-logo-svg lt-svg" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 H22 V14 H15 V30 H10 Z" fill="#F59E0B" />
            <path d="M27 20 H35 V24 H27 Z" fill="#F59E0B" />
            <path d="M40 10 H52 V14 H46 V30 H40 Z" fill="#1E3A8A" />
          </svg>
          <span className="partner-logo-text lt-text">L&T Construction</span>
        </div>
      ),
    },
    {
      name: 'AECOM',
      logo: (
        <div className="partner-logo-inner">
          <span className="partner-logo-text aecom-text">AECOM</span>
          <span className="aecom-dot"></span>
        </div>
      ),
    },
    {
      name: 'Tata Projects',
      logo: (
        <div className="partner-logo-inner tata-projects">
          <span className="tata-bold">TATA</span>
          <span className="projects-light">PROJECTS</span>
        </div>
      ),
    },
    {
      name: 'Wipro',
      logo: (
        <div className="partner-logo-inner wipro">
          <div className="wipro-rings">
            <span className="ring ring-1"></span>
            <span className="ring ring-2"></span>
            <span className="ring ring-3"></span>
          </div>
          <span className="partner-logo-text wipro-text">wipro</span>
        </div>
      ),
    },
    {
      name: 'Hafele',
      logo: (
        <div className="partner-logo-inner">
          <span className="partner-logo-text hafele-text">HÄFELE</span>
        </div>
      ),
    },
    {
      name: 'Jacobs',
      logo: (
        <div className="partner-logo-inner">
          <span className="partner-logo-text jacobs-text">Jacobs</span>
        </div>
      ),
    },
    {
      name: 'Arcadis',
      logo: (
        <div className="partner-logo-inner">
          <svg className="partner-logo-svg arcadis-svg" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12 H24 V18 H12 V30 H6 Z" fill="#FF5000" />
          </svg>
          <span className="partner-logo-text arcadis-text">ARCADIS</span>
        </div>
      ),
    },
  ];

  return (
    <section className="partners-wrapper" ref={containerRef}>
      <div className="container">
        <div className="partners-title">Career Opportunities in Top Companies</div>
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
