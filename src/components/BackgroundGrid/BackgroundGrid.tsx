import React from 'react';
import { motion } from 'framer-motion';
import './backgroundgrid.css';

export const BackgroundGrid: React.FC = () => {
  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * -20,
  }));

  return (
    <div className="bg-wrapper">
      {/* Background CAD Grids */}
      <div className="bg-grid" />
      <div className="bg-grid-fine" />
      
      {/* Ambient Mesh Gradients */}
      <div className="bg-blob blob-blue-1" />
      <div className="bg-blob blob-blue-2" />
      <div className="bg-blob blob-accent" />
      
      {/* CAD Blueprint Rings */}
      <div className="bg-rings">
        <svg className="bg-rings-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" className="ring-circle" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="38" className="ring-circle-fast" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="28" className="ring-circle" strokeWidth="0.1" strokeDasharray="1 5" />
          <circle cx="50" cy="50" r="18" className="ring-circle-fast" strokeWidth="0.1" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="var(--royal-blue)" strokeWidth="0.05" strokeDasharray="2 4" opacity="0.4" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="var(--royal-blue)" strokeWidth="0.05" strokeDasharray="2 4" opacity="0.4" />
        </svg>
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ['0vh', '-100vh'],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Delicate Noise overlay */}
      <div className="bg-noise" />
    </div>
  );
};
