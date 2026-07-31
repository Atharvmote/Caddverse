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
    name: "Rahul Patil",
    role: "Mechanical Design Engineer",
    company: "Kirloskar Brothers Ltd.",
    text: "The AutoCAD and SolidWorks training was very practical. Every concept was explained with industry examples, which made learning much easier.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="16" fill="var(--royal-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
      </svg>
    ),
  },
  {
    name: "Aman Deshmukh",
    role: "Mechanical Engineer",
    company: "Thermax Ltd.",
    text: "The projects and assignments helped me improve my design skills. I feel much more confident while working on real industry drawings.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--accent-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="14" fill="var(--accent-blue)" />
        <path d="M 24 75 C 24 58, 76 58, 76 75" fill="var(--accent-blue)" />
      </svg>
    ),
  },
  {
    name: "Sneha Kulkarni",
    role: "Electrical Design Engineer",
    company: "Schneider Electric",
    text: "The Electrical CAD course covered everything from basics to advanced drawings. The practical sessions were very useful.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--electric-blue)" opacity="0.15" />
        <circle cx="50" cy="39" r="15" fill="var(--electric-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--electric-blue)" />
      </svg>
    ),
  },
  {
    name: "Kunal Bhandari",
    role: "Electrical Engineer",
    company: "ABB India",
    text: "Excellent learning environment with licensed software and experienced trainers. The course added real value to my career.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="16" fill="var(--royal-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
      </svg>
    ),
  },
  {
    name: "Akash Jadhav",
    role: "Civil Site Engineer",
    company: "L&T Construction",
    text: "The Civil CAD and quantity estimation sessions were very informative. The practical approach helped me understand real project workflows.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--accent-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="14" fill="var(--accent-blue)" />
        <path d="M 24 75 C 24 58, 76 58, 76 75" fill="var(--accent-blue)" />
      </svg>
    ),
  },
  {
    name: "Neha Pawar",
    role: "BIM Engineer",
    company: "Shapoorji Pallonji",
    text: "Learning Revit and BIM from experienced professionals was a great experience. The hands-on practice prepared me well for interviews.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--electric-blue)" opacity="0.15" />
        <circle cx="50" cy="39" r="15" fill="var(--electric-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--electric-blue)" />
      </svg>
    ),
  },
  {
    name: "Sagar More",
    role: "Student",
    company: "Mechanical Batch",
    text: "The trainers are patient and explain every topic until everyone understands. Their teaching style makes difficult concepts simple.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="16" fill="var(--royal-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
      </svg>
    ),
  },
  {
    name: "Pooja Joshi",
    role: "Student",
    company: "Civil Batch",
    text: "The faculty is very supportive and always ready to solve doubts, even after class hours. I really appreciated their guidance.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--accent-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="14" fill="var(--accent-blue)" />
        <path d="M 24 75 C 24 58, 76 58, 76 75" fill="var(--accent-blue)" />
      </svg>
    ),
  },
  {
    name: "Vikas Patil",
    role: "Student",
    company: "Electrical Batch",
    text: "Every trainer has strong industry knowledge and shares practical tips that are useful during interviews and on the job.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--electric-blue)" opacity="0.15" />
        <circle cx="50" cy="39" r="15" fill="var(--electric-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--electric-blue)" />
      </svg>
    ),
  },
  {
    name: "Aniket Wagh",
    role: "Design Engineer",
    company: "Tata Projects",
    text: "The institute provides a professional learning environment with modern labs and genuine software. Highly recommended for engineering students.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="16" fill="var(--royal-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
      </svg>
    ),
  },
  {
    name: "Shweta Deshpande",
    role: "Graduate Engineer Trainee",
    company: "Engineering Graduate",
    text: "I joined with very little practical knowledge, but the structured training helped me build confidence step by step.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--accent-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="14" fill="var(--accent-blue)" />
        <path d="M 24 75 C 24 58, 76 58, 76 75" fill="var(--accent-blue)" />
      </svg>
    ),
  },
  {
    name: "Nikhil Bhosale",
    role: "CAD Engineer",
    company: "AECOM",
    text: "The course content is well organized and focused on industry requirements. The mock interviews were also very helpful.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--electric-blue)" opacity="0.15" />
        <circle cx="50" cy="39" r="15" fill="var(--electric-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--electric-blue)" />
      </svg>
    ),
  },
  {
    name: "Komal Shinde",
    role: "Student",
    company: "Final Year Engineering",
    text: "The learning experience was excellent. Practical sessions, assignments, and trainer support made the course worth joining.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--royal-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="16" fill="var(--royal-blue)" />
        <path d="M 22 75 C 22 55, 78 55, 78 75" fill="var(--royal-blue)" />
      </svg>
    ),
  },
  {
    name: "Yash Mahajan",
    role: "Junior Design Engineer",
    company: "Godrej & Boyce",
    text: "The placement guidance and technical sessions improved my confidence. I was able to perform much better in interviews.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="46" fill="var(--accent-blue)" opacity="0.15" />
        <circle cx="50" cy="40" r="14" fill="var(--accent-blue)" />
        <path d="M 24 75 C 24 58, 76 58, 76 75" fill="var(--accent-blue)" />
      </svg>
    ),
  },
  {
    name: "Rutuja Kale",
    role: "Graduate Engineer",
    company: "Capgemini Engineering",
    text: "Great institute for learning engineering design software. The trainers focus on practical skills that are actually used in the industry.",
    rating: 5,
    avatar: (
      <svg className="user-avatar-svg" viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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
          <h2 className="section-title">
            Why choose <span className="text-highlight">CADDVERSE TECHLABS</span>
          </h2>
          <div className="why-divider" />
          <p className="why-subtitle">
            Empowering engineers with practical expertise, industry-aligned knowledge, and career opportunities.
          </p>
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
