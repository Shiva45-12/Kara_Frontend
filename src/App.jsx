import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Components
import Header from './Components/Header';
import Footer from './Components/Footer';
import BackToTop from './Components/BackToTop';
import FixedContactIcons from './Components/FixedContactIcons';
import PageWrapper from './Components/PageWrapper';
import Preloader from './Components/Preloader';
import UniversalPopup from './Components/UniversalPopup';

// Public Pages
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import SolarPowerPlant from './Pages/SolarPowerPlant';
import Product from './Pages/Product';
import Partner from './Pages/Partner';
import Blog from './Pages/Blog';
import AMC from './Pages/AMC';
import Download from './Pages/Download';
import Testimonials from './Pages/Testimonials';

// Admin Pages
import AdminLogin from './Pages/auth/AdminLogin';
import Dashboard from './Pages/admin/Dashboard';
import ContactManage from './Pages/admin/ContactManage';
import BlogManage from './Pages/admin/BlogManage';
import CareerManage from './Pages/admin/CareerManage';
import AMCManage from './Pages/admin/AMCManage';
import PartnerManage from './Pages/admin/PartnerManage';
import PopupManage from './Pages/admin/PopupManage';
import Settings from './Pages/admin/Settings';
import ChangePassword from './Pages/admin/ChangePassword';
import AdminLayout from './Pages/admin/AdminLayout';
import ProtectedRoute from './Components/admin/ProtectedRoute';

import './App.css';

// Public Layout Component
const PublicLayout = ({ children }) => {
  return (
    <>
      <Preloader />
      <UniversalPopup />
      <div className="box-layout">
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <FixedContactIcons />
      </div>
    </>
  );
};

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* ========== ADMIN LOGIN ========== */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ========== ADMIN PANEL ========== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="blogs" element={<BlogManage />} />
              <Route path="contactus" element={<ContactManage />} />
              <Route path="amc" element={<AMCManage />} />
              <Route path="partners" element={<PartnerManage />} />
              <Route path="popups" element={<PopupManage />} />
              <Route path="settings" element={<Settings />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>

            {/* ========== PUBLIC WEBSITE ========== */}
            <Route path="/" element={<PublicLayout><PageWrapper><Home /></PageWrapper></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><PageWrapper><About /></PageWrapper></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><PageWrapper><Contact /></PageWrapper></PublicLayout>} />
            <Route path="/partner" element={<PublicLayout><PageWrapper><Partner /></PageWrapper></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><PageWrapper><Blog /></PageWrapper></PublicLayout>} />
            <Route path="/amc" element={<PublicLayout><PageWrapper><AMC /></PageWrapper></PublicLayout>} />
            <Route path="/solar-power-plant" element={<PublicLayout><PageWrapper><SolarPowerPlant /></PageWrapper></PublicLayout>} />
            <Route path="/product" element={<PublicLayout><PageWrapper><Product /></PageWrapper></PublicLayout>} />
            <Route path="/download" element={<PublicLayout><PageWrapper><Download /></PageWrapper></PublicLayout>} />
            <Route path="/testimonials" element={<PublicLayout><PageWrapper><Testimonials /></PageWrapper></PublicLayout>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
