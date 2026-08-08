import apiClient from './api';
import { getLocalData, setLocalData, INITIAL_USERS } from './mock/mockData';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (err) {
      // Offline / Mock fallback
      const users = getLocalData('users', INITIAL_USERS);
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        return { token: `mock-token-${found.id}`, user: found };
      }
      const role = email.includes('admin') ? 'admin' : 'customer';
      const newUser = {
        id: `u-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email,
        role,
        joinedDate: new Date().toISOString().split('T')[0],
        totalRentals: 0,
        activeRentals: 0,
        status: 'Active'
      };
      users.push(newUser);
      setLocalData('users', users);
      return { token: `mock-token-${newUser.id}`, user: newUser };
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      const users = getLocalData('users', INITIAL_USERS);
      const newUser = {
        id: `u-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '+91 99999 88888',
        role: 'customer',
        joinedDate: new Date().toISOString().split('T')[0],
        totalRentals: 0,
        activeRentals: 0,
        status: 'Active'
      };
      users.push(newUser);
      setLocalData('users', users);
      return { token: `mock-token-${newUser.id}`, user: newUser };
    }
  }
};
