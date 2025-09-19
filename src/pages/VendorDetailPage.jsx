import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaStar, FaMapMarkerAlt, FaDollarSign, FaTags, FaArrowLeft, 
  FaPhone, FaEnvelope, FaGlobe, FaInstagram, FaFacebookF, FaTwitter, 
  FaQuoteLeft, FaQuoteRight, FaCamera, FaVideo, FaCheckCircle, FaCalendarAlt
} from 'react-icons/fa';
import mockVendorsOriginal from '../data/mockVendors';
import '../styles/VendorDetails.css';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedVendors, setRelatedVendors] = useState([]);
  const [activeTab, setActiveTab] = useState('about');

  // Get mock vendors from localStorage or fallback to original data
  const getMockVendors = () => {
    const savedVendors = localStorage.getItem('vendors');
    console.log('VendorDetails - Loading vendors from localStorage:', savedVendors ? 'Found data' : 'No data found');
    
    if (savedVendors) {
      try {
        const parsed = JSON.parse(savedVendors);
        console.log(`VendorDetails - Parsed ${parsed.length} vendors from localStorage`);
        return parsed;
      } catch (e) {
        console.error('VendorDetails - Error parsing localStorage vendors:', e);
        return mockVendorsOriginal;
      }
    }
    
    return mockVendorsOriginal;
  };

  // Initial data loading
  useEffect(() => {
    console.log('VendorDetails - Initial loading for vendor ID:', id);
    setLoading(true);
    const mockVendors = getMockVendors();
    
    const foundVendor = mockVendors.find(v => v.id.toString() === id);
    
    if (foundVendor) {
      console.log('VendorDetails - Found vendor:', foundVendor.name);
      setVendor(foundVendor);
      
      // Find related vendors (same category, excluding current vendor)
      const related = mockVendors
        .filter(v => v.category === foundVendor.category && v.id !== foundVendor.id)
        .slice(0, 4);
      
      setRelatedVendors(related);
    } else {
      console.log('VendorDetails - Vendor not found for ID:', id);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(false);
  }, [id]);

  // Effect to reload when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('VendorDetails - localStorage changed, reloading vendor data');
      setLoading(true);
      const mockVendors = getMockVendors();
      
      const foundVendor = mockVendors.find(v => v.id.toString() === id);
      
      if (foundVendor) {
        setVendor(foundVendor);
        
        // Find related vendors (same category, excluding current vendor)
        const related = mockVendors
          .filter(v => v.category === foundVendor.category && v.id !== foundVendor.id)
          .slice(0, 4);
        
        setRelatedVendors(related);
      }
      
      setLoading(false);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading vendor details...</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="vendor-not-found">
        <h2>Vendor Not Found</h2>
        <p>Sorry, the vendor you're looking for doesn't exist.</p>
        <Link to="/services" className="back-button">
          <FaArrowLeft /> Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className={`vendor-details-page ${vendor.category}-page`}>
      {/* Hero Section */}
      <section className="vendor-hero-section">
        <div className="vendor-hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="vendor-hero-content"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Link to={`/services/${vendor.category}`} className="back-button">
              <FaArrowLeft /> Back to {vendor.category === 'photography' ? 'Photography' : 'Videography'} Services
            </Link>
            <h1>{vendor.name}</h1>
            <div className="vendor-hero-meta">
              <span className="vendor-category">
                {vendor.category === 'photography' ? <FaCamera /> : <FaVideo />}
                {vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)}
              </span>
              <span className="vendor-location">
                <FaMapMarkerAlt />
                {vendor.city}
              </span>
              <span className="vendor-rating">
                <FaStar />
                {vendor.rating.toFixed(1)}
                <span className="review-count">({vendor.reviewCount} reviews)</span>
              </span>
            </div>
            {vendor.featured && (
              <div className="featured-badge">
                <FaCheckCircle /> Featured Professional
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="vendor-details-container">
        {/* Navigation Tabs */}
        <div className="vendor-tabs">
          <button 
            className={`vendor-tab ${activeTab === 'about' ? 'active' : ''}`} 
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button 
            className={`vendor-tab ${activeTab === 'portfolio' ? 'active' : ''}`} 
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={`vendor-tab ${activeTab === 'reviews' ? 'active' : ''}`} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`vendor-tab ${activeTab === 'contact' ? 'active' : ''}`} 
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </div>

        <motion.div 
          className="vendor-content"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* About Section */}
          {activeTab === 'about' && (
            <motion.section 
              className="vendor-section vendor-about-section"
              variants={staggerContainer}
            >
              <div className="vendor-profile-header">
                <div className="vendor-image-container">
                  <img src={vendor.image} alt={vendor.name} className="vendor-profile-image" />
                </div>
                <div className="vendor-header-info">
                  <motion.h2 variants={itemVariant}>About {vendor.name}</motion.h2>
                  <motion.div variants={itemVariant} className="vendor-price-badge">
                    <FaDollarSign /> ${vendor.price}/hr
                  </motion.div>
                  <motion.div variants={itemVariant} className="vendor-specialties">
                    <h3>Specialties</h3>
                    <div className="specialty-tags">
                      {vendor.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div variants={itemVariant} className="vendor-description">
                <p>{vendor.description}</p>
              </motion.div>
              
              <motion.div variants={itemVariant} className="vendor-extended-description">
                <p>
                  {vendor.name} is a professional {vendor.category === 'photography' ? 'photographer' : 'videographer'} based in {vendor.city} with experience in {vendor.specialties.join(', ')}.
                  {vendor.featured && " They are one of our featured professionals, known for exceptional quality and client satisfaction."}
                </p>
                <p>
                  With a rating of {vendor.rating}/5 from {vendor.reviewCount} clients, you can be confident in their ability to capture your special moments.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariant} className="booking-cta">
                <h3>Ready to Book?</h3>
                <p>Contact {vendor.name} to discuss your project and check availability.</p>
                <button className="contact-button">
                  <FaCalendarAlt /> Book Now
                </button>
              </motion.div>
            </motion.section>
          )}

          {/* Portfolio Section */}
          {activeTab === 'portfolio' && (
            <motion.section 
              className="vendor-section vendor-portfolio-section"
              variants={staggerContainer}
            >
              <motion.h2 variants={itemVariant}>Portfolio</motion.h2>
              
              {vendor.portfolio && vendor.portfolio.length > 0 ? (
                <motion.div 
                  variants={itemVariant}
                  className="portfolio-gallery"
                >
                  {vendor.portfolio.map((image, index) => (
                    <motion.div 
                      key={index}
                      className="portfolio-item"
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <img src={image} alt={`${vendor.name} portfolio ${index + 1}`} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={itemVariant} className="no-portfolio">
                  <p>No portfolio images available yet.</p>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* Reviews Section */}
          {activeTab === 'reviews' && (
            <motion.section 
              className="vendor-section vendor-reviews-section"
              variants={staggerContainer}
            >
              <motion.h2 variants={itemVariant}>Client Reviews</motion.h2>
              
              <motion.div variants={itemVariant} className="reviews-summary">
                <div className="average-rating">
                  <div className="rating-number">{vendor.rating.toFixed(1)}</div>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar 
                        key={star} 
                        className={star <= Math.round(vendor.rating) ? 'star-filled' : 'star-empty'} 
                      />
                    ))}
                  </div>
                </div>
                <div className="reviews-count">
                  Based on {vendor.reviewCount} reviews
                </div>
              </motion.div>
              
              {vendor.reviews && vendor.reviews.length > 0 ? (
                <motion.div variants={itemVariant} className="reviews-list">
                  {vendor.reviews.map((review) => (
                    <motion.div 
                      key={review.id} 
                      className="review-card"
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      <div className="review-header">
                        <div className="reviewer-name">{review.name}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <div className="review-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar 
                            key={star} 
                            className={star <= review.rating ? 'star-filled' : 'star-empty'} 
                          />
                        ))}
                      </div>
                      <div className="review-content">
                        <FaQuoteLeft className="quote-icon left" />
                        <p>{review.comment}</p>
                        <FaQuoteRight className="quote-icon right" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={itemVariant} className="no-reviews">
                  <p>No reviews available yet. Be the first to review {vendor.name}!</p>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* Contact Section */}
          {activeTab === 'contact' && (
            <motion.section 
              className="vendor-section vendor-contact-section"
              variants={staggerContainer}
            >
              <motion.h2 variants={itemVariant}>Get in Touch</motion.h2>
              <motion.p variants={itemVariant} className="contact-intro">
                Ready to work with {vendor.name}? Contact them directly to discuss your project and check availability.
              </motion.p>
              
              <motion.div variants={itemVariant} className="contact-details">
                {vendor.contactInfo && (
                  <>
                    {vendor.contactInfo.email && (
                      <a href={`mailto:${vendor.contactInfo.email}`} className="contact-item">
                        <FaEnvelope /> {vendor.contactInfo.email}
                      </a>
                    )}
                    
                    {vendor.contactInfo.phone && (
                      <a href={`tel:${vendor.contactInfo.phone}`} className="contact-item">
                        <FaPhone /> {vendor.contactInfo.phone}
                      </a>
                    )}
                    
                    {vendor.contactInfo.website && (
                      <a href={vendor.contactInfo.website} target="_blank" rel="noopener noreferrer" className="contact-item">
                        <FaGlobe /> Visit Website
                      </a>
                    )}
                    
                    <div className="social-links">
                      {vendor.contactInfo.instagram && (
                        <a href={`https://instagram.com/${vendor.contactInfo.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                          <FaInstagram />
                        </a>
                      )}
                      
                      {vendor.contactInfo.facebook && (
                        <a href={vendor.contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                          <FaFacebookF />
                        </a>
                      )}
                      
                      {vendor.contactInfo.twitter && (
                        <a href={`https://twitter.com/${vendor.contactInfo.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                          <FaTwitter />
                        </a>
                      )}
                    </div>
                  </>
                )}
                
                <motion.div 
                  className="contact-form-container"
                  variants={itemVariant}
                >
                  <h3>Send a Message</h3>
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" rows="4" placeholder="Tell us about your project"></textarea>
                    </div>
                    <button type="submit" className="contact-submit-button">
                      Send Message
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            </motion.section>
          )}
        </motion.div>

        {/* Related Vendors Section */}
        {relatedVendors.length > 0 && (
          <motion.section 
            className="related-vendors-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2>Similar {vendor.category === 'photography' ? 'Photographers' : 'Videographers'}</h2>
            <div className="related-vendors-grid">
              {relatedVendors.map((relatedVendor) => (
                <Link 
                  to={`/services/vendor/${relatedVendor.id}`} 
                  key={relatedVendor.id}
                  className="related-vendor-card"
                >
                  <div className="related-vendor-image">
                    <img src={relatedVendor.image} alt={relatedVendor.name} />
                  </div>
                  <div className="related-vendor-info">
                    <h3>{relatedVendor.name}</h3>
                    <div className="related-vendor-meta">
                      <span>
                        <FaMapMarkerAlt /> {relatedVendor.city}
                      </span>
                      <span>
                        <FaStar /> {relatedVendor.rating}
                      </span>
                    </div>
                    <div className="related-vendor-price">
                      <FaDollarSign /> ${relatedVendor.price}/hr
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default VendorDetails; 