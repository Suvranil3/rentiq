import apiClient from './api';

export const rentalService = {
  checkAvailability: async (productId, startDate, endDate) => {
    const res = await apiClient.post('/rentals/check-availability', { productId, startDate, endDate });
    return res.data;
  },

  create: async (rentalPayload) => {
    const res = await apiClient.post('/rentals', rentalPayload);
    return res.data;
  },

  getAll: async (filters = {}) => {
    const res = await apiClient.get('/rentals', { params: filters });
    return res.data;
  },

  getById: async (id) => {
    const res = await apiClient.get(`/rentals/${id}`);
    return res.data;
  }
};
