import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Mail, LogOut, Globe, Settings, Users, BookOpen, User, Menu, X, Sun, Moon, Monitor, Lock } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, changeTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleBackToSite = () => {
    window.open('/', '_blank');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon size={16} />;
      case 'system':
        return <Monitor size={16} />;
      default:
        return <Sun size={16} />;
    }
  };

  return (
    <div className="admin-wrapper">

      {/* ENHANCED SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Mobile Close Button */}
        <button className="sidebar-close-btn" onClick={toggleSidebar}>
          <X size={20} />
        </button>
        {/* Logo Section */}
        <div className="admin-logo">
          <img src="/assets/images/home01/logo.jpg" alt="KARA GROUP" />
          <div className="logo-text">
            <span className="logo-title" style={{color:"black"}}>KARA GROUP</span>
            <span className="logo-subtitle" style={{color:"black",fontWeight:"700",fontSize:"12px"}}>Admin Panel</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="admin-menu">
          <div className="menu-section">
            <span className="menu-label">Main</span>
            <NavLink to="/admin" end className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <LayoutDashboard size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">Dashboard</span>
                <span className="menu-desc">Overview & analytics</span>
              </div>
            </NavLink>
          </div>

          <div className="menu-section">
            <span className="menu-label">Content Management</span>
            <NavLink to="/admin/blogs" className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <BookOpen size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">Blog Posts</span>
                <span className="menu-desc">Manage articles & content</span>
              </div>
            </NavLink>
          </div>

          <div className="menu-section">
            <span className="menu-label">User Management</span>
            <NavLink to="/admin/contactus" className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <Mail size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">Contact Inquiries</span>
                <span className="menu-desc">Customer messages & support</span>
              </div>
            </NavLink>

            <NavLink to="/admin/amc" className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <Settings size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">AMC Requests</span>
                <span className="menu-desc">Annual maintenance contracts</span>
              </div>
            </NavLink>

            <NavLink to="/admin/partners" className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <Users size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">Partner Requests</span>
                <span className="menu-desc">Partnership applications</span>
              </div>
            </NavLink>

            <NavLink to="/admin/popups" className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <Globe size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">Popup Inquiries</span>
                <span className="menu-desc">Website popup submissions</span>
              </div>
            </NavLink>
          </div>

          <div className="menu-section">
            <span className="menu-label">System</span>
            <NavLink to="/admin/settings" className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <Settings size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">Settings</span>
                <span className="menu-desc">System configuration</span>
              </div>
            </NavLink>
            
            <NavLink to="/admin/change-password" className="menu-item" onClick={closeSidebar}>
              <div className="menu-icon">
                <Lock size={20} />
              </div>
              <div className="menu-content">
                <span className="menu-title">Change Password</span>
                <span className="menu-desc">Update your password</span>
              </div>
            </NavLink>
          </div>
        </nav>

        {/* Sidebar Footer with Logout */}
        <div className="admin-sidebar-footer">
          <button className="sidebar-btn primary" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {/* Enhanced Top Bar */}
        <div className="admin-topbar">
          <div className="topbar-left">
            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
            <div className="breadcrumb">
              <span>Admin Panel</span>
              <span className="breadcrumb-separator">›</span>
              <span>Dashboard</span>
            </div>
          </div>

          <div className="topbar-right">
            {/* Theme Toggle */}
            <button className="theme-toggle-btn" onClick={cycleTheme} title={`Current: ${theme}`}>
              {getThemeIcon()}
            </button>
            
            {/* Admin User Profile */}
            <div className="admin-user-topbar">
              <div className="user-avatar">
                <User size={18} />
              </div>
              <div className="user-details">
                <span className="user-name">Admin User</span>
                <span className="user-email">admin@karagroup.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="mobile-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default AdminLayout;
