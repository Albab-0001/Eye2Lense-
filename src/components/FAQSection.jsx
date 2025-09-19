import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  // State to track which FAQ item is active/open
  const [activeIndex, setActiveIndex] = useState(0); // First item open by default
  
  // Toggle FAQ item open/closed
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // FAQ data - exactly matching the image
  const faqs = [
    {
      question: "What types of videos do you produce?",
      answer: "We specialize in a wide range of video content, including promotional videos, brand storytelling, social media content, and cinematic productions."
    },
    {
      question: "How long does it take to complete a video project?",
      answer: "The timeline varies depending on the complexity and scope of your project. A typical promotional video might take 2-4 weeks from concept to final delivery, while more complex productions could take 4-8 weeks."
    },
    {
      question: "Do you offer custom video packages?",
      answer: "Yes, we offer fully customizable video packages tailored to your specific needs and budget. Our team will work with you to understand your goals and create a package that delivers maximum value for your investment."
    },
    {
      question: "Can I provide input during the editing process?",
      answer: "Absolutely! Client collaboration is essential to our process. We provide opportunities for feedback at key milestones, including storyboarding, rough cuts, and final edits."
    }
  ];
  
  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <p className="faq-subtitle">Got questions?</p>
          <h2 className="faq-title">Answers to help you get started.</h2>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <div className="faq-toggle">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    className="faq-answer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 