import apiClient from './api';
import { getLocalData, setLocalData, INITIAL_RENTALS, INITIAL_PRODUCTS } from './mock/mockData';

export const rentalService = {
  checkAvailability: async (productId, startDate, endDate) => {
    try {
      const res = await apiClient.post('/rentals/check-availability', { productId, startDate, endDate });
      return res.data;
    } catch (err) {
      const products = getLocalData('products', INITIAL_PRODUCTS);
      const product = products.find(p => p.id === productId);
      return {
        available: product ? product.availableStock > 0 : true,
        remainingStock: product ? product.availableStock : 5
      };
    }
  },

  create: async (rentalPayload) => {
    try {
      const res = await apiClient.post('/rentals', rentalPayload);
      return res.data;
    } catch (err) {
      const rentals = getLocalData('rentals', INITIAL_RENTALS);
      const products = getLocalData('products', INITIAL_PRODUCTS);

      const newId = `RNT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRental = {
        id: newId,
        ...rentalPayload,
        status: 'Active',
        depositStatus: 'HELD',
        paymentStatus: 'PAID',
        createdDate: new Date().toISOString().split('T')[0],
        timeline: [
          { step: 'Booked', date: new Date().toLocaleString(), completed: true },
          { step: 'Confirmed', date: new Date().toLocaleString(), completed: true },
          { step: 'Picked Up / Shipped', date: rentalPayload.deliveryMethod === 'Ship to Address' ? 'Processing Dispatch' : 'Ready for Store Pickup', completed: true },
          { step: 'Active Rental', date: rentalPayload.startDate, completed: true },
          { step: 'Returned', date: null, completed: false },
          { step: 'Deposit Settled', date: null, completed: false }
        ]
      };

      rentals.unshift(newRental);
      setLocalData('rentals', rentals);

      // Decrement available inventory stock
      const pIndex = products.findIndex(p => p.id === rentalPayload.productId);
      if (pIndex !== -1 && products[pIndex].availableStock > 0) {
        products[pIndex].availableStock -= 1;
        setLocalData('products', products);
      }

      return newRental;
    }
  },

  getAll: async (filters = {}) => {
    try {
      const res = await apiClient.get('/rentals', { params: filters });
      return res.data;
    } catch (err) {
      let rentals = getLocalData('rentals', INITIAL_RENTALS);
      if (filters.status && filters.status !== 'All') {
        rentals = rentals.filter(r => r.status.toLowerCase() === filters.status.toLowerCase());
      }
      if (filters.userId) {
        rentals = rentals.filter(r => r.userId === filters.userId);
      }
      return rentals;
    }
  },

  getById: async (id) => {
    try {
      const res = await apiClient.get(`/rentals/${id}`);
      return res.data;
    } catch (err) {
      const rentals = getLocalData('rentals', INITIAL_RENTALS);
      const rental = rentals.find(r => r.id === id);
      if (!rental) throw new Error('Rental not found');
      return rental;
    }
  }
};
