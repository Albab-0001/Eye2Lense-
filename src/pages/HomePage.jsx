import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageCollageSlider from '../components/ImageCollageSlider';
import ImageCarousel from '../components/ImageCarousel';
import ContactSection from '../components/ContactSection';
import PolaroidAnimation from '../components/PolaroidAnimation';
import ReviewsSection from '../components/ReviewsSection';
import FAQSection from '../components/FAQSection';
import VideoSection from '../components/VideoSection';
import floralDecoration from '../assets/floral-decoration.svg';
import '../styles/HomePage.css';
import wedding1Image from '../assets/images/hello.JPG';
import weddingImage from '../assets/images/hello1.png';
import wedding2Image from '../assets/images/hello2.jpg';

const HomePage = () => {
  const [activePackage, setActivePackage] = useState('photography');
  const [activeVideo, setActiveVideo] = useState(null);
  
  // Sample carousel images data - kept for reference but not used with the new slider
  const carouselImages = [
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
       //src: weddingImage,
      alt: 'Wedding Photography',
      title: 'Capture Your Special Moments',
      description: 'Find the perfect photographer for your wedding day. Our professionals ensure every precious moment is preserved forever.',
      button: 'Explore Wedding Photography',
      buttonLink: '/services/photography'
    },
    {
      src: 'https://images.unsplash.com/photo-1533747122906-9ccfc4e1bf76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      alt: 'Event Videography',
      title: 'Professional Event Coverage',
      description: 'Our videographers create stunning visual stories of your events, from corporate gatherings to music festivals.',
      button: 'View Videography Services',
      buttonLink: '/services/videography'
    },
    {
      src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80',
      alt: 'Portrait Photography',
      title: 'Express Your Unique Story',
      description: 'From professional headshots to family portraits, our photographers help you showcase your personality.',
      button: 'Book a Portrait Session',
      buttonLink: '/services/photography'
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      video: 'https://player.vimeo.com/video/174002812',
      title: 'Whispers of Nature'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80',
      video: 'https://player.vimeo.com/video/219731187',
      title: 'Beyond the Horizon'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1518982380512-5a3c6064f212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      video: 'https://player.vimeo.com/video/292453431',
      title: 'Frozen Symphony'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      video: 'https://player.vimeo.com/video/225034242',
      title: 'Chasing the Light'
    }
  ];

  const handleVideoClick = (id) => {
    setActiveVideo(activeVideo === id ? null : id);
  };

  // Animation variants
  const fadeInUp = {
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

  const featureItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  const portfolioContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const portfolioItemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      } 
    }
  };

  // Text animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  };

  const textReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };

  const letterAnimation = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const AnimatedText = ({ text, className }) => {
    const words = text.split(' ');
    
    return (
      <motion.h2 
        className={className}
        variants={textReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="word-wrapper" style={{ display: 'inline-block', marginRight: '0.4rem' }}>
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                style={{ display: 'inline-block' }}
                variants={letterAnimation}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>
    );
  };

  return (
    <div className="home-page">
      {/* <ImageCollageSlider /> */}
      <ImageCarousel />
      
      <section className="packages-section">
        <div className="section-header elegant">
          <p className="section-subtitle">SERVICES</p>
          <h2>{activePackage === 'photography' ? 'Photography Packages' : 'Videography Packages'}</h2>
        </div>
        
        <div className="package-tabs">
          <button 
            className={`package-tab ${activePackage === 'photography' ? 'active' : ''}`}
            onClick={() => setActivePackage('photography')}
          >
            Photography
          </button>
          <button 
            className={`package-tab ${activePackage === 'videography' ? 'active' : ''}`}
            onClick={() => setActivePackage('videography')}
          >
            Videography
          </button>
        </div>
        
        {activePackage === 'photography' && (
          <div className="package-grid elegant">
            <div className="package-card elegant">
              <div className="package-image">
                 <img src={weddingImage} alt="Wedding Videography" />
              </div>
              <h3 className="package-title">Wedding</h3>
              <Link to="/services/photography" className="view-details-btn elegant">See Pricing</Link>
            </div>
            
            <div className="package-card elegant">
              <div className="package-image">
                 <img src={wedding1Image} alt="Wedding Videography" />
              </div>
              <h3 className="package-title">Portrait</h3>
              <Link to="/services/photography" className="view-details-btn elegant">See Pricing</Link>
          </div>
          
            <div className="package-card elegant">
              <div className="package-image">
                <img src={wedding2Image} alt="Wedding Videography" />
                </div>
              <h3 className="package-title">Engagement</h3>
              <Link to="/services/photography" className="view-details-btn elegant">See Pricing</Link>
            </div>
          </div>
        )}
        
        {activePackage === 'videography' && (
          <div className="package-grid elegant">
            <div className="package-card elegant">
              <div className="package-image">
               <img src={weddingImage} alt="Wedding Videography" />
              </div>
              <h3 className="package-title">Wedding</h3>
              <Link to="/services/videography" className="view-details-btn elegant">See Pricing</Link>
          </div>
          
            <div className="package-card elegant">
              <div className="package-image">
                <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1412&q=80" alt="Event Videography" />
              </div>
              <h3 className="package-title">Event</h3>
              <Link to="/services/videography" className="view-details-btn elegant">See Pricing</Link>
          </div>
          
            <div className="package-card elegant">
              <div className="package-image">
                <img src="https://images.unsplash.com/photo-1576824303923-18e59b89c3b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Commercial Videography" />
              </div>
              <h3 className="package-title">Commercial</h3>
              <Link to="/services/videography" className="view-details-btn elegant">See Pricing</Link>
            </div>
          </div>
        )}
      </section>
      
      <motion.section 
        className="about-studio-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="about-studio-content">
          <motion.div 
            className="about-studio-text"
            variants={fadeInUp}
          >
            <AnimatedText 
              text="As a creative video studio agency, we specialize in crafting visually compelling content that speaks to the heart and sparks emotion." 
              className="" style={{fontFamily: 'Segoe UI', fontSize: '1.15rem', lineHeight: '1.7', color: '#ffff', marginBottom: '2.5rem', fontWeight: '300', transition: 'color 0.3s ease'}}
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.6,
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true }}
            >
              Our passion lies in capturing the essence of every brand, idea, or vision and transforming it into powerful narratives that resonate with audiences.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.8,
                  duration: 0.5
                }
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about" className="about-studio-btn">About studio</Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="about-studio-features"
            variants={staggerContainer}
          >
            <motion.div className="feature-item" variants={featureItem}>
              <span className="feature-number">01.</span>
              <span className="feature-text">Creativity Without Limits</span>
            </motion.div>
            <motion.div className="feature-item" variants={featureItem}>
              <span className="feature-number">02.</span>
              <span className="feature-text">Authentic Storytelling</span>
            </motion.div>
            <motion.div className="feature-item" variants={featureItem}>
              <span className="feature-number">03.</span>
              <span className="feature-text">Excellence in Every Frame</span>
            </motion.div>
            <motion.div className="feature-item" variants={featureItem}>
              <span className="feature-number">04.</span>
              <span className="feature-text">Passion-Driven Work</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      <section id="polaroid-section">
        <PolaroidAnimation />
      </section>
      <br />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <VideoSection />
    </div>
  );
};

export default HomePage; 