import jwt from 'jsonwebtoken';
import User from '../../src/models/User.js';

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in cookies or headers
  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  ) {
    try {
      // Get token from cookie or header
      token = req.cookies.token || req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        error: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized, no token'
    });
  }
};

// Middleware to check user role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized, no user'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    
    next();
  };
}; 