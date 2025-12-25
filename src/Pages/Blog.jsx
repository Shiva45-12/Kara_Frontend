import { useEffect } from 'react';

const Blog = () => {
  useEffect(() => {
    if (window.$) {
      window.$('.fixed-contact-icon').css('opacity', '1');
    }
  }, []);

  const categories = [
    { icon: 'fa-sun-o', title: 'Solar Knowledge', desc: 'Technical insights and educational content about solar energy systems' },
    { icon: 'fa-university', title: 'Government Schemes', desc: 'Latest updates on government subsidies and solar schemes' },
    { icon: 'fa-lightbulb-o', title: 'Micro-Udyog Ideas', desc: 'Small business ideas and entrepreneurship opportunities' },
    { icon: 'fa-leaf', title: 'Rural Development', desc: 'Sustainable development solutions for rural communities' },
    { icon: 'fa-trophy', title: 'Success Stories', desc: 'Real-world case studies and customer success stories' },
    { icon: 'fa-cogs', title: 'Technical Guides', desc: 'Step-by-step installation and maintenance guides' }
  ];

  const blogs = [
    { title: 'How PM-KUSUM Scheme Helps Farmers Save 90% Electricity Cost', desc: 'Today, irrigation is not just about water, it is about stress, cash and constant calculation.', tag: 'Government Schemes' },
    { title: 'Difference Between On-Grid, Off-Grid & Hybrid Solar Systems', desc: 'Technical comparison of different solar system types to help you choose the right solution.', tag: 'Solar Knowledge' },
    { title: 'Starting a Micro Udyog in 2026 – Complete Guide', desc: 'Step-by-step guide to starting small-scale industries with government support and funding options.', tag: 'Micro-Udyog Ideas' },
    { title: 'Top 5 Subsidy Projects for Rural Entrepreneurs', desc: 'Explore the best government-backed projects and schemes available for rural business development.', tag: 'Rural Development' },
    { title: 'Solar Water Pump vs Diesel Pump – Full Comparison', desc: 'Detailed cost-benefit analysis comparing solar and diesel pumps for agricultural irrigation systems.', tag: 'Technical Guides' }
  ];

  return (
    <>
      <section className="bg-slider-option">
        <div className="slider-option">
          <div id="blogCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <div className="slider-item">
                  <img src="assets/images/blog/blog1.jpg" alt="Solar Knowledge Blog" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Solar Knowledge Hub</h3>
                            <h2>Learn Everything About Solar Energy</h2>
                            <p>Comprehensive guides on solar technology, installation, and maintenance</p>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <div className="slider-item">
                  <img src="assets/images/blog/blog2.jpg" alt="Government Schemes Blog" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Government Schemes & Subsidies</h3>
                            <h2>PM-KUSUM & Solar Incentives</h2>
                            <p>Latest updates on government policies and financial support for solar projects</p>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <div className="slider-item">
                  <img src="assets/images/blog/blog3.jpg" alt="Rural Development Blog" />
                  <div className="slider-content-area">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="slider-content">
                            <h3>Rural Development & Micro-Udyog</h3>
                            <h2>Empowering Rural Communities</h2>
                            <p>Success stories and business opportunities in rural entrepreneurship</p>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="left carousel-control carousel-control-prev" type="button" data-bs-target="#blogCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="right carousel-control carousel-control-next" type="button" data-bs-target="#blogCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section id="blog-categories" style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '20px', fontWeight: '700' }}>Blog Categories</h1>
              <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Explore our comprehensive knowledge base on solar energy and rural development</p>
            </div>
          </div>
          <div className="row">
            {categories.map((cat, i) => (
              <div key={i} className="col-lg-4 col-md-6 mb-4">
                <div className="feature-card" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'all 0.3s ease' }}>
                  <div className="feature-icon" style={{ fontSize: '48px', color: '#53a92c', marginBottom: '20px' }}><i className={`fa ${cat.icon}`}></i></div>
                  <h4 style={{ color: '#333', marginBottom: '15px' }}>{cat.title}</h4>
                  <p style={{ color: '#666', textAlign: 'justify' }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-12 text-center mb-5" style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px', fontWeight: '700' }}>Featured Blog Posts</h2>
              <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Latest articles and insights from our experts</p>
            </div>
          </div>
          <div className="row">
            {blogs.map((blog, i) => (
              <div key={i} className={`col-lg-${i === 4 ? '12' : '6'} mb-4`}>
                <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: i === 1 ? '200px' : '100%', cursor: 'pointer' }}>
                  <h4 style={{ color: '#53a92c', marginBottom: '15px' }}>{blog.title}</h4>
                  <p style={{ color: '#666', marginBottom: '15px' }}>{blog.desc}</p>
                  <span style={{ color: '#999', fontSize: '14px' }}><i className="fa fa-tag" style={{ marginRight: '5px' }}></i>{blog.tag}</span>
                </div>
              </div>
            ))}
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

export default Blog;
