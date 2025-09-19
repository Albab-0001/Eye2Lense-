import React, { useState } from 'react';
import { testFirebaseConnection } from '../firebase/testConnection';

const TestFirebasePage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const testResult = await testFirebaseConnection();
      setResult(testResult);
      if (!testResult.success) {
        setError(testResult.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Firebase Connection Test</h1>
      <p>This page tests your connection to Firebase by:</p>
      <ol>
        <li>Reading from the vendors collection</li>
        <li>Creating a test vendor document</li>
        <li>Creating a test review document</li>
      </ol>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runTest}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Testing...' : 'Run Firebase Test'}
        </button>
      </div>
      
      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          color: '#d32f2f',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: result.success ? '#e8f5e9' : '#ffebee', 
          color: result.success ? '#2e7d32' : '#d32f2f',
          borderRadius: '4px'
        }}>
          <h3>Test Result</h3>
          <p><strong>Status:</strong> {result.success ? 'Success' : 'Failed'}</p>
          <p><strong>Message:</strong> {result.message}</p>
          {result.success && (
            <>
              <p><strong>Test Vendor ID:</strong> {result.vendorId}</p>
              <p><strong>Test Review ID:</strong> {result.reviewId}</p>
            </>
          )}
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <h2>Troubleshooting Tips</h2>
        <ul>
          <li>Make sure you have a stable internet connection</li>
          <li>Check if your Firebase project is properly set up</li>
          <li>Verify that your Firebase configuration in <code>firebase/config.js</code> is correct</li>
          <li>Check if you have the necessary permissions to read/write to Firestore</li>
          <li>Look at the browser console for more detailed error messages</li>
        </ul>
      </div>
    </div>
  );
};

export default TestFirebasePage; 