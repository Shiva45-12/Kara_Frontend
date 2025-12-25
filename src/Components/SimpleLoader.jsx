import React from 'react';

const SimpleLoader = ({ message = "Loading...", size = "sm" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <div className="admin-loader-minimal">
      <div className={`spinner-simple ${sizeClasses[size]}`}></div>
      <span className="message">{message}</span>
    </div>
  );
};

export default SimpleLoader;