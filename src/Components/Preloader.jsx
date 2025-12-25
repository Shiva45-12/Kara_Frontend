import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/preloader.css';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div id="loading">
      <div id="loading-center">
        <div id="loading-center-absolute">
          <div className="object" id="object_one"></div>
          <div className="object" id="object_two"></div>
          <div className="object" id="object_three"></div>
          <div className="object" id="object_four"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;