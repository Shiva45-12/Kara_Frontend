import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    if (window.$) {
      window.$('.fixed-contact-icon').css('opacity', '1');
    }
  }, []);

  return (
    <>
      {/* Slider Section */}
      <section className="bg-slider-option">
        <div className="slider-option">
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <div className="slider-item">
                  <img src="assets/images/about/slide-1.jpg" alt="About KARA GROUP" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3 style={{color:"#ffffff"}}>Building India's Future</h3>
                            <h2>Sustainable Energy Solutions</h2>
                            <p style={{ letterSpacing: 'normal', lineHeight: '1.5' }}>Empowering rural India through renewable energy and micro industries</p>
                            <div className="slider-btn">
                            </div>
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
                  <img src="assets/images/about/slide-2.jpg" alt="Our Vision" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3 style={{color:"#ffffff"}}>Our Vision</h3>
                            <h2>Renewable Energy for Every Village</h2>
                            <p style={{ letterSpacing: 'normal', lineHeight: '1.5' }}>Empowering farmers, entrepreneurs, and rural youth with clean energy</p>
                            <div className="slider-btn">
                            </div>
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
                  <img src="assets/images/about/slide-4.jpg" alt="Our Mission" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3 style={{color:"#ffffff"}}>Our Mission</h3>
                            <h2>High-Performance Solar Solutions</h2>
                            <p style={{ letterSpacing: 'normal', lineHeight: '1.5' }}>Supporting government-backed initiatives for sustainable development</p>
                            <div className="slider-btn">
                            </div>
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

      {/* About Content Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '20px', fontWeight: '700' }}>Building India's Sustainable Future Through Solar & Micro Industries</h1>
                <p style={{ color: '#666', fontSize: '18px', maxWidth: '800px', margin: '0 auto', textAlign: 'justify', letterSpacing: '0px' }}>
                  Pioneering sustainable energy solutions for a greener tomorrow. Committed to environmental excellence and renewable innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section style={{ padding: '60px 0', background: '#fff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div style={{ background: 'linear-gradient(135deg, #53a92c 0%, #4a8f26 100%)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(83, 169, 44, 0.2)', textAlign: 'center' }}>
                <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '20px', fontWeight: '700' }}>Our Vision</h2>
                <img src="assets/images/about/vission.jpg" alt="" />
                <br />
                <p style={{ color: '#fff', fontSize: '18px', lineHeight: '1.7', margin: '0', marginTop: '20px', textAlign: 'justify', letterSpacing: '0px' }}>
                  To bring renewable energy and small-scale industries to every village, empowering farmers, entrepreneurs, women-led units and rural youth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(30, 60, 114, 0.2)', textAlign: 'center' }}>
                <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '25px', fontWeight: '700' }}>Our Mission</h2>
                <img src="assets/images/about/mission.jpg" alt="" />
                <ul style={{ listStyle: 'none', padding: '0', color: '#fff', fontSize: '16px', textAlign: 'justify', maxWidth: '600px', margin: '0 auto', letterSpacing: '0px' }}>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-check-circle" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Deliver high-performance solar power solutions
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-check-circle" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Support government-backed micro industries
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-check-circle" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Create employment-ready ecosystems in rural and semi-urban India
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-check-circle" style={{ position: 'absolute', left: '0', top: '2px', color: '#53a92c' }}></i>Promote energy independence and sustainable development
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver Section */}
      <section style={{ padding: '60px 0', background: '#fff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
              <div style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(255, 107, 53, 0.2)', textAlign: 'center' }}>
                <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '25px', fontWeight: '700' }}>What We Deliver</h2>
                <img src="assets/images/about/deliver.jpg" alt="" />
                <ul style={{ listStyle: 'none', padding: '0', color: '#fff', fontSize: '16px', textAlign: 'justify', maxWidth: '600px', margin: '0 auto', letterSpacing: '0px' }}>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-cog" style={{ position: 'absolute', left: '0', top: '2px', color: '#fff' }}></i>Engineering & Solar System Design
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-search" style={{ position: 'absolute', left: '0', top: '2px', color: '#fff' }}></i>Technical Surveys & Feasibility Studies
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-leaf" style={{ position: 'absolute', left: '0', top: '2px', color: '#fff' }}></i>Smart Agriculture Solutions
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-industry" style={{ position: 'absolute', left: '0', top: '2px', color: '#fff' }}></i>Micro Udyog Setup Assistance
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-file-text" style={{ position: 'absolute', left: '0', top: '2px', color: '#fff' }}></i>Project Planning & Document Support
                  </li>
                  <li style={{ margin: '12px 0', paddingLeft: '25px', position: 'relative', textAlign: 'justify' }}>
                    <i className="fa fa-wrench" style={{ position: 'absolute', left: '0', top: '2px', color: '#fff' }}></i>On-site execution with AMC
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Contact Icons */}
      <a href="tel:+917523082381" className="fixed-contact-icon" style={{ position: 'fixed', bottom: '100px', left: '30px', width: '50px', height: '50px', background: '#044c88', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(83, 169, 44, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(83, 169, 44, 0.6)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(83, 169, 44, 0.4)'; }}>
        <i className="fa fa-phone" style={{ fontSize: '22px' }}></i>
      </a>
      <a href="https://wa.me/917991334444?text=Contact%20for%20Free%20Consultation" target="_blank" rel="noopener noreferrer" className="fixed-contact-icon" style={{ position: 'fixed', bottom: '30px', left: '30px', width: '50px', height: '50px', background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', textDecoration: 'none', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)', zIndex: '9997', transition: 'all 0.3s ease', opacity: '0' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)'; }}>
        <i className="fa fa-whatsapp" style={{ fontSize: '22px' }}></i>
      </a>
    </>
  );
};

export default About;
