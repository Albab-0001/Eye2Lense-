import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { FaUsers, FaChartBar, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaSearch, FaEye } from 'react-icons/fa';
import '../styles/AdminPanel.css';
import mockVendorsOriginal from '../data/mockVendors';

// Admin credentials (in a real app, this would be handled by a secure backend)
const ADMIN_CREDENTIALS = {
  email: 'admin@i2lense.com',
  password: 'password123'
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', error: '' });
  const [vendors, setVendors] = useState([]);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [stats, setStats] = useState({
    totalVendors: 0,
    photographers: 0,
    videographers: 0,
    featured: 0
  });

  // Load vendors from localStorage or mockVendorsOriginal on initial load
  useEffect(() => {
    console.log('Loading vendors from localStorage or original data');
    const savedVendors = localStorage.getItem('vendors');
    if (savedVendors) {
      console.log('Found saved vendors in localStorage');
      setVendors(JSON.parse(savedVendors));
    } else {
      console.log('No saved vendors found, using original data');
      setVendors(mockVendorsOriginal);
      // Initialize localStorage with mock data if empty
      localStorage.setItem('vendors', JSON.stringify(mockVendorsOriginal));
    }
    
    // Check if user is already logged in
    const loggedIn = localStorage.getItem('i2lense_admin_auth');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // For development/debugging: log vendors whenever they change
  useEffect(() => {
    if (vendors.length > 0) {
      console.log('Current vendors state:', vendors);
    }
  }, [vendors]);

  // Update stats whenever vendors change
  useEffect(() => {
    if (vendors.length > 0) {
      setStats({
        totalVendors: vendors.length,
        photographers: vendors.filter(v => v.category === 'photography').length,
        videographers: vendors.filter(v => v.category === 'videography').length,
        featured: vendors.filter(v => v.featured).length
      });
    }
  }, [vendors]);

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
      error: ''
    });
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === ADMIN_CREDENTIALS.email && 
        loginForm.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('i2lense_admin_auth', 'true');
    } else {
      setLoginForm({
        ...loginForm,
        error: 'Invalid email or password'
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('i2lense_admin_auth');
    navigate('/admin');
  };

  // Filter vendors based on search term and category
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Add new vendor
  const addVendor = (vendorData) => {
    console.log('AdminPanel - Adding new vendor:', vendorData);
    
    try {
      // Validate required fields
      if (!vendorData.name || !vendorData.category) {
        console.error('AdminPanel - Missing required vendor fields');
        alert('Error: Vendor must have a name and category');
        return;
      }
      
      // Ensure reviews array exists and calculate proper rating/reviewCount
      const reviews = vendorData.reviews || [];
      
      // Generate a unique ID
      const maxId = vendors.length > 0 
        ? Math.max(...vendors.map(v => typeof v.id === 'number' ? v.id : 0)) 
        : 0;
      
      const newVendor = {
        ...vendorData,
        id: maxId + 1,
        rating: vendorData.rating || 0,
        reviewCount: reviews.length,
        reviews: reviews,
        portfolio: vendorData.portfolio || [],
        specialties: vendorData.specialties || [],
        image: vendorData.image || 'https://via.placeholder.com/300x200?text=Vendor+Image'
      };
      
      console.log('AdminPanel - Prepared new vendor with ID:', newVendor.id);
      const updatedVendors = [...vendors, newVendor];
      saveVendors(updatedVendors);
      
      // Show confirmation message
      alert(`Vendor "${newVendor.name}" added successfully with ID ${newVendor.id}`);
      
      setIsModalOpen(false);
    } catch (e) {
      console.error('AdminPanel - Error adding vendor:', e);
      alert('Error adding vendor: ' + e.message);
    }
  };

  // Update existing vendor
  const updateVendor = (vendorData) => {
    // Ensure reviews array exists
    const reviews = vendorData.reviews || [];
    
    // Make sure rating and reviewCount are updated
    const updatedVendorData = {
      ...vendorData,
      reviewCount: reviews.length,
      rating: vendorData.rating || 0
    };
    
    console.log('Updating vendor:', updatedVendorData);
    
    const updatedVendors = vendors.map(vendor => 
      vendor.id === updatedVendorData.id ? updatedVendorData : vendor
    );
    
    saveVendors(updatedVendors);
    setIsModalOpen(false);
  };

  // Delete vendor
  const deleteVendor = (vendorId) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      const updatedVendors = vendors.filter(vendor => vendor.id !== vendorId);
      saveVendors(updatedVendors);
    }
  };

  // Open modal for adding/editing vendor
  const openVendorModal = (vendor = null) => {
    setCurrentVendor(vendor);
    setIsModalOpen(true);
  };

  // Reset to mock data
  const resetToMockData = () => {
    if (window.confirm('This will reset all vendor data to the original mock data. Continue?')) {
      saveVendors(mockVendorsOriginal);
    }
  };

  // Save vendors to localStorage
  const saveVendors = (updatedVendors) => {
    console.log('AdminPanel - Saving vendors to localStorage:', updatedVendors);
    
    try {
      // Ensure we're saving valid data
      if (!Array.isArray(updatedVendors)) {
        console.error('AdminPanel - Invalid vendors data (not an array)');
        alert('Error: Invalid vendors data format');
        return;
      }
      
      localStorage.setItem('vendors', JSON.stringify(updatedVendors));
      
      // Trigger storage event for other pages to detect
      const event = new StorageEvent('storage', {
        key: 'vendors',
        newValue: JSON.stringify(updatedVendors),
        url: window.location.href
      });
      window.dispatchEvent(event);
      
      setVendors(updatedVendors);
      console.log('AdminPanel - Vendors saved successfully. Count:', updatedVendors.length);
      
      // Trigger a timestamp update to force refresh
      localStorage.setItem('vendorsLastUpdated', new Date().toISOString());
    } catch (e) {
      console.error('AdminPanel - Error saving vendors:', e);
      alert('Error saving vendors data: ' + e.message);
    }
  };

  // Force a reload of the vendors data everywhere
  const forceDataRefresh = () => {
    // Get the current vendors from localStorage
    const savedVendors = localStorage.getItem('vendors');
    const currentVendors = savedVendors ? JSON.parse(savedVendors) : [];
    
    // Force a refresh by slightly modifying the data and writing back
    const timestamp = new Date().toISOString();
    
    // Add a timestamp to trigger storage events
    localStorage.setItem('lastRefresh', timestamp);
    
    // Force a re-save of vendors to trigger storage events
    localStorage.setItem('vendors', JSON.stringify(currentVendors));
    
    // Force a storage event by using a different key
    const refreshEvent = new StorageEvent('storage', {
      key: 'vendors',
      newValue: JSON.stringify(currentVendors),
      url: window.location.href
    });
    window.dispatchEvent(refreshEvent);
    
    // Display confirmation
    alert(`Data refreshed at ${timestamp.slice(11, 19)}. Vendor count: ${currentVendors.length}`);
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>Admin Login</h1>
              <p>Please login to access the admin panel</p>
            </div>
            <form onSubmit={handleLogin} className="login-form">
              {loginForm.error && <div className="login-error">{loginForm.error}</div>}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>i2lense Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <FaChartBar /> Dashboard
            </li>
            <li>
              <FaUsers /> Vendors
            </li>
            <li onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <div className="admin-controls">
            <button className="refresh-btn" onClick={forceDataRefresh}>
              Refresh Data
            </button>
            <button className="add-vendor-btn" onClick={() => openVendorModal()}>
              Add New Vendor
            </button>
            <button 
              className="debug-btn" 
              onClick={() => window.open('/debug', '_blank')}
              style={{ 
                background: '#9b59b6',
                marginLeft: '8px',
                padding: '8px 16px', 
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Debug Tool
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Vendors</h3>
            <p>{stats.totalVendors}</p>
          </div>
          <div className="stat-card">
            <h3>Photographers</h3>
            <p>{stats.photographers}</p>
          </div>
          <div className="stat-card">
            <h3>Videographers</h3>
            <p>{stats.videographers}</p>
          </div>
          <div className="stat-card">
            <h3>Featured</h3>
            <p>{stats.featured}</p>
          </div>
        </div>

        {/* Vendor Filters */}
        <div className="vendor-filters">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            <button 
              className={filterCategory === 'all' ? 'active' : ''} 
              onClick={() => setFilterCategory('all')}
            >
              All
            </button>
            <button 
              className={filterCategory === 'photography' ? 'active' : ''} 
              onClick={() => setFilterCategory('photography')}
            >
              Photography
            </button>
            <button 
              className={filterCategory === 'videography' ? 'active' : ''} 
              onClick={() => setFilterCategory('videography')}
            >
              Videography
            </button>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="vendors-table-container">
          <table className="vendors-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>City</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map(vendor => (
                <tr key={vendor.id}>
                  <td>{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.category}</td>
                  <td>{vendor.city}</td>
                  <td>${vendor.price}</td>
                  <td>{vendor.rating} ★ ({vendor.reviewCount})</td>
                  <td>{vendor.featured ? 'Yes' : 'No'}</td>
                  <td className="action-buttons">
                    <button 
                      className="view-btn" 
                      title="View Vendor"
                      onClick={() => window.open(`/services/vendor/${vendor.id}`, '_blank')}
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="edit-btn" 
                      title="Edit Vendor"
                      onClick={() => openVendorModal(vendor)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-btn" 
                      title="Delete Vendor"
                      onClick={() => deleteVendor(vendor.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan="8" className="no-results">No vendors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Modal */}
      {isModalOpen && (
        <VendorModal 
          vendor={currentVendor} 
          onClose={() => setIsModalOpen(false)} 
          onSave={currentVendor ? updateVendor : addVendor}
        />
      )}
    </div>
  );
};

// Vendor Modal Component
const VendorModal = ({ vendor, onClose, onSave }) => {
  const initialFormData = vendor ? { 
    ...vendor,
    // Ensure all required properties exist
    portfolio: vendor.portfolio || [],
    reviews: vendor.reviews || [],
    contactInfo: vendor.contactInfo || {
      email: '',
      phone: '',
      instagram: '',
      facebook: '',
      twitter: '',
      website: ''
    }
  } : {
    name: '',
    category: 'photography',
    image: '',
    city: '',
    price: '',
    specialties: [],
    featured: false,
    description: '',
    portfolio: [],
    contactInfo: {
      email: '',
      phone: '',
      instagram: '',
      facebook: '',
      twitter: '',
      website: ''
    },
    reviews: [],
    rating: 0,
    reviewCount: 0
  };

  const [formData, setFormData] = useState(initialFormData);
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [portfolioInput, setPortfolioInput] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState({});
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contactInfo: {
        ...formData.contactInfo,
        [name]: value
      }
    });
  };

  const handleSpecialtyAdd = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyInput.trim()]
      });
      setSpecialtyInput('');
    }
  };

  const handleSpecialtyRemove = (specialty) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter(s => s !== specialty)
    });
  };

  const handlePortfolioAdd = () => {
    if (portfolioInput.trim()) {
      setFormData({
        ...formData,
        portfolio: [...(formData.portfolio || []), portfolioInput.trim()]
      });
      setPortfolioInput('');
    }
  };

  const handlePortfolioRemove = (index) => {
    const updatedPortfolio = [...formData.portfolio];
    updatedPortfolio.splice(index, 1);
    setFormData({
      ...formData,
      portfolio: updatedPortfolio
    });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: name === 'rating' ? Number(value) : value
    });
  };

  const handleAddReview = () => {
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in all review fields');
      return;
    }

    const newReview = {
      id: Date.now(), // Use timestamp as a simple ID
      ...reviewForm
    };

    setFormData({
      ...formData,
      reviews: [...(formData.reviews || []), newReview],
      reviewCount: (formData.reviews || []).length + 1,
      rating: calculateAverageRating([...(formData.reviews || []), newReview])
    });

    // Reset the form
    setReviewForm({
      name: '',
      rating: 5,
      comment: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = (formData.reviews || []).filter(review => review.id !== reviewId);
    
    setFormData({
      ...formData,
      reviews: updatedReviews,
      reviewCount: updatedReviews.length,
      rating: calculateAverageRating(updatedReviews)
    });
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required';
    if (!formData.city.trim()) formErrors.city = 'City is required';
    if (!formData.price) formErrors.price = 'Price is required';
    if (isNaN(Number(formData.price))) formErrors.price = 'Price must be a number';
    if (!formData.image.trim()) formErrors.image = 'Image URL is required';
    if (!formData.description.trim()) formErrors.description = 'Description is required';
    if (formData.specialties.length === 0) formErrors.specialties = 'At least one specialty is required';
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert price to number and ensure review data is included
      const vendorData = {
        ...formData,
        price: Number(formData.price),
        rating: formData.rating || 0,
        reviewCount: formData.reviews?.length || 0
      };
      onSave(vendorData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="vendor-modal">
        <div className="modal-header">
          <h2>{vendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-tabs">
          <button 
            className={`modal-tab ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button 
            className={`modal-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={`modal-tab ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Info
          </button>
          <button 
            className={`modal-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="vendor-form">
          {activeTab === 'basic' && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="photography">Photography</option>
                    <option value="videography">Videography</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Price ($/hr) *</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={errors.price ? 'error' : ''}
                  />
                  {errors.price && <div className="error-message">{errors.price}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="image">Profile Image URL *</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className={errors.image ? 'error' : ''}
                  />
                  {errors.image && <div className="error-message">{errors.image}</div>}
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    Featured Vendor
                  </label>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Specialties *</label>
                <div className="specialty-input-group">
                  <input
                    type="text"
                    value={specialtyInput}
                    onChange={(e) => setSpecialtyInput(e.target.value)}
                    placeholder="Add a specialty..."
                    className={errors.specialties ? 'error' : ''}
                  />
                  <button type="button" onClick={handleSpecialtyAdd}>Add</button>
                </div>
                {errors.specialties && <div className="error-message">{errors.specialties}</div>}
                <div className="specialty-tags">
                  {formData.specialties.map((specialty, index) => (
                    <div key={index} className="specialty-tag-item">
                      {specialty}
                      <button type="button" onClick={() => handleSpecialtyRemove(specialty)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={errors.description ? 'error' : ''}
                ></textarea>
                {errors.description && <div className="error-message">{errors.description}</div>}
              </div>
            </>
          )}
          
          {activeTab === 'portfolio' && (
            <div className="portfolio-section">
              <h3>Portfolio Images</h3>
              <p className="section-description">Add image URLs to showcase the vendor's work</p>
              
              <div className="form-group">
                <label>Add Portfolio Image URL</label>
                <div className="specialty-input-group">
                  <input
                    type="text"
                    value={portfolioInput}
                    onChange={(e) => setPortfolioInput(e.target.value)}
                    placeholder="Enter image URL..."
                  />
                  <button type="button" onClick={handlePortfolioAdd}>Add</button>
                </div>
              </div>
              
              <div className="portfolio-preview">
                {formData.portfolio && formData.portfolio.length > 0 ? (
                  formData.portfolio.map((url, index) => (
                    <div key={index} className="portfolio-preview-item">
                      <img src={url} alt={`Portfolio ${index + 1}`} />
                      <button 
                        type="button" 
                        className="remove-portfolio-btn"
                        onClick={() => handlePortfolioRemove(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-portfolio">
                    No portfolio images added yet. Add some to showcase the vendor's work.
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'contact' && (
            <div className="contact-section">
              <h3>Contact Information</h3>
              <p className="section-description">Add contact details for this vendor</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.contactInfo?.email || ''}
                    onChange={handleContactChange}
                    placeholder="vendor@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.contactInfo?.phone || ''}
                    onChange={handleContactChange}
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.contactInfo?.website || ''}
                    onChange={handleContactChange}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="instagram">Instagram</label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.contactInfo?.instagram || ''}
                    onChange={handleContactChange}
                    placeholder="@username"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="facebook">Facebook</label>
                  <input
                    type="text"
                    id="facebook"
                    name="facebook"
                    value={formData.contactInfo?.facebook || ''}
                    onChange={handleContactChange}
                    placeholder="https://facebook.com/page"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="twitter">Twitter</label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.contactInfo?.twitter || ''}
                    onChange={handleContactChange}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <h3>Manage Reviews</h3>
              <p className="section-description">Add and manage client reviews for this vendor</p>
              
              <div className="reviews-summary">
                <div className="rating-summary">
                  <h4>Average Rating</h4>
                  <div className="average-rating">
                    <span className="rating-number">{formData.rating || 0}</span>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          className={`star ${star <= Math.round(formData.rating || 0) ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="review-count">
                    Based on {formData.reviews?.length || 0} reviews
                  </div>
                </div>
              </div>
              
              <div className="add-review-form">
                <h4>Add New Review</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="reviewName">Reviewer Name</label>
                    <input
                      type="text"
                      id="reviewName"
                      name="name"
                      value={reviewForm.name}
                      onChange={handleReviewChange}
                      placeholder="Client name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="reviewRating">Rating</label>
                    <select
                      id="reviewRating"
                      name="rating"
                      value={reviewForm.rating}
                      onChange={handleReviewChange}
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="reviewDate">Review Date</label>
                    <input
                      type="date"
                      id="reviewDate"
                      name="date"
                      value={reviewForm.date}
                      onChange={handleReviewChange}
                    />
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="reviewComment">Comment</label>
                  <textarea
                    id="reviewComment"
                    name="comment"
                    rows="3"
                    value={reviewForm.comment}
                    onChange={handleReviewChange}
                    placeholder="Client's feedback about the service"
                  ></textarea>
                </div>
                
                <button 
                  type="button" 
                  className="add-review-btn"
                  onClick={handleAddReview}
                >
                  Add Review
                </button>
              </div>
              
              <div className="reviews-list">
                <h4>Existing Reviews ({formData.reviews?.length || 0})</h4>
                {formData.reviews && formData.reviews.length > 0 ? (
                  <div className="reviews-grid">
                    {formData.reviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <div className="reviewer-name">{review.name}</div>
                          <div className="review-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span 
                                key={star} 
                                className={`star ${star <= review.rating ? 'filled' : ''}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="review-date">{review.date}</div>
                        <div className="review-comment">{review.comment}</div>
                        <button 
                          type="button" 
                          className="delete-review-btn"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-reviews">
                    No reviews available. Add some reviews to showcase this vendor's work.
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Vendor</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel; 