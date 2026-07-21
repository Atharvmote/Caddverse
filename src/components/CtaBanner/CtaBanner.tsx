import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import './ctabanner.css';

export const CtaBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="cta-banner-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="cta-banner-card"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Left Details */}
          <div className="cta-left-content">
            <div className="cta-icon-glow">
              <Rocket size={24} fill="currentColor" stroke="none" />
            </div>
            <div className="cta-text-block">
              <span className="cta-banner-title">
                Ready to start your career in design &amp; engineering?
              </span>
              <span className="cta-banner-desc">
                Join thousands of successful students today.
              </span>
            </div>
          </div>

          {/* Right Action */}
          <div className="cta-right-content">
            <a href="#courses" className="btn btn-experts">
              Talk To Our Experts
              <ArrowRight size={14} style={{ marginLeft: '6px' }} />
            </a>
          </div>

          {/* Blueprint dot coordinate grid decoration */}
          <div className="cta-dot-grid">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="var(--white)" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
