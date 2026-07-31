import React, { useEffect, useState } from 'react';
import { ArrowLeft, Quote, Award, BookOpen, Heart } from 'lucide-react';
import '../TermsAndConditions/terms.css';
import director1Img from '../../assets/director1.jpeg'; // Himanshu Kulkarni
import directorImg from '../../assets/director.png'; // Anshul Shripad
import director3Img from '../../assets/director3.png'; // Mohini Kulkarni

interface AboutDirectorPageProps {
  onBack: () => void;
}

const directorsData = {
  himanshu: {
    name: 'Mr. Himanshu Kulkarni',
    role: 'Director & Co-Founder',
    company: 'Caddverse Techlabs LLP',
    quote: '"Innovation is the bridge between engineering imagination and reality."',
    image: directorImg,
    imagePosition: '58% center',
    bio: [
      "Mr. Himanshu Kulkarni is the Director & Co-Founder of Caddverse Techlabs LLP, leading the organization's technological roadmap, corporate partnerships, and operational strategy. With over 7+ years of engineering leadership and academic experience, he is dedicated to establishing next-generation engineering education standards.",
      "His expertise spans advanced structural analysis, BIM coordination, digital twins integration, and technological automation in AEC (Architecture, Engineering, and Construction). Himanshu co-founded Caddverse Techlabs with a vision to build an industry-aligned learning ecosystem where computational design meets practical implementation.",
      "Under his guidance, Caddverse has expanded its research, curriculum validation systems, and industry-oriented programs to ensure that modern CAD/BIM standards are accessible to students and corporate clients alike."
    ],
    message: "At Caddverse Techlabs, we look beyond conventional certificates. Our goal is to create engineers who can tackle the most complex, real-world structural challenges with confidence. We focus on active project verification, architectural accuracy, and engineering design depth.",
    expertise: [
      "Structural Engineering & BIM",
      "Digital Twin Integration",
      "Technical Curriculum Validation",
      "Operational Excellence",
      "Computational Design",
      "Corporate Training Partnerships",
      "Strategic Operations",
      "Project Delivery",
      "AEC Tech Integration",
      "Advanced Computational Analysis"
    ],
    proficiency: "Revit • AutoCAD • Tekla Structures • BIM 360 • Navisworks • Structural Analysis • Digital Twin • Project Management • ETABS • STAAD Pro",
    vision: "To establish Caddverse Techlabs LLP as India's premier engineering learning center by introducing state-of-the-art computational methods, BIM standards, and industry validation processes.",
    philosophy: "Leadership in engineering is about creating pathways where raw talent transforms into precision execution.",
    badges: [
      { type: 'award', text: '7+ Years Industry Consultation' },
      { type: 'book', text: 'BIM Specialist & CAD Consultant' },
      { type: 'heart', text: '100% Placement Bootcamp Mentor' }
    ]
  },
  mohini: {
    name: 'Mrs. Mohini Kulkarni',
    role: 'Director & Head of Operations',
    company: 'Caddverse Techlabs LLP',
    quote: '"Excellence in operations is the execution of engineering vision."',
    image: director3Img,
    imagePosition: 'center 15%',
    bio: [
      "Mrs. Mohini Kulkarni is the Director & Head of Operations at Caddverse Techlabs LLP, managing the organization's business operations, student success initiatives, and administration. With over 5+ years of experience in educational management and operations, she is instrumental in building and maintaining Caddverse's seamless operational model.",
      "Her expertise lies in strategic planning, program management, academic coordination, and corporate alignment. She leads the operations team in establishing robust learning schedules, managing resources, and ensuring that every student gets optimal academic support and individual attention.",
      "Co-founding Caddverse, Mohini has been a key driver behind the center's structured placement cells, mock interview systems, and career development programs. She is highly passionate about creating a supportive and motivating learning environment that helps students transition into high-paying engineering careers."
    ],
    message: "Our focus is entirely on the journey of the student. From the moment they enroll, we map out their training, portfolio reviews, and placement preparations. We believe that a strong operational framework ensures that no student is left behind, and every individual is given the resources to succeed in the corporate world.",
    expertise: [
      "Operations Management",
      "Strategic Planning",
      "Student Success Programs",
      "Academic Coordination",
      "Resources Optimization",
      "Placement Cell Management",
      "Career Development",
      "Corporate Branding",
      "Process Standardization",
      "Educational Administration"
    ],
    proficiency: "Operations • Program Management • Student Mentorship • Strategic Planning • Placement Assistance • Academic Execution • Resource Management • Public Relations • Event Management",
    vision: "To build the most efficient, student-centric operational model in technical education that guarantees quality support, organized learning timelines, and high success rates for every student at Caddverse.",
    philosophy: "True operational leadership lies in aligning every system, process, and person toward the collective success of our learners.",
    badges: [
      { type: 'award', text: '5+ Years Academic Management' },
      { type: 'book', text: 'Head of Operations' },
      { type: 'heart', text: 'Student Success & Placement Director' }
    ]
  },
  anshul: {
    name: 'Mr. Anshul Shripad',
    role: 'Director & Head of Technical',
    company: 'Caddverse Techlabs LLP',
    quote: '"Engineering Innovation. Empowering Future Talent."',
    image: director1Img,
    imagePosition: 'center 5%',
    bio: [
      "Mr. Anshul Shripad is the Director & Co-Founder of Caddverse Techlabs LLP, an engineering technology company committed to transforming technical education, engineering consulting, and product development through innovation, practical learning, and industry collaboration.",
      "With over 6+ years of professional experience in engineering design, CAD technologies, product development, and technical consulting, he is passionate about developing industry-ready engineers and delivering engineering solutions that create real business value.",
      "His expertise lies in CAD engineering, automotive product design, sheet metal engineering, BIW design, product development, and engineering consulting. Throughout his professional journey, he has worked on complex engineering projects involving automotive systems, manufacturing design, and product optimization while continuously mentoring students and professionals to build successful engineering careers.",
      "Driven by a strong entrepreneurial mindset, Mr. Anshul co-founded Caddverse Techlabs with a vision to bridge the gap between academic education and industrial requirements. Under his leadership, the organization is focused on delivering world-class technical training, CAD/CAM solutions, engineering consulting, design outsourcing, and industry-oriented certification programs that prepare learners for the evolving demands of modern engineering.",
      "He strongly believes that practical knowledge, innovation, and continuous learning are the foundation of engineering excellence. His mission is to create an ecosystem where students, professionals, educational institutions, and industries collaborate to solve real-world engineering challenges while building future-ready careers.",
      "Beyond technical expertise, Mr. Anshul is dedicated to promoting innovation, entrepreneurship, and digital transformation within the engineering community. Through Caddverse Techlabs, he aims to build a platform that not only enhances technical skills but also inspires creativity, leadership, and lifelong learning."
    ],
    message: "At CADDVERSE TEACHLABS, we do not believe in superficial, certificate-oriented coaching. Our entire mission is built on real engineering enablement. We push our students through actual blueprint layouts, complex piping coordination structures, and seismic structural checks. When an engineer finishes their training here, they possess the credentials, confidence, and portfolios of a designer with multiple years of industry experience. That is why we can confidently commit to 100% placement support for our dedicated candidates.",
    expertise: [
      "CAD/CAM Engineering",
      "Product Design & Development",
      "Sheet Metal & BIW Design",
      "Automotive Engineering",
      "Mechanical Design",
      "Engineering Consulting",
      "CAD Outsourcing Services",
      "Technical Training & Skill Development",
      "Industry 4.0 & Digital Engineering",
      "Career Development for Engineers"
    ],
    proficiency: "AutoCAD • SolidWorks • CATIA • Creo • GD&T • Product Development • Sheet Metal Design • BIW Design • Automotive Components • Design Validation • Engineering Documentation",
    vision: "To establish Caddverse Techlabs LLP as one of India's most trusted engineering and technology organizations by empowering students, professionals, and industries through innovation, practical learning, advanced engineering solutions, and world-class technical education.",
    philosophy: "Great engineers are not defined only by the designs they create, but by the knowledge they share, the problems they solve, and the impact they leave on future generations.",
    badges: [
      { type: 'award', text: '6+ Years Design & Consulting' },
      { type: 'book', text: 'Automotive & Product Specialist' },
      { type: 'heart', text: 'CAD Outsourcing Director' }
    ]
  }
};

