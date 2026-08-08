import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('rentiq_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('rentiq_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('rentiq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rentiq_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('rentiq_token', token);
    } else {
      localStorage.removeItem('rentiq_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setToken(data.token);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.register(userData);
      setUser(data.user);
      setToken(data.token);
      setLoading(false);
      return data.user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rentiq_user');
    localStorage.removeItem('rentiq_token');
  };

  const loginAsDemoUser = async (role = 'customer') => {
    const demoEmail = role === 'admin' ? 'admin@rentiq.com' : 'customer@rentiq.com';
    return await login(demoEmail, 'password123');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isCustomer: user?.role === 'customer' || !user?.role,
    login,
    register,
    logout,
    loginAsDemoUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
