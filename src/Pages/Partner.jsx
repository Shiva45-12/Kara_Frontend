import { useEffect, useState } from 'react';

const Partner = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    location: '',
    projectInterest: '',
    mobile: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (window.$) {
      window.$('.fixed-contact-icon').css('opacity', '1');
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/partners/register`, {
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
          fullName: '',
          companyName: '',
          location: '',
          projectInterest: '',
          mobile: '',
          email: ''
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

  const partnerships = [
    { icon: 'fa-handshake-o', title: 'Strategic Equity Partnership', desc: 'For entrepreneurs seeking active involvement and wealth creation. Partners contribute capital and operational expertise to develop regional markets.', points: ['Balanced equity structure', 'Protected minimum returns', 'Performance-based profit participation', 'Downside protection with upside potential'] },
    { icon: 'fa-line-chart', title: 'Investment Partnership', desc: 'Designed for investors prioritizing assured returns with minimal operational commitment. Partners provide capital funding while maintaining advisory capacity.', points: ['Guaranteed consistent annual returns', 'Superior to traditional fixed-income', 'Payments prioritized regardless of market fluctuations', 'Professional management'] },
    { icon: 'fa-network-wired', title: 'Channel Development Partnership', desc: 'Very low-capital business expansion opportunity for established professionals and organizations. Partners leverage existing networks and credibility.', points: ['Leverage existing networks', 'Attractive performance-based incentives', 'Immediate revenue streams', 'No financial risk or inventory investment'] }
  ];

  return (
    <>
      <section className="bg-slider-option">
        <div className="slider-option">
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <div className="slider-item">
                  <img src="assets/images/home01/slider-img-1.jpg" alt="bg-slider-1" style={{ height: '562.91px' }} />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Become a KARA GROUP Partner</h3>
                            <h2>Grow Your Business with Solar Solutions</h2>
                            <p>Join India's leading renewable energy network and expand your market reach</p>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="2000">
                <div className="slider-item">
                  <img src="assets/images/home01/slider-img-2.jpg" alt="bg-slider-2" style={{ height: '562.91px' }} />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Partnership Opportunities</h3>
                            <h2>Distributor & Reseller Programs</h2>
                            <p>Lucrative margins and comprehensive support for business growth</p>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="slider-item">
                  <img src="assets/images/partner/women-working-hard-innovation.jpg" alt="bg-slider-3" style={{ height: '562.91px' }} />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Technical & Marketing Support</h3>
                            <h2>Complete Partner Ecosystem</h2>
                            <p>Training, certification, and dedicated partner support team</p>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="left carousel-control carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="right carousel-control carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '20px', fontWeight: '700', textAlign: 'center' }}>Join India's Fastest Growing Solar & Micro-Udyog Network</h1>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px', textAlign: 'justify' }}>Partner with us to build a sustainable future through innovative solar solutions</p>
            </div>
          </div>
        </div>
      </section>

      <section id="partnership" className="solar-features" style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px', fontWeight: '700' }}>Three Strategic Growth Pathways</h2>
              <p style={{ fontSize: '18px', color: '#666', textAlign: 'justify' }}>Choose the partnership model that aligns with your business goals</p>
            </div>
          </div>
          <div className="row">
            {partnerships.map((p, i) => (
              <div key={i} className="col-lg-4 col-md-12 mb-4">
                <div className="solution-card" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                  <h3 style={{ color: '#53a92c', marginBottom: '20px', fontSize: '22px' }}><i className={`fa ${p.icon}`} style={{ marginRight: '10px' }}></i>{p.title}</h3>
                  <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px', textAlign: 'justify' }}>{p.desc}</p>
                  <ul style={{ listStyle: 'none', padding: '0' }}>
                    {p.points.map((point, j) => (
                      <li key={j} style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative' }}>
                        <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>{point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px', fontWeight: '700' }}>Our Partnership Success Stories</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <img src="assets/images/partner/p1.jpg" alt="Partner Image 1" className="img-fluid" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
            <div className="col-lg-6 mb-4">
              <img src="assets/images/partner/p2.jpg" alt="Partner Image 2" className="img-fluid" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '30px', fontWeight: '700' }}>Who Can Partner</h2>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {['Entrepreneurs', 'MSME Owners', 'Electrical Contractors', 'NGOs', 'Women Self-Help Groups'].map((item, i) => (
                  <li key={i} style={{ margin: '15px 0', paddingLeft: '30px', position: 'relative', fontSize: '18px' }}>
                    <i className="fa fa-check-circle" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c', fontSize: '20px' }}></i>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '30px', fontWeight: '700' }}>Benefits</h2>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {['High-margin solar & micro-udyog products', 'Government scheme project access', 'Marketing & training support', 'Dedicated CRM manager', 'Branding, brochures, and dealer kits'].map((item, i) => (
                  <li key={i} style={{ margin: '15px 0', paddingLeft: '30px', position: 'relative', fontSize: '18px' }}>
                    <i className="fa fa-star" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c', fontSize: '20px' }}></i>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div style={{ background: '#f8f9fa', padding: '40px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontWeight: '700' }}>Partner Registration Form</h2>
                <form id="partnerForm" onSubmit={handleSubmit}>
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
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName}
                        onChange={handleChange}
                        required 
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Company / Shop Name *</label>
                      <input 
                        type="text" 
                        name="companyName" 
                        value={formData.companyName}
                        onChange={handleChange}
                        required 
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Location *</label>
                      <input 
                        type="text" 
                        name="location" 
                        value={formData.location}
                        onChange={handleChange}
                        required 
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Project Interest *</label>
                      <select 
                        name="projectInterest" 
                        value={formData.projectInterest}
                        onChange={handleChange}
                        required 
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }}
                      >
                        <option value="">Select Project Interest</option>
                        <option value="Strategic Equity Partnership">Strategic Equity Partnership</option>
                        <option value="Investment Partnership">Investment Partnership</option>
                        <option value="Channel Development Partnership">Channel Development Partnership</option>
                        <option value="Solar Installation">Solar Installation</option>
                        <option value="Micro-Udyog Projects">Micro-Udyog Projects</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Mobile *</label>
                      <input 
                        type="tel" 
                        name="mobile" 
                        value={formData.mobile}
                        onChange={handleChange}
                        required 
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px' }} 
                      />
                    </div>
                    <div className="col-12 text-center mt-3">
                      <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                          background: loading ? '#ccc' : '#53a92c', 
                          color: 'white', 
                          padding: '15px 40px', 
                          border: 'none', 
                          borderRadius: '5px', 
                          fontSize: '18px', 
                          fontWeight: '600', 
                          cursor: loading ? 'not-allowed' : 'pointer', 
                          transition: 'all 0.3s ease' 
                        }}
                      >
                        {loading ? 'Submitting...' : 'Submit Registration'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '30px' }}>Advanced Solar Technology</h2>
              {[
                { title: 'High-Efficiency Panels', desc: 'Topcon solar panels with efficiency ratings up to 23.23%' },
                { title: 'Smart Inverters', desc: 'Grid-tie inverters with MPPT technology and remote monitoring capabilities' },
                { title: 'Energy Storage', desc: 'Battery backup systems for uninterrupted power supply during outages' },
                { title: 'Monitoring Systems', desc: 'Real-time performance monitoring and analytics through mobile apps' }
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '25px' }}>
                  <h5 style={{ color: '#53a92c', marginBottom: '10px' }}><i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="col-lg-6">
              <img src="assets/images/home01/Advanced-Solar-Products-Website-Projects.webp" alt="Solar Technology" className="img-fluid" style={{ borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      <a href="tel:+917523082381" className="fixed-contact-icon" style={{ position: 'fixed', bottom: '100px', left: '30px', width: '50px', height: '50px', background: '#044c88', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(83, 169, 44, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(83, 169, 44, 0.6)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(83, 169, 44, 0.4)'; }}>
        <i className="fa fa-phone" style={{ fontSize: '22px' }}></i>
      </a>
      <a href="https://wa.me/917991334444?text=Contact%20for%20Free%20Consultation" target="_blank" rel="noopener noreferrer" className="fixed-contact-icon" style={{ position: 'fixed', bottom: '30px', left: '30px', width: '50px', height: '50px', background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'; }}>
        <i className="fa fa-whatsapp" style={{ fontSize: '22px' }}></i>
      </a>
    </>
  );
};

export default Partner;
