import apiClient from './api';

export const quotationService = {
  getAll: async () => {
    const res = await apiClient.get('/quotations');
    return res.data;
  },
  getById: async (id) => {
    const res = await apiClient.get(`/quotations/${id}`);
    return res.data;
  },
  create: async (quotationData) => {
    const res = await apiClient.post('/quotations', quotationData);
    return res.data;
  },
  confirm: async (id) => {
    const res = await apiClient.post(`/quotations/${id}/confirm`);
    return res.data;
  },
  cancel: async (id) => {
    const res = await apiClient.post(`/quotations/${id}/cancel`);
    return res.data;
  }
};
