import React, { useEffect } from 'react';
import { ArrowLeft, Award, Flag, MapPin, Milestone, Sparkles, Check } from 'lucide-react';
import '../TermsAndConditions/terms.css';

interface OurJourneyPageProps {
  onBack: () => void;
}

interface TimelineItem {
  phase: string;
  title: string;
  points: string[];
  icon: React.ReactNode;
}

export const OurJourneyPage: React.FC<OurJourneyPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineData: TimelineItem[] = [
    {
      phase: 'Phase 01',
      title: 'Inception & Core Vision',
      points: [
        'Founded a specialized CAD & engineering design workspace in Pune.',
        'Structured our first comprehensive multi-disciplinary syllabus matching international standards.',
        'Established dedicated individual high-performance workstations for intensive drafting labs.'
      ],
      icon: <Flag size={18} />
    },
    {
      phase: 'Phase 02',
      title: 'National Standards & Certifications',
      points: [
        'Secured official training partnership credentials from the National Skill Development Corporation (NSDC).',
        'Acquired ISO 9001:2015 global quality management certifications.',
        'Standardized student evaluation methodologies matching industry-grade hiring requirements.'
      ],
      icon: <Award size={18} />
    },
    {
      phase: 'Phase 03',
      title: 'Infrastructure Scaling',
      points: [
        'Inaugurated our second high-tech campus in Vadodara to expand training capabilities.',
        'Deployed local high-speed BIM servers and unified cloud collaborative worksharing arrays.',
        'Introduced smart interactive lecture halls with ultra-HD projectors and dual instructor screen setups.'
      ],
      icon: <MapPin size={18} />
    },
    {
      phase: 'Phase 04',
      title: 'Enterprise Alliances',
      points: [
        'Engineered custom, project-based on-site corporate upskilling programs for L&T Construction.',
        'Delivered customized structural design and finite analysis training models for TATA Projects.',
        'Formulated multi-disciplinary upskilling pipelines for consultants and designers at AECOM.'
      ],
      icon: <Milestone size={18} />
    },
    {
      phase: 'Phase 05',
      title: 'Advanced Training Pioneer',
      points: [
        'Pioneered Pune\'s premier practical BIM Coordination and Navisworks clash-federation curriculum.',
        'Integrated AI-driven parametric modeling tools (Grasshopper, Dynamo) into core syllabus streams.',
        'Successfully placed over 1,200+ trained engineering candidates in top AEC organizations.'
      ],
      icon: <Sparkles size={18} />
    },
    {
      phase: 'Phase 06',
      title: 'Integrated Engineering Ecosystem',
      points: [
        'Launched our IT Services division, delivering custom design automation and Revit plugin consulting globally.',
        'Unified academic CAD/BIM coaching with actual professional software engineering solutions.',
        'Transformed CADDVERSE TEACHLABS into India\'s leading next-generation Engineering Technology platform.'
      ],
      icon: <Award size={18} />
    }
  ];

  return (
    <div className="terms-page-wrapper">
      <div className="container">
        
        {/* Back Button */}
        <button className="terms-btn-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Page Header */}
        <div className="terms-header-centered">
          <h2 className="section-title">
            Our <span className="text-highlight">Journey</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Explore the core milestones, structural training upgrades, and corporate alliances that define CADDVERSE TEACHLABS.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div style={{ position: 'relative', maxWidth: '800px', margin: '40px auto 0 auto', padding: '0 20px', zIndex: 10 }}>
          
          {/* Vertical central connector line */}
          <div style={{
            position: 'absolute',
            left: '50px',
            top: '20px',
            bottom: '20px',
            width: '4px',
            background: 'linear-gradient(180deg, #0044FF 0%, rgba(0, 68, 255, 0.2) 100%)',
            borderRadius: '2px',
            transform: 'translateX(-50%)'
          }} />

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {timelineData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative'
                }}
              >
                {/* Badge circle on connector */}
                <div style={{
                  position: 'absolute',
                  left: '50px',
                  transform: 'translateX(-50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'var(--white)',
                  border: '3px solid #0044FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0044FF',
                  boxShadow: '0 4px 15px rgba(0, 68, 255, 0.15)',
                  zIndex: 5
                }}>
                  {item.icon}
                </div>

                {/* Card block offset to the right */}
                <div
                  style={{
                    marginLeft: '95px',
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(15, 23, 42, 0.05)',
                    borderRadius: '24px',
                    padding: '30px',
                    boxShadow: '0 8px 30px rgba(9, 13, 22, 0.02)',
                    width: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.borderColor = 'rgba(0, 68, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 68, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.05)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(9, 13, 22, 0.02)';
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: '900',
                    color: '#0044FF',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    {item.phase}
                  </span>
                  
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '16px',
                    fontWeight: '800',
                    color: 'var(--primary-navy)',
                    marginBottom: '14px',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.04)',
                    paddingBottom: '8px'
                  }}>
                    {item.title}
                  </h3>

                  {/* Bullet points instead of paragraphs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}>
                        <div style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: 'rgba(0, 68, 255, 0.06)',
                          color: '#0044FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '2.5px',
                          flexShrink: 0
                        }}>
                          <Check size={8} />
                        </div>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
