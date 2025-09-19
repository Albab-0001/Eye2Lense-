# i2lense - Photography & Videography Platform

A modern platform connecting users with photography and videography professionals.

## Features

- User authentication with JWT
- MongoDB Atlas integration
- Role-based access control
- Responsive design
- Modern UI with React

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- NPM or Yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd i2lense
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Copy the example environment file and update it with your MongoDB connection string and other settings:

```bash
cp .env.example .env
```

Edit the `.env` file with your MongoDB Atlas connection string and JWT secret.

### 4. Start the development server

```bash
npm start
```

This will start both the backend server and the React development server concurrently.

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

- `/src` - React frontend code
  - `/components` - Reusable UI components
  - `/pages` - Page components
  - `/contexts` - React context providers
  - `/models` - MongoDB models
  - `/services` - API service functions
  - `/styles` - CSS files
- `/server` - Express backend code
  - `/controllers` - API controllers
  - `/middleware` - Express middleware
  - `/routes` - API routes

## Authentication Flow

1. User registers with email/password
2. User logs in to receive JWT token
3. Token is stored in HTTP-only cookie
4. Protected routes check for valid token
5. Role-based access control for admin routes

## Available Scripts

- `npm start` - Start both frontend and backend in development mode
- `npm run dev` - Start frontend development server only
- `npm run server:dev` - Start backend server with nodemon
- `npm run server` - Start backend server without auto-reload
- `npm run build` - Build frontend for production

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with read/write privileges
4. Add your IP address to the IP whitelist
5. Get your connection string and add it to the `.env` file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
