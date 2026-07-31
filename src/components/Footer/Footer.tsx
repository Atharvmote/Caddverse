import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import logoImg from '../../assets/newmodern.png';
import './footer.css';

export const Footer: React.FC = () => {
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
              <li className="footer-link-item"><a href="#inquiry">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Resources Column from reference image */}
          <div>
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><a href="#blogs">Blog</a></li>
              <li className="footer-link-item"><a href="#gallery">Gallery</a></li>
              <li className="footer-link-item"><a href="#faq">FAQ</a></li>
              <li className="footer-link-item"><a href="#student-projects">Student Work</a></li>
              <li className="footer-link-item"><a href="#infrastructure">Our Infrastructure</a></li>
              <li className="footer-link-item"><a href="#sitemap">Sitemap</a></li>
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

          {/* Column 5: Location Map */}
          <div className="footer-newsletter" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 className="footer-col-title">Our Campus Location</h4>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              width: '100%',
              height: '150px',
              background: '#090d16'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5627254332357!2d73.77196657519126!3d18.503463882586715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bec704e76a6d%3A0xb36a188ff6e65a7f!2sRohan%20Madhuban%202!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Caddverse Pune Campus Location"
              />
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright and scroll up arrow button */}
        <div className="footer-bottom">
          <div className="footer-copy" style={{ fontSize: '13px', color: '#64748B' }}>
            &copy; 2026 Caddverse Techlabs. All rights reserved.
          </div>
          <div className="footer-bottom-links" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <a href="#privacy-policy">Privacy Policy</a>
            <span style={{ color: '#334155' }}>|</span>
            <a href="#terms-conditions">Terms &amp; Conditions</a>
            <span style={{ color: '#334155' }}>|</span>
            <a href="#refund-policy">Refund &amp; Cancellation Policy</a>
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
