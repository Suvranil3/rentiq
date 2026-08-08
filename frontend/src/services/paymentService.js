import apiClient from './api';

export const paymentService = {
  getPayments: async () => {
    const res = await apiClient.get('/payments');
    return res.data;
  }
};
