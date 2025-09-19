import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import lastVideo from '../assets/images/lastvideo.mp4';
import '../styles/VideoSection.css';

const VideoSection = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    // Ensure video plays automatically when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
        // Could add a play button here as fallback
      });
    }
  }, []);

  return (
    <section className="video-section">
      <div className="video-background-container">
        <video
          ref={videoRef}
          className="video-background"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src={lastVideo}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="fallback-image"></div>
      </div>
      
      <div className="video-overlay"></div>
      
      <motion.div 
        className="video-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="video-text">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's Create Together
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We're a team of photographers and videographers who are passionate about capturing your special moments.
          </motion.p>
        </div>
        
        <motion.div
          className="button-container"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/services" className="cta-button">
            EXPLORE OUR SERVICES
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoSection; 