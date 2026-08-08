import apiClient from './api';
import { getLocalData, INITIAL_AI_INSIGHTS } from './mock/mockData';

export const adminService = {
  getAIInsights: async () => {
    try {
      const res = await apiClient.get('/ai/insights');
      return res.data;
    } catch (err) {
      return getLocalData('ai_insights', INITIAL_AI_INSIGHTS);
    }
  }
};
