import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaSpinner } from 'react-icons/fa';
import EmailPasswordForm from '../components/EmailPasswordForm';
import '../styles/AuthPages.css';

const LoginPage = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const { loginWithGoogle, loginWithEmail, error, clearError, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleGoogleSignIn = async () => {
    if (googleLoading || emailLoading) return;

    try {
      setGoogleLoading(true);
      await loginWithGoogle();
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error) {
      // Error handling is done in AuthContext
      // Only handle non-cancelled errors here
      if (error.message !== 'cancelled') {
        // Error is already set in AuthContext
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (credentials) => {
    if (googleLoading || emailLoading) return;

    try {
      setEmailLoading(true);
      await loginWithEmail(credentials);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (error) {
      // Error handling is done in AuthContext
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <div className="auth-options">
          {/* Email/Password Sign In */}
          <EmailPasswordForm
            mode="login"
            onSubmit={handleEmailSignIn}
            loading={emailLoading}
            error={error}
          />

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="auth-button google-button"
            disabled={googleLoading || emailLoading}
            aria-label="Sign in with Google"
          >
            {googleLoading ? <FaSpinner className="spinner" /> : <FaGoogle />}
            {googleLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 

