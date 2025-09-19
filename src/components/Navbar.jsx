import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (showDropdown) {
      setShowDropdown(false);
    }
    if (showUserDropdown) {
      setShowUserDropdown(false);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const closeUserDropdown = () => {
    setShowUserDropdown(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowDropdown(false);
    setShowUserDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMobileMenu();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/" onClick={closeMobileMenu}>
          <div className="logo-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <span>Eye2Lense</span>
          </div>
        </Link>
      </div>
      
      <div className="nav-container">
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMobileMenu}>About Us</Link>
          </li>
          <li className="dropdown" ref={dropdownRef}>
            <span 
              onClick={toggleDropdown} 
              className="dropdown-toggle"
            >
              Services <i className={`arrow ${showDropdown ? 'up' : 'down'}`}></i>
            </span>
            {(showDropdown || mobileMenuOpen) && (
              <ul className={`dropdown-menu ${showDropdown ? 'active' : ''}`}>
                <li>
                  <Link 
                    to="/services/photography" 
                    onClick={closeMobileMenu}
                  >
                    Photography
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/videography" 
                    onClick={closeMobileMenu}
                  >
                    Videography
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/apply-as-vendor" onClick={closeMobileMenu}>Apply as Vendor</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link>
          </li>
          
          {!currentUser ? (
            <div className="auth-buttons">
              <Link to="/login" onClick={closeMobileMenu} className="login-btn">Login</Link>
            </div>
          ) : (
            <li className="user-dropdown" ref={userDropdownRef}>
              <div 
                onClick={toggleUserDropdown}
                className="user-dropdown-toggle"
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" className="user-avatar" />
                ) : (
                  <div className="user-avatar-placeholder">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <span className="user-name">{currentUser.displayName || 'User'}</span>
                <i className={`arrow ${showUserDropdown ? 'up' : 'down'}`}></i>
              </div>
              {(showUserDropdown || mobileMenuOpen) && (
                <ul className={`dropdown-menu user-menu ${showUserDropdown ? 'active' : ''}`}>
                  <li>
                    <Link to="/profile" onClick={closeMobileMenu}>
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
      
      <div 
        className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar; 