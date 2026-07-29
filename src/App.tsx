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
import { ComingSoon } from './components/ComingSoon/ComingSoon';
import { AboutDetails } from './components/AboutDetails/AboutDetails';
import { QuoteRequest } from './components/QuoteRequest/QuoteRequest';
import { TermsAndConditions } from './components/TermsAndConditions/TermsAndConditions';
import type { Course } from './components/CoursesSection/coursesData';
import { WhatsAppWidget } from './components/WhatsAppWidget/WhatsAppWidget';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'featured' | 'explorer' | 'details' | 'coming-soon' | 'about-details' | 'quote' | 'terms'>('featured');
  const [comingSoonTitle, setComingSoonTitle] = useState('IT Services');
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
      } else if (hash === '#inquiry') {
        setViewMode('featured');
        // Scroll to inquiry section
        setTimeout(() => {
          const inquirySec = document.getElementById('inquiry');
          if (inquirySec) {
            inquirySec.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else if (hash === '#about-details') {
        setViewMode('about-details');
      } else if (hash === '#quote') {
        setViewMode('quote');
      } else if (hash === '#terms-conditions') {
        setViewMode('terms');
      } else if (hash === '#about-us') {
        setViewMode('featured');
        // Scroll to about-us section
        setTimeout(() => {
          const aboutSec = document.getElementById('about-us');
          if (aboutSec) {
            aboutSec.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else if (hash.startsWith('#coming-soon-')) {
        const pageKey = hash.replace('#coming-soon-', '');
        const titleMap: Record<string, string> = {
          'it-services': 'IT Services',
          'about-director': 'About Director',
          'blogs': 'Blogs',
          'career': 'Career',
          'photo-gallery': 'Photo Gallery',
          'video-gallery': 'Video Gallery',
          'student-projects': 'Student Projects',
          'our-infrastructure': 'Our Infrastructure'
        };
        const title = titleMap[pageKey] || 'Services';
        setComingSoonTitle(title);
        setViewMode('coming-soon');
      } else if (hash === '#course-details') {
        setViewMode('details');
      } else if (hash === '' || hash === '#home') {
        setViewMode('featured');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // If it's a home page section anchor (e.g. #our-journey)
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

        {/* Courses Section is active in featured/explorer/details views */}
        {(viewMode === 'featured' || viewMode === 'explorer' || viewMode === 'details') && (
          <CoursesSection 
            viewMode={viewMode as any}
            setViewMode={setViewMode as any}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            sourceView={sourceView}
            setSourceView={setSourceView}
          />
        )}

        {/* Coming Soon page view */}
        {viewMode === 'coming-soon' && (
          <ComingSoon 
            title={comingSoonTitle}
            onBack={() => {
              window.location.hash = '#home';
            }}
          />
        )}

        {/* Render About Details page */}
        {viewMode === 'about-details' && (
          <AboutDetails 
            onBack={() => {
              window.location.hash = '#home';
            }}
          />
        )}

        {/* Render Get Quote / Careers Page */}
        {viewMode === 'quote' && (
          <QuoteRequest 
            onBack={() => {
              window.location.hash = '#home';
            }}
          />
        )}

        {/* Render Terms and Conditions */}
        {viewMode === 'terms' && (
          <TermsAndConditions 
            onBack={() => {
              window.location.hash = '#home';
            }}
          />
        )}

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

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />
    </>
  );
}

export default App;

