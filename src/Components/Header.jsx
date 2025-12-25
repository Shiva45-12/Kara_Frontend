import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/header.css";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === path ? "active" : "";
    return location.pathname.startsWith(path) ? "active" : "";
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);

      if (scrolled) {
        document.body.classList.add("scrolled-header");
      } else {
        document.body.classList.remove("scrolled-header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("scrolled-header");
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="header-style-1">

      {/* ================= TOP BAR (DESKTOP ONLY) ================= */}
      <div className={`bg-header-top ${isScrolled ? "hide-topbar" : ""}`}>
        <div className="container">
          <div className="row header-top">

            {/* LOGO + NAME (DESKTOP) */}
            <div className="col-lg-3 d-none d-lg-block">
              <Link to="/" className="d-flex align-items-center text-decoration-none py-2">
                <img
                  src="/assets/images/home01/logo.jpg"
                  alt="logo"
                  style={{
                    width: "70px",
                    height: "54px",
                    objectFit: "contain",
                    marginRight: "20px",
                  }}
                />
                <h2
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#53a92c",
                    whiteSpace: "nowrap",
                  }}
                >
                  KARA GROUP
                </h2>
              </Link>
            </div>

            {/* MOBILE LOGO (VISIBLE ON MOBILE) */}
            <div className="col-12 d-lg-none">
              <div className="mobile-brand" style={{ display: 'flex', alignItems: 'center', padding: '5px 0' }}>
                <Link to="/" className="d-flex align-items-center text-decoration-none">
                  <img
                    src="/assets/images/home01/logo.jpg"
                    alt="logo"
                    style={{
                      width: "45px",
                      height: "35px",
                      objectFit: "contain",
                      marginRight: "12px",
                    }}
                  />
                  <h2
                    className="brand-text"
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    KARA GROUP
                  </h2>
                </Link>
              </div>
            </div>

            {/* CONTACT INFO (DESKTOP) */}
            <div className="col-lg-9 d-none d-lg-block">
              <div className="header-top-right">
                <ul className="header-contact">
                  <li>
                    <i className="flaticon-time-left"></i>
                    <div className="h-adress-content">
                      <h6>Time</h6>
                      <p>Monday–Saturday : 9:00am–6:00pm</p>
                    </div>
                  </li>

                  <li>
                    <a href="tel:+917523082381" style={{ textDecoration: "none" }}>
                      <i className="flaticon-vibrating-phone"></i>
                      <div className="h-adress-content">
                        <h6>Phone</h6>
                        <p style={{ color: "black" }}>+91 7523082381</p>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://maps.google.com/?q=Kara+Group+Lucknow"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <i className="flaticon-placeholder"></i>
                      <div className="h-adress-content">
                        <h6>Address</h6>
                        <p style={{ color: "black" }}>Kara Group, Lucknow</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className={`main-navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="container">
          <div className="row align-items-center">
            
            {/* Mobile Toggle Button */}
            <div className="col-12 d-lg-none">
              <div className="d-flex justify-content-end">
                <button 
                  className="navbar-toggler" 
                  onClick={toggleMenu}
                  style={{
                    background: 'none',
                    border: '2px solid #fff',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fa fa-bars" style={{ color: '#fff', fontSize: '18px' }}></i>
                </button>
              </div>
            </div>

          </div>

          {/* Navigation Menu (Single for both Desktop and Mobile) */}
          <div className={`navbar-collapse ${isMenuOpen ? "show" : ""}`}>
            <ul className="navbar-nav">
              <li><Link to="/" className={`nav-link ${isActive("/")}`}>HOME</Link></li>
              <li><Link to="/about" className={`nav-link ${isActive("/about")}`}>About</Link></li>
              <li><Link to="/solar-power-plant" className={`nav-link ${isActive("/solar-power-plant")}`}>Solar Power Plant</Link></li>
              <li><Link to="/product" className={`nav-link ${isActive("/product")}`}>Our Products</Link></li>
              <li><Link to="/partner" className={`nav-link ${isActive("/partner")}`}>Become a Partner</Link></li>
              <li><Link to="/blog" className={`nav-link ${isActive("/blog")}`}>Blog</Link></li>
              <li><Link to="/amc" className={`nav-link ${isActive("/amc")}`}>AMC</Link></li>
              <li><Link to="/download" className={`nav-link ${isActive("/download")}`}>Downloads</Link></li>
              <li><Link to="/contact" className={`nav-link ${isActive("/contact")}`}>Contact</Link></li>
            </ul>
          </div>

        </div>
      </div>

    </header>
  );
};

export default Header;
