import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ArrowUp } from 'lucide-react';
import logoImg from '../../assets/newmodern.png';
import './footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-info">
            <div className="footer-logo-white">
              <img src={logoImg} alt="CADDverse Logo" className="footer-logo-img" />
              <div className="logo-text" style={{ textTransform: 'uppercase', color: 'var(--white)', letterSpacing: '0.5px' }}>
                <span className="logo-brand" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--white)' }}>CADDVERSE</span>
                <span className="logo-sub" style={{ fontSize: '9px', letterSpacing: '2px', opacity: 0.8, color: 'var(--white)' }}>TECHLABS</span>
              </div>
            </div>
            <p className="footer-desc" style={{ fontSize: '13px', lineHeight: '1.6', marginTop: '12px' }}>
              Empowering the next generation of engineers &amp; designers with skills, knowledge &amp; opportunities.
            </p>
            
            {/* Social Icons matching the reference image */}
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.1 1-1.1h3V1h-4.2C10.5 1 9 2.5 9 5.5V8z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.483 20.455 12 20.455 12 20.455s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><a href="#home">Home</a></li>
              <li className="footer-link-item"><a href="#explorer">Courses</a></li>
              <li className="footer-link-item"><a href="#our-journey">Our Journey</a></li>
              <li className="footer-link-item"><a href="#about-us">About Us</a></li>
              <li className="footer-link-item"><a href="#home">Placements</a></li>
              <li className="footer-link-item"><a href="#inquiry">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Resources Column from reference image */}
          <div>
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><a href="#coming-soon-blogs">Blog</a></li>
              <li className="footer-link-item"><a href="#coming-soon-photo-gallery">Gallery</a></li>
              <li className="footer-link-item"><a href="#home">Events</a></li>
              <li className="footer-link-item"><a href="#coming-soon-student-projects">Student Work</a></li>
              <li className="footer-link-item"><a href="#home">FAQ</a></li>
              <li className="footer-link-item"><a href="#home">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="footer-contact">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="contact-detail-item">
              <Phone size={14} />
              <span>+91 9049000010</span>
            </div>
            <div className="contact-detail-item">
              <Mail size={14} />
              <span>info@caddversetechlabs.com</span>
            </div>
            <div className="contact-detail-item">
              <MapPin size={16} />
              <span style={{ lineHeight: '1.4' }}>Caddverse Techlabs llp,<br/>A/1106 , Rohan Madhuban 2,<br/>Bavdhan, Pune 411021<br/>Maharashtra, India</span>
            </div>
            
            {/* CAD site blueprint outline */}
            <div className="cad-map-mock">
              <svg className="cad-map-svg" viewBox="0 0 100 50">
                <line x1="0" y1="10" x2="100" y2="10" stroke="var(--royal-blue)" strokeWidth="0.15" />
                <line x1="0" y1="25" x2="100" y2="25" stroke="var(--royal-blue)" strokeWidth="0.15" />
                <line x1="0" y1="40" x2="100" y2="40" stroke="var(--royal-blue)" strokeWidth="0.15" />
                <line x1="20" y1="0" x2="20" y2="50" stroke="var(--royal-blue)" strokeWidth="0.15" />
                <line x1="50" y1="0" x2="50" y2="50" stroke="var(--royal-blue)" strokeWidth="0.15" />
                <line x1="80" y1="0" x2="80" y2="50" stroke="var(--royal-blue)" strokeWidth="0.15" />
                <rect x="25" y="15" width="40" height="20" fill="none" stroke="var(--white)" strokeWidth="0.3" strokeDasharray="1 1" />
                <path d="M 5 35 Q 25 15, 60 40 T 95 30" fill="none" stroke="var(--royal-blue)" strokeWidth="0.5" />
              </svg>
              <div className="cad-map-pin" />
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div className="footer-newsletter">
            <h4 className="footer-col-title">Newsletter</h4>
            <p style={{ fontSize: '13px', lineHeight: '1.5' }}>
              Subscribe to get updates on new courses &amp; offers.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe" style={{ background: 'var(--royal-blue)' }}>
                  <ArrowRight size={14} />
                </button>
              </div>
              {isSubmitted && (
                <span className="newsletter-success" style={{ fontSize: '12px', color: '#10b981', marginTop: '4px', display: 'block' }}>
                  Successfully subscribed!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Footer Bottom copyright and scroll up arrow button */}
        <div className="footer-bottom">
          <div className="footer-copy" style={{ fontSize: '13px', color: '#64748B' }}>
            &copy; 2026 Caddverse Techlabs. All rights reserved.
          </div>
          <div className="footer-bottom-links" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#home">Privacy Policy</a>
            <span style={{ color: '#334155' }}>|</span>
            <a href="#terms-conditions">Terms &amp; Conditions</a>
          </div>
          
          {/* Floating Scroll up button from the reference image */}
          <button 
            className="scroll-up-btn" 
            onClick={scrollToTop} 
            aria-label="Scroll to top"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
};
