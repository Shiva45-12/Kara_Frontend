import { useEffect } from 'react';

const Product = () => {
  useEffect(() => {
    if (window.$) {
      window.$('.fixed-contact-icon').css('opacity', '1');
    }
  }, []);

  const products = [
    { title: 'Solar Panels (Topcon / Mono / Poly / Half-Cut)', img: 'assets/images/product/p1.jpg' },
    { title: 'Solar Inverters (On-Grid / Off-Grid / Hybrid)', img: 'assets/images/product/p2.jpg' },
    { title: 'Solar Water Pumps', img: 'assets/images/product/p3.jpeg', height: '364.5px' },
    { title: 'Lithium Batteries', img: 'assets/images/product/p4.jpg' },
    { title: 'Aata Chakki Machines', img: 'assets/images/product/p5.jpg' },
    { title: 'Micro Udyog Machinery', img: 'assets/images/product/p8.jpg' },
    { title: 'Solar Street Lights & Smart Poles', img: 'assets/images/product/p6.jpg' },
    { title: 'Rural Development Equipment', img: 'assets/images/product/p7.jpg', height: '395.25px' }
  ];

  return (
    <>
      <section className="bg-slider-option">
        <div className="slider-option">
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="10000">
                <div className="slider-item">
                  <img src="assets/images/product/sli-1.jpg" alt="bg-slider-1" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Solar Power Plant Solutions</h3>
                            <h2>for residential, commercial & industrial</h2>
                            <p style={{ wordSpacing: '-15px', letterSpacing: '-1px' }}>Comprehensive solar energy systems for all applications</p>
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
                  <img src="assets/images/product/slide-3.jpg" alt="bg-slider-2" style={{ height: '643.33px' }} />
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
                  <img src="assets/images/product/single-services-img-4.jpg" alt="bg-slider-3" />
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
              <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '20', fontWeight: '700' }}>CATALOG</h1>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="solar-features" style={{ padding: '60px 0', background: 'white' }}>
        <div className="container">
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-lg-6 col-md-12 mb-4">
                <div className="solution-card" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}>
                  <h3 style={{ color: '#53a92c', marginBottom: '20px', fontSize: '24px' }}>{product.title}</h3>
                  <img src={product.img} alt={product.title} style={{ borderRadius: '15px', ...(product.height && { height: product.height }) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '30px' }}>Advanced Solar Technology</h2>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px' }}><i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>High-Efficiency Panels</h5>
                <p style={{ textAlign: 'justify' }}>Topcon solar panels with efficiency ratings up to 23.23%</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px' }}><i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>Smart Inverters</h5>
                <p style={{ textAlign: 'justify' }}>Grid-tie inverters with MPPT technology and remote monitoring capabilities</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px' }}><i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>Energy Storage</h5>
                <p style={{ textAlign: 'justify' }}>Battery backup systems for uninterrupted power supply during outages</p>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <h5 style={{ color: '#53a92c', marginBottom: '10px' }}><i className="fa fa-check-circle" style={{ marginRight: '10px' }}></i>Monitoring Systems</h5>
                <p style={{ textAlign: 'justify' }}>Real-time performance monitoring and analytics through mobile apps</p>
              </div>
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

export default Product;
