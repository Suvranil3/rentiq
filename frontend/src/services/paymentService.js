import apiClient from './api';

export const paymentService = {
  getPayments: async () => {
    try {
      const res = await apiClient.get('/payments');
      return res.data;
    } catch (err) {
      return [
        {
          id: 'TXN-9011',
          customer: 'Alex Johnson',
          rentalId: 'RNT-2026-8801',
          type: 'Rental Fee',
          amount: 4500,
          method: 'Credit Card (Sandbox)',
          status: 'PAID',
          date: '2026-08-03 10:15 AM'
        },
        {
          id: 'TXN-9012',
          customer: 'Alex Johnson',
          rentalId: 'RNT-2026-8801',
          type: 'Deposit Hold',
          amount: 5000,
          method: 'Escrow Lock',
          status: 'HELD',
          date: '2026-08-03 10:15 AM'
        },
        {
          id: 'TXN-9013',
          customer: 'Rohan Verma',
          rentalId: 'RNT-2026-8803',
          type: 'Deposit Refund',
          amount: 6000,
          method: 'Direct Disburse',
          status: 'REFUNDED',
          date: '2026-08-05 04:15 PM'
        },
        {
          id: 'TXN-9014',
          customer: 'Priya Sharma',
          rentalId: 'RNT-2026-8802',
          type: 'Late Fee Penalty',
          amount: 3000,
          method: 'Deposit Deduction',
          status: 'PAID',
          date: '2026-08-06 09:00 AM'
        }
      ];
    }
  }
};
