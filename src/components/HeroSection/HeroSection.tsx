import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, Target, Award, PenTool, Laptop, Building2, Settings, Briefcase, ChevronRight, Sparkles } from 'lucide-react';
import logoImg from '../../assets/newmodern.png';
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

// Verticals data structure for the interactive tech core
interface ServiceVertical {
  id: string;
  title: string;
  shortLabel: string;
  icon: React.ElementType;
  badge: string;
  description: string;
  tools: string[];
  nodeClass: string;
  accentColor: string;
  href: string;
}

const VERTICALS: ServiceVertical[] = [
  {
    id: 'cad-design',
    title: 'CAD Design & Engineering',
    shortLabel: 'CAD Design',
    icon: PenTool,
    badge: 'Industry Standard',
    description: 'Precision 2D Drafting & 3D Solid Parametric Modeling.',
    tools: ['AutoCAD', 'SolidWorks', 'Creo', 'CATIA'],
    nodeClass: 'v-node-top',
    accentColor: '#2563eb',
    href: '#explorer'
  },
  {
    id: 'it-solutions',
    title: 'IT & Software Solutions',
    shortLabel: 'IT Solutions',
    icon: Laptop,
    badge: 'Digital Core',
    description: 'Custom Enterprise Apps & Engineering Systems.',
    tools: ['Custom Software', 'Cloud', 'Web Dev', 'APIs'],
    nodeClass: 'v-node-top-right',
    accentColor: '#4f46e5',
    href: '#coming-soon-it-services'
  },
  {
    id: 'bim-modeling',
    title: 'BIM & Structural Modeling',
    shortLabel: 'BIM Modeling',
    icon: Building2,
    badge: 'AEC Certified',
    description: '3D BIM, Architectural, Structural & MEP Modeling.',
    tools: ['Revit', 'Navisworks', 'Tekla', 'BIM 360'],
    nodeClass: 'v-node-bottom-right',
    accentColor: '#0284c7',
    href: '#explorer'
  },
  {
    id: 'engg-services',
    title: 'Engineering & Simulation',
    shortLabel: 'Engg Services',
    icon: Settings,
    badge: 'High Precision',
    description: 'Finite Element Analysis (FEA), CFD & Simulation.',
    tools: ['ANSYS', 'HyperMesh', 'FEA', 'CFD'],
    nodeClass: 'v-node-bottom',
    accentColor: '#2563eb',
    href: '#explorer'
  },
  {
    id: 'training',
    title: 'Training & Upskilling',
    shortLabel: 'Training',
    icon: GraduationCap,
    badge: '100% Practical',
    description: 'NSDC Job-Oriented Training with Live Projects.',
    tools: ['NSDC Cert', 'Live Projects', 'Placement'],
    nodeClass: 'v-node-bottom-left',
    accentColor: '#059669',
    href: '#upskilling'
  },
  {
    id: 'consultancy',
    title: 'Consultancy & Advisory',
    shortLabel: 'Consultancy',
    icon: Briefcase,
    badge: 'Expert Advisory',
    description: 'Corporate BIM Workflows & Tech Advisory.',
    tools: ['BIM Audit', 'Workflow Opt', 'Advisory'],
    nodeClass: 'v-node-top-left',
    accentColor: '#7c3aed',
    href: '#explorer'
  }
];

