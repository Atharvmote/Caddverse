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
import './App.css';

function App() {
  return (
    <>
      {/* 1. Global Interactive Blueprint Grid Background */}
      <BackgroundGrid />

      {/* 2. Floating Navbar */}
      <Header />

      {/* 3. Main Landing Page Sections */}
      <main>
        {/* Hero Section (including integrated bottom stats banner) */}
        <HeroSection />
        
        {/* About Caddverse grid split showcase */}
        <AboutCaddverse />
        
        {/* Key Course Catalog cards */}
        <CoursesSection />
        
        {/* Training & Corporate Upskilling section */}
        <TrainingUpskilling />
        
        {/* Why Choose split panel & Testimonials slider (merged as in the reference image) */}
        <WhyCaddverse />

        {/* Industries We Serve sector grid */}
        <IndustriesServe />

        {/* Recruitment Partners Monochrome Ribbon */}
        <Partners />

        {/* Accredited & Certified by NSDC, AICSM, Skill India, ISO */}
        <Certifications />

        {/* Contact and Enrollment/Inquiry Form split section */}
        <InquiryContact />

        {/* Bottom invitation ribbon banner */}
        <CtaBanner />
      </main>

      {/* 4. Luxury Footer */}
      <Footer />
    </>
  );
}

export default App;
