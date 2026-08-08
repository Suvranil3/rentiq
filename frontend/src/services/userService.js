import apiClient from './api';

export const userService = {
  getAll: async () => {
    const res = await apiClient.get('/users');
    return res.data;
  },
  createAdmin: async (adminData) => {
    const res = await apiClient.post('/users/create-admin', adminData);
    return res.data;
  },
  updateRole: async (userId, role) => {
    const res = await apiClient.patch(`/users/${userId}/role`, { role });
    return res.data;
  }
};
