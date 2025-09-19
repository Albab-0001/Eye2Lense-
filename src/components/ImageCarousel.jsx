import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ImageCarousel.css';
import sonal1Image from '../assets/images/Pets.png';
import sonal2Image from '../assets/images/Food.png';
import sonal3Image from '../assets/images/Portraits.png';
import sonal4Image from '../assets/images/Wedding.png';
import sonal5Image from '../assets/images/sonal.png';


const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const imageSlides = [
    sonal4Image,
    sonal5Image,
    sonal3Image,
    sonal2Image,
    sonal1Image,

  ];

  const buttonTexts = [
    "Wedding",
    "Product and Lifestyle",
    "Portraits",
    "Food",
    "Pets",
  ];

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % imageSlides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [imageSlides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? imageSlides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [imageSlides.length, isTransitioning]);

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    if (!isPaused && !isTransitioning) {
      timerRef.current = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, nextSlide, isTransitioning]);

  return (
    <div
      className="slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {imageSlides.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <Link to="/services" className="see-work-btn">
        {buttonTexts[currentSlide]}
      </Link>

      <button className="nav-arrow prev-arrow" onClick={prevSlide}>
        ❮
      </button>
      <button className="nav-arrow next-arrow" onClick={nextSlide}>
        ❯
      </button>

      <div className="slider-dots">
        {imageSlides.map((_, i) => (
          <span
            key={i}
            className={`slider-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
