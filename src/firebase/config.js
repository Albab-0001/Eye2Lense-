import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { logError, logInfo } from '../utils/logger';

// Environment-specific configuration
const getFirebaseConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isLocalhost = window.location.hostname === 'localhost';
  
  // Base configuration
  const baseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    ...(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID && {
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    })
  };

  // Log current domain for debugging
  logInfo('Current domain:', window.location.hostname);
  logInfo('Environment:', process.env.NODE_ENV);
  
  return baseConfig;
};

const firebaseConfig = getFirebaseConfig();

// Validate required config
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  const error = new Error(`Missing Firebase configuration: ${missingKeys.join(', ')}`);
  logError('Firebase configuration error', error);
  throw error;
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  logInfo('Firebase initialized successfully');
} catch (error) {
  logError('Firebase initialization failed', error);
  throw error;
}

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Disable emulators for now to avoid connection issues
// Connect to emulators in development (with silent error handling)
// Commented out to fix HTTP/2 400 errors
/*
if (process.env.NODE_ENV === 'development') {
  try {
    // Check if emulators are already connected
    if (!auth._delegate._config?.emulator) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      logInfo('Connected to Auth emulator');
    }

    if (!db._delegate._databaseId?.projectId?.includes('demo-')) {
      connectFirestoreEmulator(db, 'localhost', 8080);
      logInfo('Connected to Firestore emulator');
    }
  } catch (error) {
    // Silently handle emulator connection errors
    if (process.env.NODE_ENV === 'development') {
      logInfo('Emulators not available or already connected');
    }
  }
}
*/

logInfo('Firebase services initialized without emulators');

export default app; 


