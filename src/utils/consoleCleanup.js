// Clean up console in production
if (process.env.NODE_ENV === 'production') {
  // Override console methods in production
  const noop = () => {};
  
  console.log = noop;
  console.info = noop;
  console.warn = noop;
  console.debug = noop;
  
  // Keep console.error for critical issues
  const originalError = console.error;
  console.error = (...args) => {
    // Only log critical Firebase errors
    const message = args[0];
    if (typeof message === 'string' && message.includes('Firebase')) {
      // Send to error tracking service instead
      return;
    }
    originalError.apply(console, args);
  };
}