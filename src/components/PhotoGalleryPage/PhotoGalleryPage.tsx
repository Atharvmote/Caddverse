import React, { useState, useEffect } from 'react';
import { ArrowLeft, ZoomIn, X } from 'lucide-react';
import '../TermsAndConditions/terms.css';

// Import local image assets
import pg1 from '../../assets/pg1.png';
import pg2 from '../../assets/pg2.png';
import pg3 from '../../assets/pg3.png';
import pg4 from '../../assets/pg4.png';
import pg5 from '../../assets/pg5.png';
import pg6 from '../../assets/pg6.png';

interface PhotoGalleryPageProps {
  onBack: () => void;
}

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  desc: string;
  category: string;
}

export const PhotoGalleryPage: React.FC<PhotoGalleryPageProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryItems: GalleryItem[] = [
    {
      id: 'lab-1',
      src: pg1,
      title: 'Advanced BIM & HVAC Training Lab',
      desc: 'Our high-end workstation setups where students coordinate real-time MEP clash detetection files.',
      category: 'Labs'
    },
    {
      id: 'classroom-1',
      src: pg2,
      title: 'Structural Detailing Lecture Hub',
      desc: 'Interactive visual lectures on ETABS design and concrete layout detailing requirements.',
      category: 'Classrooms'
    },
    {
      id: 'event-1',
      src: pg3,
      title: 'National Skill Development Drive',
      desc: 'CADDVERSE TEACHLABS student orientation program in association with NSDC skill initiatives.',
      category: 'Events'
    },
    {
      id: 'lab-2',
      src: pg4,
      title: 'Civil & CAD Drafting Lab',
      desc: 'Individual high-speed systems configured with standard AutoCAD, Revit, and Civil 3D tools.',
      category: 'Labs'
    },
    {
      id: 'event-2',
      src: pg5,
      title: 'Corporate Training Conclave',
      desc: 'Industry executive workshops addressing generative CAD workflows and automated detailing practices.',
      category: 'Events'
    },
    {
      id: 'campus-1',
      src: pg6,
      title: 'CADDVERSE Research & Innovation Cell',
      desc: 'Our central coordination cell focusing on development of parametric design curricula.',
      category: 'Campus'
    }
  ];

  const categories = ['All', 'Labs', 'Classrooms', 'Events', 'Campus'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

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
            Photo <span className="text-highlight">Gallery</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Peek inside CADDVERSE TEACHLABS. Explore our modern engineering labs, interactive lecture rooms, and corporate development events.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* Photo Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          position: 'relative',
          zIndex: 10
        }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '24px',
                padding: '16px',
                boxShadow: '0 8px 30px rgba(9, 13, 22, 0.02)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(0, 68, 255, 0.15)';
                e.currentTarget.style.boxShadow = '0 16px 35px rgba(0, 68, 255, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.05)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(9, 13, 22, 0.02)';
              }}
            >
              {/* Image Frame */}
              <div style={{
                width: '100%',
                height: '200px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                background: 'var(--primary-navy)'
              }}>
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                />
                
                {/* Zoom overlay on image */}
                <div className="zoom-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(9, 13, 22, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--white)',
                    color: 'var(--primary-navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(9, 13, 22, 0.2)'
                  }}>
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div style={{ padding: '16px 8px 8px 8px' }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(0, 68, 255, 0.06)',
                  color: '#0044FF',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '9px',
                  fontWeight: '800',
                  letterSpacing: '0.4px',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '10px'
                }}>
                  {item.category}
                </span>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  fontWeight: '800',
                  color: 'var(--primary-navy)',
                  marginBottom: '6px',
                  lineHeight: '1.3'
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: 'var(--text-secondary)'
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Pop-up Modal */}
        {lightboxItem && (
          <div
            onClick={() => setLightboxItem(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(9, 13, 22, 0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()} // Stop closing on card click
              style={{
                background: 'var(--white)',
                padding: '16px',
                borderRadius: '24px',
                maxWidth: '800px',
                width: '100%',
                boxShadow: '0 25px 60px rgba(9, 13, 22, 0.3)',
                position: 'relative'
              }}
            >
              {/* Close Icon */}
              <button
                onClick={() => setLightboxItem(null)}
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '0',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--white)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600'
                }}
              >
                <X size={20} /> Close
              </button>

              {/* Large Image Frame */}
              <div style={{
                width: '100%',
                maxHeight: '500px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--primary-navy)'
              }}>
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>

              {/* Overlay description text at bottom of card */}
              <div style={{ padding: '20px 10px 10px 10px' }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(0, 68, 255, 0.06)',
                  color: '#0044FF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '9.5px',
                  fontWeight: '850',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '10px'
                }}>
                  {lightboxItem.category}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: '850',
                  color: 'var(--primary-navy)',
                  marginBottom: '8px'
                }}>
                  {lightboxItem.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)'
                }}>
                  {lightboxItem.desc}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
