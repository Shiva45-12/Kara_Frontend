const Footer = () => {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', padding: '40px 0 20px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '65px', height: '65px', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '18px', boxShadow: '0 6px 20px rgba(255, 255, 255, 0.15)', border: '2px solid rgba(83, 169, 44, 0.3)', transition: 'transform 0.6s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.transform = 'rotate(360deg)'} onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}>
                  <img src="/assets/images/home01/logo.jpg" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '50%', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} alt="KARA GROUP Logo" />
                </div>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '28px', margin: 0, fontWeight: 700, textShadow: '0 3px 6px rgba(0,0,0,0.4)', letterSpacing: '0.5px' }}>KARA GROUP</h3>
                </div>
              </div>
              <p style={{ color: '#e8f4fd', fontSize: '14px', lineHeight: 1.6 }}>Pioneering sustainable energy solutions for a greener tomorrow. Committed to environmental excellence and renewable innovation.</p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div style={{ marginBottom: '20px', textAlign: "center" }}>
              <h4 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '15px', fontWeight: 600, textAlign: "center" }}>Our Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: '#e8f4fd', fontSize: '14px', display: 'inline-block', textAlign: 'left' }}>
                <li style={{ margin: '8px 0', paddingLeft: '15px', position: 'relative' }}><i className="fa fa-leaf" style={{ position: 'absolute', left: 0, top: '2px', color: '#ffff' }}></i>&nbsp;&nbsp;Solar Energy Solutions</li>
                <li style={{ margin: '8px 0', paddingLeft: '15px', position: 'relative' }}><i className="fa fa-recycle" style={{ position: 'absolute', left: 0, top: '2px', color: '#ffff' }}></i>&nbsp;&nbsp;Environmental Consulting</li>
                <li style={{ margin: '8px 0', paddingLeft: '15px', position: 'relative' }}><i className="fa fa-lightbulb-o" style={{ position: 'absolute', left: 0, top: '2px', color: '#ffff' }}></i>&nbsp;&nbsp;Energy Efficiency</li>
                <li style={{ margin: '8px 0', paddingLeft: '15px', position: 'relative' }}><i className="fa fa-globe" style={{ position: 'absolute', left: 0, top: '2px', color: '#ffff' }}></i>&nbsp;&nbsp;Sustainability Projects</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 col-12">
            <div style={{ marginBottom: '20px', textAlign: "center" }}>
              <h4 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '15px', fontWeight: 600 }}>Connect With Us</h4>
              <div style={{ fontSize: '14px', marginBottom: '15px', display: 'flex', flexDirection: 'column', textAlign: "left" ,marginLeft:"105px" }}>
                <a href="https://maps.google.com/?q=Kara+Group+Alambagh+Lucknow" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <p style={{ margin: '8px 0', color: 'white', cursor: 'pointer' }}><i className="fa fa-map-marker" style={{ marginRight: '10px', color: '#fff', width: '15px' }}></i>Kara Group, Lucknow</p>
                </a>
                <a href="tel:+917523082381" style={{ textDecoration: 'none' }}>
                  <p style={{ margin: '8px 0', color: 'white', cursor: 'pointer' }}><i className="fa fa-phone" style={{ marginRight: '10px', color: '#fff', width: '15px' }}></i>+91 7523082381</p>
                </a>
                <a href="https://wa.me/917991334444?text=Contact%20for%20Free%20Consultation" target="_blank" rel="noopener noreferrer">
                  <p style={{ margin: '8px 0', color: 'white', cursor: 'pointer' }}><i className="fa fa-whatsapp" style={{ marginRight: '10px', color: '#fff', width: '15px' }}></i>+91 7991334444</p>
                </a>
                <a href="mailto:info@solarkara.in">
                  <p style={{ margin: '8px 0', color: 'white' }}><i className="fa fa-envelope" style={{ marginRight: '10px', color: '#fff', width: '15px' }}></i>info@solarkara.in</p>
                </a>
                <a href="mailto:sales@solarkara.in">
                  <p style={{ margin: '8px 0', color: 'white' }}><i className="fa fa-envelope" style={{ marginRight: '10px', color: '#fff', width: '15px' }}></i>sales@solarkara.in</p>
                </a>
              </div>
              <div className="social-icons" style={{ display: 'flex', gap: '12px', marginTop: '15px', justifyContent: 'center' }}>
                <a 
                  href="https://www.facebook.com/profile.php?id=61583887198961" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon" 
                  style={{ 
                    width: '42px', 
                    height: '42px', 
                    background: 'rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: '50%', 
                    transition: 'all 0.3s ease', 
                    textDecoration: 'none', 
                    border: '2px solid rgba(255,255,255,0.2)',
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3b5998';
                    e.currentTarget.style.borderColor = '#3b5998';
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 89, 152, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/solarkara" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon" 
                  style={{ 
                    width: '42px', 
                    height: '42px', 
                    background: 'rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: '50%', 
                    transition: 'all 0.3s ease', 
                    textDecoration: 'none', 
                    border: '2px solid rgba(255,255,255,0.2)',
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0077b5';
                    e.currentTarget.style.borderColor = '#0077b5';
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 119, 181, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className="fa fa-linkedin"></i>
                </a>
                <a 
                  href="https://instagram.com/solar.karalko" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon" 
                  style={{ 
                    width: '42px', 
                    height: '42px', 
                    background: 'rgba(255,255,255,0.1)', 
                    color: '#fff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: '50%', 
                    transition: 'all 0.3s ease', 
                    textDecoration: 'none', 
                    border: '2px solid rgba(255,255,255,0.2)',
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)';
                    e.currentTarget.style.borderColor = '#e1306c';
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(225, 48, 108, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '25px 0 15px 0' }} />
        <div className="row">
          <div className="col-12">
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#e8f4fd', fontSize: '14px', margin: 0 }}>&copy; 2025 KARA GROUP. All rights reserved. | <a href="https://digicoders.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#eff1ee', textDecoration: 'none' }}>Designed by <span style={{ color: "red", fontWeight: "700" }}> Team DigiCoders</span></a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
