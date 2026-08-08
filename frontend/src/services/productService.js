import apiClient from './api';

export const productService = {
  getAll: async (filters = {}) => {
    const res = await apiClient.get('/products', { params: filters });
    return res.data;
  },

  getById: async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data;
  },

  create: async (productData) => {
    const res = await apiClient.post('/products', productData);
    return res.data;
  },

  update: async (id, productData) => {
    const res = await apiClient.put(`/products/${id}`, productData);
    return res.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/products/${id}`);
    return true;
  }
};
