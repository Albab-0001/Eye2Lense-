const isDevelopment = process.env.NODE_ENV === 'development';

// Log levels
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Only log in development or for critical errors
const shouldLog = (level) => {
  if (level === LOG_LEVELS.ERROR) return true; // Always log errors
  return isDevelopment; // Only log other levels in development
};

export const logError = (message, error = null, context = {}) => {
  if (!shouldLog(LOG_LEVELS.ERROR)) return;
  
  const errorInfo = {
    message,
    timestamp: new Date().toISOString(),
    context,
    ...(error && {
      error: {
        message: error.message,
        code: error.code,
        stack: isDevelopment ? error.stack : undefined
      }
    })
  };
  
  if (isDevelopment) {
    console.error('🔴 Auth Error:', errorInfo);
  } else {
    // In production, send to error tracking service
    // Example: Sentry, LogRocket, etc.
    // sendToErrorTracking(errorInfo);
  }
};

export const logWarn = (message, context = {}) => {
  if (!shouldLog(LOG_LEVELS.WARN)) return;
  
  console.warn('🟡 Auth Warning:', {
    message,
    timestamp: new Date().toISOString(),
    context
  });
};

export const logInfo = (message, context = {}) => {
  if (!shouldLog(LOG_LEVELS.INFO)) return;
  
  console.info('🔵 Auth Info:', {
    message,
    timestamp: new Date().toISOString(),
    context
  });
};

export const logDebug = (message, context = {}) => {
  if (!shouldLog(LOG_LEVELS.DEBUG)) return;
  
  console.debug('⚪ Auth Debug:', {
    message,
    timestamp: new Date().toISOString(),
    context
  });
};