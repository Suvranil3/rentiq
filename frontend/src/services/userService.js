import apiClient from './api';

export const userService = {
  getAll: async () => {
    const res = await apiClient.get('/users');
    return res.data;
  }
};
