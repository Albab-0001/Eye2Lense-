import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ImageCollageSlider.css';

const ImageCollageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  
  // Multiple sets of portrait images for the slideshow
  const imageSlides = [
    // Slide 1
    [
      'https://images.unsplash.com/photo-1545418740-e02c63446cf8?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1170&auto=format&fit=crop'
    ],
    // Slide 2
    [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618721405821-80ebc4b63d26?q=80&w=1287&auto=format&fit=crop'
    ],
    // Slide 3
    [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516914589923-f643317e6e2f?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop'
    ]
  ];

  // Button text that changes based on the current slide
  const buttonTexts = [
    "Wedding Photography",
    "Portrait Sessions",
    "Special Events"
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imageSlides.length);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [imageSlides.length, isTransitioning]);
  
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? imageSlides.length - 1 : prevSlide - 1
    );
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  }, [imageSlides.length, isTransitioning]);

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  // Auto-slide every 2 seconds, but pause on hover
  useEffect(() => {
    if (!isPaused && !isTransitioning) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide, isTransitioning]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="collage-slider-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {imageSlides.map((slideImages, slideIndex) => (
        <div 
          key={slideIndex}
          className={`collage-slide ${slideIndex === currentSlide ? 'active' : ''}`}
        >
          <div className="collage-grid">
            {slideImages.map((src, imgIndex) => (
              <img 
                key={imgIndex} 
                src={src} 
                alt={`Portrait ${slideIndex}-${imgIndex + 1}`} 
                className="collage-img" 
              />
            ))}
          </div>
        </div>
      ))}
      
      <div className="button-overlay"></div>
      
      <Link to="/services" className="see-work-btn">
        {buttonTexts[currentSlide]}
      </Link>
      
      <button 
        className="nav-arrow prev-arrow" 
        onClick={prevSlide} 
        disabled={isTransitioning}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <button 
        className="nav-arrow next-arrow" 
        onClick={nextSlide} 
        disabled={isTransitioning}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      
      <div className="slider-dots">
        {imageSlides.map((_, index) => (
          <span 
            key={index} 
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCollageSlider; 