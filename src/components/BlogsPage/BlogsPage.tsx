import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, X, Calendar, User } from 'lucide-react';
import '../TermsAndConditions/terms.css'; // Reuse container, wrapper, and general layout styles

interface BlogsPageProps {
  onBack: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  author: string;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onBack }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: 'bim-coordination',
      title: 'The Paradigm Shift: How BIM Coordination is Redefining Modern Infrastructure Projects',
      excerpt: 'Building Information Modeling (BIM) is no longer a luxury choice—it is the operational standard for modern building coordinates, clashing, and engineering workflows.',
      date: 'July 28, 2026',
      readTime: '8 Min Read',
      category: 'BIM Technology',
      author: 'Er. Rajesh K. Mehta, Chief BIM Architect',
      content: [
        "In the fast-evolving landscape of global construction and infrastructure, efficiency and precision are paramount. For decades, the architectural, engineering, and construction (AEC) industries relied on traditional 2D drafting systems, which frequently led to alignment errors, design clashes, and costly revisions during the actual physical build. The emergence of Building Information Modeling (BIM) has completely transformed this workflow, replacing static drawings with intelligent, dynamic 3D virtual models.",
        "BIM Coordination is the core operational framework of this revolution. At its heart, coordination is about clash detection and resolution. In any large-scale project—be it a commercial high-rise, an airport terminal, or a metro transit corridor—hundreds of systems (architectural columns, structural load-bearing beams, HVAC ducting, plumbing lines, electrical conduits, and fire protection systems) must coexist in a limited space. Traditionally, detecting clashes occurred on-site, resulting in construction delays, scrap material, and expensive change orders.",
        "With advanced BIM coordination software like Autodesk Revit and Navisworks, engineering teams can create federated models combining all multi-disciplinary designs. Clash detection tests are run digitally before a single brick is laid. By utilizing automated clash reports, coordinators can resolve space conflicts instantly. For example, if a major plumbing supply line conflicts with a structural load-bearing steel beam, BIM software allows structural engineers to reroute the plumbing or modify structural openings seamlessly in the digital environment.",
        "Beyond clash resolution, BIM coordination facilitates 4D (Time/Scheduling) and 5D (Cost Estimation) project management. Project managers can simulate the entire construction sequence, matching the 3D model timeline with supply logistics and crane placements. This virtual dress rehearsal ensures that materials arrive on-site precisely when needed, minimizing storage overheads and reducing labor idle times. CADDVERSE TEACHLABS provides dedicated training in these workflows, preparing students to lead coordination teams on multi-million dollar infrastructure projects globally.",
        "As we step further into the digital age, technologies like cloud-based BIM collaboration (BIM 360/Autodesk Construction Cloud) allow distributed teams across different timezones to collaborate on a single master model in real-time. This level of synchronization eliminates discrepancy, ensures legal standard compliance, and secures a single version of truth. For aspiring structural and MEP engineers, mastering BIM coordination is the single most powerful step toward securing high-impact careers in the modern industry."
      ]
    },
    {
      id: 'parametric-modeling',
      title: 'Mastering Parametric Modeling: The Key to Complex & Organic Architecture',
      excerpt: 'Explore how parametric modeling, dynamic mathematical formulas, and algorithmic design structures empower architects to manifest radical, complex, and sustainable forms.',
      date: 'July 15, 2026',
      readTime: '6 Min Read',
      category: 'Parametric CAD',
      author: 'Ar. Ananya Sen, Generative Design Consultant',
      content: [
        "Modern architecture is breaking free from the rigid grids of standard rectangular columns and traditional structural forms. From the organic, fluid structures designed by Zaha Hadid Architects to the complex geometric envelopes of iconic sports stadiums, the physical landscape is becoming increasingly fluid. The secret behind designing and engineering these complex organic shapes lies in Parametric Modeling.",
        "Unlike traditional CAD modeling, which defines shapes by drawing absolute lines and fixed coordinate geometry, parametric modeling defines shapes using mathematical algorithms and parameter variables. This means that elements within a design are interconnected: changing one parameter (such as a curve radius, height ratio, or panel density) automatically recalculates and updates the entire building envelope.",
        "Parametric tools like Grasshopper (integrated into Rhino) and Dynamo (integrated into Revit) allow engineers to define complex rules and relationships. For instance, an architect can design a facade comprised of thousands of unique triangular panels, where the aperture (opening size) of each panel adjusts dynamically based on the solar angle at that specific coordinate. Instead of manually drafting thousands of variations, the algorithm calculates each panel shape instantly.",
        "Furthermore, parametric modeling is essential for optimization. Engineers can feed structural loads, wind pressures, and thermal requirements into their parametric models. The software will run iterative generative design loops, analyzing hundreds of options to find the absolute most optimized form—minimizing material volume while maximizing structural stability. This makes parametric design highly sustainable, reducing concrete and steel waste.",
        "At CADDVERSE TEACHLABS, our parametric modules empower students to bridge the gap between creative visual architecture and physical structural reality. Students learn to write visual scripting code, manage data structures, and output manufacturing-ready coordinates. Mastering these parametric workflows sets you apart in the job market, allowing you to contribute to cutting-edge projects that push the limits of physical structural design."
      ]
    },
    {
      id: 'evolution-of-cad',
      title: 'The Evolution of CAD: From Drafting Tools to Generative Artificial Intelligence',
      excerpt: 'A comprehensive history and future projection of Computer-Aided Design, tracing the lineage from 2D digital drafts to AI-driven generative design solutions.',
      date: 'June 30, 2026',
      readTime: '7 Min Read',
      category: 'Generative Design',
      author: 'Dr. Vivek Saxena, Director of Technical Innovation',
      content: [
        "For centuries, the blueprint of human engineering was drafted by hand. Drafters sat at large drawing tables, utilizing parallel bars, t-squares, and compasses to document intricate mechanical and architectural details on physical vellum or tracing paper. While beautiful, this manual process was slow, prone to wear, and incredibly tedious to update. A single design revision meant scraping ink off paper or starting the drawing completely from scratch.",
        "The introduction of Computer-Aided Design (CAD) in the late 20th century marked the first major digital disruption. Early 2D CAD packages like AutoCAD digitized the drafting board. Circles became mathematical coordinates, lines became vectors, and edits became instant copy-paste operations. This dramatically boosted production speeds, but the core thinking remained 2D; designers were still drawing flat projections of three-dimensional realities.",
        "The next evolutionary leap was the shift to 3D Parametric Feature-Based Modeling in the 1980s and 90s, led by mechanical design platforms like SolidWorks, Catia, and Inventor. Suddenly, designs were built as true solid models. Changing a hole diameter in a 3D model automatically updated the corresponding 2D manufacturing prints. This transition eliminated drawing errors and enabled virtual prototyping and stress simulation (FEA) directly within CAD environments.",
        "Today, we are standing on the cusp of the third major CAD revolution: Generative Design powered by Artificial Intelligence and machine learning algorithms. In generative design, the engineer does not draw the final shape. Instead, they define the design goals, boundary conditions, constraints, and material properties. For example, a designer might specify: 'Create a support bracket that can hold 500 kg of load, made of titanium, with mounting points at coordinates X, Y, and Z, minimized for weight.'",
        "The AI algorithm then runs thousands of stress analysis loops (FEA), generating organic, bone-like structures that no human designer would traditionally draft. The resulting parts are incredibly lightweight, highly optimized, and optimized for advanced manufacturing techniques like 3D printing and 5-axis CNC machining. CADDVERSE TEACHLABS stays at the absolute forefront of this technological shift, training our students not just to use software, but to command the AI-driven engineering pipelines of tomorrow."
      ]
    }
  ];

  const categories = ['All', 'BIM Technology', 'Parametric CAD', 'Generative Design'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

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
            Technical <span className="text-highlight">Blogs</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Explore inside industry insights, guides, and engineering trends authored by the expert engineering team at CADDVERSE TEACHLABS.
          </p>
        </div>

        {/* Category Filters */}
        <div className="blog-filters" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
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

        {/* Blog Post Cards Grid */}
        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px', position: 'relative', zIndex: 10 }}>
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '20px',
                padding: '30px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(9, 13, 22, 0.02)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(0, 68, 255, 0.15)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 68, 255, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.05)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(9, 13, 22, 0.02)';
              }}
            >
              <div>
                {/* Meta details */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px', fontSize: '11px', color: '#64748B' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '19px',
                  fontWeight: '850',
                  color: 'var(--primary-navy)',
                  lineHeight: '1.3',
                  marginBottom: '10px'
                }}>
                  {post.title}
                </h3>
                {/* Category Badge */}
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(0, 68, 255, 0.06)',
                  color: '#0044FF',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '9.5px',
                  fontWeight: '800',
                  letterSpacing: '0.4px',
                  fontFamily: 'var(--font-heading)',
                  marginBottom: '16px'
                }}>
                  {post.category}
                </span>
                {/* Excerpt */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: '1.65',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px'
                }}>
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom trigger link */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '800', color: '#0044FF', fontFamily: 'var(--font-heading)', borderTop: '1px solid rgba(15, 23, 42, 0.04)', paddingTop: '15px' }}>
                Read Full Article <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Full Blog Modal Detail View */}
        <AnimatePresence>
          {selectedPost && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(9, 13, 22, 0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div style={{
                background: 'var(--white)',
                width: '100%',
                maxWidth: '750px',
                maxHeight: '85vh',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 25px 60px rgba(9, 13, 22, 0.15)',
                overflowY: 'auto',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(15, 23, 42, 0.04)',
                    border: 'none',
                    color: 'var(--primary-navy)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.04)'}
                >
                  <X size={18} />
                </button>

                {/* Modal Content */}
                <div>
                  {/* Category */}
                  <span style={{
                    display: 'inline-block',
                    background: 'rgba(0, 68, 255, 0.06)',
                    color: '#0044FF',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: '850',
                    letterSpacing: '0.5px',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '16px'
                  }}>
                    {selectedPost.category}
                  </span>
                  
                  {/* Title */}
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '26px',
                    fontWeight: '900',
                    color: 'var(--primary-navy)',
                    lineHeight: '1.25',
                    marginBottom: '16px',
                    letterSpacing: '-0.5px'
                  }}>
                    {selectedPost.title}
                  </h1>

                  {/* Author & Date metadata */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    fontSize: '12px',
                    color: '#64748B',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
                    paddingBottom: '20px',
                    marginBottom: '24px'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={13} /> {selectedPost.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={13} /> {selectedPost.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} /> {selectedPost.readTime}
                    </span>
                  </div>

                  {/* Body Text Content */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px'
                  }}>
                    {selectedPost.content.map((pText, pIdx) => (
                      <p key={pIdx} style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14.5px',
                        lineHeight: '1.75',
                        color: '#334155'
                      }}>
                        {pText}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer close trigger */}
                <div style={{ marginTop: '40px', borderTop: '1px solid rgba(15, 23, 42, 0.06)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setSelectedPost(null)}
                    style={{
                      background: 'linear-gradient(135deg, #0044FF 0%, #091e4a 100%)',
                      color: 'var(--white)',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '10px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0, 68, 255, 0.18)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
