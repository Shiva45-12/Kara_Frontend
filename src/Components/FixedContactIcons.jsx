import { useState, useEffect } from 'react';

const FixedContactIcons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Phone Icon */}
      <a 
        href="tel:+917523082381" 
        className={`fixed-contact-icon phone-icon ${isVisible ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '30px',
          width: '50px',
          height: '50px',
          background: '#044c88',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.72)',
          zIndex: 9997,
          transition: 'all 0.3s ease',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(4, 76, 136, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(4, 76, 136, 0.4)';
        }}
      >
        <i className="fa fa-phone" style={{ fontSize: '22px' }}></i>
      </a>

      {/* WhatsApp Icon */}
      <a 
        href="https://wa.me/917991334444?text=Contact%20for%20Free%20Consultation" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`fixed-contact-icon whatsapp-icon ${isVisible ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          width: '50px',
          height: '50px',
          background: '#25D366',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.84)',
          zIndex: 9997,
          transition: 'all 0.3s ease',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
        }}
      >
        <i className="fa fa-whatsapp" style={{ fontSize: '22px' }}></i>
      </a>
    </>
  );
};

export default FixedContactIcons;