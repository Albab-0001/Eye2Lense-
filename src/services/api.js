import axios from 'axios';

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // This is important for cookies/sessions
});

// Authentication API calls
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      console.log('API register called with:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('API register response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API register error:', error);
      throw error.response ? error.response.data : new Error('Registration failed');
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login failed');
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Logout failed');
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to get user');
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/update-profile', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Profile update failed');
    }
  },

  // Reset password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Password reset request failed');
    }
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Password reset failed');
    }
  },

  // Check authentication status
  checkAuth: async () => {
    try {
      const response = await api.get('/auth/me');
      return {
        isAuthenticated: true,
        user: response.data.user
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        user: null
      };
    }
  }
};

// Interceptor for adding auth token to requests
api.interceptors.request.use(
  (config) => {
    // You can add logic here to add the token from localStorage if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and hasn't been retried yet
    // Also prevent infinite loops by checking if this is already a refresh token request
    if (error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh-token')) {

      originalRequest._retry = true;

      try {
        // Create a new axios instance to avoid interceptor recursion
        const refreshApi = axios.create({
          baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
          withCredentials: true
        });

        // Try to refresh the token
        const refreshResponse = await refreshApi.post('/auth/refresh-token');

        // If token refresh was successful, retry the original request
        if (refreshResponse.data.success) {
          return api(originalRequest);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Clear any stored auth state
        localStorage.removeItem('token');

        // Only redirect if we're not already on the login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Contact API calls
export const contactAPI = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/contact/submit', formData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to submit contact form');
    }
  },

  // Test email service (development only)
  testEmailService: async () => {
    try {
      const response = await api.get('/contact/test-email');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Email service test failed');
    }
  },

  // Send test email (development only)
  sendTestEmail: async () => {
    try {
      const response = await api.post('/contact/test-send');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Test email send failed');
    }
  }
};

// Vendor API calls
export const vendorAPI = {
  // Submit vendor application
  submitVendorApplication: async (applicationData) => {
    try {
      const response = await api.post('/vendors/apply', applicationData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to submit vendor application');
    }
  },
  
  // Get all vendors
  getAllVendors: async () => {
    try {
      const response = await api.get('/vendors');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch vendors');
    }
  },
  
  // Get vendor by ID
  getVendorById: async (id) => {
    try {
      const response = await api.get(`/vendors/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch vendor details');
    }
  }
};

export default api;