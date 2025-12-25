import { useEffect } from 'react';

const SolarPowerPlant = () => {
  useEffect(() => {
    if (window.$) {
      window.$('.fixed-contact-icon').css('opacity', '1');
    }
  }, []);

  return (
    <>
      <section className="bg-slider-option">
        <div className="slider-option">
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <div className="slider-item">
                  <img src="assets/images/home01/slider-img-1.jpg" alt="bg-slider-1" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3 style={{ letterSpacing: '-0.8px' }}>Solar Power Plant Solutions</h3>
                            <h2 style={{ letterSpacing: '-0.8px' }}>for residential, commercial & industrial</h2>
                            <p style={{ letterSpacing: '0.8px', wordSpacing: '2px', fontSize: '18px', fontWeight: '400', lineHeight: '1.8' }}>Comprehensive solar energy systems for all applications</p>
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
                            <h3>Clean Energy Solutions</h3>
                            <h2>for a greener future</h2>
                            <p>Sustainable and efficient solar power systems</p>
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
                  <img src="assets/images/home01/energy.jpeg" alt="bg-slider-3" style={{ height: '562.91px' }} />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Renewable Energy Experts</h3>
                            <h2>Professional solar solutions</h2>
                            <p>Installation and maintenance of solar power systems</p>
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
            <div className="col-12 text-center">
              <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '40px', fontWeight: '700', letterSpacing: '-0.3px' }}>
                Advanced Solar Power Plant Solutions for Home, Commercial & Agricultural Use
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="solar-features" style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="solution-card" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                <h3 style={{ color: '#53a92c', marginBottom: '20px', fontSize: '24px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-home" style={{ marginRight: '10px' }}></i>A. Solar for Residential
                </h3>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Rooftop solar plant
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Net metering & savings model
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Finance & EMI support
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 mb-4">
              <div className="solution-card" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                <h3 style={{ color: '#53a92c', marginBottom: '20px', fontSize: '24px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-building" style={{ marginRight: '10px' }}></i>B. Solar for Commercial / Industrial
                </h3>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>High-capacity hybrid plants
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>ROI calculation
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Load optimization
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 mb-4">
              <div className="solution-card" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                <h3 style={{ color: '#53a92c', marginBottom: '20px', fontSize: '24px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-leaf" style={{ marginRight: '10px' }}></i>C. Agricultural Solar Pumping (PM-KUSUM)
                </h3>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>2 HP to 10 HP solar pumps
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Canal irrigation compatibility
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Subsidy documentation support
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Atta Chakki, & other Small scale Project under scheme of PMFME
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 mb-4">
              <div className="solution-card" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                <h3 style={{ color: '#53a92c', marginBottom: '20px', fontSize: '24px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-cogs" style={{ marginRight: '10px' }}></i>D. Technical Advantages
                </h3>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>25-year warranted panels
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>High-grade components
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '20px', position: 'relative', letterSpacing: '-0.3px' }}>
                    <i className="fa fa-circle" style={{ position: 'absolute', left: '0', top: '8px', color: '#53a92c', fontSize: '8px' }}></i>Remote monitoring (IoT-based)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '30px', letterSpacing: '-0.3px' }}>Advanced Solar Technology</h2>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>High-Efficiency Panels
                </h5>
                <p style={{ textAlign: 'justify', letterSpacing: '-0.3px' }}>Topcon solar panels with efficiency ratings up to 23.23%</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>Smart Inverters
                </h5>
                <p style={{ textAlign: 'justify', letterSpacing: '-0.3px' }}>Grid-tie inverters with MPPT technology and remote monitoring capabilities</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>Energy Storage
                </h5>
                <p style={{ textAlign: 'justify', letterSpacing: '-0.3px' }}>Battery backup systems for uninterrupted power supply during outages</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px', letterSpacing: '-0.3px' }}>
                  <i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>Monitoring Systems
                </h5>
                <p style={{ textAlign: 'justify', letterSpacing: '-0.3px' }}>Real-time performance monitoring and analytics through mobile apps</p>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="assets/images/home01/Advanced-Solar-Products-Website-Projects.webp" alt="Advanced Solar Technology" className="img-fluid" style={{ borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      <a href="tel:+917523082381" className="fixed-contact-icon" style={{ position: 'fixed', bottom: '100px', left: '30px', width: '50px', height: '50px', background: '#007bff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0, 123, 255, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.6)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)'; }}>
        <i className="fa fa-phone" style={{ fontSize: '22px' }}></i>
      </a>
      <a href="https://wa.me/917991334444?text=Contact%20for%20Free%20Consultation" target="_blank" rel="noopener noreferrer" className="fixed-contact-icon" style={{ position: 'fixed', bottom: '30px', left: '30px', width: '50px', height: '50px', background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'; }}>
        <i className="fa fa-whatsapp" style={{ fontSize: '22px' }}></i>
      </a>
    </>
  );
};

export default SolarPowerPlant;
