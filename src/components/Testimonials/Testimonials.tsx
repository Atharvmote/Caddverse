import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './testimonials.css';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: React.ReactNode;
}

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      name: 'Atul Khubalkar',
      role: 'BIM Engineer',
      company: 'L&T Construction',
      text: "Caddverse Techlabs shaped my career with practical training and the right guidance. Working on real-world Revit coordination files helped me crack the technical interview at L&T.",
      rating: 5,
      avatar: (
        <svg className="user-avatar-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.1" />
          {/* Stylized face avatar */}
          <circle cx="50" cy="40" r="16" fill="var(--royal-blue)" />
          <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
          <circle cx="45" cy="38" r="1.5" fill="var(--white)" />
          <circle cx="55" cy="38" r="1.5" fill="var(--white)" />
        </svg>
      ),
    },
    {
      name: 'Rajesh Taide',
      role: 'Structural Consultant',
      company: 'Tata Projects',
      text: "The STAAD.Pro and Revit courses are incredibly detailed. The instructors explain design codes, shear values, and bending calculations that you never get to study in college curricula.",
      rating: 5,
      avatar: (
        <svg className="user-avatar-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="var(--accent-blue)" opacity="0.1" />
          {/* Stylized male face avatar */}
          <circle cx="50" cy="40" r="14" fill="var(--accent-blue)" />
          <path d="M 24 75 C 24 58, 76 58, 76 75" fill="var(--accent-blue)" />
        </svg>
      ),
    },
    {
      name: 'Rajat Dewase',
      role: 'Associate BIM Designer',
      company: 'Aecom',
      text: "Excellent lab terminals and licensed software access. The placement team helped build my portfolio website and scheduled technical mock drills which were critical to my Aecom offer.",
      rating: 5,
      avatar: (
        <svg className="user-avatar-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="var(--electric-blue)" opacity="0.1" />
          {/* Stylized face avatar */}
          <circle cx="50" cy="39" r="15" fill="var(--electric-blue)" />
          <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--electric-blue)" />
          <path d="M 40 32 L 60 32" stroke="var(--white)" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: 'Yash Humane',
      role: 'Design Engineer',
      company: 'WSP',
      text: "The CAD and structural training programs are the best in class. The hands-on projects and industry-expert guidance gave me the confidence to excel in a global firm like WSP.",
      rating: 5,
      avatar: (
        <svg className="user-avatar-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.15" />
          <circle cx="50" cy="39" r="15" fill="var(--royal-blue)" />
          <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Framer Motion slide variants
  const slideVariants = {
    initial: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 80 : -80,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.3 },
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="placements" className="section testimonials-wrapper" ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">What Our Alumni Say</h2>
          <p className="section-desc">
            Discover how Caddverse helps engineering graduates transition into high-paying consulting and BIM jobs.
          </p>
        </div>

        {/* Testimonial Area */}
        <div className="testimonial-container">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="testimonial-card"
            >
              {/* Giant Quote mark decoration */}
              <Quote className="quote-icon-decor" size={80} strokeWidth={1} />

              {/* Text content block */}
              <div className="testimonial-content">
                <div className="testimonial-stars">
                  {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <blockquote className="testimonial-text">
                  "{currentTestimonial.text}"
                </blockquote>
              </div>

              {/* User row details */}
              <div className="testimonial-user">
                <div className="user-profile">
                  {currentTestimonial.avatar}
                  <div className="user-details">
                    <span className="user-name">{currentTestimonial.name}</span>
                    <span className="user-title">{currentTestimonial.role}</span>
                  </div>
                </div>

                <div className="brand-placed">
                  <span className="brand-placed-lbl">Placed at</span>
                  <span className="brand-placed-logo">{currentTestimonial.company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Left/Right floating controls */}
          <div className="slider-nav">
            <button 
              className="slider-btn" 
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="slider-btn" 
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bullet navigation dot rows */}
          <div className="slider-dots">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={`slider-dot ${idx === currentIndex ? 'slider-dot-active' : ''}`}
                onClick={() => {
                  setDirection(idx > currentIndex ? 'right' : 'left');
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
