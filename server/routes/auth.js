import express from 'express';
import { body } from 'express-validator';
import { 
  register, 
  login, 
  logout, 
  getMe, 
  updateProfile,
  forgotPassword,
  resetPassword,
  refreshToken
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Register user
router.post(
  '/register',
  [
    body('displayName', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
);

// Login user
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

// Logout user
router.post('/logout', logout);

// Get current user
router.get('/me', protect, getMe);

// Update user profile
router.put(
  '/update-profile',
  protect,
  [
    body('displayName', 'Name is required').optional(),
    body('email', 'Please include a valid email').optional().isEmail()
  ],
  updateProfile
);

// Forgot password
router.post(
  '/forgot-password',
  [
    body('email', 'Please include a valid email').isEmail()
  ],
  forgotPassword
);

// Reset password
router.post(
  '/reset-password/:resetToken',
  [
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  resetPassword
);

// Refresh token
router.post('/refresh-token', refreshToken);

export default router; 