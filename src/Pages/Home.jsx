import { useEffect, useState } from 'react';
import HeroSlider from '../Components/HeroSlider';
import KeyBenefits from '../Components/KeyBenefits';
import FixedContactIcons from '../Components/FixedContactIcons';
import '../styles/components.css';
import '../styles/mobile-responsive.css';

const Home = () => {
  const [counters, setCounters] = useState({ houses: 0, kw: 0, clients: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);

  const testimonials = [
    {
      text: "Getting solar panels from Kara Group was a smooth ride from start to finish. The crew was polite and professional, getting the whole system up without any fuss. I can already see a real difference in my electricity bill.",
      name: "Vikas Singh",
      location: "RJPM Lucknow"
    },
    {
      text: "What impressed me most wasn't just the quality of panels, but the people. They answered all my calls and didn't make me feel rushed. Even after installation, they were happy to help with any questions.",
      name: "Kunal Sharma",
      location: "Unnao Kanpur"
    },
    {
      text: "The idea of going solar felt overwhelming at first. But Kara Group walked me through every step and handled all the subsidy forms. They made a complicated process feel simple.",
      name: "Prem Sankar",
      location: "Barabanki"
    },
    {
      text: "We'd been thinking about solar for a while. Kara Group didn't try to sell us the most expensive setup; they found a system that made sense for us. The installation was clean and works perfectly.",
      name: "Sudhir Singh",
      location: "Ayodhya"
    },
    {
      text: "I can't say enough good things about Kara Group. The installation team was professional and tidy, and they took the time to show me how everything works. The panels look great on the roof.",
      name: "Vivek Verma",
      location: "Rampur Bhagan Ayodhya"
    },
    {
      text: "The solar system has exceeded our expectations. Zero electricity bills and the system is producing even more power than promised. Highly recommend Kara Group for their professional service.",
      name: "Rajesh Kumar",
      location: "Faizabad"
    },
    {
      text: "From consultation to installation, everything was handled professionally. The team explained every detail and the after-sales support is excellent. Very satisfied with our solar investment.",
      name: "Amit Sharma",
      location: "Sultanpur"
    },
    {
      text: "Best decision we made for our home. The solar panels are working perfectly and we're saving thousands on electricity bills. Kara Group's service is top-notch and reliable.",
      name: "Deepak Singh",
      location: "Gonda"
    }
  ];

  const cardsPerGroup = 3;
  const totalGroups = Math.ceil(testimonials.length / cardsPerGroup);

  useEffect(() => {
    // Intersection Observer for counter animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const counterSection = document.querySelector('.bg-count-section');
    if (counterSection) {
      observer.observe(counterSection);
    }

    const animateCounters = () => {
      const targets = { houses: 870, kw: 4369, clients: 99 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          houses: Math.floor(targets.houses * progress),
          kw: Math.floor(targets.kw * progress),
          clients: Math.floor(targets.clients * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    return () => {
      if (counterSection) {
        observer.unobserve(counterSection);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    // Auto slide testimonials in groups of 3
    const autoSlide = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
    }, 4000); // 4 seconds per group
    
    return () => clearInterval(autoSlide);
  }, [totalGroups]);

  return (
    <>
      <HeroSlider />

      {/* Services Section 1 */}
      <section className="bg-services-section">
        <h2 style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '70px' }}>
          KARA GROUP — Powering India's Self-Reliant Energy Future
        </h2>
        <div className="container">
          <div className="row">
            <div className="services-section">
              <div className="row">
                <div className="col-md-4">
                  <div className="services-header">
                    <img style={{ marginRight: '10px', width: '150px', height: 'auto' }} src="/assets/images/home01/five-removebg-preview.jpg" alt="services-header-img" className="img-responsive" />
                    <h3>Years of Making Changes The World</h3>
                    <p>KARA GROUP is a pioneering renewable energy enterprise advancing India's ambitious transition to clean power through high-efficiency solar solutions, innovative EPC capabilities, and strategic alignment with national climate goals.</p>
                    <a href="/services" className="btn btn-default">VIEW SERVICES</a>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-12">
                      <div className="services-items" style={{ height: '100vh' }}>
                        <i className="flaticon-invention"></i>
                        <div className="services-content">
                          <h4><a href="">India's Renewable Energy Revolution</a></h4>
                          <div className="para">
                            <p style={{ fontSize: 'medium' }}>
                              India is experiencing a historic clean-energy transformation. As of October 2025, the country has crossed 500 GW of total installed power capacity, with over 51% coming from non-fossil fuel energy sources such as solar, wind, hydro, and nuclear. The renewable sector includes 127.33 GW of solar power and 53.12 GW of wind energy, securing India the position of 3rd largest solar power producer and 4th in overall renewable energy capacity worldwide.

                              The Government of India aims to develop 500 GW of renewable energy capacity by 2030, supported by investment needs exceeding ₹32 lakh crore. Through its strong EPC capabilities, OEM partnerships, and efficient supply-chain integration, KARA GROUP actively supports national climate goals—accelerating progress toward net-zero emissions by 2070 while boosting energy independence for industries, businesses, and communities.
                            </p>
                            <p style={{ marginTop: '15px', fontSize: 'medium' }}>
                              The government's roadmap targets 500 GW of renewable energy capacity by 2030, requiring investment commitments exceeding ₹32 lakh crore. KARA GROUP's integrated sourcing, OEM, and EPC capabilities directly support this national mandate, contributing to India's goal of achieving net-zero emissions by 2070 while strengthening energy independence.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Support Framework Section */}
      <section className="bg-services-section" style={{ paddingTop: '20px' }}>
        <h2 className="govt-support-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '70px', textAlign: 'center' }}>
          Government Support Framework
        </h2>
        <div className="container">
          <div className="row">
            <div className="services-section">
              <div className="row">
                <div className="col-md-4">
                  <div className="services-header">
                    <img src="/assets/images/home01/pm.jpg" alt="services-header-img" className="img-responsive" />
                    <h3>PM Surya Ghar: Muft Bijli Yojana</h3>
                    <p>Launched to solarize 1 crore households, this flagship program provides substantial subsidies:</p>
                    <div style={{ overflowX: 'auto', margin: '10px 0' }}>
                      <table style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse', 
                        fontSize: '12px', 
                        minWidth: '280px'
                      }}>
                        <thead>
                          <tr style={{ background: '#53a92c', color: 'white' }}>
                            <th style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'left',
                              fontSize: '10px',
                              whiteSpace: 'nowrap'
                            }}>Capacity</th>
                            <th style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '10px',
                              whiteSpace: 'nowrap'
                            }}>Central</th>
                            <th style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '10px',
                              whiteSpace: 'nowrap'
                            }}>State</th>
                            <th style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '10px',
                              whiteSpace: 'nowrap'
                            }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: '#f9f9f9' }}>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              fontWeight: 600,
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>1 kW</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹30,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹15,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center', 
                              fontWeight: 600, 
                              color: '#53a92c',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹45,000</td>
                          </tr>
                          <tr>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              fontWeight: 600,
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>2 kW</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹60,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹30,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center', 
                              fontWeight: 600, 
                              color: '#53a92c',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹90,000</td>
                          </tr>
                          <tr style={{ background: '#f9f9f9' }}>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              fontWeight: 600,
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>3 kW</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹78,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹30,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center', 
                              fontWeight: 600, 
                              color: '#53a92c',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹108,000</td>
                          </tr>
                          <tr>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              fontWeight: 600,
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>Above 3 kW</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹78,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹30,000</td>
                            <td style={{ 
                              padding: '6px 4px', 
                              border: '1px solid #ddd', 
                              textAlign: 'center', 
                              fontWeight: 600, 
                              color: '#53a92c',
                              fontSize: '9px',
                              whiteSpace: 'nowrap'
                            }}>₹108,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p style={{ marginTop: '10px', fontSize: '12px' }}>• Delivers up to 300 units of free electricity monthly per household</p>
                    <p style={{ marginTop: '11px' }}>
                      KARA GROUP's residential solar solutions are designed to seamlessly integrate with this transformative scheme, helping homeowners achieve zero electricity bills and earn income from surplus power.
                    </p>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-12">
                      <div className="services-items" style={{ height: '155vh' }}>
                        <i className="flaticon-invention"></i>
                        <div className="services-content">
                          <h4><a href="">PM-KUSUM/PMFME: Empowering Farmers</a></h4>
                          <p style={{ fontSize: 'medium' }}>PM-KUSUM steps into exactly this reality. Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan sounds like a long phrase, but the heart of it is simple: let the farmer stop chasing diesel and night-time power, and instead use the sun that already shines on the farm every day. The scheme says: run your pump on solar energy, cut your irrigation cost sharply, and where possible, don't just consume electricity—earn from it. Suddenly, "bijli ka bill" is not just an expense line, it can become an income line too.</p>
                          <div className="kusum-components" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px' }}>
                            <div className="kusum-component" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '4px solid #53a92c', flex: 1, minWidth: '280px' }}>
                              <h5 style={{ color: '#53a92c', marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>Component A</h5>
                              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>10,000 MW decentralized grid-connected renewable power plants on barren/fallow land</p>
                            </div>
                            <div className="kusum-component" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '4px solid #53a92c', flex: 1, minWidth: '280px' }}>
                              <h5 style={{ color: '#53a92c', marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>Component B</h5>
                              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>14 lakh stand-alone solar agriculture pumps up to 7.5 HP capacity</p>
                            </div>
                            <div className="kusum-component" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderLeft: '4px solid #53a92c', flex: 1, minWidth: '280px' }}>
                              <h5 style={{ color: '#53a92c', marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>Component C</h5>
                              <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>Solarization of 35 lakh grid-connected agriculture pumps enabling farmers to sell surplus power to DISCOMs</p>
                            </div>
                          </div>
                        </div>
                        <img src="/assets/images/home01/cause-4.jpg" style={{ marginTop: '30px' }} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* People Working Section */}
      <section className="bg-people-work-section">
        <div className="container">
          <div className="row">
            <div className="people-work-section">
              <div className="section-header">
                <h2>Our Solar Project Workflow</h2>
                <p style={{ textAlign: 'center !important' }}>Professionally mesh enterprise wide imperatives without world class paradigms.Dynamically deliver ubiquitous leadership awesome skills.</p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="people-work-items">
                    <div className="people-work-img">
                      <img src="/assets/images/home01/p1.jpg" alt="people-working-img-1" className="img-responsive" />
                    </div>
                    <div className="work-content">
                      <h4>Engineering & Solar System Design</h4>
                      <p>The journey begins with an in-depth technical survey and feasibility analysis. Our engineers carry out advanced shadow mapping, electrical load calculations, and a rigorous assessment of the site's structure and infrastructure. Every system is custom-designedfor optimal power generation, seamless integration, and dependable long-term performance.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="people-work-items">
                    <div className="people-work-img">
                      <img src="/assets/images/home01/people-working-img-2.jpg" alt="people-working-img-2" style={{ height: '300px' }} className="img-responsive" />
                    </div>
                    <div className="work-content">
                      <h4>Precision Installation & Grid Integration</h4>
                      <p>Certified technicians execute the installation under stringent safety standards and engineering best practices. We utilize top-tier equipment— ISO, CE, UPNEDA/DISCOM-approved inverters, ACDB-DCDB units, industrial-grade wiring, surge protection, and a robust triple copper earthing system (3-phase). All materials and workmanship come with a comprehensive 5-year operational warranty. The scope includes panel mounting, professional cabling, inverter configuration, system synchronization with the grid, and two free panel cleanings and site visits in the first year to guarantee peak reliability from day one.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="people-work-items">
                    <div className="people-work-img">
                      <img src="/assets/images/home01/p3.jpg" alt="people-working-img-3" style={{ height: '300px' }} className="img-responsive" />
                    </div>
                    <div className="work-content">
                      <h4>Commissioning & Dedicated Support</h4>
                      <p>Once grid-tied inspections are cleared, we formally commission your system—delivering full documentation, hands-on system training, and premium performance monitoring tools. Ongoing, our dedicated service team offers proactive maintenance and swift assistance under warranty or paid plans, assuring you of sustained performance and peace of mind throughout your solar journey.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-focus-cause-section" style={{ marginTop: '-116px', paddingTop: '20px' }}>
        <div className="container">
          <div className="row">
            <div className="focus-cause">
              <div className="section-header">
                <h2>Completed & Ongoing Projects</h2>
                <p style={{ textAlign: 'center !important' }}>Showcase of our successful solar installations and active projects across India</p>
              </div>
              <div className="row">
                {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                  <div key={num} className="col-lg-4 col-sm-6 col-12 project-item">
                    <div className="cause-items" style={{ overflow: 'hidden', borderRadius: '8px' }}>
                      <img 
                        src={`/assets/images/home01/p${num}.${num === 4 ? 'avif' : 'jpg'}`} 
                        alt={`project-${num}`} 
                        className="img-responsive"
                        style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Count Section */}
      <section className="bg-count-section">
        <div className="count-overlay">
          <div className="container">
            <div className="row">
              <h4 style={{ textAlign: 'center', marginTop: '40px', fontSize: 'xx-large', color: 'white', fontWeight: 700 }}>
                HAPPY CUSTOMER
              </h4>
              <div className="count-option">
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="count-items">
                      <i className="ec"></i>
                      <span className="counter">{counters.houses}</span><span>+</span>
                      <h4>Houses Solar Powered</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="count-items">
                      <span className="counter">{counters.kw}</span><span>+</span>
                      <h4>Kw Installed</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="count-items">
                      <span className="counter">{counters.clients}</span><span>+</span>
                      <h4>% Happy Clients</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focused Causes Section */}
      <section className="bg-focus-cause-section">
        <div className="container">
          <div className="row">
            <div className="focus-cause">
              <div className="section-header">
                <h2>Focused Causes</h2>
                <p style={{ textAlign: 'center !important' }}>Professionally mesh enterprise wide imperatives without world class paradigms.Dynamically deliver ubiquitous leadership awesome skills.</p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="cause-items">
                    <a href="campaign_single.html"><img src="/assets/images/home01/agri.jpg" alt="cause-img-1" style={{ height: '200px' }} className="img-responsive" /></a>
                    <div className="cause-content">
                      <h4><a href="campaign_single.html">Sustainable Agriculture</a></h4>
                      <p>We empower UP farmers with over 430+ reliable solar water pumps installed across U.P & M.P., Our fuel-free irrigation systems cut operational costs to zero, boosting crop yields and securing a sustainable future for local agriculture.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="cause-items">
                    <a href="campaign_single.html"><img src="/assets/images/home01/helping.jpg" alt="cause-img-2" style={{ height: '200px' }} className="img-responsive" /></a>
                    <div className="cause-content">
                      <h4 style={{ display: 'flex' }}><a href="campaign_single.html">Helping Young Entrepreneurs</a></h4>
                      <p>Fueling ambition across U.P.KARA GROUP enables young entrepreneurs to launch sustainable small businesses. From solar-powered flour mills to off-grid cold storage, our energy-efficient infrastructure ensures 100% reliable power, boosting profitability and driving local job creation for the next generation.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="cause-items">
                    <a href="campaign_single.html"><img src="/assets/images/home01/plant.jpg" alt="cause-img-3" className="img-responsive" style={{ height: '200px' }} /></a>
                    <div className="cause-content">
                      <h4><a href="campaign_single.html">Make Plants Alive</a></h4>
                      <p>Bringing life to dry lands, our advanced solar irrigation has transformed over 90 acres of barren fields into productive landscapes. KARA GROUP systems ensure every crop receives precise hydration, turning challenging terrains into thriving green belts.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="cause-items">
                    <a href="campaign_single.html"><img src="/assets/images/home01/cause-4.jpg" alt="cause-img-4" style={{ height: '200px' }} className="img-responsive" /></a>
                    <div className="cause-content">
                      <h4><a href="campaign_single.html">Need Solar Panels</a></h4>
                      <p>Transforming skylines across entire Uttar Pradesh.Our 2.5 MW+ portfolio utilizes advanced Topcon & Bifacial modules for maximum efficiency. With KARA's smart net-metering solutions, we don't just lower bills—we eliminate them, delivering 90%</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="cause-items">
                    <a href="campaign_single.html"><img src="/assets/images/home01/ozon.jpg" alt="cause-img-5" className="img-responsive" /></a>
                    <div className="cause-content">
                      <h4><a href="campaign_single.html">Save The Ozone Layer</a></h4>
                      <p>Every KW/MW generated by KARA GROUP reduces carbon footprints significantly. Our installations have already offset thousands of tons of CO2, directly contributing to healing the ozone layer and fighting climate change right here in U.P & M.P.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="cause-items">
                    <a href="campaign_single.html"><img src="/assets/images/home01/water.jpg" alt="cause-img-6" className="img-responsive" /></a>
                    <div className="cause-content">
                      <h4><a href="campaign_single.html">Save Water From Polution</a></h4>
                      <p>KARA GROUP's solar pumps eliminate the need for diesel generators, preventing thousands of liters of fuel spillage annually. Our eco-friendly technology ensures that local groundwater remains pure, safe, and pollution-free for generations to come.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-testimonial-section">
        <div className="testimonial-overlay">
          <div className="container">
            <div className="row">
              <div className="testimonial-option">
                <div className="section-header">
                  <h2>Testimonials</h2>
                  <p style={{ textAlign: 'center !important' }}>What our satisfied customers say about KARA GROUP solar solutions</p>
                </div>
                
                {/* Testimonial Cards Carousel */}
                <div className="testimonial-carousel" style={{ 
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px 0'
                }}>
                  <div style={{
                    display: 'flex',
                    transform: `translateX(-${currentGroup * 100}%)`,
                    transition: 'transform 0.5s ease-in-out',
                    gap: '20px'
                  }}>
                    {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                      <div key={groupIndex} style={{
                        display: 'flex',
                        gap: '20px',
                        minWidth: '100%',
                        justifyContent: 'center'
                      }}>
                        {testimonials
                          .slice(groupIndex * cardsPerGroup, (groupIndex + 1) * cardsPerGroup)
                          .map((testimonial, idx) => {
                            const actualIndex = groupIndex * cardsPerGroup + idx;
                            return (
                              <div 
                                key={actualIndex} 
                                className="testimonial-card" 
                                style={{
                                  minWidth: '300px',
                                  maxWidth: '350px',
                                  background: 'rgba(255, 255, 255, 0.95)',
                                  borderRadius: '15px',
                                  padding: '25px',
                                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onClick={() => setCurrentGroup(groupIndex)}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(83, 169, 44, 0.2)';
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                                }}
                              >
                                {/* Stars */}
                                <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className="fa fa-star" style={{ 
                                      color: '#FFD700', 
                                      fontSize: '16px', 
                                      marginRight: '2px' 
                                    }}></i>
                                  ))}
                                </div>
                                
                                {/* Testimonial Text */}
                                <p style={{
                                  color: '#333',
                                  fontSize: '14px',
                                  lineHeight: '1.6',
                                  marginBottom: '20px',
                                  fontStyle: 'italic',
                                  textAlign: 'center',
                                  minHeight: '80px',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}>
                                  "{testimonial.text}"
                                </p>
                                
                                {/* Author Info */}
                                <div style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  gap: '12px'
                                }}>
                                  <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '2px solid #53a92c'
                                  }}>
                                    <img 
                                      src="/assets/images/home01/male.jpeg" 
                                      alt={testimonial.name}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                      }}
                                    />
                                  </div>
                                  <div style={{ textAlign: 'left' }}>
                                    <h5 style={{ 
                                      color: '#333', 
                                      fontSize: '16px', 
                                      fontWeight: '600',
                                      margin: '0 0 2px 0'
                                    }}>
                                      {testimonial.name}
                                    </h5>
                                    <p style={{ 
                                      color: '#666', 
                                      fontSize: '12px',
                                      margin: 0
                                    }}>
                                      {testimonial.location}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation Dots */}
                <div className="swiper-pagination" style={{ textAlign: 'center', marginTop: '30px' }}>
                  {Array.from({ length: totalGroups }).map((_, groupIdx) => (
                    <span 
                      key={groupIdx} 
                      className="swiper-pagination-bullet"
                      onClick={() => setCurrentGroup(groupIdx)}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: groupIdx === currentGroup ? '#53a92c' : 'rgba(255,255,255,0.5)',
                        display: 'inline-block',
                        margin: '0 5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '2px solid transparent'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.border = '2px solid #53a92c';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.border = '2px solid transparent';
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section style={{ background: '#f8f9fa', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            <div style={{ textAlign: 'center', marginBottom: '50px', width: '100%' }}>
              <h2 style={{ fontSize: '32px', color: '#333', marginBottom: '15px', fontWeight: 700 }}>Key Benefits</h2>
              <p style={{ color: '#666', fontSize: '16px', textAlign: 'center !important' }}>Discover why solar energy is the smart choice for your future</p>
            </div>
          </div>
          <div className="row key-benefits-row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="key-benefit-item" style={{ flex: '0 0 20%', padding: '15px', textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 169, 44, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <img src="/assets/images/home01/cost.png" style={{ fontSize: '40px', color: '#53a92c', marginBottom: '15px', display: 'block' }} alt="Cost Saving" />
                <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>Cost Saving</h4>
                <p style={{ color: '#666', fontSize: '13px', letterSpacing: '-0.5px', textAlign: 'center' }}>Reduce electricity bills by up to 90% and enjoy long-term savings</p>
              </div>
            </div>
            <div className="key-benefit-item" style={{ flex: '0 0 20%', padding: '15px', textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 169, 44, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <img src="/assets/images/home01/ecco.png" style={{ fontSize: '40px', color: '#53a92c', marginBottom: '15px', display: 'block' }} alt="Eco-Friendly" />
                <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>Eco-Friendly</h4>
                <p style={{ color: '#666', fontSize: '13px', letterSpacing: '-0.5px', textAlign: 'center' }}>Clean renewable energy that reduces carbon footprint significantly</p>
              </div>
            </div>
            <div className="key-benefit-item" style={{ flex: '0 0 20%', padding: '15px', textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 169, 44, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <img src="/assets/images/home01/roi.png" style={{ fontSize: '40px', color: '#53a92c', marginBottom: '15px', display: 'block' }} alt="Quick ROI" />
                <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>Quick ROI</h4>
                <p style={{ color: '#666', fontSize: '13px', letterSpacing: '-0.5px', textAlign: 'center' }}>Recover your investment in 3-4 years with guaranteed returns</p>
              </div>
            </div>
            <div className="key-benefit-item" style={{ flex: '0 0 20%', padding: '15px', textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 169, 44, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <img src="/assets/images/home01/grid.png" style={{ fontSize: '40px', color: '#53a92c', marginBottom: '15px', display: 'block' }} alt="Grid Independence" />
                <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>Grid Independence</h4>
                <p style={{ color: '#666', fontSize: '13px', letterSpacing: '-0.5px', textAlign: 'center' }}>Freedom from power cuts and rising electricity rates</p>
              </div>
            </div>
            <div className="key-benefit-item" style={{ flex: '0 0 20%', padding: '15px', textAlign: 'center' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 169, 44, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <img src="/assets/images/home01/custom copy.png" style={{ fontSize: '40px', color: '#53a92c', marginBottom: '15px', display: 'block' }} alt="Custom Engineering" />
                <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>Custom Engineering</h4>
                <p style={{ color: '#666', fontSize: '13px', letterSpacing: '-0.5px', textAlign: 'center' }}>Tailored solutions designed for your specific </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose KARA GROUP Section */}
      <section style={{ background: 'white', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            <div style={{ textAlign: 'center', marginBottom: '50px', width: '100%' }}>
              <h2 style={{ fontSize: '32px', color: '#333', marginBottom: '15px', fontWeight: 700 }}>Why Choose KARA GROUP</h2>
              <p style={{ color: '#666', fontSize: '16px', textAlign: 'justify', maxWidth: '600px', margin: '0 auto', letterSpacing: '-0.5px' }}>Leading solar solutions provider with proven expertise and customer satisfaction</p>
            </div>
          </div>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {[
              { icon: 'fa-map-marker', title: 'Across Uttar Pradesh', text: 'Serving customers across all districts of Uttar Pradesh with local expertise and support' },
              { icon: 'fa-users', title: 'In-House Expert', text: 'Certified engineers and technicians with years of solar installation experience' },
              { icon: 'fa-certificate', title: 'DISCOM & Subsidy Ready', text: 'Complete assistance with government subsidies and DISCOM approvals' },
              { icon: 'fa-industry', title: 'KW to MW Delivery', text: 'Scalable solutions from residential to commercial and industrial projects' },
              { icon: 'fa-wrench', title: 'After Installation Support', text: 'Comprehensive maintenance and monitoring throughout system lifetime' },
              { icon: 'fa-headphones', title: 'After Sales Services', text: 'Dedicated customer support team available for all your queries and technical assistance' }
            ].map((item, idx) => (
              <div key={idx} className="why-choose-item" style={{ flex: '0 0 33.33%', padding: '20px' }}>
                <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 169, 44, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <i className={`fa ${item.icon}`} style={{ fontSize: '40px', color: '#53a92c', marginBottom: '15px', display: 'block' }}></i>
                  <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '18px' }}>{item.title}</h4>
                  <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.6, textAlign: 'justify', letterSpacing: '-0.5px' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Our Blog Section */}
      <section style={{ background: '#f8f9fa', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            <div style={{ textAlign: 'center', marginBottom: '50px', width: '100%' }}>
              <h2 style={{ fontSize: '32px', color: '#333', marginBottom: '15px', fontWeight: 700, letterSpacing: '-0.5px' }}>From Our Blog</h2>
              <p style={{ color: '#666', fontSize: '16px', textAlign: 'center', maxWidth: '600px', margin: '0 auto', letterSpacing: '-0.5px' }}>Latest insights and knowledge about solar energy and rural development</p>
            </div>
          </div>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {[
              { img: 'farmer.jpg', title: 'How PM-KUSUM Scheme Helps Farmers Save 90% Electricity Cost', desc: 'Today, irrigation is not just about water, it\'s about stress, cash and constant calculation...', tag: 'Government Schemes' },
              { img: 'grid.jpg', title: 'Difference Between On-Grid, Off-Grid & Hybrid Solar Systems', desc: 'Technical comparison of different solar system types to help you choose the right solution...', tag: 'Solar Knowledge' },
              { img: 'blog3.jpg', title: 'Starting a Micro Udyog in 2026 – Complete Guide', desc: 'Step-by-step guide to starting small-scale industries with government support and funding options...', tag: 'Micro-Udyog Ideas' },
              { img: 'pump.jpg', title: 'Solar Water Pump vs Diesel Pump – Full Comparison', desc: 'Detailed cost-benefit analysis comparing solar and diesel pumps for agricultural irrigation systems...', tag: 'Technical Guides' }
            ].map((blog, idx) => (
              <div key={idx} className="blog-item" style={{ flex: '0 0 50%', padding: '15px' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(83, 169, 44, 0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <img src={`/assets/images/blog/${blog.img}`} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
                  <h4 style={{ color: '#53a92c', marginBottom: '10px', fontSize: '18px', letterSpacing: '-0.5px' }}>{blog.title}</h4>
                  <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.6, marginBottom: '10px', letterSpacing: '-0.5px' }}>{blog.desc}</p>
                  <span style={{ color: '#999', fontSize: '12px', letterSpacing: '-0.5px' }}><i className="fa fa-tag" style={{ marginRight: '5px' }}></i>{blog.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <a href="/blog" style={{ background: '#53a92c', color: 'white', padding: '12px 30px', borderRadius: '25px', textDecoration: 'none', fontWeight: 600, transition: 'all 0.3s ease', letterSpacing: '-0.5px' }} onMouseOver={(e) => { e.currentTarget.style.background = '#4a9625'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = '#53a92c'; e.currentTarget.style.transform = 'translateY(0)'; }}>View All Blogs</a>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
