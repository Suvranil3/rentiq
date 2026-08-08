import apiClient from './api';

export const addressService = {
  getAll: async () => {
    const res = await apiClient.get('/addresses');
    return res.data;
  },
  create: async (addressData) => {
    const res = await apiClient.post('/addresses', addressData);
    return res.data;
  },
  delete: async (id) => {
    const res = await apiClient.delete(`/addresses/${id}`);
    return res.data;
  }
};
