import apiClient from './api';

export const pricelistService = {
  getAll: async () => {
    const res = await apiClient.get('/pricelists');
    return res.data;
  },
  save: async (data) => {
    const res = await apiClient.post('/pricelists', data);
    return res.data;
  }
};
