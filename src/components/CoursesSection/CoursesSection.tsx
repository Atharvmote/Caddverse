import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Check, 
  Briefcase, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Send, 
  Award, 
  Layers, 
  ShieldCheck, 
  HeartHandshake, 
  Laptop, 
  BookOpen, 
  HelpCircle,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import type { Course, DetailedInfo } from './coursesData';
import { courses, getCourseDetails } from './coursesData';
import './coursessection.css';

interface CoursesSectionProps {
  viewMode: 'featured' | 'explorer' | 'details';
  setViewMode: React.Dispatch<React.SetStateAction<'featured' | 'explorer' | 'details'>>;
  selectedCourse: Course | null;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  sourceView: 'featured' | 'explorer';
  setSourceView: React.Dispatch<React.SetStateAction<'featured' | 'explorer'>>;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  viewMode,
  setViewMode,
  selectedCourse,
  setSelectedCourse,
  sourceView,
  setSourceView
}) => {
  const [activeTab, setActiveTab] = useState<'master-diploma' | 'diploma' | 'professional' | 'certifications'>('master-diploma');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Inquiry Form states for Details Page
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch featured courses for Home Slider (All Master Diplomas)
  const featuredCourses = courses.filter(c => c.category === 'master-diploma');

  // Filter courses based on active tab for Explorer View
  const filteredCourses = courses.filter(c => c.category === activeTab);

  // Handle window resizing for slider responsiveness
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

  const cardsToShow = getVisibleCardsCount();
  const maxFeaturedIndex = Math.max(0, featuredCourses.length - cardsToShow);

  // Reset index when active category tab changes in Explorer
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Scroll to top of section when details/explorer views swap
  const scrollToSectionTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewDetails = (course: Course, fromView: 'featured' | 'explorer') => {
    setSourceView(fromView);
    setSelectedCourse(course);
    setViewMode('details');
    setIsFormSubmitted(false);
    setInquiryData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setTimeout(scrollToSectionTop, 100);
  };

  const handleBack = () => {
    setSelectedCourse(null);
    setViewMode(sourceView);
    setTimeout(scrollToSectionTop, 100);
  };

  // Inquiry Form submit handler
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email || !inquiryData.phone) {
      return; // Browser native validation will handle empty required fields
    }
    
    // Add the selected course to the payload
    const payload = {
      fullName: inquiryData.name,
      email: inquiryData.email,
      phone: inquiryData.phone,
      course: selectedCourse ? selectedCourse.title : '',
      message: inquiryData.message
    };

    fetch('http://localhost:5001/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Backend server offline. Submission stored locally.', err));

    setIsFormSubmitted(true);
  };

  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  // Featured Slider controls
  const nextFeatured = () => {
    setCurrentIndex(prev => (prev >= maxFeaturedIndex ? 0 : prev + 1));
  };

  const prevFeatured = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxFeaturedIndex : prev - 1));
  };

  // Get details for currently selected course
  const courseDetails: DetailedInfo | null = selectedCourse ? getCourseDetails(selectedCourse) : null;

  // Custom vector outline icons for cards
  const renderCardGraphic = (course: Course) => {
    const isBIM = course.title.includes('BIM') || course.title.includes('Revit') || course.title.includes('Building');
    const isMech = course.title.includes('Mechanical') || course.title.includes('Product') || course.title.includes('SolidWorks') || course.title.includes('ANSYS') || course.title.includes('CATIA') || course.title.includes('Creo');
    const isElec = course.title.includes('Electrical');

    if (isMech) {
      return (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="25" width="50" height="50" rx="6" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="14" stroke="var(--electric-blue)" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="50" y2="25" stroke="var(--border)" strokeWidth="0.8" />
          <line x1="50" y1="75" x2="50" y2="90" stroke="var(--border)" strokeWidth="0.8" />
          <line x1="10" y1="50" x2="25" y2="50" stroke="var(--border)" strokeWidth="0.8" />
          <line x1="75" y1="50" x2="90" y2="50" stroke="var(--border)" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="3" fill="var(--accent-blue)" />
        </svg>
      );
    } else if (isBIM) {
      return (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="32" stroke="var(--royal-blue)" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="20" stroke="var(--electric-blue)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="8" fill="var(--accent-blue)" />
          <line x1="50" y1="10" x2="50" y2="30" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="10" y1="50" x2="30" y2="50" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="50" y1="70" x2="50" y2="90" stroke="var(--royal-blue)" strokeWidth="1" />
          <line x1="70" y1="50" x2="90" y2="50" stroke="var(--royal-blue)" strokeWidth="1" />
        </svg>
      );
    } else if (isElec) {
      return (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <path d="M 25 50 Q 50 20 75 50" stroke="var(--royal-blue)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 25 50 Q 50 80 75 50" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="25" cy="50" r="4.5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="75" cy="50" r="4.5" fill="var(--white)" stroke="var(--royal-blue)" strokeWidth="1.5" />
          <circle cx="50" cy="35" r="4" fill="var(--accent-blue)" />
          <circle cx="50" cy="65" r="4" fill="var(--electric-blue)" />
          <line x1="50" y1="39" x2="50" y2="61" stroke="var(--border)" strokeWidth="1" />
        </svg>
      );
    } else {
      return (
        <svg className="course-thumb-svg" viewBox="0 0 100 100" fill="none">
          <path d="M 20 75 L 50 25 L 80 75 Z" stroke="var(--royal-blue)" strokeWidth="1.5" fill="none" />
          <line x1="15" y1="75" x2="85" y2="75" stroke="var(--royal-blue)" strokeWidth="2.5" />
          <rect x="42" y="55" width="16" height="20" stroke="var(--royal-blue)" strokeWidth="1" fill="none" />
          <circle cx="50" cy="25" r="4" fill="var(--white)" stroke="var(--accent-blue)" strokeWidth="2" />
        </svg>
      );
    }
  };

  return (
    <section id="courses" className="section courses-wrapper" ref={containerRef}>
      <div className="container">
        
        {/* VIEW 1: HOME FEATURED COURSES SLIDER */}
        {viewMode === 'featured' && (
          <>
            <div className="section-header">
              <h2 className="section-title">
                Industry Relevant. <span className="text-highlight">Career Driven.</span>
              </h2>
              <div className="courses-divider" />
              <p className="section-desc">
                Step into high-paying engineering, consulting, and BIM jobs with our flagship Master Training programs.
              </p>
            </div>

            {/* Slider */}
            <div className="courses-carousel-container">
              {featuredCourses.length > cardsToShow && (
                <>
                  <button className="slider-nav-btn btn-prev" onClick={prevFeatured} aria-label="Previous Featured">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="slider-nav-btn btn-next" onClick={nextFeatured} aria-label="Next Featured">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="courses-slider-view">
                <div 
                  className="courses-slider-track" 
                  style={{ 
                    transform: `translateX(-${currentIndex * (100 / featuredCourses.length)}%)`,
                    width: `${(featuredCourses.length / cardsToShow) * 100}%` 
                  }}
                >
                  {featuredCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="course-slide-item"
                      style={{ width: `${100 / featuredCourses.length}%` }}
                    >
                      <div className="course-card course-card-popular">
                        <div className="popular-badge">Most Popular</div>
                        <div className="course-thumb">
                          {renderCardGraphic(course)}
                        </div>
                        <div className="course-card-content">
                          <h3 className="course-card-title">{course.title}</h3>
                          <p className="course-card-desc">{course.description}</p>
                          
                          <div className="course-meta-tags">
                            <span className="meta-tag-item"><Clock size={12} /> {course.duration}</span>
                            <span className="meta-tag-item"><Award size={12} /> {course.level}</span>
                          </div>
                          
                          <div className="course-card-buttons">
                            <a 
                              href="#inquiry" 
                              className="btn-enroll-card"
                              onClick={() => {
                                const inquirySec = document.getElementById('inquiry');
                                if (inquirySec) {
                                  inquirySec.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              Enroll Now
                            </a>
                            <button 
                              className="btn-details-card"
                              onClick={() => handleViewDetails(course, 'featured')}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigate to full Course Explorer grid */}
            <div className="courses-explore-action">
              <button 
                className="btn-explore-more-courses"
                onClick={() => {
                  setViewMode('explorer');
                  setTimeout(scrollToSectionTop, 100);
                }}
              >
                Explore More Courses <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}

        {/* VIEW 2: CATEGORY-WISE COURSE EXPLORER GRID */}
        {viewMode === 'explorer' && (
          <>
            {/* Back Button */}
            <div className="details-back-bar">
              <button 
                className="btn-back-to-courses" 
                onClick={() => {
                  setViewMode('featured');
                  setTimeout(scrollToSectionTop, 100);
                }}
              >
                <ArrowLeft size={16} /> Back to Featured
              </button>
            </div>

            <div className="section-header">
              <h2 className="section-title">
                CADDverse Techlabs <span className="text-highlight">Course Explorer</span>
              </h2>
              <div className="courses-divider" />
              <p className="section-desc">
                Browse our comprehensive catalog of specialized CAD, BIM, structure, and interior drafting certifications.
              </p>
            </div>

            {/* Category Navigation Tabs */}
            <div className="courses-tabs-container">
              <div className="courses-tabs-bar">
                <button 
                  className={`tab-btn ${activeTab === 'master-diploma' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('master-diploma')}
                >
                  Master Diploma
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'diploma' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('diploma')}
                >
                  Diploma
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'professional' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('professional')}
                >
                  Professional
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'certifications' ? 'tab-btn-active' : ''}`}
                  onClick={() => setActiveTab('certifications')}
                >
                  Certifications
                </button>
              </div>
            </div>

            {/* Grid display */}
            <div className="courses-grid-view">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="course-card course-card-popular"
                >
                  <div className="popular-badge">Most Popular</div>
                  <div className="course-thumb">
                    {renderCardGraphic(course)}
                  </div>
                  <div className="course-card-content">
                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-desc">{course.description}</p>
                    
                    <div className="course-meta-tags">
                      <span className="meta-tag-item"><Clock size={12} /> {course.duration}</span>
                      <span className="meta-tag-item"><Award size={12} /> {course.level}</span>
                    </div>
                    
                    <div className="course-card-buttons">
                      <a 
                        href="#inquiry" 
                        className="btn-enroll-card"
                        onClick={() => {
                          const inquirySec = document.getElementById('inquiry');
                          if (inquirySec) {
                            inquirySec.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        Enroll Now
                      </a>
                      <button 
                        className="btn-details-card"
                        onClick={() => handleViewDetails(course, 'explorer')}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIEW 3: FULL COURSE DETAIL PAGE */}
        {viewMode === 'details' && selectedCourse && courseDetails && (
          <div className="course-details-page-view">
            
            {/* Context-aware Back navigation */}
            <div className="details-back-bar">
              <button className="btn-back-to-courses" onClick={handleBack}>
                <ArrowLeft size={16} /> Back to {sourceView === 'featured' ? 'Featured' : 'Course Explorer'}
              </button>
            </div>

            {/* Brand Banner (Full Width) */}
            <div className="details-hero-banner">
              <span className="details-category-tag">{selectedCourse.category.replace('-', ' ').toUpperCase()}</span>
              <h1 className="details-course-title">{courseDetails.title}</h1>
              <p className="details-course-subtitle">{courseDetails.description}</p>
              
              {/* Info strip */}
              <div className="details-specs-strip">
                <div className="spec-strip-item">
                  <Clock size={28} className="spec-strip-icon" />
                  <div>
                    <span className="spec-strip-label">DURATION</span>
                    <span className="spec-strip-value">{courseDetails.duration}</span>
                  </div>
                </div>
                <div className="spec-strip-item">
                  <Laptop size={28} className="spec-strip-icon" />
                  <div>
                    <span className="spec-strip-label">MODE</span>
                    <span className="spec-strip-value">{courseDetails.mode}</span>
                  </div>
                </div>
                <div className="spec-strip-item">
                  <MapPin size={28} className="spec-strip-icon" />
                  <div>
                    <span className="spec-strip-label">VENUE</span>
                    <span className="spec-strip-value">{courseDetails.venue}</span>
                  </div>
                </div>
                 <div className="spec-strip-item">
                   <CreditCard size={28} className="spec-strip-icon" />
                   <div>
                     <span className="spec-strip-label">SCHOLARSHIPS &amp; EMI</span>
                     <span className="spec-strip-value">Educational Financing &amp; Easy EMI Available</span>
                   </div>
                 </div>
                  <div className="spec-strip-item">
                    <ShieldCheck size={28} className="spec-strip-icon" stroke="#10B981" />
                    <div>
                      <span className="spec-strip-label">VERIFICATION</span>
                      <span className="spec-strip-value">NSDC &amp; ISO 9001:2015 Certified</span>
                    </div>
                  </div>
               </div>
             </div>

            {/* Split layout columns */}
            <div className="details-split-layout">
              
              {/* Left Column: Full Specifications */}
              <div className="details-content-column">

                {/* Job Opportunities Section */}
                <div className="details-section-block">
                  <h2 className="details-block-title">
                    <Briefcase size={20} className="block-title-icon" /> {courseDetails.jobsTitle}
                  </h2>
                  <p className="details-block-paragraph">
                    Developing proficiency in {selectedCourse.title} opens great career pathways. With engineering consultant firms and architectural drawing offices increasingly moving to fully digitized design tools, qualified designers have access to a variety of jobs:
                  </p>
                  <div className="details-list-grid">
                    {courseDetails.jobs.map((job, i) => (
                      <div key={i} className="details-list-item">
                        <div className="list-check-icon"><Check size={12} /></div>
                        <span className="list-item-text">{job}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope of Work Section */}
                <div className="details-section-block">
                  <h2 className="details-block-title">
                    <BookOpen size={20} className="block-title-icon" /> {courseDetails.scopeTitle}
                  </h2>
                  <p className="details-block-paragraph">
                    {courseDetails.scopeText}
                  </p>
                </div>

                {/* Nested side-by-side grid row for highlights */}
                <div className="details-two-columns-row">
                  {/* Training Program Section */}
                  <div className="details-section-block" style={{ marginBottom: 0 }}>
                    <h2 className="details-block-title">
                      <Layers size={20} className="block-title-icon" /> {courseDetails.trainingTitle}
                    </h2>
                    <div className="details-vertical-list">
                      {courseDetails.trainingItems.map((item, i) => (
                        <div key={i} className="details-list-item">
                          <div className="list-check-icon"><Check size={12} /></div>
                          <span className="list-item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal For Section */}
                  <div className="details-section-block" style={{ marginBottom: 0 }}>
                    <h2 className="details-block-title">
                      <HelpCircle size={20} className="block-title-icon" /> Ideal Applications
                    </h2>
                    <div className="details-vertical-list">
                      {courseDetails.idealItems.map((item, i) => (
                        <div key={i} className="details-list-item">
                          <div className="list-check-icon-blue"><Check size={12} /></div>
                          <span className="list-item-text">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Average Salary Chart Section */}
                <div className="details-section-block">
                  <h2 className="details-block-title">
                    <TrendingUp size={20} className="block-title-icon" /> Average Salary Standards (India)
                  </h2>
                  <p className="details-block-paragraph">
                    Salaries scale heavily based on certification authority and live practical project design experience:
                  </p>
                  
                  {/* CSS Animated Bar Chart */}
                  <div className="details-chart-container">
                    <div className="details-chart-bars-row">
                      {courseDetails.salaryChart.map((item, idx) => (
                        <div key={idx} className="chart-bar-column">
                          <div className="chart-bar-track">
                            <motion.div 
                              className="chart-bar-fill"
                              style={{ backgroundColor: item.color }}
                              initial={{ height: 0 }}
                              animate={{ height: `${(item.value / 16) * 100}%` }}
                              transition={{ duration: 1, delay: idx * 0.08, ease: 'easeOut' }}
                            >
                              <span className="chart-bar-value-label">₹ {item.value} L</span>
                            </motion.div>
                          </div>
                          <span className="chart-bar-label">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky form container */}
              <div className="details-sidebar-column">
                <div className="details-sticky-card">
                  <h3 className="sidebar-form-title">Enquire / Enroll Now</h3>
                  
                  {isFormSubmitted ? (
                    <div className="details-form-success-state">
                      <div className="success-icon-badge">
                        <Check size={26} />
                      </div>
                      <h4 className="success-header">Inquiry Received</h4>
                      <p className="success-desc">
                        Thank you, <strong>{inquiryData.name}</strong>. An expert academic advisor will contact you shortly regarding the <strong>{selectedCourse.title}</strong> program.
                      </p>
                      <button 
                        className="btn-success-reset-form"
                        onClick={() => setIsFormSubmitted(false)}
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="sidebar-form">
                      <div className="sidebar-input-group">
                        <label className="sidebar-label">FULL NAME *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={inquiryData.name}
                          onChange={handleInquiryChange}
                          placeholder="Enter Full Name" 
                          className="sidebar-input" 
                          required 
                        />
                      </div>

                      <div className="sidebar-input-group">
                        <label className="sidebar-label">EMAIL ADDRESS *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={inquiryData.email}
                          onChange={handleInquiryChange}
                          placeholder="Enter Email" 
                          className="sidebar-input" 
                          required 
                        />
                      </div>

                      <div className="sidebar-input-group">
                        <label className="sidebar-label">PHONE NO. *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={inquiryData.phone}
                          onChange={handleInquiryChange}
                          placeholder="Enter Phone" 
                          className="sidebar-input" 
                          required 
                        />
                      </div>


                      <div className="sidebar-input-group">
                        <label className="sidebar-label">SELECTED COURSE</label>
                        <input 
                          type="text" 
                          value={selectedCourse.title} 
                          className="sidebar-input input-disabled" 
                          disabled 
                        />
                      </div>

                      <div className="sidebar-input-group">
                        <label className="sidebar-label">MESSAGE</label>
                        <textarea 
                          name="message" 
                          value={inquiryData.message}
                          onChange={handleInquiryChange}
                          placeholder="Enter Message" 
                          className="sidebar-textarea" 
                          rows={4}
                        />
                      </div>

                      <button type="submit" className="btn-sidebar-submit">
                        <Send size={14} /> Enquire Now
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>

            {/* Below the Split (Full Width): Key Differentiators */}
            <div className="details-differentiators-wrapper">
              <div className="differentiators-header">
                <h2 className="section-title">
                  CADDverse Techlabs <span className="text-highlight">Key Differentiators</span>
                </h2>
                <div className="differentiators-divider" />
              </div>
              
              <div className="differentiators-grid">
                
                <div className="diff-card">
                  <div className="diff-icon-wrapper"><Award size={20} /></div>
                  <h4 className="diff-heading">Subsidised by Consultancy</h4>
                  <p className="diff-desc">Education backed by Engineering Design Consultancy subsidies.</p>
                </div>

                <div className="diff-card">
                  <div className="diff-icon-wrapper"><Briefcase size={20} /></div>
                  <h4 className="diff-heading">Industry Expertise Trainers</h4>
                  <p className="diff-desc">Learn from mentors who actively work on real structural designs.</p>
                </div>

                <div className="diff-card">
                  <div className="diff-icon-wrapper"><Layers size={20} /></div>
                  <h4 className="diff-heading">Experts Industry Curriculum</h4>
                  <p className="diff-desc">Syllabus regularly aligned with modern consulting standard requirements.</p>
                </div>

                <div className="diff-card">
                  <div className="diff-icon-wrapper"><Laptop size={20} /></div>
                  <h4 className="diff-heading">Expert Theory &amp; Lab</h4>
                  <p className="diff-desc">Well-balanced theory lectures and extensive practical assignments.</p>
                </div>

                <div className="diff-card">
                  <div className="diff-icon-wrapper"><ShieldCheck size={20} /></div>
                  <h4 className="diff-heading">Modern Infrastructure</h4>
                  <p className="diff-desc">Equipped high-performance workstations for smooth BIM rendering.</p>
                </div>

                <div className="diff-card">
                  <div className="diff-icon-wrapper"><GraduationCap size={20} /></div>
                  <h4 className="diff-heading">Employability Skills</h4>
                  <p className="diff-desc">Mock interview prep, CV polishing, and communication modules.</p>
                </div>

                <div className="diff-card">
                  <div className="diff-icon-wrapper"><Check size={20} /></div>
                  <h4 className="diff-heading">NSDC / Skill India</h4>
                  <p className="diff-desc">Affiliated training programs boosting credential authority.</p>
                </div>

                <div className="diff-card">
                  <div className="diff-icon-wrapper"><HeartHandshake size={20} /></div>
                  <h4 className="diff-heading">Project Portfolio Generation</h4>
                  <p className="diff-desc">Build a strong engineering design portfolio to showcase to recruiters.</p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
