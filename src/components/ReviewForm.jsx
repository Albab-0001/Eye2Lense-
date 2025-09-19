import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ReviewForm.css';

// Helper function to create a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ReviewForm = ({ vendorId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (success) setSuccess('');
    if (error) setError('');
  };

  const handleTextChange = (e) => {
    setReviewText(e.target.value);
    if (success) setSuccess('');
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setSuccess('');
    
    // Validate inputs
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (reviewText.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      return;
    }
    
    // Check if user is logged in
    if (!currentUser) {
      setError('You must be logged in to submit a review');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setShowProgress(true);
      
      // Create review object
      const reviewData = {
        vendorId: parseInt(vendorId),
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous User',
        userPhotoURL: currentUser.photoURL || '',
        rating: rating,
        text: reviewText,
        createdAt: new Date()
      };
      
      // Add review to Firestore
      const docRef = await addDoc(collection(db, 'reviews'), reviewData);
      
      // Wait for 1 second to show progress
      await delay(1000);
      
      // Reset form
      setRating(0);
      setReviewText('');
      setSuccess('Review submitted successfully!');
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      
    } catch (error) {
      console.error("Error submitting review:", error);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowProgress(false);
    }
  };

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      
      {error && <div className="review-error">{error}</div>}
      {success && <div className="review-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-selector">
          <p>Your Rating:</p>
          <div className="stars-input">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${i < rating ? 'filled' : ''}`}
                onClick={() => !isSubmitting && handleRatingChange(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="reviewText">Your Review:</label>
          <textarea
            id="reviewText"
            rows="5"
            value={reviewText}
            onChange={handleTextChange}
            placeholder="Share your experience with this vendor..."
            disabled={isSubmitting}
            required
          ></textarea>
        </div>
        
        {showProgress && (
          <div className="submission-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p>Submitting your review...</p>
          </div>
        )}
        
        <button
          type="submit"
          className={`submit-review-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
      
      {!currentUser && (
        <p className="login-prompt">
          Please <span onClick={() => navigate('/login')} style={{color: '#4285f4', cursor: 'pointer'}}>sign in</span> to leave a review
        </p>
      )}
    </div>
  );
};

export default ReviewForm; 