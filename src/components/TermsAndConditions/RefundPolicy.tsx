import React, { useEffect } from 'react';
import { ArrowLeft, CreditCard, ShieldAlert, BadgeInfo } from 'lucide-react';
import './terms.css';

interface RefundProps {
  onBack: () => void;
}

export const RefundPolicy: React.FC<RefundProps> = ({ onBack }) => {
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
            Refund <span className="text-highlight">&amp; Cancellation</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Please read our cancellation and refund policies carefully before enrolling in any training program or purchasing resources.
          </p>
        </div>

        {/* Content Card */}
        <div className="terms-content-card">
          
          {/* Section 1: Course Enrollment & Booking */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <CreditCard size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Enrollment &amp; Booking</h3>
            </div>
            <ul className="terms-list">
              <li>
                All course enrollments and subscription bookings are processed once the <strong style={highlightStyle}>full program fee is realized</strong> in advance.
              </li>
              <li>
                Students must verify eligibility criteria, class schedules, syllabus modules, and software stacks before completing the checkout/payment transaction.
              </li>
            </ul>
          </div>

          <div className="terms-section-divider" />

          {/* Section 2: Strict No-Refund Policy */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <ShieldAlert size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Strict No-Refund Policy</h3>
            </div>
            <ul className="terms-list">
              <li>
                CADDverse Techlabs maintains a strict policy on fees. <strong style={highlightStyle}>Under any circumstances, no fees will be refunded</strong> once the transaction is completed and the training service commences.
              </li>
              <li>
                This strict no-refund policy applies to <strong style={highlightStyle}>non-usage of services, student drop-outs, change of mind, personal scheduling conflicts</strong>, or any external reasons whatsoever.
              </li>
              <li>
                In the event that a student violates the Terms of Service, CADDverse Techlabs reserves the right to immediately suspend/terminate their portal access and no refund will be provided.
              </li>
            </ul>
          </div>

          <div className="terms-section-divider" />

          {/* Section 3: Cancellation Policies */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <BadgeInfo size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Cancellation &amp; Exceptions</h3>
            </div>
            <ul className="terms-list">
              <li>
                CADDverse Techlabs reserves the right to cancel or reschedule batches/courses due to technical issues, faculty unavailability, or lack of batch strength. In the rare event of course cancellation from our end, a <strong style={highlightStyle}>full refund of the paid fees</strong> will be initiated.
              </li>
              <li>
                For physical supplies and learning resources: Cancellations can only be requested <strong style={highlightStyle}>before the package has been shipped</strong>. Once shipped, cancellations are not allowed.
              </li>
              <li>
                Damaged or defective products will be replaced or reshipped subject to examination and verification. Refund requests for product delivery are only initiated if the specific product stock is completely unavailable.
              </li>
            </ul>
          </div>

        </div>
        
      </div>
    </div>
  );
};
