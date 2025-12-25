import { useEffect } from 'react';

function Download() {
  useEffect(() => {
    if (window.$) {
      window.$(document).ready(function () {
        // Mobile menu toggle
        window.$('#bs-example-navbar-collapse-1').on('show.bs.collapse', function () {
          window.$('.navbar-toggler i').removeClass('fa-bars').addClass('fa-times');
        });

        window.$('#bs-example-navbar-collapse-1').on('hide.bs.collapse', function () {
          window.$('.navbar-toggler i').removeClass('fa-times').addClass('fa-bars');
        });
      });

      window.$(window).on('load', function () {
        window.$('.fixed-contact-icon').css('opacity', '1');
      });
    }
  }, []);

  return (
    <>
      {/* Downloads Main Content Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          {/* Hero Section */}
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '20px', fontWeight: '700' }}>Downloads</h1>
              <p style={{ fontSize: '18px', color: '#666', textAlign: 'justify' }}>Access our comprehensive collection of brochures, technical specifications, and documentation to help you make informed decisions about solar energy solutions.</p>
            </div>
          </div>

          {/* PDF Downloads Section */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 style={{ fontSize: '32px', color: '#333', marginBottom: '30px', fontWeight: '600', textAlign: 'center' }}>PDF Documents</h2>
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                  <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)', textAlign: 'center', height: '100%' }}>
                    <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                      <i className="fa fa-file-pdf-o" style={{ fontSize: '28px', color: 'white' }}></i>
                    </div>
                    <h4 style={{ color: '#333', marginBottom: '8px', fontWeight: '600' }}>Solar Brochure</h4>
                    <p style={{ color: '#666', marginBottom: '15px', fontSize: '13px' }}>Complete overview of our solar solutions and services</p>
                    <a href="assets/downloads/solar-brochure.pdf" download style={{ background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-block' }}>Download PDF</a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)', textAlign: 'center', height: '100%' }}>
                    <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                      <i className="fa fa-cogs" style={{ fontSize: '28px', color: 'white' }}></i>
                    </div>
                    <h4 style={{ color: '#333', marginBottom: '8px', fontWeight: '600' }}>Technical Specifications</h4>
                    <p style={{ color: '#666', marginBottom: '15px', fontSize: '13px' }}>Detailed technical data and product specifications</p>
                    <a href="assets/downloads/technical-specifications.pdf" download style={{ background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-block' }}>Download PDF</a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                  <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)', textAlign: 'center', height: '100%' }}>
                    <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                      <i className="fa fa-wrench" style={{ fontSize: '28px', color: 'white' }}></i>
                    </div>
                    <h4 style={{ color: '#333', marginBottom: '8px', fontWeight: '600' }}>Installation Guide</h4>
                    <p style={{ color: '#666', marginBottom: '15px', fontSize: '13px' }}>Step-by-step installation and setup instructions</p>
                    <a href="assets/downloads/installation-guide.pdf" download style={{ background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-block' }}>Download PDF</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Custom Documents */}
          <div className="row mt-5">
            <div className="col-12">
              <div style={{ background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', padding: '25px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '12px', color: '#ffffff' }}>Need Custom Documentation?</h3>
                <p style={{ marginBottom: '20px', fontSize: '16px', color: 'white' }}>Contact our technical team for project-specific documents and customized solutions.</p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="tel:+917523082381" style={{ background: 'white', color: '#53a92c', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Call: +91 7523082381</a>
                  <a href="mailto:info@solarkara.in" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Email: info@solarkara.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Contact Icons */}
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

export default Download;
