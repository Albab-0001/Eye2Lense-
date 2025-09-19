import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaWifi, FaWifiSlash } from 'react-icons/fa';
import '../styles/NetworkStatus.css';

const NetworkStatus = () => {
  const { isOnline } = useAuth();

  if (isOnline) return null;

  return (
    <div className="network-status offline">
      <FaWifiSlash />
      <span>You are offline. Some features may be limited.</span>
    </div>
  );
};

export default NetworkStatus;