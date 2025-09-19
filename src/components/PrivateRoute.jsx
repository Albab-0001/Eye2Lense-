import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRole = null }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="auth-loading">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // If role is required and user doesn't have it, redirect to unauthorized
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  // If authenticated and has required role (if any), render the protected component
  return children;
};

export default PrivateRoute; 