import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaSpinner, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const EmailPasswordForm = ({ 
  mode = 'login', // 'login' or 'register'
  onSubmit,
  loading = false,
  error = ''
}) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const isRegister = mode === 'register';

  const validateForm = () => {
    const errors = {};

    // Name validation (only for register)
    if (isRegister && !formData.displayName.trim()) {
      errors.displayName = 'Name is required';
    } else if (isRegister && formData.displayName.trim().length < 2) {
      errors.displayName = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation (only for register)
    if (isRegister) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Prepare data for submission
    const submitData = {
      email: formData.email.trim(),
      password: formData.password
    };

    if (isRegister) {
      submitData.displayName = formData.displayName.trim();
    }

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="email-password-form">
      {/* Name field (only for register) */}
      {isRegister && (
        <div className="form-group">
          <label htmlFor="displayName" className="form-label">
            <FaUser className="form-icon" />
            Full Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            className={`form-input ${validationErrors.displayName ? 'error' : ''}`}
            placeholder="Enter your full name"
            disabled={loading}
          />
          {validationErrors.displayName && (
            <span className="error-message">{validationErrors.displayName}</span>
          )}
        </div>
      )}

      {/* Email field */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          <FaEnvelope className="form-icon" />
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`form-input ${validationErrors.email ? 'error' : ''}`}
          placeholder="Enter your email address"
          disabled={loading}
        />
        {validationErrors.email && (
          <span className="error-message">{validationErrors.email}</span>
        )}
      </div>

      {/* Password field */}
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          <FaLock className="form-icon" />
          Password
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input ${validationErrors.password ? 'error' : ''}`}
            placeholder="Enter your password"
            disabled={loading}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {validationErrors.password && (
          <span className="error-message">{validationErrors.password}</span>
        )}
      </div>

      {/* Confirm Password field (only for register) */}
      {isRegister && (
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            <FaLock className="form-icon" />
            Confirm Password
          </label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              disabled={loading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {validationErrors.confirmPassword && (
            <span className="error-message">{validationErrors.confirmPassword}</span>
          )}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="auth-button email-button"
        disabled={loading}
      >
        {loading ? (
          <>
            <FaSpinner className="spinner" />
            {isRegister ? 'Creating Account...' : 'Signing In...'}
          </>
        ) : (
          <>
            {isRegister ? 'Create Account' : 'Sign In'}
          </>
        )}
      </button>

      {/* Error display */}
      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};

export default EmailPasswordForm;
