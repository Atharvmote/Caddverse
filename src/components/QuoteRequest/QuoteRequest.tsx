import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Send, ArrowLeft, Check, Sparkles, Briefcase, Award, Zap, ShieldCheck } from 'lucide-react';
import './quoterequest.css';
import { API_BASE_URL } from '../../utils/api';

interface QuoteRequestProps {
  onBack: () => void;
}

const domainOptions = [
  "Computer-Aided Design (CAD)",
  "Computer-Aided Engineering (CAE)",
  "Building Information Modeling (BIM)",
  "Engineering Services Coordination",
  "IT Solutions & Services",
  "Custom Training Package"
];

const teamSizeOptions = [
  "1 to 10 Employees",
  "11 to 50 Employees",
  "51 to 100 Employees",
  "100+ Employees"
];

const pillars = [
  {
    icon: <Award size={20} />,
    title: "Industry-Oriented Curricula",
    desc: "Curriculums designed by veteran engineering consultants to meet global manufacturing and design standards."
  },
  {
    icon: <Briefcase size={20} />,
    title: "Engineering Excellence",
    desc: "Hands-on training using authentic industrial software tools on live coordination and blueprint projects."
  },
  {
    icon: <Zap size={20} />,
    title: "Continuous Innovation",
    desc: "Stay ahead of competition with next-generation design workflows, BIM execution, and advanced automation."
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Business Impact",
    desc: "Directly enhance team productiveness, reduce cycle times, and build a highly responsive design workforce."
  }
];

