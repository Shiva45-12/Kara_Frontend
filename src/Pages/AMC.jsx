import { useEffect, useState } from 'react';

function AMC() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    load: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (window.$) {
      window.$(window).on('load', function () {
        window.$('.fixed-contact-icon').css('opacity', '1');
      });
    }
  }, []);

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/amc/quote`, {
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
          mobile: '',
          load: '',
          location: ''
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
      {/* AMC Main Content Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          {/* Hero Section - Main heading and description */}
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '20px', fontWeight: '700' }}>KARA Solar Rooftop AMC Services – Keep Your System Running at Its Best</h1>
              <p style={{ fontSize: '18px', color: '#666', textAlign: 'justify' }}>Your solar investment deserves proper care. Our Annual Maintenance Contract keeps your panels performing efficiently year after year, so you can focus on running your business while we handle the technical details.</p>
            </div>
          </div>
          
          {/* Image Gallery Section - AMC service images */}
          <div className="row mb-5">
            <div className="col-lg-6 mb-4">
              <img src="assets/images/amc/slider-1.jpg" alt="Solar Maintenance" className="img-fluid" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
            <div className="col-lg-6 mb-4">
              <img src="assets/images/amc/slider-2.jpg" alt="Solar Panel Cleaning" className="img-fluid" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
          </div>

          {/* Services Section - What KARA team provides */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 style={{ color: '#53a92c', marginBottom: '30px', textAlign: 'center', fontWeight: '700' }}>What KARA Team'll Do for You</h2>
            </div>
            <div className="col-12">
              <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
                <div className="row">
                  <div className="col-md-6">
                    <h5 style={{ color: '#53a92c', marginBottom: '20px', fontWeight: '600' }}><i className="fa fa-calendar" style={{ marginRight: '10px' }}></i>Scheduled Preventive Maintenance</h5>
                    <ul style={{ color: '#666', lineHeight: '2', listStyle: 'none', padding: '0' }}>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-check-circle" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Quarterly site visits to inspect your entire system</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-tint" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Professional panel cleaning to maximize energy generation</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-stethoscope" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Complete electrical health check-up</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-cog" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Inverter testing and performance optimization</li>
                    </ul>
                    
                    <h5 style={{ color: '#53a92c', marginBottom: '20px', marginTop: '30px', fontWeight: '600' }}><i className="fa fa-star" style={{ marginRight: '10px' }}></i>Technical Excellence</h5>
                    <ul style={{ color: '#666', lineHeight: '2', listStyle: 'none', padding: '0' }}>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-plug" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>DC/AC wiring and connection inspections</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-search" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Early detection and fixing of potential issues</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-line-chart" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Performance tracking against expected output</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-file-text" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Detailed generation reports with practical recommendations</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h5 style={{ color: '#53a92c', marginBottom: '20px', fontWeight: '600' }}><i className="fa fa-trophy" style={{ marginRight: '10px' }}></i>Priority Support Benefits</h5>
                    <ul style={{ color: '#666', lineHeight: '2', listStyle: 'none', padding: '0' }}>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-phone" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Dedicated phone support when you need help</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-clock-o" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Fast response during emergencies to minimize downtime</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-lightbulb-o" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Customized tips to improve your system's efficiency</li>
                      <li style={{ margin: '10px 0', paddingLeft: '25px', position: 'relative' }}><i className="fa fa-bar-chart" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Annual performance reviews to track your savings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section - Why customers choose AMC plan */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 style={{ color: '#53a92c', marginBottom: '30px', textAlign: 'center', fontWeight: '700' }}>Why Our Customers Choose This Plan</h2>
            </div>
            <div className="col-lg-6 mb-4">
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                <h4 style={{ color: '#53a92c', marginBottom: '15px' }}><i className="fa fa-money" style={{ marginRight: '10px' }}></i>Save Money on Repairs</h4>
                <p style={{ color: '#666' }}>A small annual investment prevents expensive breakdowns and lost production</p>
                
                <h4 style={{ color: '#53a92c', marginBottom: '15px', marginTop: '25px' }}><i className="fa fa-tachometer" style={{ marginRight: '10px' }}></i>Maintain Peak Performance</h4>
                <p style={{ color: '#666' }}>Regular maintenance keeps your system running at 95%+ efficiency, avoiding the 20-30% drop that unmaintained systems experience</p>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                <h4 style={{ color: '#53a92c', marginBottom: '15px' }}><i className="fa fa-shield" style={{ marginRight: '10px' }}></i>Peace of Mind</h4>
                <p style={{ color: '#666' }}>We handle all technical work so you can focus on your business while generating consistent solar savings</p>
                
                <h4 style={{ color: '#53a92c', marginBottom: '15px', marginTop: '25px' }}><i className="fa fa-bar-chart" style={{ marginRight: '10px' }}></i>Track Your Return</h4>
                <p style={{ color: '#666' }}>Regular reports help you see exactly how much you're saving and where you can improve</p>
              </div>
            </div>
          </div>

          {/* Quote Form Section - AMC quote request form */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 style={{ color: '#53a92c', marginBottom: '30px', textAlign: 'center', fontWeight: '700' }}>Get Your AMC Quote</h2>
            </div>
            <div className="col-lg-6 mb-4">
              <img src="assets/images/amc/form-pic.jpg" alt="AMC Form" className="img-fluid" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              <br /><br />
            </div>
            <div className="col-lg-6">
              <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
                <form onSubmit={handleSubmit}>
                  {message && (
                    <div style={{ 
                      padding: '10px', 
                      marginBottom: '20px', 
                      borderRadius: '5px', 
                      backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
                      color: message.includes('successful') ? '#155724' : '#721c24',
                      border: `1px solid ${message.includes('successful') ? '#c3e6cb' : '#f5c6cb'}`
                    }}>
                      {message}
                    </div>
                  )}
                  <div className="mb-3">
                    <label style={{ color: '#333', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="Enter your full name" 
                      style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} 
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label style={{ color: '#333', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="Enter your email address" 
                      style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label style={{ color: '#333', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Mobile</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="Enter your mobile number" 
                      style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label style={{ color: '#333', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Load (kW)</label>
                    <input 
                      type="number" 
                      name="load"
                      value={formData.load}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="Enter system load in kW" 
                      style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} 
                      required 
                    />
                  </div>

                  <div className="mb-4">
                    <label style={{ color: '#333', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Location</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-control" 
                      placeholder="Enter your location" 
                      style={{ padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }} 
                      required 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                      background: loading ? '#ccc' : 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', 
                      color: 'white', 
                      padding: '15px 30px', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontWeight: '600', 
                      width: '100%', 
                      fontSize: '16px', 
                      cursor: loading ? 'not-allowed' : 'pointer' 
                    }}
                  >
                    {loading ? 'Submitting...' : 'Get AMC Quote'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Call-to-Action Section - Final contact section */}
          <div className="row">
            <div className="col-12 text-center">
              <div style={{ background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', padding: '40px', borderRadius: '15px', color: 'white' }}>
                <h3 style={{ marginBottom: '20px', color: '#ffffff' }}>Ready to protect your solar investment?</h3>
                <p style={{ marginBottom: '30px', fontSize: '18px', color: 'white' }}>Contact us today for a customized quote based on your system size.</p>
                <a href="tel:+917523082381" id="call" style={{ background: 'white', color: '#53a92c', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', marginRight: '15px' }}>Call Now: +91 7523082381</a>
                <a href="https://wa.me/917991334444" style={{ background: '#25D366', color: 'white', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>WhatsApp: +91 7991334444</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Call and WhatsApp Icons */}
      <a href="tel:+917523082381" className="fixed-contact-icon"
        style={{ position: 'fixed', bottom: '100px', left: '30px', width: '50px', height: '50px', background: '#044c88', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(83, 169, 44, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(83, 169, 44, 0.6)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(83, 169, 44, 0.4)'; }}>
        <i className="fa fa-phone" style={{ fontSize: '22px' }}></i>
      </a>
      <a href="https://wa.me/917991334444?text=Contact%20for%20Free%20Consultation" target="_blank" rel="noreferrer"
        className="fixed-contact-icon"
        style={{ position: 'fixed', bottom: '30px', left: '30px', width: '50px', height: '50px', background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'; }}>
        <i className="fa fa-whatsapp" style={{ fontSize: '22px' }}></i>
      </a>
    </>
  );
}

export default AMC;
