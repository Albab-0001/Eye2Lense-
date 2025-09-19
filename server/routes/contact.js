import express from 'express';
import { body, validationResult } from 'express-validator';
import emailService from '../services/emailService.js';
import { logError, logInfo } from '../../src/utils/logger.js';

const router = express.Router();

// Validation middleware for contact form
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date'),
  
  body('eventType')
    .optional()
    .isIn(['wedding', 'engagement', 'portrait', 'event', 'commercial'])
    .withMessage('Please select a valid event type'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .escape()
];

// @route   POST /api/contact/submit
// @desc    Submit contact form and send email
// @access  Public
router.post('/submit', validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, phone, date, eventType, message } = req.body;

    // Log the contact form submission
    logInfo('Contact form submission received', {
      name,
      email,
      eventType: eventType || 'not specified',
      hasPhone: !!phone,
      hasDate: !!date
    });

    // Prepare form data for email
    const formData = {
      name,
      email,
      phone: phone || '',
      date: date || '',
      eventType: eventType || '',
      message
    };

    // Send email to admin
    await emailService.sendContactFormEmail(formData);

    // Log successful email send
    logInfo('Contact form email sent successfully', {
      from: email,
      name: name
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: {
        submittedAt: new Date().toISOString(),
        name: name
      }
    });

  } catch (error) {
    logError('Contact form submission failed', error, {
      email: req.body?.email,
      name: req.body?.name
    });

    // Return error response
    res.status(500).json({
      success: false,
      error: 'Failed to send your message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/contact/test-email
// @desc    Test email service connection (development only)
// @access  Public (in development)
router.get('/test-email', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({
      success: false,
      error: 'Endpoint not available in production'
    });
  }

  try {
    await emailService.verifyConnection();
    
    res.status(200).json({
      success: true,
      message: 'Email service is working correctly',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logError('Email service test failed', error);
    
    res.status(500).json({
      success: false,
      error: 'Email service connection failed',
      details: error.message
    });
  }
});

// @route   POST /api/contact/test-send
// @desc    Send test email (development only)
// @access  Public (in development)
router.post('/test-send', async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({
      success: false,
      error: 'Endpoint not available in production'
    });
  }

  try {
    const testFormData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      date: new Date().toISOString().split('T')[0],
      eventType: 'wedding',
      message: 'This is a test message from the contact form.'
    };

    await emailService.sendContactFormEmail(testFormData);
    
    res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logError('Test email send failed', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send test email',
      details: error.message
    });
  }
});

export default router;
