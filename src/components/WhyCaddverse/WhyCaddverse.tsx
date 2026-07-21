import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Users, BookOpen, Briefcase, Laptop, Award, Calendar, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './whycaddverse.css';

interface WhyPoint {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: React.ReactNode;
}

export const WhyCaddverse: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const points: WhyPoint[] = [
    {
      icon: <Users size={20} />,
      title: 'Industry Expert Trainers',
      desc: 'Learn from professionals with industry experience.',
    },
    {
      icon: <BookOpen size={20} />,
      title: '100% Practical Learning',
      desc: 'Hands-on training with live projects.',
    },
    {
      icon: <Briefcase size={20} />,
      title: 'Placement Assistance',
      desc: 'Dedicated placement support till you succeed.',
    },
    {
      icon: <Laptop size={20} />,
      title: 'Latest Software Access',
      desc: 'Work on industry-standard tools & technologies.',
    },
    {
      icon: <Award size={20} />,
      title: 'Personalized Mentorship',
      desc: 'One-to-one guidance for every student.',
    },
    {
      icon: <Calendar size={20} />,
      title: 'Flexible Learning',
      desc: 'Weekend & weekday batch options.',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Rohit Sharma',
      role: 'BIM Engineer',
      company: 'L&T Construction',
      text: "Caddverse Techlabs shaped my career with practical training and the right guidance. Today, I'm working with a top MNC as a BIM Engineer.",
      rating: 5,
      avatar: (
        <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.15" />
          <circle cx="50" cy="40" r="16" fill="var(--royal-blue)" />
          <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
        </svg>
      ),
    },
    {
      name: 'Priyanka Patel',
      role: 'Structural Architect',
      company: 'Tata Projects',
      text: "The structural steel designs and STAAD analysis taught here are top notch. It directly helped me clear my placement test at Tata Projects.",
      rating: 5,
      avatar: (
        <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="46" fill="var(--accent-blue)" opacity="0.15" />
          <circle cx="50" cy="40" r="14" fill="var(--accent-blue)" />
          <path d="M 24 75 C 24 58, 76 58, 76 75" fill="var(--accent-blue)" />
        </svg>
      ),
    },
    {
      name: 'Rohan Deshmukh',
      role: 'CAD Specialist',
      company: 'Aecom',
      text: "Authorized licenses, great labs, and mentors who are real engineering professionals. Best design academy in Bangalore.",
      rating: 5,
      avatar: (
        <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="46" fill="var(--electric-blue)" opacity="0.15" />
          <circle cx="50" cy="39" r="15" fill="var(--electric-blue)" />
          <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--electric-blue)" />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    initial: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 50 : -50,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.2 },
    }),
  };

  const activeTest = testimonials[currentIndex];

  return (
    <section id="our-journey" className="section why-section-wrapper" ref={containerRef}>
      <div className="container">
        
        {/* Centered Section Header */}
        <div className="why-header-centered">
          <span className="section-tag">Why Choose Caddverse?</span>
          <h2 className="section-title">
            Learn From <span className="text-highlight">Experts</span>. Build <span className="text-highlight">Real Careers</span>.
          </h2>
          <div className="why-divider" />
        </div>

        <div className="why-split-container">
          
          {/* Left Column: Why Choose Grid */}
          <motion.div 
            className="why-choose-left"
            initial={{ opacity: 0, x: -35 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="why-points-grid">
              {points.map((pt, idx) => (
                <div key={idx} className="why-point-item">
                  <div className="why-point-icon-box">
                    {pt.icon}
                  </div>
                  <div className="why-point-content">
                    <h3 className="why-point-title">{pt.title}</h3>
                    <p className="why-point-desc">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dark Testimonial Slider Card */}
          <motion.div 
            className="why-testimonial-right"
            initial={{ opacity: 0, x: 35 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="testimonial-dark-card">
              <Quote className="quote-icon-top" size={40} fill="currentColor" stroke="none" />

              <div className="test-content-wrapper">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <p className="test-text-dark">
                      "{activeTest.text}"
                    </p>

                    <div className="test-user-row">
                      <div className="test-user-avatar">
                        {activeTest.avatar}
                      </div>
                      <div className="test-user-details">
                        <span className="test-user-name">{activeTest.name}</span>
                        <span className="test-user-role">{activeTest.role}, {activeTest.company}</span>
                      </div>
                    </div>

                    <div className="test-stars-yellow">
                      {Array.from({ length: activeTest.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Bottom navigation row */}
              <div className="test-card-footer">
                <div className="test-dots-container">
                  {testimonials.map((_, idx) => (
                    <span
                      key={idx}
                      className={`test-dot ${idx === currentIndex ? 'test-dot-active' : ''}`}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 'right' : 'left');
                        setCurrentIndex(idx);
                      }}
                    />
                  ))}
                </div>

                <div className="test-nav-arrows">
                  <button className="test-arrow-btn" onClick={handlePrev} aria-label="Previous">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="test-arrow-btn" onClick={handleNext} aria-label="Next">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
