import axios from 'axios';

// Centralized Axios Instance with Base URL from Environment Variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor to Attach JWT Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('rentiq_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor for Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Graceful error propagation
    return Promise.reject(error);
  }
);

export default apiClient;
