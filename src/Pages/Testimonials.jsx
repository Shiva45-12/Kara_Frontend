import { useEffect } from 'react';

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      if (window.Swiper) {
        new window.Swiper('.testimonial-swiper', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            }
          }
        });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      name: "Vikas Singh",
      location: "RJPM Lucknow",
      image: "/assets/images/home01/male.jpeg",
      text: "Getting solar panels from Kara Group was a smooth ride from start to finish. The crew that came to my house was polite and knew their stuff, getting the whole system up on my roof without any fuss. It's only been a few months, but I can already see a real difference in my electricity bill. I feel good knowing I made a solid choice for my family's future."
    },
    {
      name: "Kunal Sharma",
      location: "Unnao Kanpur",
      image: "/assets/images/home01/male.jpeg",
      text: "What really impressed me about Kara Group wasn't just the quality of the solar panels, but the people. They answered all my calls and didn't make me feel rushed. Even after the installation, when I had a silly question about the meter, they were happy to help. It feels good to support a local business that genuinely cares."
    },
    {
      name: "Prem Sankar",
      location: "Barabanki",
      image: "/assets/images/home01/male.jpeg",
      text: "Honestly, the idea of going solar felt a bit overwhelming at first. I was worried about the cost and all the government paperwork. But the team at Kara Group walked me through every step, and they handled all the subsidy forms for me. They made a complicated process feel simple, and now I'm just enjoying the cheaper power bills."
    },
    {
      name: "Sudhir Singh",
      location: "Ayodhya",
      image: "/assets/images/home01/male.jpeg",
      text: "We'd been thinking about solar for a while, and I'm glad we went with Kara Group. They didn't just try to sell us the most expensive setup; they looked at our actual energy use and found a system that made sense for us. The installation was clean, and the system works perfectly. It's a great feeling to be making our own power."
    },
    {
      name: "Vivek Verma",
      location: "Rampur Bhagan Ayodhya",
      image: "/assets/images/home01/male.jpeg",
      text: "I can't say enough good things about Kara Group. The installation team was professional and tidy, and they took the time to show me how everything works. The panels look great on the roof, and the system is producing even more power than I expected. If you're near Ayodhya and considering solar, you should give them a call."
    },
    {
      name: "Rajesh Kumar",
      location: "Lucknow",
      image: "/assets/images/home01/male.jpeg",
      text: "KARA Group transformed our agricultural operations completely. The solar pump they installed has been running flawlessly for over a year now. No more diesel costs, no more power cuts affecting our irrigation. Our crop yield has increased significantly, and we're saving thousands every month."
    }
  ];

  return (
    <>
      {/* Page Header */}
      <section className="page-header" style={{ background: 'linear-gradient(135deg, #53a92c 0%, #4a9625 100%)', padding: '100px 0 60px', color: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>Customer Testimonials</h1>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Real experiences from our satisfied customers across Uttar Pradesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="testimonial-card" style={{ 
                  background: 'white', 
                  padding: '30px', 
                  borderRadius: '15px', 
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)', 
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="testimonial-content">
                    <div className="quote-icon" style={{ fontSize: '40px', color: '#53a92c', marginBottom: '20px' }}>
                      <i className="fa fa-quote-left"></i>
                    </div>
                    <p style={{ 
                      fontSize: '14px', 
                      lineHeight: 1.6, 
                      color: '#666', 
                      marginBottom: '25px',
                      fontStyle: 'italic'
                    }}>
                      "{testimonial.text}"
                    </p>
                    <div className="author-info" style={{ display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          borderRadius: '50%', 
                          marginRight: '15px',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <h5 style={{ color: '#333', marginBottom: '5px', fontSize: '16px' }}>{testimonial.name}</h5>
                        <p style={{ color: '#53a92c', fontSize: '14px', margin: 0 }}>{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 style={{ fontSize: '36px', color: '#333', marginBottom: '20px' }}>What Our Customers Say</h2>
              <p style={{ color: '#666', fontSize: '16px' }}>Swipe through more testimonials from our happy customers</p>
            </div>
          </div>
          <div className="testimonial-swiper swiper-container">
            <div className="swiper-wrapper">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="swiper-slide">
                  <div className="testimonial-slide" style={{ 
                    background: '#f8f9fa', 
                    padding: '40px', 
                    borderRadius: '15px', 
                    textAlign: 'center',
                    margin: '0 10px'
                  }}>
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        marginBottom: '20px',
                        objectFit: 'cover'
                      }}
                    />
                    <p style={{ 
                      fontSize: '14px', 
                      lineHeight: 1.6, 
                      color: '#666', 
                      marginBottom: '20px',
                      fontStyle: 'italic'
                    }}>
                      "{testimonial.text}"
                    </p>
                    <h5 style={{ color: '#333', marginBottom: '5px' }}>{testimonial.name}</h5>
                    <p style={{ color: '#53a92c', fontSize: '14px', margin: 0 }}>{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '80px 0', background: '#53a92c', color: 'white' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 col-6 mb-4">
              <h3 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '10px' }}>870+</h3>
              <p style={{ fontSize: '16px' }}>Happy Customers</p>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <h3 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '10px' }}>4369+</h3>
              <p style={{ fontSize: '16px' }}>KW Installed</p>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <h3 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '10px' }}>99%</h3>
              <p style={{ fontSize: '16px' }}>Satisfaction Rate</p>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <h3 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '10px' }}>5+</h3>
              <p style={{ fontSize: '16px' }}>Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;