import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../services/api';
import '../styles/ContactSection.css';
import sonalImage from '../assets/images/sonal.jpg';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    eventType: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: false,
    message: ''
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        loading: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Set loading state
    setFormStatus({
      submitted: false,
      loading: true,
      error: false,
      message: ''
    });

    try {
      // Submit form to backend
      const response = await contactAPI.submitContactForm(formData);

      // Show success popup
      setShowSuccessPopup(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        eventType: '',
        message: ''
      });

      // Set success status
      setFormStatus({
        submitted: true,
        loading: false,
        error: false,
        message: response.message || 'Thank you! Your message has been sent successfully.'
      });

      // Hide success popup after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);

      // Clear status message after 8 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          loading: false,
          error: false,
          message: ''
        });
      }, 8000);

    } catch (error) {
      console.error('Contact form submission error:', error);

      setFormStatus({
        submitted: true,
        loading: false,
        error: true,
        message: error.error || error.message || 'Failed to send your message. Please try again later.'
      });

      // Clear error message after 8 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          loading: false,
          error: false,
          message: ''
        });
      }, 8000);
    }
  };

  const scrollToSubmit = () => {
    const form = document.querySelector('.contact-form');
    form.scrollTo({
      top: form.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Success Popup Component
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
        <h3>Form Submitted Successfully!</h3>
        <p>Thank you for your message. We will get back to you soon.</p>
        <button
          className="popup-close"
          onClick={() => setShowSuccessPopup(false)}
        >
          Close
        </button>
      </div>
    </motion.div>
  );

  return (
    <section className="contact-section">
      {/* Success Popup */}
      <SuccessPopup />

      <div className="contact-container">
        <motion.div
          className="contact-image-container"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="contact-image">
            <img
              src={sonalImage}
              alt="Sonal"
              className="wedding-dress-image"
            />
          </div>
        </motion.div>

        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <h1 className="contact-heading">Get In Touch</h1>
            <h2><span className="contact-tag">Contact Us</span></h2>

            {formStatus.submitted && (
              <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
                {formStatus.message}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Event Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
              >
                <option value="">Select an event type</option>
                <option value="wedding">Wedding</option>
                <option value="engagement">Engagement</option>
                <option value="portrait">Portrait</option>
                <option value="event">Event</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`submit-btn ${formStatus.loading ? 'loading' : ''}`}
              disabled={formStatus.loading}
            >
              {formStatus.loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>

          <button onClick={scrollToSubmit} className="scroll-to-submit-btn">
            ↓ Scroll to Submit
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
