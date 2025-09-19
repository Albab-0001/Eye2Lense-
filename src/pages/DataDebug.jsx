import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockVendorsOriginal } from '../data/mockVendors';

const DataDebug = () => {
  const [localStorageVendors, setLocalStorageVendors] = useState([]);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toISOString());

  // Load vendors from localStorage
  useEffect(() => {
    loadVendors();
  }, []);

  // Function to reload vendors from localStorage
  const loadVendors = () => {
    const savedVendors = localStorage.getItem('vendors');
    if (savedVendors) {
      try {
        setLocalStorageVendors(JSON.parse(savedVendors));
      } catch (e) {
        console.error('Error parsing vendors from localStorage:', e);
        setLocalStorageVendors([]);
      }
    } else {
      setLocalStorageVendors([]);
    }
    setLastRefreshed(new Date().toISOString());
  };

  // Reset localStorage vendors to original mock data
  const resetToOriginal = () => {
    localStorage.setItem('vendors', JSON.stringify(mockVendorsOriginal));
    loadVendors();
    alert('Vendors reset to original data');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Data Debug Tool</h1>
      <p>Last refreshed: {lastRefreshed}</p>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={loadVendors}>Refresh Data</button>
        <button onClick={resetToOriginal}>Reset to Original</button>
        <Link to="/services/photography">Go to Services</Link>
        <Link to="/admin">Go to Admin</Link>
      </div>
      
      <h2>LocalStorage Vendors ({localStorageVendors.length})</h2>
      <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
        {localStorageVendors.map(vendor => (
          <div key={vendor.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee' }}>
            <h3>{vendor.name} (ID: {vendor.id})</h3>
            <p>Category: {vendor.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataDebug; 