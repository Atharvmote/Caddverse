import React, { useEffect } from 'react';
import { ArrowLeft, User, FileCode, CheckSquare } from 'lucide-react';
import '../TermsAndConditions/terms.css';

// Import local image assets as covers
import sp1 from '../../assets/sp1.png';
import sp2 from '../../assets/sp2.png';
import sp3 from '../../assets/sp3.png';

interface StudentProjectsPageProps {
  onBack: () => void;
}

interface ProjectCard {
  id: string;
  title: string;
  student: string;
  course: string;
  cover: string;
  tools: string[];
  scope: string;
  outcomes: string[];
}

export const StudentProjectsPage: React.FC<StudentProjectsPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects: ProjectCard[] = [
    {
      id: 'proj-1',
      title: 'Commercial Complex MEP Coordination & Federation',
      student: 'Amit Shah, BIM Coordinator Batch',
      course: 'Master Program in BIM Coordination',
      cover: sp1,
      tools: ['Autodesk Revit MEP', 'Navisworks Manage', 'BIM 360'],
      scope: 'The project involved structural, architectural, and MEP integration for a 12-story commercial corporate headquarters. The primary objective was to coordinate mechanical HVAC ducts with plumbing lines and concrete beams to produce clash-free blueprints.',
      outcomes: [
        'Merged designs from 3 engineering disciplines into a single federated model.',
        'Identified and resolved over 450 hard and soft clashes prior to site execution.',
        'Reduced estimated site rework expenses by 14% through preemptive design updates.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Industrial Steel Warehouse Structural Analysis',
      student: 'Neha Deshmukh, Civil Design Batch',
      course: 'Advanced Structural Engineering Program',
      cover: sp2,
      tools: ['STAAD Pro', 'AutoCAD Structural Detailing', 'IS 800:2007'],
      scope: 'Design, loading analysis, and seismic detailing of a large-span industrial warehouse structure with a gantry crane. Evaluated dead loads, live loads, wind forces, and seismic zone 3 loads.',
      outcomes: [
        'Optimized steel member sizing, saving 12 tons of structural steel material.',
        'Completed full design verification matching IS 800 limit state design methods.',
        'Generated detailing drawings for base plates, gusset connections, and column splices.'
      ]
    },
    {
      id: 'proj-3',
      title: 'Multi-Family Residential BIM Modeling',
      student: 'Rohit Verma, Architectural Modeler Batch',
      course: 'Professional Revit & BIM Modeling Course',
      cover: sp3,
      tools: ['Revit Architecture', 'Revit Structure', 'Enscape Render'],
      scope: 'Constructed an architectural and structural model for a modern 4-story luxury residential apartment building. Set up structural column layouts, concrete slab schedules, custom facade window families, and generated high-quality photo-realistic renders.',
      outcomes: [
        'Formulated complete material takeoff (MTO) schedules for concrete and masonry.',
        'Set up automated sheet layouts for construction documentation (Good for Construction prints).',
        'Produced real-time walkthrough renders for pre-sales marketing presentation.'
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
            Student <span className="text-highlight">Projects</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Explore advanced technical blueprints, structural analyses, and MEP models constructed by certified CADDVERSE TEACHLABS students.
          </p>
        </div>

        {/* Projects list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', position: 'relative', zIndex: 10 }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '28px',
                padding: '30px',
                boxShadow: '0 12px 40px rgba(9, 13, 22, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                overflow: 'hidden'
              }}
            >
              {/* Cover Image Frame - Full Width on Top */}
              <div style={{
                width: '100%',
                height: '400px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#f8fafc', // Soft light background for drawing preview
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={proj.cover}
                  alt={proj.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>

              {/* Details Split - 2 Columns */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: '40px',
                alignItems: 'start'
              }} className="student-project-info-grid">
                
                {/* Left Side: Scope & Info */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    fontWeight: '850',
                    color: 'var(--primary-navy)',
                    marginBottom: '12px',
                    lineHeight: '1.25'
                  }}>
                    {proj.title}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#64748B', marginBottom: '24px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={14} style={{ color: '#0044FF' }} /> <strong style={{ color: 'var(--primary-navy)' }}>Developer:</strong> {proj.student}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileCode size={14} style={{ color: '#0044FF' }} /> <strong style={{ color: 'var(--primary-navy)' }}>Program:</strong> {proj.course}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: '800', color: 'var(--primary-navy)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Project Scope:
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    lineHeight: '1.65',
                    color: 'var(--text-secondary)',
                    margin: 0
                  }}>
                    {proj.scope}
                  </p>
                </div>

                {/* Right Side: Tools & Deliverables */}
                <div>
                  {/* Software tags */}
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: '800', color: 'var(--primary-navy)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Technologies & Standards:
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                    {proj.tools.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          background: 'rgba(0, 68, 255, 0.05)',
                          color: '#0044FF',
                          border: '1px solid rgba(0, 68, 255, 0.08)',
                          borderRadius: '8px',
                          padding: '5px 12px',
                          fontSize: '11px',
                          fontWeight: '800',
                          fontFamily: 'var(--font-heading)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Outcomes */}
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: '800', color: 'var(--primary-navy)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Key Project Deliverables:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {proj.outcomes.map((out, oIdx) => (
                      <div key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}>
                        <CheckSquare size={14} style={{ color: '#10b981', marginTop: '3px', flexShrink: 0 }} />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
