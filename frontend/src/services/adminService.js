import apiClient from './api';

export const adminService = {
  getAIInsights: async () => {
    const res = await apiClient.get('/ai/insights');
    return res.data;
  }
};