type DirectorKey = 'himanshu' | 'mohini' | 'anshul';

export const AboutDirectorPage: React.FC<AboutDirectorPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<DirectorKey>('himanshu');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const activeDirector = directorsData[activeTab];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'award':
        return <Award size={18} />;
      case 'book':
        return <BookOpen size={18} />;
      case 'heart':
        return <Heart size={18} />;
      default:
        return <Award size={18} />;
    }
  };

  return (
    <div className="terms-page-wrapper" style={{ minHeight: '100vh', background: 'radial-gradient(circle at 10% 20%, rgba(9, 30, 74, 0.02) 0%, rgba(255, 255, 255, 1) 90%)', paddingBottom: '60px' }}>
      <style>{`
        .director-profile-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 48px;
          margin-top: 20px;
          align-items: start;
        }
        .director-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .director-tab-btn {
          flex: 1;
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          font-family: var(--font-heading);
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
        }
        .director-tab-btn:hover {
          transform: translateY(-1.5px);
        }
        .tag-pill {
          background: rgba(9, 30, 74, 0.02);
          border: 1px solid rgba(15, 23, 42, 0.05);
          border-radius: 8px;
          padding: 8px 14px;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        @media (max-width: 991px) {
          .director-profile-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .director-vision-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .director-tabs-container {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .director-tab-btn {
            width: 100%;
          }
        }
      `}</style>
      
      <div className="container">
        
        {/* Back Button */}
        <button className="terms-btn-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Page Header */}
        <div className="terms-header-centered">
          <h2 className="section-title">
            Meet Our <span className="text-highlight">Leadership Team</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc" style={{ maxWidth: '750px', margin: '0 auto' }}>
            Discover the visionaries guiding <strong style={{ fontWeight: '800' }}>CADDVERSE TECHLABS</strong> toward shaping future-ready computational design talent in India.
          </p>
        </div>

        {/* Dynamic Segmented Switcher Tabs */}
        <div className="director-tabs-container" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: '30px auto 45px auto',
          padding: '6px',
          background: 'rgba(9, 30, 74, 0.03)',
          borderRadius: '16px',
          maxWidth: '720px',
          border: '1px solid rgba(15, 23, 42, 0.05)'
        }}>
          {(Object.keys(directorsData) as DirectorKey[]).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                className="director-tab-btn"
                onClick={() => setActiveTab(key)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #0044FF 0%, #091e4a 100%)' : 'transparent',
                  color: isActive ? 'var(--white)' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 8px 20px rgba(0, 68, 255, 0.2)' : 'none'
                }}
              >
                {directorsData[key].name.replace('Mr. ', '').replace('Mrs. ', '')}
              </button>
            );
          })}
        </div>

        {/* Profile Content Section */}
        <div className="director-profile-grid">
          
          {/* Left Column: Media & Badges */}
          <div style={{
            position: 'sticky',
            top: '40px'
          }}>
            <div style={{
              background: 'var(--white)',
              borderRadius: '24px',
              padding: '20px',
              boxShadow: '0 20px 40px rgba(9, 30, 74, 0.06)',
              border: '1px solid rgba(15, 23, 42, 0.05)',
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
                  key={activeTab}
                  src={activeDirector.image} 
                  alt={activeDirector.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: activeDirector.imagePosition || 'center',
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
                margin: '0 0 4px 0',
                letterSpacing: '-0.3px'
              }}>
                {activeDirector.name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#64748B',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 20px 0'
              }}>
                {activeDirector.role}
              </p>

              {/* Quick Info Badges */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left'
              }}>
                {activeDirector.badges.map((badge, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(9, 30, 74, 0.02)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(15, 23, 42, 0.03)'
                  }}>
                    <div style={{ color: '#0044FF', display: 'flex', alignItems: 'center' }}>
                      {renderIcon(badge.type)}
                    </div>
                    <div style={{ fontSize: '12.5px', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}>
                      {badge.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Vision Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Executive Title & Intro */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: '900',
                color: 'var(--primary-navy)',
                marginBottom: '6px',
                letterSpacing: '-0.5px'
              }}>
                {activeDirector.name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14.5px',
                color: '#0044FF',
                fontWeight: '750',
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.8px'
              }}>
                {activeDirector.role}, {activeDirector.company}
              </p>
              
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15.5px',
                lineHeight: '1.75',
                color: 'var(--text)',
                fontWeight: '500',
                fontStyle: 'italic',
                marginBottom: '20px',
                paddingLeft: '14px',
                borderLeft: '3px solid #0044FF'
              }}>
                {activeDirector.quote}
              </p>

              {/* Bio Paragraphs */}
              {activeDirector.bio.map((paragraph, idx) => (
                <p key={idx} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px'
                }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Expertise Block */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '19px',
                fontWeight: '850',
                color: 'var(--primary-navy)',
                marginBottom: '14px',
                letterSpacing: '-0.2px'
              }}>
                Core Expertise
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {activeDirector.expertise.map((exp, idx) => (
                  <span key={idx} className="tag-pill">
                    <span style={{ color: '#0044FF', fontWeight: '900' }}>•</span> {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Proficiency */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '19px',
                fontWeight: '850',
                color: 'var(--primary-navy)',
                marginBottom: '10px',
                letterSpacing: '-0.2px'
              }}>
                Technical Proficiency
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: '1.65',
                color: 'var(--text-secondary)',
                background: 'rgba(9, 30, 74, 0.015)',
                padding: '14px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(15, 23, 42, 0.04)',
                fontWeight: '550',
                letterSpacing: '0.2px'
              }}>
                {activeDirector.proficiency}
              </p>
            </div>

            {/* Quote Block Letter */}
            <div style={{
              background: 'rgba(0, 68, 255, 0.025)',
              borderLeft: '4px solid #0044FF',
              borderRadius: '0 16px 16px 0',
              padding: '24px 28px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: 'rgba(0, 68, 255, 0.06)',
                zIndex: 1
              }}>
                <Quote size={50} />
              </div>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '17px',
                fontWeight: '850',
                color: 'var(--primary-navy)',
                marginBottom: '10px',
                position: 'relative',
                zIndex: 2
              }}>
                Director's Personal Message
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'var(--text-secondary)',
                margin: 0,
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 2
              }}>
                "{activeDirector.message}"
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="director-vision-grid">
              
              {/* Vision Card */}
              <div style={{
                background: 'var(--white)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 10px 20px rgba(9, 30, 74, 0.01)'
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15.5px',
                  fontWeight: '900',
                  color: 'var(--primary-navy)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#0044FF' }}>●</span> Vision
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  lineHeight: '1.65',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  {activeDirector.vision}
                </p>
              </div>

              {/* Leadership Philosophy Card */}
              <div style={{
                background: 'var(--white)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 10px 20px rgba(9, 30, 74, 0.01)'
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15.5px',
                  fontWeight: '900',
                  color: 'var(--primary-navy)',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ color: '#0044FF' }}>●</span> Leadership Philosophy
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  lineHeight: '1.65',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "{activeDirector.philosophy}"
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
