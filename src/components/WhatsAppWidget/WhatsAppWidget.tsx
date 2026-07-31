import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { courses } from '../CoursesSection/coursesData';
import logoImg from '../../assets/newmodern.png';
import './whatsappwidget.css';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const waNumber = '919049000010';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleTopicClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="wa-widget-container" ref={widgetRef}>
      
      {/* The Popup Menu */}
      <div className={`wa-popup ${isOpen ? 'open' : ''}`}>
        <div className="wa-popup-header">
          <div className="wa-popup-title-row">
            <div className="wa-avatar">
              <img src={logoImg} alt="CADDverse Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '4px' }} />
            </div>
            <div className="wa-title-wrapper">
              <h4 className="wa-popup-title">CADDverse Techlabs</h4>
              <p className="wa-popup-subtitle">Where Learning Meets Innovation.</p>
            </div>
          </div>
          <button className="wa-popup-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="wa-popup-chat-area">
          <div className="wa-chat-bubble wa-chat-received">
            <p>Hi there! 👋</p>
            <p>Welcome to <strong style={{ fontWeight: '800' }}>CADDVERSE TEACHLABS</strong>.</p>
            <p>Which course or program are you interested in? Choose from our catalog below.</p>
            <span className="wa-chat-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>

        <div className="wa-popup-body">
          {/* General Enquiry First */}
          <button 
            className="wa-topic-btn general-enquiry"
            onClick={() => handleTopicClick(
`${getGreeting()} CADDverse Techlabs! 👋

I visited your website and would like to make a general inquiry about your services and training programs. Could you please connect me with a representative?

I have also downloaded the overall brochure from the link below:
👉 https://caddverse.in/broucher.pdf

Thank you! 🙏`
            )}
          >
            <div className="wa-topic-text">
              <span className="wa-topic-title">💬 General Enquiry / Other</span>
            </div>
            <Send size={16} className="wa-send-icon" />
          </button>

          <div className="wa-catalog-header">Our Programs</div>
          
          {courses.map((course) => (
            <button 
              key={course.id} 
              className="wa-topic-btn"
              onClick={() => handleTopicClick(
`${getGreeting()} CADDverse Techlabs! 👋

I am interested in your *${course.title}* program. Could you please share more details regarding the syllabus, fee structure, and upcoming batch timings?

I have also downloaded the program brochure from the link below:
👉 https://caddverse.in/broucher.pdf

Thank you! 🙏`
              )}
            >
              <div className="wa-topic-text">
                <span className="wa-topic-title">{course.title}</span>
                <span className="wa-topic-desc">{course.duration} • {course.level}</span>
              </div>
              <Send size={16} className="wa-send-icon" />
            </button>
          ))}
        </div>
      </div>

      {/* Floating Trigger Button */}
      <button 
        className={`wa-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X size={28} color="#fff" />
        ) : (
          <svg viewBox="0 0 24 24" width="34" height="34" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        )}
      </button>

    </div>
  );
};
