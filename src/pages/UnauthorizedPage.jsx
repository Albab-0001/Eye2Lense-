import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaHome } from 'react-icons/fa';

const UnauthorizedPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="unauthorized-icon">
          <FaLock size={50} />
        </div>
        <div className="auth-header">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page</p>
        </div>
        
        <div className="unauthorized-message">
          <p>
            If you believe this is an error, please contact the administrator
            or return to the homepage.
          </p>
        </div>
        
        <div className="auth-button-container">
          <Link to="/" className="auth-button primary-button">
            <FaHome style={{ marginRight: '8px' }} /> Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 