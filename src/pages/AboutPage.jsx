import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/AboutPage.css';
import weddingCouple from '../assets/images/wed.jpeg';
import bride from '../assets/images/wed1.jpg';
import sonalImg from '../assets/images/sonal.jpg';
import engImg from '../assets/images/eng.jpeg';
import VideoSection from '../components/VideoSection';
import wedImg from '../assets/images/wed1.jpg';
import wed1Img from '../assets/images/wed2.JPG';
import wed2Img from '../assets/images/wed3.JPG';
import wed3Img from '../assets/images/wed4.JPG';
import wed4Img from '../assets/images/wed5.jpg';
import wed5Img from '../assets/images/wed6.jpg';
import wed6Img from '../assets/images/wed7.JPG';
import wed7Img from '../assets/images/wed8.jpg';
import wed8Img from '../assets/images/wed9.jpg';
const AboutPage = () => {
  // Animation controls
  const controlsHero = useAnimation();
  const controlsVision = useAnimation();
  const controlsProcess = useAnimation();
  const controlsTeam = useAnimation();
  const controlsValues = useAnimation();
  const controlsJourney = useAnimation();

  // Intersection observers
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [visionRef, visionInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [processRef, processInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [teamRef, teamInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [journeyRef, journeyInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Process steps data
  const processSteps = [
    {
      number: "01",
      title: "WE START WITH A CONSULTATION",
      description: "TO UNDERSTAND YOUR VISION, PREFERENCES, AND THE STORY YOU WANT TO TELL",
      image: "https://github.com/sonalkumar1819/images/blob/main/Screenshot%202025-08-18%20235528.png"
    },
    {
      number: "02",
      title: "WITH EXPERT DIRECTION",
      description: "AND ATTENTION TO DETAIL, WE CREATE THE PERFECT ATMOSPHERE TO CAPTURE STUNNING MOMENTS",
      image: "https://images.unsplash.com/photo-1551107671-b3ce56b6c667?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      number: "03",
      title: "AFTER THE SHOOT, WE",
      description: "METICULOUSLY EDIT YOUR IMAGES TO ENHANCE THEIR BEAUTY WHILE KEEPING THEM NATURAL",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      number: "04",
      title: "WITH EXPERT DIRECTION",
      description: "AND ATTENTION TO DETAIL, WE CREATE THE PERFECT ATMOSPHERE TO CAPTURE STUNNING MOMENTS",
      image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
    },
    {
      number: "05",
      title: "POST-PRODUCTION MAGIC –",
      description: "WE BRING THE EMOTION TO LIFE WITH CAREFUL EDITING",
      image: "https://images.unsplash.com/photo-1600854109241-48f9e1d38c4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    }
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Professional photographer with over 15 years of experience, passionate about connecting talented creators with clients."
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Award-winning photographer and filmmaker who ensures the highest quality standards across our platform."
    },
    {
      name: "Aisha Patel",
      role: "Head of Vendor Relations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      bio: "Former event coordinator who specializes in identifying and recruiting top photography and videography talent."
    },
    {
      name: "David Rodriguez",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      bio: "Software engineer with a passion for photography who ensures our platform delivers a seamless experience."
    }
  ];

  // Company values
  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We are committed to excellence in every aspect of our service, from the quality of vendors to customer support."
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "We operate with transparency and honesty in all our interactions with clients and vendors."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We continuously seek new ways to improve our platform and provide better services to our community."
    },
    {
      icon: "🌟",
      title: "Creativity",
      description: "We celebrate and promote creative expression in all forms of visual storytelling."
    }
  ];

  // Timeline events
  const timelineEvents = [
    {
      year: "2018",
      title: "Our Beginning",
      description: "i2lense was founded with a vision to connect talented photographers and videographers with clients seeking quality visual services."
    },
    {
      year: "2019",
      title: "Platform Launch",
      description: "We launched our online platform with 50 carefully selected vendors across 5 major cities."
    },
    {
      year: "2020",
      title: "Virtual Services",
      description: "Adapted to global changes by introducing virtual photography sessions and remote collaboration tools."
    },
    {
      year: "2021",
      title: "Community Growth",
      description: "Expanded to over 500 vendors nationwide and introduced our quality certification program."
    },
    {
      year: "2022",
      title: "Mobile App",
      description: "Launched our mobile application to make booking and managing photography services even easier."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Started our international expansion with vendors in select cities across Europe and Asia."
    }
  ];

  // Trigger animations when sections come into view
  useEffect(() => {
    if (heroInView) {
      controlsHero.start('visible');
    }
    if (visionInView) {
      controlsVision.start('visible');
    }
    if (processInView) {
      controlsProcess.start('visible');
    }
    if (teamInView) {
      controlsTeam.start('visible');
    }
    if (valuesInView) {
      controlsValues.start('visible');
    }
    if (journeyInView) {
      controlsJourney.start('visible');
    }
  }, [
    controlsHero, heroInView,
    controlsVision, visionInView,
    controlsProcess, processInView,
    controlsTeam, teamInView,
    controlsValues, valuesInView,
    controlsJourney, journeyInView
  ]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
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

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      
      <motion.section 
  className="about-hero"
  ref={heroRef}
  animate={controlsHero}
  initial="hidden"
  variants={fadeIn}
  style={{ backgroundColor: '#e4d8c7ff' }}
>
  <div 
  className="hero-container" 
  style={{ backgroundColor: '#e4d8c7ff' }}  // light brown (tan shade)
>
    
    {/* LEFT SIDE: TEXT CONTENT */}
{/* LEFT SIDE: CONTENT */}
<div className="hero-content" style={{ color: 'black' }}>
  <h2 style={{ color: 'black', fontFamily: 'Inter, sans-serif' }}>
    Every frame begins with a feeling.
  </h2>
  <motion.p 
    style={{ fontFamily: 'Inter, sans-serif', color: 'black' }}
  >
    At i2lense, we believe that exceptional photography and videography 
    capture not just images, but emotions and stories that last a lifetime.
  </motion.p>

  <motion.div
    className="hero-buttons"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
  >
    <a href="/services" className="hero-btn primary">Explore Services</a>
    <a href="/contact" className="hero-btn secondary">Contact Us</a>
  </motion.div>
</div>

{/* RIGHT SIDE: IMAGE GRID */}
<div className="hero-images-grid">

    <div className="why-choose-images">
            <div className="image-grid">
              <motion.div 
                className="image-item top-right"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img src={weddingCouple} alt="Wedding couple in traditional attire" />
              </motion.div>
              <motion.div 
                className="image-item middle-right"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img src={bride} alt="Bride" />
              </motion.div>
              <motion.div 
                className="image-item bottom-right"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img src={engImg} alt="Bride portrait" />
              </motion.div>
              
            </div>
          </div>
</div>


  </div>
</motion.section>

      {/* Vision Section */}
      <motion.section 
        className="vision-section"
        ref={visionRef}
        animate={controlsVision}
        initial="hidden"
        variants={fadeIn}
      >
        <div className="container">
          <div className="vision-content">
            <h2>As a visionary video production agency, we bring ideas to life through captivating visuals and compelling narratives.</h2>
            <p>
              Because the best photos and films come from understanding what truly matters to you — not just how it looks, but how it feels. We work closely with you to capture your story in a way that's natural, thoughtful, and true to who you are.
            </p>
            <a href="/contact" className="vision-button">Start a Project</a>
            
          </div>
        </div>
      </motion.section>

      {/* Our Process Section */}
      <section className="process-section">
        <div className="process-header">
          <h2>OUR PROCESS</h2>
        </div>
        <div className="process-container">
          <div className="mobile-scroll-hint">Swipe to see more →</div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div className="process-step" key={index}>
                <div className="process-image">
                  <img src={step.image} alt={`Process step ${step.number}`} />
                </div>
                <div className="process-content">
                  <div className="process-number-row">
                    <div className="process-number">{step.number}</div>
                    <div className="process-arrow">→</div>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              WHY CHOOSE US
            </motion.h2>
            <motion.p 
              className="why-choose-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We're not just here to capture your story – we're here to feel it with you
            </motion.p>
            <motion.ul 
              className="why-choose-points"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <li>Art direction shaped by your style and story</li>
              <li>Collaborative planning with shared references</li>
              <li>Timeless storytelling led by emotion, not trends</li>
              <li>Detail-driven approach to every frame</li>
              <li>Clear, consistent communication</li>
              <li>Flexible services to suit your budget</li>
            </motion.ul>
          </div>
          <div className="why-choose-images">
            <div className="image-grid">
              <motion.div 
                className="image-item top-right"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img src={weddingCouple} alt="Wedding couple in traditional attire" />
              </motion.div>
              <motion.div 
                className="image-item middle-right"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img src={bride} alt="Bride" />
              </motion.div>
              <motion.div 
                className="image-item bottom-right"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img src={engImg} alt="Bride portrait" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Behind the Lens */}
      <section className="team-section" ref={teamRef}>
        <div className="container">
          <div className="team-flex-layout">
            <motion.div 
              className="team-content"
              animate={controlsTeam}
              initial="hidden"
              variants={fadeIn}
            >
              <p className="section-subtitle">Behind the lens</p>
              <h2 className="team-heading">Passionate creators, masterful storytellers.</h2>
              <div className="team-btn-container">
                <a href="#" className="team-btn">View our team</a>
              </div>
            </motion.div>
            
            <motion.div 
              className="team-members-container"
              animate={controlsTeam}
              initial="hidden"
              variants={staggerContainer}
            >
              <motion.div 
                className="team-member"
                variants={itemFadeIn}
              >
                <div className="member-image">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Derick Dsouza" />
                </div>
                <div className="member-info">
                  <h3>Derick Dsouza</h3>
                  <h4>Founder, Creative Director</h4>
                </div>
              </motion.div>
              
              <motion.div 
                className="team-member"
                variants={itemFadeIn}
              >
                <div className="member-image">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" alt="Abhilasha Dsouza" />
                </div>
                <div className="member-info">
                  <h3>Abhilasha Dsouza</h3>
                  <h4>Co-Founder, Creative Lead</h4>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Collage Section */}
      <motion.section 
        className="photo-collage-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className="container">
          <div className="collage-container">
            <motion.div 
              className="collage-item item1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Bride preparation" />
            </motion.div>
            <motion.div 
              className="collage-item item2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1604017011826-d3b4a7fa37a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Flower" />
            </motion.div>
            <motion.div 
              className="collage-item item3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Wedding collage" />
            </motion.div>
            <motion.div 
              className="collage-item item4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Traditional couple" />
            </motion.div>
            <motion.div 
              className="collage-item item5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1609459231006-67127c4cf3b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Bride portrait" />
            </motion.div>
            <motion.div 
              className="collage-item item6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Bride preparation" />
            </motion.div>
            <motion.div 
              className="collage-item item7"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1630526720753-aa4e71acf017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Wedding shoes" />
            </motion.div>
            <motion.div 
              className="collage-item item8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1594472436416-40d2d4e895b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Woman with flowers" />
            </motion.div>
            <motion.div 
              className="collage-item item9 text-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="collage-text">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  MADE TO BE REMEMBERED.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Stories you'll feel every time you see them.
                </motion.p>
                <motion.div 
                  className="heart-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 30" width="80" height="15">
                    <path d="M0,15 Q40,0 100,15 T200,15" fill="none" stroke="#333" strokeWidth="1"/>
                    <path d="M95,15 Q100,5 105,15 Q100,25 95,15 Z" fill="#333"/>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="collage-item item10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Dog with flowers" />
            </motion.div>
            <motion.div 
              className="collage-item item11"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1560088939-aef75a2a0781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Mother and daughter" />
            </motion.div>
            <motion.div 
              className="collage-item item12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1617812191081-2a24e3f30e10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Bride portrait" />
            </motion.div>
            <motion.div 
              className="collage-item item13"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1583939411023-14783179e581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Woman portrait" />
            </motion.div>
            <motion.div 
              className="collage-item item14"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Wedding couple" />
            </motion.div>
            <motion.div 
              className="collage-item item15"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Flower decoration" />
            </motion.div>
            <motion.div 
              className="collage-item item16"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Family celebration" />
            </motion.div>
          </div>
        </div>
      </motion.section>
      <br />
      <VideoSection/>

      {/* Values Section */}
      {/* <section className="values-section" ref={valuesRef}>
        <div className="container">
          <motion.div 
            className="section-header"
            animate={controlsValues}
            initial="hidden"
            variants={fadeIn}
          >
            <h2>Our Core Values</h2>
            <div className="section-divider"></div>
            <p>The principles that guide everything we do at i2lense</p>
          </motion.div>
          
          <motion.div 
            className="values-grid"
            animate={controlsValues}
            initial="hidden"
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div 
                className="value-card" 
                key={index}
                variants={itemFadeIn}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Journey Section */}
      {/* <section className="journey-section" ref={journeyRef}>
        <div className="container">
          <motion.div 
            className="section-header"
            animate={controlsJourney}
            initial="hidden"
            variants={fadeIn}
          >
            <h2>Our Journey</h2>
            <div className="section-divider"></div>
            <p>The story of how i2lense has evolved over the years</p>
          </motion.div>
          
          <motion.div 
            className="timeline"
            animate={controlsJourney}
            initial="hidden"
            variants={staggerContainer}
          >
            {timelineEvents.map((event, index) => (
              <motion.div 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                key={index}
                variants={itemFadeIn}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{event.year}</div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="timeline-line"></div>
          </motion.div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="about-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Join Our Community</h2>
            <p>Whether you're a photographer, videographer, or someone looking for visual services, i2lense is the platform for you.</p>
            <div className="cta-buttons">
              <a href="/apply" className="cta-button primary">Apply as Vendor</a>
              <a href="/services" className="cta-button secondary">Explore Services</a>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutPage; 