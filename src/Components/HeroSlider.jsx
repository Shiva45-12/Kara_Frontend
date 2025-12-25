import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
    {
      image: "/assets/images/home01/slider-img-1.jpg",
      subtitle: "WELCOME TO KARA SOLAR",
      title: "SOLAR ENERGY EXPERTS",
      description: "Go Renewable. Save Tomorrow"
    },
    {
      image: "/assets/images/home01/slider-img-2.jpg",
      subtitle: "Save the Planet",
      title: "KARA NEXT-GEN RENEWABLE ENERGY SYSTEM",
      description: "CLEAN Green ENERGY SOLUTIONS"
    },
    {
      image: "/assets/images/home01/agri.jpg",
      subtitle: "EMPOWERING TOMORROW",
      title: "INNOVATE. ELEVATE. RENEW",
      description: "CLEAN ENERGY SOLUTIONS"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    
    return () => {
      clearInterval(autoSlide);
      window.removeEventListener('resize', checkMobile);
    };
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section style={{ 
      position: 'relative', 
      height: isMobile ? '60vh' : '100vh', 
      overflow: 'hidden',
      minHeight: isMobile ? '400px' : '600px'
    }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center center' : 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.4)'
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="row">
              <div className="col-lg-8 col-12">
                <div style={{ 
                  color: 'white', 
                  padding: isMobile ? '10px' : '20px',
                  textAlign: isMobile ? 'center' : 'left'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '16px' : '25px',
                    color: '#ffffff',
                    marginBottom: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: isMobile ? '1px' : '2px',
                    lineHeight: '1.2'
                  }}>{slide.subtitle}</h3>
                  <h2 style={{
                    fontSize: isMobile ? '24px' : '48px',
                    fontWeight: 700,
                    marginBottom: '15px',
                    lineHeight: isMobile ? '1.3' : '1.2',
                    color: '#ffffff',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}>{slide.title}</h2>
                  <p style={{
                    fontSize: isMobile ? '14px' : '25px',
                    marginBottom: isMobile ? '20px' : '30px',
                    color: '#f0f0f0',
                    fontWeight: '600',
                    lineHeight: '1.4'
                  }}>{slide.description}</p>
                  <Link 
                    to="/contact" 
                    style={{
                      background: '#53a92c',
                      color: 'white',
                      padding: isMobile ? '12px 25px' : '15px 35px',
                      borderRadius: '30px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      fontSize: isMobile ? '14px' : '16px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#4a9625';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#53a92c';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows - Hidden on Mobile */}
      {!isMobile && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              padding: '15px 20px',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 3
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(83, 169, 44, 0.8)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ‹
          </button>
          
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              padding: '15px 20px',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              zIndex: 3
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(83, 169, 44, 0.8)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ›
          </button>
        </>
      )}
      
      {/* Slide Indicators */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '20px' : '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: isMobile ? '8px' : '10px',
        zIndex: 3
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: isMobile ? '10px' : '12px',
              height: isMobile ? '10px' : '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentSlide ? '#53a92c' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;