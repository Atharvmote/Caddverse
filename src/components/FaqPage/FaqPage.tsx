import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import '../TermsAndConditions/terms.css';

interface FaqPageProps {
  onBack: () => void;
}

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqItems: FaqItem[] = [
    {
      category: 'Certifications',
      q: 'Are CADDVERSE TEACHLABS certifications recognized globally?',
      a: 'Yes. Our course completion certificates are issued in direct partnership with the National Skill Development Corporation (NSDC) and conform strictly to ISO 9001:2015 standards. This renders our credentials highly valued by recruiters across India, the Middle East, Europe, and global AEC markets.'
    },
    {
      category: 'Placements',
      q: 'What does CADDVERSE TEACHLABS 100% placement assistance offer?',
      a: 'Our placement cell provides active job placement assistance, which includes direct referrals to our network of 80+ recruiting partners, industry-ready resume writing workshops, LinkedIn profile optimization, and structured mock-interview drills with industry experts. We do not stop until you launch your career.'
    },
    {
      category: 'Enrollment',
      q: 'Can working professionals join corporate upskilling programs?',
      a: 'Absolutely. We offer flexible hybrid schedules, evening batches, and weekend modules tailored specifically for working professionals. We also deliver customized on-site and remote corporate training packages for engineering consultancies, contractor teams, and infrastructure developers.'
    },
    {
      category: 'Policy',
      q: 'What is the refund policy for enrollment cancellations?',
      a: 'CADDVERSE TEACHLABS maintains a strict policy on fees. Under any circumstances, no fees will be refunded once the transaction is completed and training begins, as outlined in our Refund and Cancellation Policy. However, in the rare event of course cancellation from our end, a full refund of paid fees will be initiated.'
    },
    {
      category: 'Syllabus',
      q: 'What software tools are covered in the BIM Coordination course?',
      a: 'The BIM Coordination syllabus covers advanced architectural, structural, and MEP modeling in Autodesk Revit, federated models integration and clash analysis in Autodesk Navisworks Manage, and cloud-based worksharing inside Autodesk Construction Cloud (BIM 360).'
    },
    {
      category: 'Syllabus',
      q: 'Is there any real-world project work included in the curriculum?',
      a: 'Yes. Every training program concludes with a mandatory capstone project. Students work on actual engineering blueprints, structural frames, or MEP schematics under the guidance of industry consultants, resulting in a professional design portfolio.'
    }
  ];

  const categories = ['All', 'Certifications', 'Placements', 'Enrollment', 'Syllabus', 'Policy'];

  const filteredFaqs = activeCategory === 'All'
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

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
            Frequently Asked <span className="text-highlight">Questions</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Find quick answers to common queries regarding CADDVERSE TEACHLABS training modules, certifications, and career support.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0); // auto-open first item on category switch
              }}
              style={{
                background: activeCategory === cat ? 'linear-gradient(135deg, #0044FF 0%, #091e4a 100%)' : 'rgba(255, 255, 255, 0.8)',
                color: activeCategory === cat ? 'var(--white)' : 'var(--primary-navy)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(15, 23, 42, 0.08)',
                padding: '8px 20px',
                borderRadius: '20px',
                fontFamily: 'var(--font-heading)',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: activeCategory === cat ? '0 4px 15px rgba(0, 68, 255, 0.18)' : '0 2px 4px rgba(9, 13, 22, 0.02)',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 10 }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid',
                  borderColor: isOpen ? 'rgba(0, 68, 255, 0.15)' : 'rgba(15, 23, 42, 0.05)',
                  borderRadius: '20px',
                  boxShadow: isOpen ? '0 10px 30px rgba(0, 68, 255, 0.04)' : '0 4px 12px rgba(9, 13, 22, 0.01)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* Question Row */}
                <div
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    padding: '24px 30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <HelpCircle size={18} style={{ color: isOpen ? '#0044FF' : '#64748B', flexShrink: 0 }} />
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '15.5px',
                      fontWeight: '800',
                      color: isOpen ? '#0044FF' : 'var(--primary-navy)',
                      margin: 0,
                      lineHeight: '1.4',
                      transition: 'color 0.2s ease'
                    }}>
                      {faq.q}
                    </h3>
                  </div>
                  
                  {isOpen ? (
                    <ChevronUp size={18} style={{ color: '#0044FF', flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: '#64748B', flexShrink: 0 }} />
                  )}
                </div>

                {/* Answer block (collapsible) */}
                <div style={{
                  maxHeight: isOpen ? '300px' : '0',
                  opacity: isOpen ? 1 : 0,
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden',
                  borderTop: isOpen ? '1px solid rgba(15, 23, 42, 0.04)' : 'none'
                }}>
                  <div style={{ padding: '24px 30px 30px 30px' }}>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      lineHeight: '1.65',
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
