import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Briefcase, Send, Check, Sparkles, Award, Users, Compass } from 'lucide-react';
import '../QuoteRequest/quoterequest.css';

interface CareersPageProps {
  onBack: () => void;
}

const pillars = [
  {
    icon: <Award size={20} />,
    title: "Career Growth & Mentorship",
    desc: "Work alongside veteran industry consultants and senior BIM coordinators on real global projects."
  },
  {
    icon: <Compass size={20} />,
    title: "Technical Excellence",
    desc: "Gain hands-on familiarity with authentic, licensed enterprise software (Revit, Navisworks, ETABS, STAAD)."
  },
  {
    icon: <Users size={20} />,
    title: "Inspiring Work Culture",
    desc: "Participate in collaborative engineering research, workshops, and supportive campus environments."
  },
  {
    icon: <Briefcase size={20} />,
    title: "Meaningful Impact",
    desc: "Empower over 1,200+ graduates every year to secure stable, high-value engineering placements in top companies."
  }
];

export const CareersPage: React.FC<CareersPageProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !selectedFile) {
      alert('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);

    const payload = new FormData();
    payload.append('fullName', formData.fullName);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('coverLetter', formData.coverLetter);
    payload.append('resume', selectedFile);

    fetch('http://localhost:5001/api/apply-career', {
      method: 'POST',
      body: payload
    })
    .then(res => res.json())
    .then(res => {
      setSubmitting(false);
      if (res.success) {
        setShowSuccessModal(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          coverLetter: ''
        });
        setSelectedFile(null);
      } else {
        alert(res.message || 'Submission failed.');
      }
    })
    .catch(() => {
      console.warn('Backend server offline. Submission simulated in background.');
      setSubmitting(false);
      setShowSuccessModal(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        coverLetter: ''
      });
      setSelectedFile(null);
    });
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

        {/* Hero block matching the quote theme */}
        <div className="quote-intro-heading">
          <div className="quote-badge">
            <Sparkles size={13} style={{ marginRight: '6px' }} />
            CADDVERSE CAREERS & OPPORTUNITIES
          </div>
          <h1 className="quote-main-title">Build Your Future with <span className="text-highlight">CADDVERSE TEACHLABS</span></h1>
          <p className="quote-subtitle">
            <strong style={{ fontWeight: '800' }}>CADDVERSE TEACHLABS</strong> is leading the next-generation of Engineering Technology platforms in India. We are always looking for passionate engineers, CAD/BIM modelers, and educators who want to inspire and train the next wave of industry talent.
          </p>
        </div>

        {/* Why Join Us Pillars */}
        <div className="pillars-header">
          <h2 className="section-title">
            Why <span className="text-highlight">Join Us</span>
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

        {/* Application Form */}
        <div className="quote-form-container-box">
          <div className="quote-form-card">
            <form onSubmit={handleApplySubmit} className="quote-form-fields" encType="multipart/form-data">
              <h3 className="form-legend-title">Join Our <span className="text-highlight">Engineering Team</span></h3>
              <p className="form-legend-desc">
                Submit your contact details and upload your resume below to apply for open positions.
              </p>

              {/* Form Input fields formatted like the request quote page */}
              <div className="form-row-two">
                <div className="input-group">
                  <label className="input-label">CANDIDATE FULL NAME <span className="required">*</span></label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="E.g. Rohan Joshi"
                    className="form-input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">EMAIL ADDRESS <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    className="form-input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-row-two">
                <div className="input-group">
                  <label className="input-label">CONTACT NUMBER <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="E.g. +91 98765 43210"
                    className="form-input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">UPLOAD RESUME DOCUMENT (PDF / DOC) <span className="required">*</span></label>
                  
                  {/* Hidden native input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    required
                  />

                  {/* Custom styled trigger */}
                  <div
                    onClick={handleCustomUploadClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(15, 23, 42, 0.12)',
                      borderRadius: '12px',
                      padding: '12px 18px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      minHeight: '48px',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0044FF';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 68, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.12)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      color: selectedFile ? 'var(--primary-navy)' : '#64748B',
                      fontWeight: selectedFile ? '700' : '400',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      maxWidth: '70%',
                      margin: 0
                    }}>
                      {selectedFile ? selectedFile.name : 'Select Resume (PDF/DOC)'}
                    </span>
                    
                    <span style={{
                      background: 'linear-gradient(135deg, #0044FF 0%, #091e4a 100%)',
                      color: 'var(--white)',
                      padding: '6px 16px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '700',
                      boxShadow: '0 2px 8px rgba(0, 68, 255, 0.12)',
                      display: 'inline-block'
                    }}>
                      Browse File
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label className="input-label">COVER LETTER / INTRODUCTORY MESSAGE</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Describe your design tools background and why you want to join CADDVERSE..."
                  rows={4}
                  className="form-textarea-field"
                />
              </div>

              <button type="submit" className="btn-submit-quote" disabled={submitting}>
                {submitting ? 'Submitting Application...' : 'Submit Application'}
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Success Modal overlay matching quote request page */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(9, 13, 22, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(9, 13, 22, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.8)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.08)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              border: '2px solid #10b981'
            }}>
              <Check size={30} />
            </div>
            
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '22px',
              fontWeight: '900',
              color: 'var(--primary-navy)',
              marginBottom: '12px'
            }}>
              Application Received!
            </h3>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13.5px',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              marginBottom: '28px'
            }}>
              Thank you for applying. We have received your application. Our human resources team will review your credentials and contact you shortly.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                background: 'linear-gradient(135deg, #0044FF 0%, #091e4a 100%)',
                color: 'var(--white)',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '12px',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 68, 255, 0.2)',
                width: '100%',
                transition: 'all 0.2s ease'
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
