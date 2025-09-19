import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import backgroundVideo from '../assets/images/video.mp4';
import '../styles/ReviewsSection.css';

const ReviewsSection = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Ensure video plays automatically when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
    
    // Add event listener for video loaded
    const handleVideoLoaded = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadeddata', handleVideoLoaded);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', handleVideoLoaded);
      }
    };
  }, []);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
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
  
  // Reviews data
  const reviews = [
    {
      id: 1,
      content: "Working with i2lense was an absolute pleasure. The photographer captured our wedding day perfectly, with an eye for detail that truly impressed us. Every moment was beautifully preserved.",
      author: "Sarah Johnson",
      role: "Wedding Client",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      rating: 5
    },
    {
      id: 2,
      content: "The videography team exceeded our expectations for our corporate event. Their professionalism and creativity resulted in promotional material that has significantly boosted our brand image.",
      author: "Michael Chen",
      role: "Marketing Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      rating: 5
    },
    {
      id: 3,
      content: "As a model, I've worked with many photographers, but the talent I found through i2lense was exceptional. The attention to lighting and composition created the best portfolio shots I've ever had.",
      author: "Elena Rodriguez",
      role: "Professional Model",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
      rating: 5
    }
  ];
  
  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };
  
  return (
    <section className="reviews-section">
      {/* Video Background */}
      <div className="reviews-video-background">
        <video
          ref={videoRef}
          className="reviews-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <motion.div 
        className="reviews-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <p className="reviews-subtitle">Testimonials</p>
        <h2>What Our Clients Say</h2>
        <div className="reviews-divider"></div>
        <p className="reviews-description">
          Discover why clients consistently choose our photographers and videographers for their most important moments and projects.
        </p>
      </motion.div>
      
      <motion.div 
        className="reviews-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {reviews.map(review => (
          <motion.div 
            key={review.id}
            className="review-card"
            variants={fadeIn}
          >
            <div className="review-quote">"</div>
            <div className="review-rating">
              {renderStars(review.rating)}
            </div>
            <p className="review-content">{review.content}</p>
            <div className="review-author">
              <div className="review-avatar">
                <img src={review.avatar} alt={review.author} />
              </div>
              <div className="review-info">
                <span className="review-name">{review.author}</span>
                <span className="review-role">{review.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ReviewsSection; 