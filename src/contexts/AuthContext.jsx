import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { logError, logInfo } from '../utils/logger';
import { authAPI } from '../services/api';


const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Centralized error mapping with user-friendly messages
const FIREBASE_ERROR_MESSAGES = {
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/cancelled-popup-request': 'Another sign-in attempt is in progress.',
  'auth/popup-blocked': 'Sign-in popup was blocked. Please allow popups for this site.',
  'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method.',
  'auth/network-request-failed': 'Network error. Please check your internet connection.',
  'auth/too-many-requests': 'Too many unsuccessful attempts. Please try again later.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/weak-password': 'Password is too weak.',
  'auth/requires-recent-login': 'Please sign in again to complete this action.',
  'auth/user-token-expired': 'Your session has expired. Please sign in again.',
  'auth/web-storage-unsupported': 'This browser is not supported or cookies are disabled.',
  'auth/unauthorized-domain': 'This domain is not authorized for OAuth operations.'
};

// Silent errors that shouldn't be logged or shown to user
const SILENT_ERRORS = [
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request'
];

const getFirebaseErrorMessage = (error) => {
  if (!navigator.onLine) {
    return 'You are offline. Please check your internet connection.';
  }
  
  const errorCode = error?.code;
  return FIREBASE_ERROR_MESSAGES[errorCode] || 'An unexpected error occurred. Please try again.';
};

const shouldLogError = (error) => {
  return !SILENT_ERRORS.includes(error?.code);
};

const shouldShowError = (error) => {
  return !SILENT_ERRORS.includes(error?.code);
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authMethod, setAuthMethod] = useState(null); // 'firebase' or 'jwt'

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const createUserDocument = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        const userData = {
          displayName: user.displayName || '',
          email: user.email,
          photoURL: user.photoURL || '',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        logInfo('User document created', { uid: user.uid });
        return userData;
      }
      
      return userDoc.data();
    } catch (error) {
      logError('Error creating user document', error, { uid: user.uid });
      return null;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const userCredential = await signInWithPopup(auth, provider);
      await createUserDocument(userCredential.user);
      setAuthMethod('firebase');

      logInfo('Google login successful', { uid: userCredential.user.uid });
      return { success: true };
    } catch (error) {
      if (shouldLogError(error)) {
        logError('Google login failed', error);
      }

      if (shouldShowError(error)) {
        const errorMessage = getFirebaseErrorMessage(error);
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      // Silent error (user cancelled)
      throw new Error('cancelled');
    }
  };

  const loginWithEmail = async (credentials) => {
    try {
      setError('');
      const response = await authAPI.login(credentials);

      if (response.success && response.user) {
        setCurrentUser(response.user);
        setAuthMethod('jwt');
        logInfo('Email login successful', { email: credentials.email });
        return { success: true };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      const errorMessage = error.error || error.message || 'Login failed';
      setError(errorMessage);
      logError('Email login failed', error);
      throw new Error(errorMessage);
    }
  };

  const registerWithEmail = async (userData) => {
    try {
      setError('');
      const response = await authAPI.register(userData);

      if (response.success && response.user) {
        setCurrentUser(response.user);
        setAuthMethod('jwt');
        logInfo('Email registration successful', { email: userData.email });
        return { success: true };
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      const errorMessage = error.error || error.message || 'Registration failed';
      setError(errorMessage);
      logError('Email registration failed', error);
      throw new Error(errorMessage);
    }
  };



  const logout = async () => {
    try {
      setError('');

      // Handle logout based on authentication method
      if (authMethod === 'firebase') {
        await signOut(auth);
      } else if (authMethod === 'jwt') {
        await authAPI.logout();
      }

      setCurrentUser(null);
      setAuthMethod(null);
      logInfo('User logged out successfully');
      return { success: true };
    } catch (error) {
      logError('Logout failed', error);
      setError('Failed to log out');
      throw error;
    }
  };

  const updateUserProfile = async (userData) => {
    if (!currentUser) {
      throw new Error('No user is logged in');
    }

    try {
      const updates = { updatedAt: new Date() };
      
      // Update Firebase Auth profile
      if (userData.displayName || userData.photoURL) {
        await updateProfile(currentUser, {
          displayName: userData.displayName || currentUser.displayName,
          photoURL: userData.photoURL || currentUser.photoURL
        });
      }

      // Prepare Firestore updates
      Object.keys(userData).forEach(key => {
        if (userData[key] !== undefined && userData[key] !== '') {
          updates[key] = userData[key];
        }
      });

      // Update Firestore document
      await updateDoc(doc(db, 'users', currentUser.uid), updates);

      // Update local state
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setCurrentUser(prev => ({
          ...prev,
          ...userDoc.data(),
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        }));
      }

      logInfo('User profile updated', { uid: currentUser.uid });
      return { success: true };
    } catch (error) {
      logError('Profile update failed', error, { uid: currentUser.uid });
      const errorMessage = getFirebaseErrorMessage(error);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    let unsubscribe;

    const initializeAuth = async () => {
      try {
        // Check for JWT authentication first
        const jwtAuth = await authAPI.checkAuth();
        if (jwtAuth.isAuthenticated) {
          setCurrentUser(jwtAuth.user);
          setAuthMethod('jwt');
          setLoading(false);
          return;
        }
      } catch (error) {
        // Don't log 401 errors as they're expected when not authenticated
        if (error.response?.status !== 401) {
          logError('JWT auth check failed', error);
        }
        // Clear any invalid tokens
        localStorage.removeItem('token');
      }

      // Set up Firebase auth listener
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            const userData = await createUserDocument(user);
            setCurrentUser({
              ...user,
              ...(userData || {}),
              role: userData?.role || 'user'
            });
            setAuthMethod('firebase');
            logInfo('Firebase auth state changed - user logged in', { uid: user.uid });
          } else {
            // Only clear user if not authenticated via JWT
            if (authMethod !== 'jwt') {
              setCurrentUser(null);
              setAuthMethod(null);
            }
            logInfo('Firebase auth state changed - user logged out');
          }
        } catch (error) {
          logError('Firebase auth state change error', error);
          // Fallback to basic user object
          setCurrentUser(user ? { ...user, role: 'user' } : null);
          setAuthMethod(user ? 'firebase' : null);
        } finally {
          setLoading(false);
        }
      });
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    authMethod,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
    updateUserProfile,
    clearError: () => setError('')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 

