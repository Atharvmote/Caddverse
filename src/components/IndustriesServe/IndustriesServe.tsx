import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Car, Hammer, Building2, Compass, Box, GraduationCap, Briefcase } from 'lucide-react';
import './industriesserve.css';

interface Industry {
  icon: React.ReactNode;
  name: string;
  points: string[];
}

export const IndustriesServe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  const industries: Industry[] = [
    {
      icon: <Settings size={28} />,
      name: 'MANUFACTURING',
      points: [
        'Industrial Plant Design',
        'Production Line Layouts',
        'Process Equipment Design',
        'Tooling & Fixture Design',
        'Reverse Engineering'
      ]
    },
    {
      icon: <Car size={28} />,
      name: 'AUTOMOTIVE',
      points: [
        'Vehicle Component Design',
        'Body & Chassis Design',
        'Jig & Fixture Design',
        'Simulation & Analysis',
        'Prototyping Support'
      ]
    },
    {
      icon: <Hammer size={28} />,
      name: 'CONSTRUCTION',
      points: [
        'Structural Design & Detailing',
        '3D Modeling & BIM',
        'Quantity Estimation (BOQ)',
        'Construction Drawings',
        'Project Documentation'
      ]
    },
    {
      icon: <Building2 size={28} />,
      name: 'INFRASTRUCTURE',
      points: [
        'Infrastructure Planning',
        'Road, Bridge & Tunnel Design',
        'Utility & Pipeline Layouts',
        'GIS Mapping & Surveying',
        '3D Visualization'
      ]
    },
    {
      icon: <Compass size={28} />,
      name: 'ARCHITECTURE',
      points: [
        'Architectural 2D & 3D Design',
        'Interior Design & Detailing',
        'Rendering & Visualization',
        'Walkthrough & Animations',
        'BIM for Architecture'
      ]
    },
    {
      icon: <Box size={28} />,
      name: 'PRODUCT DEVELOPMENT',
      points: [
        'Concept to Product Design',
        '3D CAD Modeling',
        'Design Validation & Analysis',
        'Prototype Development',
        'DFM & Cost Optimization'
      ]
    },
    {
      icon: <GraduationCap size={28} />,
      name: 'EDUCATIONAL INSTITUTIONS',
      points: [
        'CAD/CAM/CAE Training',
        'Industry-Oriented Curriculum',
        'Workshops & Seminars',
        'Campus to Corporate Programs',
        'Certification Courses'
      ]
    },
    {
      icon: <Briefcase size={28} />,
      name: 'CORPORATE ORGANIZATIONS',
      points: [
        'Design Outsourcing',
        'Drafting & Detailing Services',
        'Process Automation',
        'Technical Documentation',
        'Training & Skill Development'
      ]
    }
  ];

  return (
    <section id="industries" className="section industries-wrapper" ref={containerRef}>
      {/* Background Spotlight Glows */}
      <div className="industries-spotlight spotlight-left" />
      <div className="industries-spotlight spotlight-right" />

      <div className="container">
        
        {/* Section Header */}
        <div className="industries-header">
          <h2 className="section-title">
            Industries <span className="text-highlight">We Serve</span>
          </h2>
          <div className="industries-divider" />
          <p className="section-desc">
            Delivering engineering excellence across diverse sectors and verticals
          </p>
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
              
              <ul className="industry-points-list">
                {ind.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
