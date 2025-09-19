import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import EmailPasswordForm from '../components/EmailPasswordForm';
import '../styles/AuthPages.css';

const SignupPage = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const { loginWithGoogle, registerWithEmail, error, clearError, currentUser } = useAuth();
  const navigate = useNavigate();

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

  const handleGoogleSignup = async () => {
    if (googleLoading || emailLoading) return;

    try {
      setGoogleLoading(true);
      await loginWithGoogle();
      navigate('/', { replace: true });
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

  const handleEmailSignup = async (userData) => {
    if (googleLoading || emailLoading) return;

    try {
      setEmailLoading(true);
      await registerWithEmail(userData);
      navigate('/', { replace: true });
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
          <h2>Create Account</h2>
          <p>Join our community today</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <div className="auth-options">
          {/* Email/Password Sign Up */}
          <EmailPasswordForm
            mode="register"
            onSubmit={handleEmailSignup}
            loading={emailLoading}
            error={error}
          />

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignup}
            className="auth-button google-button"
            disabled={googleLoading || emailLoading}
            aria-label="Sign up with Google"
          >
            {googleLoading ? <FaSpinner className="spinner" /> : <FaGoogle />}
            {googleLoading ? 'Creating Account...' : 'Sign up with Google'}
          </button>
        </div>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;


