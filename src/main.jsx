import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeFirestore } from './firebase/initFirestore'

// Initialize Firestore collections
initializeFirestore()
  .then(() => console.log('Firestore initialization completed'))
  .catch(err => console.error('Firestore initialization failed:', err));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
