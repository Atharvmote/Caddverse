import { useState, useEffect } from 'react';
import { BackgroundGrid } from './components/BackgroundGrid/BackgroundGrid';
import { Header } from './components/Header/Header';
import { HeroSection } from './components/HeroSection/HeroSection';
import { AboutCaddverse } from './components/AboutCaddverse/AboutCaddverse';
import { CoursesSection } from './components/CoursesSection/CoursesSection';
import { TrainingUpskilling } from './components/TrainingUpskilling/TrainingUpskilling';
import { WhyCaddverse } from './components/WhyCaddverse/WhyCaddverse';
import { IndustriesServe } from './components/IndustriesServe/IndustriesServe';
import { Partners } from './components/Partners/Partners';
import { Certifications } from './components/Certifications/Certifications';
import { InquiryContact } from './components/InquiryContact/InquiryContact';
import { CtaBanner } from './components/CtaBanner/CtaBanner';
import { Footer } from './components/Footer/Footer';
import type { Course } from './components/CoursesSection/coursesData';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'featured' | 'explorer' | 'details'>('featured');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sourceView, setSourceView] = useState<'featured' | 'explorer'>('featured');

  // Trigger smooth scroll to top of viewport when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewMode]);

  // Synchronize hash links with React state routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#all-courses' || hash === '#explorer') {
        setViewMode('explorer');
      } else if (hash === '#courses') {
        setViewMode('featured');
        // Scroll to courses section
        setTimeout(() => {
          const coursesSec = document.getElementById('courses');
          if (coursesSec) {
            coursesSec.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else if (hash === '#course-details') {
        setViewMode('details');
      } else if (hash === '' || hash === '#home') {
        setViewMode('featured');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // If it's a home page section anchor (e.g. #about-us, #our-journey)
        setViewMode('featured');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Execute on initial mount to capture page URL hashes
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {/* 1. Global Interactive Blueprint Grid Background */}
      <BackgroundGrid />

      {/* 2. Floating Navbar */}
      <Header />

      {/* 3. Conditional Page Render wrapper */}
      <main>
        {/* Render top home page segments ONLY in featured slider mode */}
        {viewMode === 'featured' && (
          <>
            <HeroSection />
            <AboutCaddverse />
          </>
        )}

        {/* Courses Section is always active, internally altering layout */}
        <CoursesSection 
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          sourceView={sourceView}
          setSourceView={setSourceView}
        />

        {/* Render bottom home page segments ONLY in featured slider mode */}
        {viewMode === 'featured' && (
          <>
            <TrainingUpskilling />
            <WhyCaddverse />
            <IndustriesServe />
            <Partners />
            <Certifications />
            <InquiryContact />
            <CtaBanner />
          </>
        )}
      </main>

      {/* 4. Luxury Footer */}
      <Footer />
    </>
  );
}

export default App;
