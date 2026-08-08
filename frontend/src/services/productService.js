import apiClient from './api';
import { getLocalData, setLocalData, INITIAL_PRODUCTS } from './mock/mockData';

export const productService = {
  getAll: async (filters = {}) => {
    try {
      const res = await apiClient.get('/products', { params: filters });
      return res.data;
    } catch (err) {
      let products = getLocalData('products', INITIAL_PRODUCTS);
      if (filters.category && filters.category !== 'All') {
        products = products.filter(p => p.category === filters.category);
      }
      if (filters.brand && filters.brand !== 'All') {
        products = products.filter(p => p.brand === filters.brand);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      if (filters.maxPrice) {
        products = products.filter(p => p.dailyPrice <= Number(filters.maxPrice));
      }
      if (filters.availableOnly) {
        products = products.filter(p => p.availableStock > 0);
      }
      return products;
    }
  },

  getById: async (id) => {
    try {
      const res = await apiClient.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      const products = getLocalData('products', INITIAL_PRODUCTS);
      const p = products.find(prod => prod.id === id);
      if (!p) throw new Error('Product not found');
      return p;
    }
  },

  create: async (productData) => {
    try {
      const res = await apiClient.post('/products', productData);
      return res.data;
    } catch (err) {
      const products = getLocalData('products', INITIAL_PRODUCTS);
      const newProduct = {
        ...productData,
        id: `prod-${Date.now()}`,
        availableStock: productData.totalStock || 1,
        status: 'Available',
        images: productData.images || ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80']
      };
      products.unshift(newProduct);
      setLocalData('products', products);
      return newProduct;
    }
  },

  update: async (id, productData) => {
    try {
      const res = await apiClient.put(`/products/${id}`, productData);
      return res.data;
    } catch (err) {
      const products = getLocalData('products', INITIAL_PRODUCTS);
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        setLocalData('products', products);
        return products[index];
      }
      throw new Error('Product not found');
    }
  },

  delete: async (id) => {
    try {
      await apiClient.delete(`/products/${id}`);
      return true;
    } catch (err) {
      let products = getLocalData('products', INITIAL_PRODUCTS);
      products = products.filter(p => p.id !== id);
      setLocalData('products', products);
      return true;
    }
  }
};
