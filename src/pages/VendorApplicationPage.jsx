import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { vendorAPI } from '../services/api';
import '../styles/VendorApplication.css';

const VendorApplicationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'photography',
    city: '',
    experience: '',
    specialties: '',
    portfolio: '',
    description: '',
    instagram: '',
    website: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) 
      newErrors.phone = 'Phone number must be 10 digits';
    
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.specialties.trim()) newErrors.specialties = 'Specialties are required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store the name for WhatsApp message before resetting form
      const applicantName = formData.name;
      
      // Show success popup
      setShowSuccessPopup(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'photography',
        city: '',
        experience: '',
        specialties: '',
        portfolio: '',
        description: '',
        instagram: '',
        website: '',
      });
      
      // Hide popup and redirect to WhatsApp after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
        // Redirect to WhatsApp with the provided number
        window.location.href = `https://wa.me/919142391153?text=Hello, I've submitted a vendor application for ${applicantName}. Please review my application.`;
      }, 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SuccessPopup = () => (
    <motion.div
      className={`success-popup ${showSuccessPopup ? 'show' : ''}`}
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{
        opacity: showSuccessPopup ? 1 : 0,
        scale: showSuccessPopup ? 1 : 0.8,
        y: showSuccessPopup ? 0 : -50
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="popup-content">
        <div className="popup-icon">✅</div>
        <h3>Application Submitted!</h3>
        <p>Redirecting to WhatsApp...</p>
      </div>
    </motion.div>
  );

  return (
    <section className="vendor-application-section">
      {/* Success Popup */}
      <SuccessPopup />

      <div className="vendor-application-container">
        <motion.div
          className="vendor-application-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="vendor-application-heading">Apply as a Vendor</h1>
          <h2><span className="vendor-application-tag">Join Our Network</span></h2>
          
          {errors.submit && (
            <div className="form-message error">
              {errors.submit}
            </div>
          )}

          <form className="vendor-application-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
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
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
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
                  <option value="makeup">Makeup Artist</option>
                  <option value="venue">Venue</option>
                  <option value="catering">Catering</option>
                  <option value="decoration">Decoration</option>
                  <option value="other">Other</option>
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
                <label htmlFor="experience">Years of Experience *</label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? 'error' : ''}
                />
                {errors.experience && <div className="error-message">{errors.experience}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="specialties">Your Specialties *</label>
              <input
                type="text"
                id="specialties"
                name="specialties"
                value={formData.specialties}
                onChange={handleChange}
                placeholder="e.g. Wedding Photography, Portrait, Fashion"
                className={errors.specialties ? 'error' : ''}
              />
              {errors.specialties && <div className="error-message">{errors.specialties}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="portfolio">Portfolio Link</label>
              <input
                type="text"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://your-portfolio-website.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Tell Us About Yourself *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your services, experience, and what makes you unique"
                className={errors.description ? 'error' : ''}
              ></textarea>
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="instagram">Instagram Handle</label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@yourusername"
                />
              </div>

              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://your-website.com"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="loading-spinner"></div>
              ) : 'Submit Application'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default VendorApplicationPage; 