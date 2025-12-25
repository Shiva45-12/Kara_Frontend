// Performance optimization utilities

// Suppress Google Maps console warnings
export const suppressMapWarnings = () => {
  const originalConsoleWarn = console.warn;
  
  console.warn = function(...args) {
    const message = args.join(' ');
    if (message.includes('passive event listener') || 
        message.includes('touchstart') || 
        message.includes('touchmove') ||
        message.includes('Search endpoint')) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
};

// Throttle function for scroll events
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};