import apiClient from './api';

export const invoiceService = {
  getAll: async () => {
    const res = await apiClient.get('/invoices');
    return res.data;
  },
  getById: async (id) => {
    const res = await apiClient.get(`/invoices/${id}`);
    return res.data;
  }
};
