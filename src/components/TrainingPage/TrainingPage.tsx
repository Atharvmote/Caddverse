import React, { useEffect } from 'react';
import { ArrowLeft, GraduationCap, Building2, Briefcase, CheckSquare } from 'lucide-react';
import '../TermsAndConditions/terms.css';

// Import local image assets as covers
import training1 from '../../assets/training1.png';
import traning2 from '../../assets/traning2.png';
import training3 from '../../assets/training3.png';

interface TrainingPageProps {
  onBack: () => void;
}

interface TrainingModule {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  icon: React.ReactNode;
  overview: string;
  features: string[];
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trainingModules: TrainingModule[] = [
    {
      id: 'inst-training',
      title: 'Institutional Training Programs',
      subtitle: 'For Civil, Mechanical, & Electrical Graduates',
      img: training1,
      icon: <GraduationCap size={20} />,
      overview: 'Our foundational training tracks are designed to transform college graduates into skilled CAD, BIM, and structural design professionals. We emphasize live drafting labs and manual check verification.',
      features: [
        'Autodesk Revit MEP, Architecture, and Structural stacks.',
        'STAAD Pro & ETABS structural loading and seismic detailing models.',
        'Live engineering blueprint reading and calculation exercises.',
        'Compulsory capstone project with professional design portfolio delivery.'
      ]
    },
    {
      id: 'corp-upskilling',
      title: 'Corporate Upskilling Frameworks',
      subtitle: 'For Engineering Consultancies & Contractor Teams',
      img: traning2,
      icon: <Building2 size={20} />,
      overview: 'We design customized corporate training pipelines aimed at boosting design office output, implementing BIM execution plans (BEP), and ensuring ISO-compliant quality standards.',
      features: [
        'Dedicated on-site or remote live expert workshops.',
        'Real-time cloud worksharing setups (Autodesk Construction Cloud).',
        'Custom tool integration, Revit family creation, and CAD automation scripts.',
        'Post-training evaluation audits and designer skill matrices.'
      ]
    },
    {
      id: 'placement-bootcamp',
      title: 'Placement Preparation Bootcamps',
      subtitle: '100% Placement Assistance Facilitation',
      img: training3,
      icon: <Briefcase size={20} />,
      overview: 'Elevate your interview success rates. Our placement bootcamps run parallel with training modules to prepare candidates directly for the technical recruitment drives of top infrastructure groups.',
      features: [
        'Individual resume screening and portfolio building workshops.',
        'Technical mock-interview drills with chief BIM architects and structural consultants.',
        'Communication and design terminology training.',
        'Direct referral submission to CADDVERSE network of 80+ hiring partners.'
      ]
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
            Engineering <span className="text-highlight">Training</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Standardized, project-backed training programs designed to bridge the gap between academic theory and real-world engineering projects.
          </p>
        </div>

        {/* Training Modules List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: 10 }}>
          {trainingModules.map(module => (
            <div
              key={module.id}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '28px',
                padding: '36px',
                boxShadow: '0 12px 40px rgba(9, 13, 22, 0.02)',
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.3fr',
                gap: '40px',
                alignItems: 'center'
              }}
            >
              {/* Cover Image Frame */}
              <div style={{
                width: '100%',
                height: '100%',
                minHeight: '260px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'var(--primary-navy)'
              }}>
                <img
                  src={module.img}
                  alt={module.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Text specifications */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(0, 68, 255, 0.06)',
                    color: '#0044FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {module.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '20px',
                      fontWeight: '850',
                      color: 'var(--primary-navy)',
                      margin: 0
                    }}>
                      {module.title}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '2px' }}>{module.subtitle}</span>
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  marginTop: '16px',
                  marginBottom: '24px'
                }}>
                  {module.overview}
                </p>

                {/* Key Features */}
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '13.5px', fontWeight: '800', color: 'var(--primary-navy)', marginBottom: '12px' }}>
                  Program Components:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {module.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                      <CheckSquare size={14} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
