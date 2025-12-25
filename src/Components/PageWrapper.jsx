import { useEffect } from 'react';

const PageWrapper = ({ children }) => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
};

export default PageWrapper;