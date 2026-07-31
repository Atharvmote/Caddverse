import React, { useEffect } from 'react';
import { ArrowLeft, Monitor, Cpu, Server, ScreenShare } from 'lucide-react';
import '../TermsAndConditions/terms.css';

// Import local image assets as covers
import infra1 from '../../assets/infra1.png';
import infra2 from '../../assets/infra2.png';
import infra3 from '../../assets/infra3.png';
import infra4 from '../../assets/infra4.png';

interface InfrastructurePageProps {
  onBack: () => void;
}

interface InfraCard {
  id: string;
  title: string;
  img: string;
  icon: React.ReactNode;
  specs: string[];
  desc: string;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const infraItems: InfraCard[] = [
    {
      id: 'workstations',
      title: 'High-Performance CAD Workstations',
      img: infra1,
      icon: <Monitor size={20} />,
      desc: 'Our lab is equipped with enterprise-grade drafting workstations optimized for intensive graphic computing, Revit 3D rendering, and structural finite element analysis (FEA).',
      specs: [
        'Intel Core i9 & Xeon processors (8+ physical cores)',
        '32GB DDR5 dual-channel high-speed RAM',
        'Nvidia RTX Professional GPUs (8GB+ VRAM)',
        'Ultra-fast NVMe Gen 4 SSD storage configurations'
      ]
    },
    {
      id: 'bim-servers',
      title: 'Multi-Disciplinary Collaboration Servers',
      img: infra2,
      icon: <Server size={20} />,
      desc: 'We operate dedicated local servers and cloud environments supporting real-time worksharing. Students practice structural, mechanical, and architectural federation on active models.',
      specs: [
        'Local gigabit LAN workspace connection',
        'Autodesk Construction Cloud (BIM 360) credentials',
        'Synchronized cloud storage backup systems',
        'Multi-user worksharing and model ownership setups'
      ]
    },
    {
      id: 'smart-classrooms',
      title: 'Interactive Smart Classrooms',
      img: infra3,
      icon: <ScreenShare size={20} />,
      desc: 'Our lecture rooms are configured with dual-screen presentation setups, smart projection arrays, and clear audio layout to support interactive instruction and remote expert guest sessions.',
      specs: [
        'Dual-monitor instructor modeling station',
        '4K laser projection array (large scale schematics)',
        'Hybrid-enabled classroom microphone systems',
        'Interactive smart-boards for quick detailing sketches'
      ]
    },
    {
      id: 'testing-detailing',
      title: 'Plotting & Engineering detaining Hub',
      img: infra4,
      icon: <Cpu size={20} />,
      desc: 'A dedicated print and print testing room containing professional plotters and blueprint scanners. Students learn to read, scale, and cross-examine actual physical drawings.',
      specs: [
        'High-speed wide-format color plotters (A0/A1 sheets)',
        'Drafting sheets check tables with scaling rulers',
        'Full catalog of mechanical and civil standard blueprints',
        'Structural detailing and concrete steel schedule printers'
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
            Our <span className="text-highlight">Infrastructure</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Explore our state-of-the-art campus setups, high-performance CAD/BIM modeling labs, and interactive smart drafting classrooms.
          </p>
        </div>

        {/* Infrastructure grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
          gap: '40px',
          position: 'relative',
          zIndex: 10
        }}>
          {infraItems.map(item => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '28px',
                padding: '24px',
                boxShadow: '0 12px 40px rgba(9, 13, 22, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {/* Image box */}
              <div style={{
                width: '100%',
                height: '240px',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                background: 'var(--primary-navy)'
              }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Text content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(0, 68, 255, 0.06)',
                    color: '#0044FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: '850',
                    color: 'var(--primary-navy)',
                    margin: 0
                  }}>
                    {item.title}
                  </h3>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px'
                }}>
                  {item.desc}
                </p>

                {/* Specs list */}
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '13.5px', fontWeight: '800', color: 'var(--primary-navy)', marginBottom: '10px' }}>
                  Technical Configuration:
                </h4>
                <ul className="terms-list">
                  {item.specs.map((spec, sIdx) => (
                    <li key={sIdx} style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