export const HeroSection: React.FC = () => {
  const [activeVerticalIndex, setActiveVerticalIndex] = useState<number>(0);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(0);

  // Auto-cycle through verticals every 3.5s; resumes automatically 4.5s after user interaction
  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastInteractionTime < 4500) {
        return; // Pause auto-rotation temporarily if user interacted within the last 4.5s
      }
      setActiveVerticalIndex((prev) => (prev + 1) % VERTICALS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [lastInteractionTime]);

  const handleUserInteraction = (idx: number) => {
    setActiveVerticalIndex(idx);
    setLastInteractionTime(Date.now());
  };

  const activeVertical = VERTICALS[activeVerticalIndex];

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

          {/* Layer 2: Transparent glowing blueprint CAD vector curves */}
          <path d="M 650,800 C 800,740 900,600 1000,420 L 1000,800 Z" fill="url(#waveGlowGrad)" opacity="0.3" />
          
          <path d="M 650,800 C 800,740 900,600 1000,420" stroke="rgba(0, 68, 255, 0.2)" strokeWidth="1.5" />
          <path d="M 680,800 C 820,750 920,620 1000,450" stroke="rgba(0, 68, 255, 0.12)" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M 710,800 C 840,760 940,640 1000,480" stroke="rgba(0, 68, 255, 0.08)" strokeWidth="1" />
          <path d="M 740,800 C 860,770 960,660 1000,510" stroke="rgba(0, 68, 255, 0.04)" strokeWidth="1" strokeDasharray="2 6" />

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
            <linearGradient id="waveGlowGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#0044FF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
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
            {/* Title with Clash Display & Solid Blue highlights matching mockup */}
            <h1 className="hero-title">
              Where Learning<br />
              Meets <span className="highlight-blue">Innovation</span>.
            </h1>

            {/* Paragraph Subtitle */}
            <p className="hero-desc">
              India's premier gateway to elite CAD, BIM, and structural design careers. Gain hands-on competency with industry-relevant training, verifiable NSDC certifications, and dedicated placement support into top global firms.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <a href="#explorer" className="btn btn-primary btn-explore">
                Explore Courses
                <ArrowRight size={15} style={{ marginLeft: '6px' }} />
              </a>
            </div>
          </motion.div>

          {/* Right Side: Next-Gen Interactive Tech Core & Verticals Hub */}
          <div className="hero-visual">
            <div className="tech-core-wrapper">
              
              {/* DIAGRAM HUB CONTAINER */}
              <div className="tech-hub-diagram">
                {/* SVG Laser Radar Canvas */}
                <div className="tech-core-svg-canvas">
                  <svg width="100%" height="100%" viewBox="0 0 440 330" fill="none">
                    {/* Concentric Tech Rings around Center (220, 160) */}
                    <circle cx="220" cy="160" r="135" className="t-ring-outer" stroke="rgba(37, 99, 235, 0.15)" strokeWidth="1.2" strokeDasharray="4 8" />
                    <circle cx="220" cy="160" r="105" className="t-ring-mid" stroke="rgba(37, 99, 235, 0.1)" strokeWidth="1" />
                    <circle cx="220" cy="160" r="65" className="t-ring-inner" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1.5" strokeDasharray="2 4" />
                    
                    {/* Energy Beam Connections from Center Hub (220, 160) to 6 Node Positions */}
                    {/* 0: Top (220, 30) */}
                    <line x1="220" y1="160" x2="220" y2="30" className={`laser-beam ${activeVerticalIndex === 0 ? 'laser-beam-active' : ''}`} />
                    {/* 1: Top Right (350, 95) */}
                    <line x1="220" y1="160" x2="350" y2="95" className={`laser-beam ${activeVerticalIndex === 1 ? 'laser-beam-active' : ''}`} />
                    {/* 2: Bottom Right (350, 225) */}
                    <line x1="220" y1="160" x2="350" y2="225" className={`laser-beam ${activeVerticalIndex === 2 ? 'laser-beam-active' : ''}`} />
                    {/* 3: Bottom (220, 290) */}
                    <line x1="220" y1="160" x2="220" y2="290" className={`laser-beam ${activeVerticalIndex === 3 ? 'laser-beam-active' : ''}`} />
                    {/* 4: Bottom Left (90, 225) */}
                    <line x1="220" y1="160" x2="90" y2="225" className={`laser-beam ${activeVerticalIndex === 4 ? 'laser-beam-active' : ''}`} />
                    {/* 5: Top Left (90, 95) */}
                    <line x1="220" y1="160" x2="90" y2="95" className={`laser-beam ${activeVerticalIndex === 5 ? 'laser-beam-active' : ''}`} />
                  </svg>
                </div>

                {/* CENTER HUB: Clean Enlarged Brand Logo in exact center */}
                <div className="tech-center-core">
                  <img src={logoImg} alt="CADDverse Logo" className="core-logo-img" />
                </div>

                {/* 6 SURROUNDING VERTICAL GLASS CARDS */}
                <div className="vertical-nodes-container">
                  {VERTICALS.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = idx === activeVerticalIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`v-node-card ${item.nodeClass} ${isActive ? 'v-node-active' : ''}`}
                        onClick={() => handleUserInteraction(idx)}
                        onMouseEnter={() => handleUserInteraction(idx)}
                      >
                        <div className="v-node-icon-wrapper" style={{ color: isActive ? '#0044FF' : undefined }}>
                          <Icon size={16} />
                        </div>
                        <span className="v-node-title">{item.shortLabel}</span>
                        {isActive && <span className="v-node-pulse-dot" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DYNAMIC INTERACTIVE PREVIEW PANEL (STRUCTURED GLASS BLOCK) */}
              <div className="vertical-preview-glass-panel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVertical.id}
                    className="preview-content-box"
                    style={{ borderColor: `${activeVertical.accentColor}35` }}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="preview-header">
                      <div className="preview-title-group">
                        <span className="preview-badge" style={{ borderColor: `${activeVertical.accentColor}45`, color: activeVertical.accentColor, background: `${activeVertical.accentColor}10` }}>
                          <Sparkles size={11} /> {activeVertical.badge}
                        </span>
                        <h4 className="preview-heading">{activeVertical.title}</h4>
                      </div>
                      <a href={activeVertical.href} className="preview-cta-link">
                        Explore <ChevronRight size={13} />
                      </a>
                    </div>
                    
                    <p className="preview-description">{activeVertical.description}</p>
                    
                    <div className="preview-divider" />

                    {/* Software Tools Pills */}
                    <div className="preview-tools-list">
                      <span className="tools-label">Key Stack:</span>
                      {activeVertical.tools.map((tool, i) => (
                        <span key={i} className="tool-chip" style={{ color: activeVertical.accentColor, borderColor: `${activeVertical.accentColor}25`, background: `${activeVertical.accentColor}0D` }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
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
                  <AnimatedNumber value={10000} suffix="+" />
                </span>
                <span className="hero-stat-label">Students Trained</span>
              </div>
            </div>

            <div className="hero-stat-box">
              <div className="hero-stat-icon-container"><Users size={22} /></div>
              <div className="hero-stat-info">
                <span className="hero-stat-number">
                  <AnimatedNumber value={200} suffix="+" />
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
                  <AnimatedNumber value={10} suffix="+" />
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
