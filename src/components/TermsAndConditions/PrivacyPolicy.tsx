import React, { useEffect } from 'react';
import { ArrowLeft, FileText, ShieldCheck, Briefcase, Users } from 'lucide-react';
import './terms.css';

interface PrivacyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const highlightStyle = { fontWeight: '800' };

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
            Privacy <span className="text-highlight">Policy</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            We value your privacy. Please read our policy below to understand how we collect, use, and safeguard your personal information.
          </p>
        </div>

        {/* Content Card */}
        <div className="terms-content-card">
          
          {/* Section 1: Collection of Information */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <FileText size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Information Collection</h3>
            </div>
            <ul className="terms-list">
              <li>
                We collect personal information when you register on our site, enroll in courses, request quotes, or submit inquiries. This information may include your <strong style={highlightStyle}>Full Name</strong>, <strong style={highlightStyle}>Email Address</strong>, <strong style={highlightStyle}>Phone Number</strong>, and <strong style={highlightStyle}>College or Company Details</strong>.
              </li>
              <li>
                We also collect non-personal data, such as browser types, operating systems, and page viewing logs, to optimize user experience and perform technical diagnostics.
              </li>
              <li>
                All collected data is stored securely using <strong style={highlightStyle}>industry-standard encryption protocols</strong> to prevent unauthorized access, alteration, or data breach.
              </li>
            </ul>
          </div>

          <div className="terms-section-divider" />

          {/* Section 2: 100% Job Placement Assistance */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <Briefcase size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Placement &amp; Job Assistance</h3>
            </div>
            <ul className="terms-list">
              <li>
                CADDverse Techlabs is committed to launching successful careers. We provide <strong style={highlightStyle}>100% Job Placement Assistance</strong> to all students who successfully complete our certified CAD, BIM, or structural design training programs.
              </li>
              <li>
                Our job assistance program includes <strong style={highlightStyle}>Professional Resume Building</strong>, <strong style={highlightStyle}>Mock Interview Preparation</strong>, <strong style={highlightStyle}>Communication Skill Modules</strong>, and direct entry into our recruiter network database.
              </li>
              <li>
                We organize dedicated placement drives and connect our certified students directly with leading national and international engineering firms, infrastructure groups, and CAD design consultancies.
              </li>
            </ul>
          </div>

          <div className="terms-section-divider" />

          {/* Section 3: Data Security and Usage */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <ShieldCheck size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Security &amp; Usage</h3>
            </div>
            <ul className="terms-list">
              <li>
                We utilize your personal information to deliver educational resources, personalize your learning dashboard, and issue <strong style={highlightStyle}>NSDC Partner &amp; ISO Technical Certificates</strong>.
              </li>
              <li>
                We <strong style={highlightStyle}>strictly do not sell, rent, or trade</strong> your personal identification details to third-party marketing companies. Data is only shared with authorized partners for verification and job placement facilitation.
              </li>
              <li>
                Any changes to our privacy protocols will be updated immediately on this page. Users are advised to review this policy periodically for updates.
              </li>
            </ul>
          </div>

          <div className="terms-section-divider" />

          {/* Section 4: Contact & Grievance */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <Users size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Contact Information</h3>
            </div>
            <ul className="terms-list">
              <li>
                If you have any questions regarding this Privacy Policy, please contact our legal cell at <strong style={highlightStyle}>info@caddversetechlabs.com</strong>.
              </li>
              <li>
                All legal disputes regarding data processing and privacy are governed by the laws of India and fall under the exclusive jurisdiction of the courts at <strong style={highlightStyle}>Vadodara, Gujarat</strong>.
              </li>
            </ul>
          </div>

        </div>
        
      </div>
    </div>
  );
};
