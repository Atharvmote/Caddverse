import React, { useRef, useState } from 'react';
import { Send, MapPin, Phone, Mail, Award, Landmark, Globe } from 'lucide-react';
import './inquirycontact.css';

export const InquiryContact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.course) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitted(true);
    // In a real app, this would send data to an API
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="inquiry" className="section inquiry-wrapper" ref={containerRef}>
      <div className="container">
        <div className="inquiry-split-layout">
          
          {/* Left Column: Contact Information */}
          <div className="inquiry-info-column">
            <div className="inquiry-header-left">
              <span className="section-tag">Get In Touch</span>
              <h2 className="inquiry-title">Contact Information</h2>
              <p className="inquiry-subtitle">
                We'd love to hear from you. Fill out the form to enroll or reach us through the details below.
              </p>
            </div>

            <div className="inquiry-details-list">
              
              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <Landmark size={20} />
                </div>
                <div className="info-text-wrapper">
                  <span className="info-label">INSTITUTE</span>
                  <span className="info-value">Caddverse Techlabs</span>
                </div>
              </div>

              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <Award size={20} />
                </div>
                <div className="info-text-wrapper">
                  <span className="info-label">BUSINESS TYPE</span>
                  <span className="info-value">Premium CAD, BIM & Engineering Design Institute</span>
                </div>
              </div>

              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div className="info-text-wrapper">
                  <span className="info-label">EMAIL ADDRESS</span>
                  <span className="info-value">admissions@caddverse.com</span>
                </div>
              </div>

              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="info-text-wrapper">
                  <span className="info-label">PHONE NUMBER</span>
                  <span className="info-value">+91 95137 66024</span>
                </div>
              </div>

              <div className="info-detail-item">
                <div className="info-icon-wrapper">
                  <MapPin size={20} />
                </div>
                <div className="info-text-wrapper">
                  <span className="info-label">BENGALURU CAMPUS</span>
                  <span className="info-value">
                    1st Floor, Landmark Building, Outer Ring Road, Marathahalli, Bengaluru - 560037
                  </span>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="get-directions-link">
                    GET DIRECTIONS
                  </a>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="inquiry-social-row">
              <a href="#" className="social-icon-btn" aria-label="LinkedIn">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.1 1-1.1h3V1h-4.2C10.5 1 9 2.5 9 5.5V8z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Instagram">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Website">
                <Globe size={18} />
              </a>
            </div>

          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="inquiry-form-column">
            <div className="inquiry-form-card">
              
              {isSubmitted ? (
                <div className="inquiry-success-state">
                  <div className="success-icon-circle">
                    <Send size={32} />
                  </div>
                  <h3 className="success-title">Submission Successful!</h3>
                  <p className="success-message">
                    Thank you for reaching out, <strong>{formData.fullName}</strong>. Our admissions counselor will call you shortly on <strong>{formData.phone}</strong> to guide you through the process.
                  </p>
                  <button 
                    className="btn-success-reset"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        course: '',
                        message: '',
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form-fields">
                  
                  {/* Two fields row: Full Name & Company */}
                  <div className="form-row-two">
                    <div className="input-group">
                      <label className="input-label">FULL NAME <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name" 
                        className="form-input-field" 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">COMPANY / COLLEGE NAME</label>
                      <input 
                        type="text" 
                        name="companyName" 
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your company or college" 
                        className="form-input-field" 
                      />
                    </div>
                  </div>

                  {/* Two fields row: Email & Phone */}
                  <div className="form-row-two">
                    <div className="input-group">
                      <label className="input-label">EMAIL ADDRESS <span className="required">*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com" 
                        className="form-input-field" 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">PHONE NUMBER <span className="required">*</span></label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX" 
                        className="form-input-field" 
                        required 
                      />
                    </div>
                  </div>

                  {/* Dropdown: Course interest */}
                  <div className="input-group">
                    <label className="input-label">COURSE INTERESTED IN <span className="required">*</span></label>
                    <select 
                      name="course" 
                      value={formData.course} 
                      onChange={handleChange}
                      className="form-select-field"
                      required
                    >
                      <option value="">Select a Course</option>
                      <option value="Master Diploma in Product Design & Analysis">Master Diploma in Product Design & Analysis</option>
                      <option value="Master In Building Information Modeling (BIM)">Master In Building Information Modeling (BIM)</option>
                      <option value="Master Diploma in Architecture Design">Master Diploma in Architecture Design</option>
                      <option value="Master Diploma in Electrical Design">Master Diploma in Electrical Design</option>
                      <option value="Master Diploma in Building Design">Master Diploma in Building Design</option>
                      <option value="Master Diploma in Interior Design">Master Diploma in Interior Design</option>
                      <option value="General Inquiry">General Inquiry / Other</option>
                    </select>
                  </div>

                  {/* Message textarea */}
                  <div className="input-group">
                    <label className="input-label">MESSAGE <span className="required">*</span></label>
                    <textarea 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements or career goals..." 
                      className="form-textarea-field" 
                      rows={5}
                      required 
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-submit-inquiry">
                    <Send size={16} className="btn-submit-icon" /> Send Message
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
