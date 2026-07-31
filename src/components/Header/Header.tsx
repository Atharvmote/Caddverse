import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import logoImg from '../../assets/newmodern.png';
import './header.css';

interface SubLink {
  label: string;
  href: string;
}

interface NavLinkItem {
  label: string;
  href?: string;
  subLinks?: SubLink[];
}

const navItems: NavLinkItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'About Us',
    href: '#about-us',
    subLinks: [
      { label: 'About CADDverse Techlabs', href: '#about-details' },
      { label: 'About Director', href: '#about-director' },
    ],
  },
  {
    label: 'Services',
    subLinks: [
      { label: 'CAD Service', href: '#explorer' },
      { label: 'IT Service', href: '#coming-soon-it-services' },
    ],
  },
  { label: 'Training', href: '#training' },
  {
    label: 'Insights',
    subLinks: [
      { label: 'Blogs', href: '#blogs' },
      { label: 'Career', href: '#career' },
      { label: 'Photo Gallery', href: '#gallery' },
      { label: 'Student Projects', href: '#student-projects' },
      { label: 'Our Infrastructure', href: '#infrastructure' },
    ],
  },
  { label: 'Our Journey', href: '#our-journey' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

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

  // Sync activeLink with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      
      const matchedItem = navItems.find(item => {
        if (item.href === hash) return true;
        if (item.subLinks) {
          return item.subLinks.some(sub => sub.href === hash);
        }
        return false;
      });

      if (matchedItem) {
        setActiveLink(matchedItem.label);
      } else if (hash.startsWith('#coming-soon-')) {
        if (hash === '#coming-soon-it-services') {
          setActiveLink('Services');
        } else {
          setActiveLink('Insights');
        }
      } else if (hash === '#about-director') {
        setActiveLink('About Us');
      } else if (hash === '#inquiry') {
        setActiveLink(''); // Form doesn't activate header links
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleMobileItemClick = (e: React.MouseEvent, item: NavLinkItem) => {
    if (item.subLinks) {
      e.preventDefault();
      setMobileExpandedItem(mobileExpandedItem === item.label ? null : item.label);
    } else {
      setActiveLink(item.label);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <a href="#home" className="header-logo" onClick={() => setActiveLink('Home')}>
              <img src={logoImg} alt="CADDverse Logo" className="header-logo-img" />
              <div className="logo-text">
                <span className="logo-brand text-gradient-blue">CADDverse</span>
                <span className="logo-sub">Techlabs</span>
              </div>
            </a>

            {/* Navigation links (Desktop) */}
            <nav className="header-nav">
              {navItems.map((item) => {
                const isActive = activeLink === item.label;
                const hasDropdown = !!item.subLinks;

                return (
                  <div
                    key={item.label}
                    className="nav-item-container"
                    onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      href={item.href || '#'}
                      className={`nav-link ${hasDropdown ? 'nav-link-dropdown-trigger' : ''} ${isActive ? 'nav-link-active' : ''}`}
                      onClick={(e) => {
                        if (!item.href) {
                          e.preventDefault();
                        } else {
                          setActiveLink(item.label);
                          setActiveDropdown(null);
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {item.label}
                        {hasDropdown && (
                          <ChevronDown size={14} className={`dropdown-chevron ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                        )}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeUnderline"
                          className="nav-underline"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>

                    {/* Dropdown Card */}
                    <AnimatePresence>
                      {activeDropdown === item.label && item.subLinks && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="nav-dropdown-menu"
                        >
                          <div className="nav-dropdown-glow-mesh" />
                          <div className="nav-dropdown-content">
                            {item.subLinks.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="nav-dropdown-item"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setActiveLink(item.label);
                                }}
                              >
                                <span className="dropdown-item-dot" />
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* CTA Actions */}
            <div className="header-actions">
              <a href="#inquiry" className="btn btn-inquire">
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
            {navItems.map((item) => {
              const isActive = activeLink === item.label;

              return (
                <div key={item.label} className="mobile-nav-item-group">
                  {item.href && !item.subLinks ? (
                    <a
                      href={item.href}
                      className={`mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                      onClick={(e) => handleMobileItemClick(e, item)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <button
                        className={`mobile-nav-link mobile-nav-trigger ${isActive ? 'mobile-nav-link-active' : ''}`}
                        onClick={(e) => handleMobileItemClick(e, item)}
                      >
                        {item.label}
                        <ChevronDown 
                          size={16} 
                          className={`mobile-chevron ${mobileExpandedItem === item.label ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {mobileExpandedItem === item.label && item.subLinks && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mobile-sub-menu"
                          >
                            {item.subLinks.map((sub) => (
                              <a
                                key={sub.label}
                                href={sub.href}
                                className="mobile-sub-link"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setMobileExpandedItem(null);
                                  setActiveLink(item.label);
                                }}
                              >
                                {sub.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              );
            })}

            {/* Mobile Nav Footer: Terms and Social Icons */}
            <div className="mobile-nav-footer" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <a 
                href="#terms-conditions" 
                className="mobile-nav-link" 
                style={{ borderBottom: 'none', padding: '10px', fontSize: '15px', color: '#64748b' }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.location.hash = '#terms-conditions';
                }}
              >
                Terms & Conditions
              </a>
              <div className="mobile-social-icons" style={{ display: 'flex', gap: '20px', padding: '16px 10px 10px 10px' }}>
                <a href="#" style={{ color: 'var(--royal-blue)' }} aria-label="Facebook">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.1 1-1.1h3V1h-4.2C10.5 1 9 2.5 9 5.5V8z"/>
                  </svg>
                </a>
                <a href="#" style={{ color: 'var(--royal-blue)' }} aria-label="Instagram">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" style={{ color: 'var(--royal-blue)' }} aria-label="LinkedIn">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
