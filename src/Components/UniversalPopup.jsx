import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const UniversalPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupCount, setPopupCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    interest: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const autoCloseTimer = useRef(null);
  const recurringTimer = useRef(null);
  const formInteracted = useRef(false);

  const location = useLocation();

  useEffect(() => {
    // Reset form interaction on route change
    formInteracted.current = false;
    
    // Show popup after 3 seconds on page load or route change
    const timer = setTimeout(() => {
      if (popupCount < 3) {
        showPopup();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
    };
  }, [location.pathname]); // Trigger on route change

  const showPopup = () => {
    setIsVisible(true);
    setPopupCount(prev => prev + 1);

    // Auto close after 8 seconds
    autoCloseTimer.current = setTimeout(() => {
      if (!formInteracted.current) {
        setIsVisible(false);
      }
    }, 8000);
  };

  const closePopup = () => {
    setIsVisible(false);
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  };

  const handleFormFocus = () => {
    formInteracted.current = true;
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/popup/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });


      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          interest: ''
        });
        // Stop recurring popups after form submission
        if (recurringTimer.current) {
          clearInterval(recurringTimer.current);
        }
        setTimeout(() => closePopup(), 2000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        id="universalPopupOverlay"
        onClick={closePopup}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 9998
        }}
      />

      <div
        id="universalPopup"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: 0,
          borderRadius: '10px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          zIndex: 9999,
          width: '90vw',
          height: '90vh',
          maxWidth: '1000px',
          maxHeight: '600px',
          overflow: 'hidden'
        }}
      >
        <button
          onClick={closePopup}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 10000,
            color: '#333'
          }}
        >
          &times;
        </button>

        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{
            width: '60%',
            background: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px'
          }}>
            <img
              src="/assets/images/home01/modi.jpg"
              style={{
                width: '90%',
                maxHeight: '40%',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px'
              }}
              alt="Government Support"
            />
            <img
              src="/assets/images/home01/popop.jpg"
              style={{
                width: '90%',
                maxHeight: '60%',
                objectFit: 'contain'
              }}
              alt="Solar Solutions"
            />
          </div>

          <div style={{ width: '40%', padding: '25px', overflowY: 'auto' }}>
            <h3 style={{ color: '#53a92c', marginBottom: '10px', fontSize: '20px' }}>
              Free Solar Consultation
            </h3>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px', lineHeight: 1.5 }}>
              Get expert advice on solar solutions with government subsidies. No pressure, genuine guidance only.
            </p>

            {message && (
              <div style={{
                padding: '8px',
                marginBottom: '15px',
                borderRadius: '5px',
                backgroundColor: message.includes('Thank you') ? '#d4edda' : '#f8d7da',
                color: message.includes('Thank you') ? '#155724' : '#721c24',
                border: `1px solid ${message.includes('Thank you') ? '#c3e6cb' : '#f5c6cb'}`,
                fontSize: '12px'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                onFocus={handleFormFocus}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                onFocus={handleFormFocus}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                onFocus={handleFormFocus}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              />

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your City"
                required
                onFocus={handleFormFocus}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              />

              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                onFocus={handleFormFocus}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  fontSize: '14px'
                }}
              >
                <option value="">Select Your Interest</option>
                <option value="residential">Residential Solar</option>
                <option value="commercial">Commercial Solar</option>
                <option value="agricultural">Agricultural Solar Pump</option>
                <option value="micro-udyog">Micro Udyog Setup</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: loading ? '#ccc' : '#53a92c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '15px'
                }}
              >
                {loading ? 'Submitting...' : 'Get Free Consultation'}
              </button>
            </form>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#888' }}>
                Call us directly: <a href="tel:+917991334444" style={{ color: '#53a92c', textDecoration: 'none' }}>+91 7991334444</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          #universalPopup {
            width: 95vw !important;
            height: 95vh !important;
            max-height: 90vh !important;
          }
          
          #universalPopup > div {
            flex-direction: column !important;
          }
          
          #universalPopup > div > div:first-child {
            width: 100% !important;
            height: 60% !important;
            padding: 5px !important;
          }
          
          #universalPopup > div > div:last-child {
            width: 100% !important;
            padding: 15px !important;
            height: 40% !important;
          }
          
          #universalPopup img {
            width: 100% !important;
            max-height: 52% !important;
            object-fit: cover !important;
          }
        }
      `}</style>
    </>
  );
};

export default UniversalPopup;