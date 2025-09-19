# Dual Authentication System Setup Guide

## Overview

Your React application now supports **dual authentication**:
1. **Firebase Google OAuth** (existing - no changes needed)
2. **Email/Password with JWT** (newly added)

Both systems work seamlessly together and users can authenticate using either method.

## 🚀 Quick Start

### 1. MongoDB Atlas Setup

#### Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account or log in
3. Create a new project (or use existing)

#### Create a Cluster
1. Click "Create a Cluster"
2. Choose the **FREE** M0 Sandbox tier
3. Select your preferred cloud provider and region
4. Click "Create Cluster" (takes 1-3 minutes)

#### Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

#### Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

#### Get Connection String
1. Go to "Clusters" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 2. Environment Variables Setup

Update your `.env` file with the following values:

```env
# MongoDB Atlas Configuration
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/i2lense?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here_at_least_32_characters_long
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Important Notes:
- Replace `your_username` and `your_password` with your MongoDB Atlas credentials
- Replace `your_cluster` with your actual cluster name
- Generate a secure JWT_SECRET (at least 32 characters)
- You can generate a secure JWT_SECRET using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Install Dependencies (if needed)

All required dependencies are already installed in your project:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token handling
- `express-validator` - Input validation

### 4. Start the Application

```bash
# Start both frontend and backend
npm start

# Or start them separately:
# Backend only
npm run server:dev

# Frontend only
npm run dev
```

## 🧪 Testing the Authentication System

### Test Email/Password Registration
1. Go to `http://localhost:5173/signup`
2. Fill out the email/password form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
3. Click "Create Account"
4. You should be redirected to the home page and logged in

### Test Email/Password Login
1. Go to `http://localhost:5173/login`
2. Fill out the email/password form:
   - Email: "test@example.com"
   - Password: "password123"
3. Click "Sign In"
4. You should be redirected to the home page and logged in

### Test Google OAuth (existing)
1. Go to `http://localhost:5173/login` or `http://localhost:5173/signup`
2. Click "Sign in with Google" or "Sign up with Google"
3. Complete Google authentication
4. You should be redirected to the home page and logged in

### Verify Database
1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections" on your cluster
3. You should see:
   - Database: `i2lense`
   - Collection: `users`
   - Documents for users created via email/password

## 🔧 API Endpoints

Your backend now provides these authentication endpoints:

### Registration
```
POST /api/auth/register
Content-Type: application/json

{
  "displayName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### Logout
```
POST /api/auth/logout
```

### Refresh Token
```
POST /api/auth/refresh-token
```

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Tokens stored in secure cookies
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for your domains
- **Error Handling**: Comprehensive error handling

## 🎨 Frontend Features

- **Dual Authentication UI**: Both Google and Email/Password options
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during authentication
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all device sizes
- **Password Visibility Toggle**: Show/hide password functionality

## 🚨 Troubleshooting

### Common Issues

#### "Connection failed" error
- Check your MongoDB Atlas connection string
- Verify your IP address is whitelisted
- Ensure database user credentials are correct

#### "JWT Secret not found" error
- Make sure `JWT_SECRET` is set in your `.env` file
- Restart your server after updating `.env`

#### "User already exists" error
- This is normal - the email is already registered
- Try logging in instead of registering

#### CORS errors
- Check that your frontend URL is in the CORS configuration
- Default allowed origins: `http://localhost:3000`, `http://localhost:5173`, `http://localhost:5175`

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
```

### Security Considerations
- Use strong, unique JWT secrets
- Set shorter token expiration times
- Use HTTPS in production
- Restrict CORS to your production domains
- Use specific IP whitelisting in MongoDB Atlas

## 📝 Next Steps

1. **Test thoroughly** with different user scenarios
2. **Customize error messages** if needed
3. **Add password reset functionality** (already implemented in backend)
4. **Implement email verification** if required
5. **Add user profile management** features
6. **Set up production environment** when ready

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the server logs for backend errors
3. Verify your environment variables
4. Test API endpoints directly using tools like Postman
5. Check MongoDB Atlas logs and metrics

Your dual authentication system is now ready to use! 🎉
