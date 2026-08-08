import axios from 'axios';

// Centralized Axios Instance with Base URL from Environment Variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    // Extract actual server error message if present
    const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message;
    const customError = new Error(message);
    customError.response = error.response;
    return Promise.reject(customError);
  }
);

export default apiClient;
