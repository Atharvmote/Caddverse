import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, Target, Award, PenTool, Cpu, Building2, Boxes, Briefcase } from 'lucide-react';
import './herosection.css';

// High-performance count ticker component to animate statistics
const AnimatedNumber: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds animation time
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic formula
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * value);

      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {displayValue >= 1000 ? (displayValue / 1000).toFixed(0) + 'k' : displayValue}
      {suffix}
    </span>
  );
};

export const HeroSection: React.FC = () => {

  return (
    <section id="home" className="hero-wrapper">
      {/* Mesh glow effects in the background */}
      <div className="bg-glow bg-glow-blue" />
      <div className="bg-glow bg-glow-white" />

      {/* 1. Refined CAD Vector Backdrop with Soft Mesh Glows & Corner Curves */}
      <div className="hero-wave-container">
        <svg viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          {/* Layer 1: Ambient Mesh Spotlight Blurs */}
          <circle cx="880" cy="700" r="350" fill="url(#heroGlowMesh1)" opacity="0.8" />
          <circle cx="750" cy="750" r="280" fill="url(#heroGlowMesh2)" opacity="0.6" />

          {/* Layer 2: Highly attractive premium layered corner curves */}
          <path d="M 720,800 C 850,750 940,650 1000,380 L 1000,800 Z" fill="url(#waveNavyGrad)" />
          <path d="M 650,800 C 800,740 900,600 1000,420 L 1000,800 Z" fill="url(#waveBlueGrad2)" />
          <path d="M 650,800 C 800,740 900,600 1000,420" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <path d="M 760,800 C 880,770 960,680 1000,480 L 1000,800 Z" fill="url(#waveTransBlueGrad)" opacity="0.45" />

          {/* Layer 3: Delicate Blueprint Vector Orbits & Grid lines */}
          <path d="M 450,800 Q 650,750 1000,580" stroke="rgba(37, 99, 235, 0.1)" strokeWidth="1.2" strokeDasharray="3 4" />
          <path d="M 350,800 Q 600,770 1000,680" stroke="rgba(37, 99, 235, 0.06)" strokeWidth="1" />
          
          <circle cx="780" cy="620" r="180" stroke="rgba(37, 99, 235, 0.08)" strokeWidth="1" />
          <circle cx="780" cy="620" r="220" stroke="rgba(37, 99, 235, 0.04)" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="780" cy="620" r="100" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="2 3" />
          
          {/* Coordinate crosshair lines */}
          <line x1="780" y1="200" x2="780" y2="900" stroke="rgba(37, 99, 235, 0.03)" strokeWidth="1" />
          <line x1="450" y1="620" x2="1100" y2="620" stroke="rgba(37, 99, 235, 0.03)" strokeWidth="1" />

          <defs>
            <radialGradient id="heroGlowMesh1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#4f46e5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heroGlowMesh2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="waveNavyGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="waveBlueGrad2" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="waveTransBlueGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.75" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10 }}>
        
        {/* Main Grid Content */}
        <div className="hero-container">
          
          {/* Left Side: Badge, Title & CTAs */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Small Glass Badge */}
            <div className="hero-badge">
              <span className="star-emoji">⭐</span> 13+ YEARS OF EDUCATIONAL EXCELLENCE
            </div>

            {/* Title with Clash Display & Solid Blue highlights matching mockup */}
            <h1 className="hero-title">
              Design Today.<br />
              <span className="highlight-blue">Engineer</span> Tomorrow.
            </h1>

            {/* Paragraph Subtitle */}
            <p className="hero-desc">
              India's leading training institute for CAD, BIM &amp; Engineering Design. Industry-focused programs with 95% placement assistance.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <a href="#courses" className="btn btn-primary btn-explore">
                Explore Courses
                <ArrowRight size={15} style={{ marginLeft: '6px' }} />
              </a>
            </div>
          </motion.div>

          {/* Right Side: Orbital Service Showcase with Static Layout */}
          <div className="hero-visual">
            <div className="visual-box orbit-widget-container" style={{ perspective: 1000 }}>
              {/* Concentric blueprint background lines linking cards */}
              <div className="orbit-blueprint-rings">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="35" className="v-ring-dashed" strokeWidth="0.38" />
                  <circle cx="50" cy="50" r="22" className="v-ring" strokeWidth="0.28" />
                </svg>
              </div>

              {/* CENTER CORE NODE: Caddverse shield logo in a glowing blue capsule card */}
              <div className="orbit-center-card">
                <svg viewBox="0 0 100 100" className="center-shield-svg" fill="none">
                  <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" stroke="#ffffff" strokeWidth="7" fill="none" strokeLinejoin="round" />
                  <polygon points="50,19 77,34.5 77,65.5 50,81 23,65.5 23,34.5" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" strokeLinejoin="round" />
                  <path d="M 61,38 C 57.5,33.5 49,33.5 45,39 C 40.5,45.5 40.5,54.5 45,61 C 49,66.5 57.5,66.5 61,62" stroke="#ffffff" strokeWidth="8.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              {/* Spinning container wrapper for orbiting nodes */}
              <div className="orbit-spinning-wrapper">
                
                {/* 1. CAD Design (Top Center) */}
                <div className="orbit-node node-cad-design">
                  <div className="orbit-node-icon"><PenTool size={14} /></div>
                  <span className="orbit-node-label">CAD Design</span>
                </div>

                {/* 2. CAE Analysis (Top Right) */}
                <div className="orbit-node node-cae-analysis">
                  <div className="orbit-node-icon"><Cpu size={14} /></div>
                  <span className="orbit-node-label">CAE Analysis</span>
                </div>

                {/* 3. BIM Modeling (Bottom Right) */}
                <div className="orbit-node node-bim-modeling">
                  <div className="orbit-node-icon"><Building2 size={14} /></div>
                  <span className="orbit-node-label">BIM Modeling</span>
                </div>

                {/* 4. 3D Printing (Bottom Center) */}
                <div className="orbit-node node-3d-printing">
                  <div className="orbit-node-icon"><Boxes size={14} /></div>
                  <span className="orbit-node-label">3D Printing</span>
                </div>

                {/* 5. Training (Bottom Left) */}
                <div className="orbit-node node-training">
                  <div className="orbit-node-icon"><GraduationCap size={14} /></div>
                  <span className="orbit-node-label">Training</span>
                </div>

                {/* 6. Consultancy (Top Left) */}
                <div className="orbit-node node-consultancy">
                  <div className="orbit-node-icon"><Briefcase size={14} /></div>
                  <span className="orbit-node-label">Consultancy</span>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Floating Glass Stats Bar */}
        <motion.div 
          className="hero-stats-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hero-stats-grid">
            <div className="hero-stat-box">
              <div className="hero-stat-icon-container"><GraduationCap size={22} /></div>
              <div className="hero-stat-info">
                <span className="hero-stat-number">
                  <AnimatedNumber value={15000} suffix="+" />
                </span>
                <span className="hero-stat-label">Students Trained</span>
              </div>
            </div>

            <div className="hero-stat-box">
              <div className="hero-stat-icon-container"><Users size={22} /></div>
              <div className="hero-stat-info">
                <span className="hero-stat-number">
                  <AnimatedNumber value={250} suffix="+" />
                </span>
                <span className="hero-stat-label">Recruiters</span>
              </div>
            </div>

            <div className="hero-stat-box">
              <div className="hero-stat-icon-container"><Target size={22} /></div>
              <div className="hero-stat-info">
                <span className="hero-stat-number">
                  <AnimatedNumber value={95} suffix="%" />
                </span>
                <span className="hero-stat-label">Placement Rate</span>
              </div>
            </div>

            <div className="hero-stat-box">
              <div className="hero-stat-icon-container"><Award size={22} /></div>
              <div className="hero-stat-info">
                <span className="hero-stat-number">
                  <AnimatedNumber value={13} suffix="+" />
                </span>
                <span className="hero-stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
