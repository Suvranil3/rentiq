import apiClient from './api';

export const returnService = {
  processReturn: async (rentalId, inspectionData) => {
    const res = await apiClient.post('/returns/process', { rentalId, inspectionData });
    return res.data;
  }
};
