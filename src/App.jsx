import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import VendorDetailPage from './pages/VendorDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ServicesPage from './pages/ServicesPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import AdminPanel from './pages/AdminPanel';
import VendorDetails from './pages/VendorDetails';
import DataDebug from './pages/DataDebug';
import TestFirebasePage from './pages/TestFirebasePage';
import OfflineIndicator from './components/OfflineIndicator';
import VendorApplicationPage from './pages/VendorApplicationPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:category" element={<ServicesPage />} />
              <Route path="/vendor/:id" element={<VendorDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/apply-as-vendor" element={<VendorApplicationPage />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />
              <Route path="/admin/*" element={
                <PrivateRoute requiredRole="admin">
                  <AdminPanel />
                </PrivateRoute>
              } />
              <Route path="/services/vendor/:id" element={<VendorDetails />} />
              <Route path="/debug" element={
                <PrivateRoute requiredRole="admin">
                  <DataDebug />
                </PrivateRoute>
              } />
              <Route path="/test-firebase" element={<TestFirebasePage />} />
            </Routes>
          </main>
          <Footer />
          <OfflineIndicator />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
