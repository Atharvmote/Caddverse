import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import './header.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = ['Home', 'Courses', 'Our Journey', 'About Us', 'Placements', 'Resources'];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Exact Logo matching the image (Double Hexagon Outline + Bold 'C' Core) */}
            <a href="#home" className="header-logo" onClick={() => setActiveLink('Home')}>
              <svg className="header-logo-svg" viewBox="0 0 100 100" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0044FF" />
                    <stop offset="100%" stopColor="#091e4a" />
                  </linearGradient>
                </defs>
                {/* Outer Hexagon outline */}
                <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" stroke="url(#logoGrad)" strokeWidth="7.5" strokeLinejoin="round" />
                {/* Inner Hexagon outline */}
                <polygon points="50,19 77,34.5 77,65.5 50,81 23,65.5 23,34.5" stroke="url(#logoGrad)" strokeWidth="3.5" strokeLinejoin="round" />
                {/* Styled bold 'C' in the center */}
                <path d="M 61,38 C 57.5,33.5 49,33.5 45,39 C 40.5,45.5 40.5,54.5 45,61 C 49,66.5 57.5,66.5 61,62" stroke="url(#logoGrad)" strokeWidth="8.5" strokeLinecap="round" fill="none" />
              </svg>
              <div className="logo-text">
                <span className="logo-brand text-gradient-blue">CADDverse</span>
                <span className="logo-sub">Teachlab</span>
              </div>
            </a>

            {/* Navigation links (Desktop) */}
            <nav className="header-nav">
              {navLinks.map((link) => {
                const isActive = activeLink === link;
                const linkId = link.toLowerCase().replace(/\s+/g, '-');
                return (
                  <a
                    key={link}
                    href={`#${linkId}`}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => {
                      setActiveLink(link);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {link}
                      {link === 'Resources' && <ChevronDown size={14} className="nav-chevron" />}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="nav-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* CTA Actions (with toggle removed as requested) */}
            <div className="header-actions">
              <a href="#courses" className="btn btn-inquire">
                Inquire Now <ArrowRight size={14} style={{ marginLeft: '4px' }} />
              </a>
              
              {/* Mobile menu toggle */}
              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mobile-nav-overlay"
          >
            {navLinks.map((link) => {
              const linkId = link.toLowerCase().replace(/\s+/g, '-');
              return (
                <a
                  key={link}
                  href={`#${linkId}`}
                  className="mobile-nav-link"
                  onClick={() => {
                    setActiveLink(link);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
