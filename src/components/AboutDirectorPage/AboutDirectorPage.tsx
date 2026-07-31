import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, Quote, Award, BookOpen, Heart } from 'lucide-react';
import '../TermsAndConditions/terms.css';
import directorImg from '../../assets/director.png';

interface AboutDirectorPageProps {
  onBack: () => void;
}

export const AboutDirectorPage: React.FC<AboutDirectorPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page-wrapper" style={{ minHeight: '100vh', background: 'radial-gradient(circle at 10% 20%, rgba(9, 30, 74, 0.02) 0%, rgba(255, 255, 255, 1) 90%)' }}>
      <div className="container">
        
        {/* Back Button */}
        <button className="terms-btn-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Page Header */}
        <div className="terms-header-centered">
          <div className="quote-badge" style={{ margin: '0 auto 16px auto', display: 'inline-flex' }}>
            <Sparkles size={13} style={{ marginRight: '6px' }} />
            LEADERSHIP PROFILES
          </div>
          <h2 className="section-title">
            About Our <span className="text-highlight">Director</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Meet the visionary leading <strong style={{ fontWeight: '800' }}>CADDVERSE TEACHLABS</strong> toward defining next-generation computational engineering education in India.
          </p>
        </div>

        {/* Profile Content Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: '48px',
          marginTop: '40px',
          alignItems: 'start'
        }} className="director-profile-grid">
          
          {/* Left Column: Media & Badges */}
          <div style={{
            position: 'sticky',
            top: '40px'
          }}>
            <div style={{
              background: 'var(--white)',
              borderRadius: '24px',
              padding: '16px',
              boxShadow: '0 20px 40px rgba(9, 30, 74, 0.08)',
              border: '1px solid rgba(15, 23, 42, 0.06)',
              textAlign: 'center'
            }}>
              {/* Photo Container */}
              <div style={{
                borderRadius: '18px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                marginBottom: '20px',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                background: 'rgba(9, 30, 74, 0.03)'
              }}>
                <img 
                  src={directorImg} 
                  alt="Anshul Mote" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>

              {/* Title & Name */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: '900',
                color: 'var(--primary-navy)',
                margin: '0 0 4px 0'
              }}>
               
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: '#64748B',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 20px 0'
              }}>
                Founder & Managing Director
              </p>

              {/* Quick Info Badges */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(9, 30, 74, 0.02)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.04)'
                }}>
                  <div style={{ color: '#0044FF', display: 'flex', alignItems: 'center' }}><Award size={18} /></div>
                  <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                    <strong>7+ Years</strong> Industry Consultation
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(9, 30, 74, 0.02)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.04)'
                }}>
                  <div style={{ color: '#0044FF', display: 'flex', alignItems: 'center' }}><BookOpen size={18} /></div>
                  <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                    <strong>BIM Specialist</strong> & CAD Consultant
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(9, 30, 74, 0.02)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.04)'
                }}>
                  <div style={{ color: '#0044FF', display: 'flex', alignItems: 'center' }}><Heart size={18} /></div>
                  <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                    <strong>100% Placement</strong> Bootcamp Mentor
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Vision Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Executive Bio */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: '900',
                color: 'var(--primary-navy)',
                marginBottom: '16px'
              }}>
                Leadership & Vision
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: '1.7',
                color: 'var(--text-secondary)',
                marginBottom: '16px'
              }}>
                Anshul Mote established <strong style={{ fontWeight: '800' }}>CADDVERSE TEACHLABS</strong> with a core commitment to bridge the gap between traditional engineering college theory and high-intensity, practical computational industry skills. As an active CAD & BIM consultant with extensive execution experience, he recognized early on that corporate partners demand engineering candidates who can hit the ground running with multi-disciplinary coordination models.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: '1.7',
                color: 'var(--text-secondary)'
              }}>
                Under his leadership, CADDverse has scaled its training pipelines to graduate over 1,200+ certified CAD and BIM engineers annually. His mandate is simple: <strong>No compromises on syllabus quality, practical labs validation, or placement assistance efforts.</strong>
              </p>
            </div>

            {/* Quote Block Letter */}
            <div style={{
              background: 'rgba(0, 68, 255, 0.03)',
              borderLeft: '4px solid #0044FF',
              borderRadius: '0 16px 16px 0',
              padding: '28px 32px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'rgba(0, 68, 255, 0.08)',
                zIndex: 1
              }}>
                <Quote size={60} />
              </div>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '17px',
                fontWeight: '850',
                color: 'var(--primary-navy)',
                marginBottom: '12px',
                position: 'relative',
                zIndex: 2
              }}>
                Director's Personal Message
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14.5px',
                lineHeight: '1.75',
                color: 'var(--text-secondary)',
                margin: 0,
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 2
              }}>
                "At <strong style={{ fontWeight: '800' }}>CADDVERSE TEACHLABS</strong>, we do not believe in superficial, certificate-oriented coaching. Our entire mission is built on real engineering enablement. We push our students through actual blueprint layouts, complex piping coordination structures, and seismic structural checks. When an engineer finishes their training here, they possess the credentials, confidence, and portfolios of a designer with multiple years of industry experience. That is why we can confidently commit to 100% placement support for our dedicated candidates."
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }} className="director-vision-grid">
              
              {/* Vision Card */}
              <div style={{
                background: 'var(--white)',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 20px rgba(9, 30, 74, 0.02)'
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: '900',
                  color: 'var(--primary-navy)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#0044FF' }}>●</span> Our Vision
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  To serve as India's premier computational design ecosystem, transforming aspiring engineers into highly competent, placement-ready CAD and BIM coordinators.
                </p>
              </div>

              {/* Mission Card */}
              <div style={{
                background: 'var(--white)',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 20px rgba(9, 30, 74, 0.02)'
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: '900',
                  color: 'var(--primary-navy)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#0044FF' }}>●</span> Our Mission
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  To deliver rigorous, project-backed syllabus layouts matching active corporate criteria, validated through hands-on blueprint tests and persistent mock interviews.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