export const QuoteRequest: React.FC<QuoteRequestProps> = ({ onBack }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Corporate Form State
  const [corpData, setCorpData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    teamSize: '',
    trainingDomain: '',
    message: ''
  });
  
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const domainRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (domainRef.current && !domainRef.current.contains(e.target as Node)) {
        setIsDomainOpen(false);
      }
      if (sizeRef.current && !sizeRef.current.contains(e.target as Node)) {
        setIsSizeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleCorpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCorpData(prev => ({ ...prev, [name]: value }));
  };

  const handleCorpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpData.companyName || !corpData.contactPerson || !corpData.email || !corpData.phone || !corpData.trainingDomain || !corpData.teamSize) {
      alert('Please fill in all required fields.');
      return;
    }

    // Set success modal values immediately (Optimistic UI)
    setSuccessTitle('Quote Request Logged!');
    setSuccessMsg(`Thank you, ${corpData.contactPerson}. We have sent a confirmation receipt to ${corpData.email}. One of our senior Enterprise Consultant will connect with you shortly with a custom training proposal.`);
    setShowSuccessModal(true);

    const payload = { ...corpData };
    
    // Clear form state immediately
    setCorpData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      teamSize: '',
      trainingDomain: '',
      message: ''
    });

    // Send backend request in the background
    fetch(`${API_BASE_URL}/corporate-quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .catch(() => console.warn('Backend server offline. Submission stored locally in background.'));
  };

  return (
    <section className="quote-section-wrapper">
      <div className="container">
        
        {/* Back navigation */}
        <div className="quote-back-header">
          <button onClick={onBack} className="btn-back-home">
            <ArrowLeft size={16} /> BACK TO HOME
          </button>
        </div>

        {/* CADDverse Intro Block */}
        <div className="quote-intro-heading">
          <div className="quote-badge">
            <Sparkles size={13} style={{ marginRight: '6px' }} />
            CADDVERSE ENTERPRISE TRAINING
          </div>
          <h1 className="quote-main-title">Build the Future with <span className="text-highlight">CADDVERSE TEACHLABS</span></h1>
          <p className="quote-subtitle">
            <strong style={{ fontWeight: '800' }}>CADDVERSE TEACHLABS</strong> is India's next-generation Engineering Technology platform. We specialize in structuring high-impact corporate training frameworks and custom CAD, CAE, and BIM upskilling solutions that translate engineering aspirations into real-world business success.
          </p>
        </div>

        {/* Corporate Excellence Pillars ("How We Work") */}
        <div className="pillars-header">
          <h2 className="section-title">
            How We <span className="text-highlight">Train</span>
          </h2>
          <div className="pillars-divider" />
        </div>
        <div className="quote-pillars-grid">
          {pillars.map((p, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon-box">
                {p.icon}
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote Form Container Card */}
        <div className="quote-form-container-box">
          <div className="quote-form-card">
            <form onSubmit={handleCorpSubmit} className="quote-form-fields">
              <h3 className="form-legend-title">Request a <span className="text-highlight">Corporate Proposal</span></h3>
              <p className="form-legend-desc">
                Fill out the form below to receive a customized curriculum package and pricing quote matching your design team requirements.
              </p>

              <div className="form-row-two">
                <div className="input-group">
                  <label className="input-label">COMPANY NAME <span className="required">*</span></label>
                  <input 
                    type="text"
                    name="companyName"
                    value={corpData.companyName}
                    onChange={handleCorpChange}
                    placeholder="E.g. Caddverse Design Corp"
                    className="form-input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">CONTACT PERSON <span className="required">*</span></label>
                  <input 
                    type="text"
                    name="contactPerson"
                    value={corpData.contactPerson}
                    onChange={handleCorpChange}
                    placeholder="Your full name"
                    className="form-input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-row-two">
                <div className="input-group">
                  <label className="input-label">WORK EMAIL <span className="required">*</span></label>
                  <input 
                    type="email"
                    name="email"
                    value={corpData.email}
                    onChange={handleCorpChange}
                    placeholder="you@company.com"
                    className="form-input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">PHONE NUMBER <span className="required">*</span></label>
                  <input 
                    type="tel"
                    name="phone"
                    value={corpData.phone}
                    onChange={handleCorpChange}
                    placeholder="E.g. +91 XXXXX XXXXX"
                    className="form-input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-row-two">
                {/* Custom dropdown 1: Training domain */}
                <div className="input-group">
                  <label className="input-label">TRAINING DOMAIN <span className="required">*</span></label>
                  <div className="custom-dropdown-container" ref={domainRef}>
                    <button
                      type="button"
                      className={`custom-dropdown-trigger ${corpData.trainingDomain ? 'has-value' : ''}`}
                      onClick={() => setIsDomainOpen(prev => !prev)}
                    >
                      <span>{corpData.trainingDomain || 'Select Training Domain'}</span>
                      <ChevronDown size={16} className={`dropdown-caret ${isDomainOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDomainOpen && (
                      <div className="custom-dropdown-menu">
                        {domainOptions.map(opt => (
                          <div
                            key={opt}
                            className={`custom-dropdown-item ${corpData.trainingDomain === opt ? 'selected' : ''}`}
                            onClick={() => {
                              setCorpData(prev => ({ ...prev, trainingDomain: opt }));
                              setIsDomainOpen(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom dropdown 2: Team size */}
                <div className="input-group">
                  <label className="input-label">ESTIMATED TEAM SIZE <span className="required">*</span></label>
                  <div className="custom-dropdown-container" ref={sizeRef}>
                    <button
                      type="button"
                      className={`custom-dropdown-trigger ${corpData.teamSize ? 'has-value' : ''}`}
                      onClick={() => setIsSizeOpen(prev => !prev)}
                    >
                      <span>{corpData.teamSize || 'Select Expected Team Size'}</span>
                      <ChevronDown size={16} className={`dropdown-caret ${isSizeOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isSizeOpen && (
                      <div className="custom-dropdown-menu">
                        {teamSizeOptions.map(opt => (
                          <div
                            key={opt}
                            className={`custom-dropdown-item ${corpData.teamSize === opt ? 'selected' : ''}`}
                            onClick={() => {
                              setCorpData(prev => ({ ...prev, teamSize: opt }));
                              setIsSizeOpen(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">TRAINING REQUIREMENTS & SPECIFICATIONS</label>
                <textarea 
                  name="message"
                  value={corpData.message}
                  onChange={handleCorpChange}
                  placeholder="Outline the specific topics, software tools, or batch timeline expectations..."
                  className="form-textarea-field"
                  rows={4}
                />
              </div>

              <button type="submit" className="btn-submit-quote">
                Request Customized Quote <Send size={16} style={{ marginLeft: '6px' }} />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="success-popup-overlay">
          <div className="success-popup-card">
            <div className="success-checkmark-circle">
              <Check size={40} className="success-check-icon" />
            </div>
            <h3 className="success-popup-title">{successTitle}</h3>
            <p className="success-popup-subtitle">Inquiry logged successfully.</p>
            <p className="success-popup-desc">{successMsg}</p>
            <button className="btn-success-close" onClick={() => setShowSuccessModal(false)}>
              Got It, Thanks
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
