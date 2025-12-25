import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/submit`, {
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
          email: '',
          phone: '',
          city: '',
          subject: '',
          message: ''
        });
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/assets/images/home01/slider-img-1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '150px 0 100px',
        color: 'white'
      }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>Contact Us</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '15px', fontWeight: '700' }}>Get In Touch</h2>
              <p style={{ color: '#666', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                Ready to go solar? Contact our experts for a free consultation and start your journey to clean energy
              </p>
            </div>
          </div>

          <div className="row" style={{ marginTop: '50px' }}>
            {/* Contact Form */}
            <div className="col-lg-8 mb-5">
              <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '10px' }}>
                <h3 style={{ color: '#53a92c', marginBottom: '30px', fontSize: '24px', fontWeight: '600' }}>Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                  {message && (
                    <div style={{ 
                      padding: '10px', 
                      marginBottom: '20px', 
                      borderRadius: '5px', 
                      backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
                      color: message.includes('successfully') ? '#155724' : '#721c24',
                      border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`
                    }}>
                      {message}
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name" 
                        required 
                        style={{ 
                          width: '100%',
                          padding: '15px', 
                          border: '1px solid #ddd', 
                          borderRadius: '8px', 
                          fontSize: '14px',
                          outline: 'none'
                        }} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email" 
                        required 
                        style={{ 
                          width: '100%',
                          padding: '15px', 
                          border: '1px solid #ddd', 
                          borderRadius: '8px', 
                          fontSize: '14px',
                          outline: 'none'
                        }} 
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number" 
                        required 
                        style={{ 
                          width: '100%',
                          padding: '15px', 
                          border: '1px solid #ddd', 
                          borderRadius: '8px', 
                          fontSize: '14px',
                          outline: 'none'
                        }} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Your City" 
                        style={{ 
                          width: '100%',
                          padding: '15px', 
                          border: '1px solid #ddd', 
                          borderRadius: '8px', 
                          fontSize: '14px',
                          outline: 'none'
                        }} 
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject" 
                      style={{ 
                        width: '100%',
                        padding: '15px', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px', 
                        fontSize: '14px',
                        outline: 'none'
                      }} 
                    />
                  </div>
                  <div className="mb-4">
                    <textarea 
                      rows="5" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message" 
                      required 
                      style={{ 
                        width: '100%',
                        padding: '15px', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        resize: 'vertical',
                        outline: 'none'
                      }}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      background: loading ? '#ccc' : '#53a92c', 
                      color: 'white', 
                      padding: '15px 40px', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#4a8f26')}
                    onMouseOut={(e) => !loading && (e.currentTarget.style.background = '#53a92c')}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4">
              <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#53a92c', marginBottom: '30px', fontSize: '24px', fontWeight: '600' }}>Contact Information</h3>
                
                <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#53a92c', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <i className="fa fa-phone" style={{ color: 'white', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#333', margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>Phone</h5>
                    <a href="tel:+917523082381" style={{ color: '#666', fontSize: '14px', textDecoration: 'none' }}>
                      +91 7523082381
                    </a>
                  </div>
                </div>
                
                <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#53a92c', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <i className="fa fa-envelope" style={{ color: 'white', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#333', margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>Email</h5>
                    <a href="mailto:info@solarkara.in" style={{ color: '#666', fontSize: '14px', textDecoration: 'none' }}>
                      info@solarkara.in
                    </a>
                  </div>
                </div>
                
                <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#53a92c', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <i className="fa fa-map-marker" style={{ color: 'white', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#333', margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>Address</h5>
                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                      Kara Group, Lucknow, Uttar Pradesh
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#53a92c', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '20px',
                    flexShrink: 0
                  }}>
                    <i className="fa fa-clock-o" style={{ color: 'white', fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <h5 style={{ color: '#333', margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>Working Hours</h5>
                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                      Monday - Saturday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '40px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <h3 style={{ color: '#333', fontSize: '28px', fontWeight: '600', marginBottom: '15px' }}>Find Us Here</h3>
              <p style={{ color: '#666', fontSize: '16px' }}>Visit our office for personalized solar consultation</p>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', marginTop: '20px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227821.9871046749!2d80.77769905262134!3d26.84890282937889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1764056225049!5m2!1sen!2sin"
            width="90%" 
            height="400" 
            style={{ 
              border: '0', 
              marginLeft: '5%', 
              borderRadius: '10px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)' 
            }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;