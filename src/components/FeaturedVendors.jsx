import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/FeaturedVendors.css';
import { FaCamera, FaVideo } from 'react-icons/fa';

const FeaturedVendors = ({ vendors }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Photography', 'Videography'];
  
  const filteredVendors = activeCategory === 'All' 
    ? vendors 
    : vendors.filter(vendor => vendor.category === activeCategory);

  return (
    <section className="featured-vendors">
      <div className="section-header">
        <h2>Featured Vendors</h2>
        <p>Discover our top-rated photography and videography professionals</p>
      </div>
      
      <div className="category-filter">
        {categories.map(category => (
          <button 
            key={category} 
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'Photography' && <span className="category-icon"><FaCamera /></span>}
            {category === 'Videography' && <span className="category-icon"><FaVideo /></span>}
            {category === 'All' && <span className="category-icon">👥</span>}
            {category}
          </button>
        ))}
      </div>
      
      <motion.div 
        className="vendors-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor, index) => (
            <motion.div 
              key={vendor.id}
              className="vendor-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="vendor-image">
                <img src={vendor.image} alt={vendor.name} />
                <div className="vendor-overlay">
                  <Link to={`/vendor/${vendor.id}`} className="overlay-btn">
                    View Profile
                  </Link>
                </div>
              </div>
              <div className="vendor-info">
                <h3>{vendor.name}</h3>
                <div className="vendor-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < vendor.rating ? 'star filled' : 'star'}>★</span>
                  ))}
                  <span className="rating-count">({vendor.reviewCount})</span>
                </div>
                <p className="vendor-location">{vendor.city}</p>
                <div className="vendor-services">
                  {vendor.specialties && vendor.specialties.map((specialty, idx) => (
                    <span key={idx} className="service-tag">{specialty}</span>
                  ))}
                </div>
                <Link to={`/vendor/${vendor.id}`} className="view-profile-btn">
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-vendors">
            <p>No vendors found in this category.</p>
          </div>
        )}
      </motion.div>
      
      <div className="view-all-container">
        <Link to={`/services${activeCategory !== 'All' ? `?category=${activeCategory}` : ''}`} className="view-all-btn">
          View All {activeCategory !== 'All' ? activeCategory : 'Vendors'}
        </Link>
      </div>
    </section>
  );
};

export default FeaturedVendors; 