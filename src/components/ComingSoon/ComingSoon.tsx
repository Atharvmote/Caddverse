import React, { useState } from 'react';
import { ArrowLeft, Send, Sparkles, Cpu, Globe, GraduationCap, Briefcase, Film, HeartHandshake, Eye } from 'lucide-react';
import './comingsoon.css';

interface ComingSoonProps {
  title: string;
  onBack: () => void;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title, onBack }) => {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNotified(true);
    setEmail('');
  };

  // Get dynamic icon based on the title
  const getIcon = () => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('it service')) return <Cpu className="coming-soon-icon" size={48} />;
    if (lowerTitle.includes('director')) return <Eye className="coming-soon-icon" size={48} />;
    if (lowerTitle.includes('blog')) return <Sparkles className="coming-soon-icon" size={48} />;
    if (lowerTitle.includes('career')) return <Briefcase className="coming-soon-icon" size={48} />;
    if (lowerTitle.includes('photo')) return <Globe className="coming-soon-icon" size={48} />;
    if (lowerTitle.includes('video')) return <Film className="coming-soon-icon" size={48} />;
    if (lowerTitle.includes('project')) return <GraduationCap className="coming-soon-icon" size={48} />;
    if (lowerTitle.includes('infrastructure')) return <HeartHandshake className="coming-soon-icon" size={48} />;
    return <Sparkles className="coming-soon-icon" size={48} />;
  };

  const getSubTitle = () => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('it service')) {
      return 'Crafting elite software solutions, cloud integrations, and enterprise IT services designed to launch your business forward.';
    }
    if (lowerTitle.includes('director')) {
      return 'An inspiring statement and vision from our director, detailing the foundational principles and future roadmap of CADDverse Techlabs.';
    }
    return `We are currently crafting a premium, feature-rich digital portal for ${title}. Stay tuned for updates!`;
  };

  return (
    <section className="coming-soon-wrapper">
      {/* Decorative interactive blueprint line vectors */}
      <div className="coming-soon-grid-bg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="csGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(37, 99, 235, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#csGrid)" />
        </svg>
      </div>

      <div className="coming-soon-glow-light" />
      <div className="coming-soon-glow-light-2" />

      <div className="container coming-soon-container">
        {/* Back navigation action */}
        <div className="cs-back-nav">
          <button onClick={onBack} className="btn-cs-back">
            <ArrowLeft size={16} style={{ marginRight: '8px' }} />
            Back to Homepage
          </button>
        </div>

        <div className="coming-soon-content">
          <div className="cs-badge-wrapper">
            <span className="cs-badge">
              <Sparkles size={12} className="cs-badge-icon" /> Coming Soon
            </span>
          </div>

          <div className="cs-icon-showcase">
            <div className="cs-icon-outer-ring">
              <div className="cs-icon-inner-ring">
                {getIcon()}
              </div>
            </div>
          </div>

          <h1 className="coming-soon-title">
            {title} <span className="text-highlight">Portal</span>
          </h1>

          <p className="coming-soon-subtitle">
            {getSubTitle()}
          </p>

          <div className="cs-action-card">
            {notified ? (
              <div className="cs-success-message">
                <span className="cs-success-dot" />
                Thank you! We'll notify you as soon as this feature goes live.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cs-notify-form">
                <input
                  type="email"
                  placeholder="Enter your email for early access"
                  className="cs-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-cs-submit">
                  Notify Me <Send size={14} style={{ marginLeft: '6px' }} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
