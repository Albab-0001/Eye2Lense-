import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column main-column">
          <h3>i2lense</h3>
          <p>
            Connecting you with the best photography and videography professionals.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">TW</a>
          </div>
        </div>
        
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services/photography">Photography</Link></li>
            <li><Link to="/services/videography">Videography</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h4>Contact</h4>
          <ul className="contact-info">
            <li>
              <i className="footer-icon">✉️</i>
              <span>contact@i2lense.com</span>
            </li>
            <li>
              <i className="footer-icon">📞</i>
              <span>+1 (555) 123-4567</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} i2lense. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 