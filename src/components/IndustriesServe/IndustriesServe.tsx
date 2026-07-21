import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Car, Hammer, Building2, Compass, Box, GraduationCap, Briefcase } from 'lucide-react';
import './industriesserve.css';

interface Industry {
  icon: React.ReactNode;
  name: string;
}

export const IndustriesServe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const industries: Industry[] = [
    { icon: <Settings size={28} />, name: 'MANUFACTURING' },
    { icon: <Car size={28} />, name: 'AUTOMOTIVE' },
    { icon: <Hammer size={28} />, name: 'CONSTRUCTION' },
    { icon: <Building2 size={28} />, name: 'INFRASTRUCTURE' },
    { icon: <Compass size={28} />, name: 'ARCHITECTURE' },
    { icon: <Box size={28} />, name: 'PRODUCT DEVELOPMENT' },
    { icon: <GraduationCap size={28} />, name: 'EDUCATIONAL INSTITUTIONS' },
    { icon: <Briefcase size={28} />, name: 'CORPORATE ORGANIZATIONS' },
  ];

  return (
    <section id="industries" className="section industries-wrapper" ref={containerRef}>
      {/* Background Spotlight Glows */}
      <div className="industries-spotlight spotlight-left" />
      <div className="industries-spotlight spotlight-right" />

      <div className="container">
        
        {/* Section Header */}
        <div className="industries-header">
          <span className="section-tag">Target Sectors</span>
          <h2 className="section-title">
            Industries <span className="text-highlight">We Serve</span>
          </h2>
          <p className="section-desc">
            Delivering engineering excellence across diverse sectors and verticals
          </p>
          <div className="industries-divider" />
        </div>

        {/* Industries Grid */}
        <div className="industries-grid">
          {industries.map((ind, idx) => (
            <motion.div
              key={ind.name}
              className="industry-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="industry-icon-container">
                {ind.icon}
              </div>
              <h3 className="industry-name">{ind.name}</h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
