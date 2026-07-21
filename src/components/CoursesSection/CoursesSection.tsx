import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './coursessection.css';

interface Course {
  title: string;
  description: string;
  duration: string;
  level: string;
  isPopular?: boolean;
  skills: string[];
  graphic: React.ReactNode;
}

export const CoursesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const courses: Course[] = [
    {
      title: 'Master Diploma in Product Design & Analysis',
      description: 'Learn product design & engineering analysis. Master AutoCAD, SolidWorks, ANSYS, and Catia.',
      duration: '6 Months',
      level: 'Advanced',
      isPopular: true,
      skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Catia'],
      graphic: (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="25" width="50" height="50" rx="6" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="14" stroke="var(--electric-blue)" strokeWidth="1.5" />
          <path d="M 50 10 L 50 25" stroke="var(--border)" strokeWidth="0.8" />
          <path d="M 50 75 L 50 90" stroke="var(--border)" strokeWidth="0.8" />
          <path d="M 10 50 L 25 50" stroke="var(--border)" strokeWidth="0.8" />
          <path d="M 75 50 L 90 50" stroke="var(--border)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="3" fill="var(--accent-blue)" />
        </svg>
      ),
    },
    {
      title: 'Master In Building Information Modeling (BIM)',
      description: 'Complete BIM workflow. Master Revit Architecture, Structure, MEP, and Navisworks.',
      duration: '6 Months',
      level: 'Advanced',
      skills: ['Revit Arc', 'Revit Struct', 'Revit MEP', 'Navisworks'],
      graphic: (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" stroke="var(--royal-blue)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="22" stroke="var(--electric-blue)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="var(--accent-blue)" />
          <line x1="50" y1="15" x2="50" y2="36" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="15" y1="50" x2="28" y2="50" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="50" y1="64" x2="50" y2="85" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="72" y1="50" x2="85" y2="50" stroke="var(--royal-blue)" strokeWidth="1" />
          <circle cx="50" cy="15" r="3.5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
          <circle cx="15" cy="50" r="3.5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
          <circle cx="50" cy="85" r="3.5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
          <circle cx="85" cy="50" r="3.5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Master Diploma in Architecture Design',
      description: 'Design commercial & residential spaces. Master AutoCAD, Revit, 3ds Max, and V-Ray.',
      duration: '6 Months',
      level: 'Advanced',
      skills: ['AutoCAD', 'Revit Arc', '3ds Max', 'V-Ray'],
      graphic: (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <path d="M 20 75 L 50 25 L 80 75 Z" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <line x1="20" y1="75" x2="80" y2="75" stroke="var(--royal-blue)" strokeWidth="2" />
          <line x1="35" y1="50" x2="65" y2="50" stroke="var(--electric-blue)" strokeWidth="1.5" />
          <rect x="42" y="58" width="16" height="17" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="50" y1="58" x2="50" y2="75" stroke="var(--royal-blue)" strokeWidth="1" />
          <circle cx="50" cy="25" r="3.5" fill="var(--white)" stroke="var(--accent-blue)" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Master Diploma in Electrical Design',
      description: 'Design advanced electrical layouts & wiring. Master AutoCAD Electrical and calculations.',
      duration: '4 Months',
      level: 'Intermediate',
      skills: ['AutoCAD Elec', 'Panel Design', 'SLD Layouts', 'Cable Sizing'],
      graphic: (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <path d="M 25 50 Q 50 20 75 50" stroke="var(--royal-blue)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 25 50 Q 50 80 75 50" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="25" cy="50" r="5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="75" cy="50" r="5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="50" cy="35" r="4" fill="var(--accent-blue)" />
          <circle cx="50" cy="65" r="4" fill="var(--electric-blue)" />
          <line x1="50" y1="39" x2="50" y2="61" stroke="var(--border)" strokeWidth="1" />
        </svg>
      ),
    },
    {
      title: 'Master Diploma in Building Design',
      description: 'Complete building structure & foundation design. Master Revit, STAAD.Pro, and AutoCAD.',
      duration: '6 Months',
      level: 'Advanced',
      skills: ['Revit Struct', 'STAAD Pro', 'AutoCAD', 'Structural FEA'],
      graphic: (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="20" width="50" height="60" rx="3" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <line x1="25" y1="35" x2="75" y2="35" stroke="var(--electric-blue)" strokeWidth="1" />
          <line x1="25" y1="50" x2="75" y2="50" stroke="var(--electric-blue)" strokeWidth="1" />
          <line x1="25" y1="65" x2="75" y2="65" stroke="var(--electric-blue)" strokeWidth="1" />
          <line x1="42" y1="20" x2="42" y2="80" stroke="var(--border)" strokeWidth="0.8" />
          <line x1="58" y1="20" x2="58" y2="80" stroke="var(--border)" strokeWidth="0.8" />
        </svg>
      ),
    },
    {
      title: 'Master Diploma in Interior Design',
      description: 'Learn modern interior spaces & styling. Master 3ds Max, V-Ray, SketchUp and rendering.',
      duration: '4 Months',
      level: 'Intermediate',
      skills: ['3ds Max', 'V-Ray rendering', 'SketchUp', 'Layout Planning'],
      graphic: (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <line x1="50" y1="15" x2="50" y2="85" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="15" y1="32" x2="50" y2="50" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="85" y1="32" x2="50" y2="50" stroke="var(--royal-blue)" strokeWidth="1" />
          <rect x="25" y="48" width="15" height="15" stroke="var(--accent-blue)" strokeWidth="1" />
          <circle cx="70" cy="52" r="6" stroke="var(--electric-blue)" strokeWidth="1" />
        </svg>
      ),
    },
  ];

  // Carousel slider state logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleCardsCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const visibleCards = getVisibleCardsCount();
  const maxIndex = courses.length - visibleCards;

  // Correct index if it exceeds max bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [visibleCards, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="courses" className="section courses-wrapper" ref={containerRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Our Popular Courses</span>
          <h2 className="section-title">
            Industry Relevant. <span className="text-highlight">Career Driven.</span>
          </h2>
          <p className="section-desc">
            Practical training. Real-world projects. Placement assistance.
          </p>
          <div className="courses-divider" />
        </div>

        {/* Carousel Slider */}
        <div className="courses-carousel-wrapper">
          
          {/* Left Arrow Button */}
          <button 
            className="carousel-arrow arrow-left"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slider Outer Mask Container */}
          <div className="courses-slider-outer">
            <div 
              className="courses-slider-track"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {courses.map((course, idx) => (
                <div 
                  key={course.title}
                  className="course-card-wrapper"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <motion.div
                    className="course-card course-card-popular"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: (idx % visibleCards) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="popular-badge">Most Popular</div>
                    
                    {/* Graphic Thumbnail */}
                    <div className="course-thumb">
                      {course.graphic}
                    </div>

                    {/* Body */}
                    <div className="course-body">
                      <h3 className="course-title" style={{ textAlign: 'center' }}>{course.title}</h3>
                      <p className="course-desc" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {course.description}
                      </p>

                      <div className="course-meta" style={{ justifyContent: 'center', marginTop: 'var(--space-2)' }}>
                        <span className="course-badge">
                          <Clock size={12} style={{ marginRight: '3px' }} />
                          {course.duration}
                        </span>
                        <span className="course-badge">
                          <User size={12} style={{ marginRight: '3px' }} />
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Side-by-Side Action Buttons */}
                    <div className="course-card-actions">
                      <a href="#inquiry" className="btn btn-enroll">
                        Enroll Now
                      </a>
                      <a href="#inquiry" className="btn btn-details">
                        View Details
                      </a>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button 
            className="carousel-arrow arrow-right"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        {/* Centered Explore More Action Button */}
        <div className="courses-explore-action">
          <a href="#all-courses" className="btn btn-explore-more">
            Explore More <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};
