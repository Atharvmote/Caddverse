import React, { useEffect } from 'react';
import { ArrowLeft, Home, FileText, LayoutGrid } from 'lucide-react';
import '../TermsAndConditions/terms.css';

interface SitemapPageProps {
  onBack: () => void;
}

interface SitemapSection {
  title: string;
  icon: React.ReactNode;
  links: { label: string; href: string; desc: string }[];
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sitemapData: SitemapSection[] = [
    {
      title: 'Main Navigation & Core Sections',
      icon: <Home size={18} />,
      links: [
        { label: 'Home Page', href: '#home', desc: 'The primary page displaying slider hubs, certification indicators, and training outlines.' },
        { label: 'About Us', href: '#about-us', desc: 'Overview of CADDVERSE TEACHLABS training approach and physical campuses.' },
        { label: 'CAD Course Explorer', href: '#explorer', desc: 'Explore our catalog of certified engineering design courses (AutoCAD, Revit, STAAD, ETABS).' },
        { label: 'Training Formats', href: '#training', desc: 'Dedicated catalog of institutional training, corporate bootcamps, and placement drives.' },
        { label: 'Our Journey', href: '#our-journey', desc: 'Historical vertical timeline highlighting foundation, partnerships, and achievements.' },
        { label: 'Inquiry Form', href: '#inquiry', desc: 'Submit training questions or schedule site visits at our campuses.' }
      ]
    },
    {
      title: 'Dynamic Portals & Portfolios',
      icon: <LayoutGrid size={18} />,
      links: [
        { label: 'Technical Blogs', href: '#blogs', desc: 'In-depth articles regarding BIM integration, parametric scripting, and generative CAD technologies.' },
        { label: 'Careers Board', href: '#career', desc: 'Explore open job positions for modelers, design engineers, and trainers.' },
        { label: 'Photo Gallery', href: '#gallery', desc: 'Peek inside our campus computer labs, smart classrooms, and corporate Drives.' },
        { label: 'Student Projects Portfolio', href: '#student-projects', desc: 'Showcase of blueprints, Revit MEP models, and structural calculations created by students.' },
        { label: 'Our Infrastructure Tour', href: '#infrastructure', desc: 'Discover our computational workstation labs, cloud servers, and wide-format plotting hub.' },
        { label: 'IT Services Portal', href: '#coming-soon-it-services', desc: 'Our advanced design automation consultancy cell (custom Revit plugins, CAD integrations).' }
      ]
    },
    {
      title: 'Company Information & Policies',
      icon: <FileText size={18} />,
      links: [
        { label: 'About CADDverse Techlabs (Details)', href: '#about-details', desc: 'Deep dive into CADDverse solutions, director highlights, and infrastructure.' },
        { label: 'About Director', href: '#about-director', desc: 'Meet the visionary founder and Managing Director Anshul Mote guiding CADDverse Techlabs.' },
        { label: 'Terms & Conditions', href: '#terms-conditions', desc: 'Review the rules, user postings policy, and legal jurisdiction agreements.' },
        { label: 'Privacy Policy', href: '#privacy-policy', desc: 'Review how we protect personal records, cookies usage, and our 100% job placement assistance program.' },
        { label: 'Refund & Cancellation Policy', href: '#refund-policy', desc: 'Review policies concerning fees, cancellation exceptions, and defective equipment returns.' },
        { label: 'Frequently Asked Questions (FAQ)', href: '#faq', desc: 'Find answers regarding course value, NSDC partnerships, and corporate packages.' }
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
            Portal <span className="text-highlight">Sitemap</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Access the hierarchical layout of CADDVERSE TEACHLABS. Discover functional portals, courses, and legal documentation.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: 10 }}>
          {sitemapData.map((sec, sIdx) => (
            <div
              key={sIdx}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '28px',
                padding: '36px',
                boxShadow: '0 8px 30px rgba(9, 13, 22, 0.02)'
              }}
            >
              {/* Section Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(15, 23, 42, 0.05)', paddingBottom: '16px' }}>
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
                  {sec.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: '850',
                  color: 'var(--primary-navy)',
                  margin: 0
                }}>
                  {sec.title}
                </h3>
              </div>

              {/* Links Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {sec.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.href}
                    style={{
                      display: 'block',
                      background: 'rgba(255, 255, 255, 0.5)',
                      border: '1px solid rgba(15, 23, 42, 0.04)',
                      borderRadius: '16px',
                      padding: '18px 20px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'var(--white)';
                      e.currentTarget.style.borderColor = 'rgba(0, 68, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                      e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.04)';
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '14.5px',
                      fontWeight: '800',
                      color: '#0044FF',
                      display: 'block',
                      marginBottom: '6px'
                    }}>
                      {link.label}
                    </span>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11.5px',
                      lineHeight: '1.45',
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}>
                      {link.desc}
                    </p>
                  </a>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
