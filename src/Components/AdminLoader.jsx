import React from 'react';

const AdminLoader = ({ message = "Loading..." }) => {
  return (
    <div className="admin-loader-container">
      <div className="admin-loader-content">
        {/* Animated Logo */}
        <div className="admin-loader-logo">
          <img src="/assets/images/home01/logo.jpg" alt="KARA GROUP" />
          <div className="loader-pulse"></div>
        </div>
        
        {/* Spinner */}
        <div className="admin-loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        
        {/* Message */}
        <div className="admin-loader-message">
          <h3>{message}</h3>
          <p>Please wait while we fetch your data...</p>
        </div>
        
        {/* Progress Dots */}
        <div className="admin-loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default AdminLoader;