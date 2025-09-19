import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import sonalImg from '../assets/images/1.jpg';
import sonal1Img from '../assets/images/2.jpg';
import sonal2Img from '../assets/images/4.png';
import sonal3Img from '../assets/images/3.jpeg';
import '../styles/PolaroidAnimation.css';

const PolaroidAnimation = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const scrollContainerRef = useRef(null);
  
  const polaroids = [
    {
      id: 1,
       image: sonalImg, // ✅ Local image
      
      title: 'Whispers of Nature',
      rotation: -3
    },
    {
      id: 2,
      image: sonal1Img,
      video: 'https://player.vimeo.com/video/219731187',
      title: 'Beyond the Horizon',
      rotation: 2
    },
    {
      id: 3,
       image: sonal2Img,
      video: 'https://player.vimeo.com/video/292453431',
      title: 'Frozen Symphony',
      rotation: -2
    },
    {
      id: 4,
       image: sonal3Img,
      video: 'https://player.vimeo.com/video/225034242',
      title: 'Chasing the Light',
      rotation: 3
    }
  ];
  
  // Animation variants
  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };
  
  const polaroidVariants = {
    visible: id => ({ 
      opacity: 1,
      scale: 1,
      rotate: polaroids.find(p => p.id === id).rotation,
      transition: { 
        type: "spring", 
        stiffness: 70,
        damping: 12,
        delay: (id - 1) * 0.1,
        duration: 0.8
      }
    })
  };
  
  const handleVideoClick = (id) => {
    setActiveVideo(activeVideo === id ? null : id);
    
    // Stop all videos when a new one is clicked
    Object.keys(videoRefs.current).forEach(key => {
      if (parseInt(key) !== id && videoRefs.current[key]) {
        const iframe = videoRefs.current[key].querySelector('iframe');
        if (iframe) {
          const src = iframe.src;
          iframe.src = src; // Reset iframe to stop video
        }
      }
    });
  };
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="polaroid-animation-container">
      <div className="grain-overlay"></div>
      
      <div className="scroll-indicator scroll-left" onClick={scrollLeft}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="scroll-indicator scroll-right" onClick={scrollRight}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18l6-6-6-6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <motion.div 
        className="polaroid-grid"
        variants={containerVariants}
        initial="visible"
        animate="visible"
        ref={scrollContainerRef}
      >
        {polaroids.map(polaroid => (
          <motion.div 
            key={polaroid.id}
            className="polaroid-frame"
            custom={polaroid.id}
            variants={polaroidVariants}
            onClick={() => handleVideoClick(polaroid.id)}
            ref={el => videoRefs.current[polaroid.id] = el}
          >
            {activeVideo === polaroid.id ? (
              <div className="polaroid-video-container">
                <iframe 
                  src={`${polaroid.video}?autoplay=1&title=0&byline=0&portrait=0`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={polaroid.title}
                ></iframe>
              </div>
            ) : (
              <div className="polaroid-image-container">
                <div 
                  className="polaroid-image"
                  style={{ backgroundImage: `url(${polaroid.image})` }}
                />
                <div className="play-overlay">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.7" />
                    <path d="M16 12L10 16V8L16 12Z" fill="#333333" />
                  </svg>
                </div>
              </div>
            )}
            <div className="polaroid-title">{polaroid.title}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PolaroidAnimation; 