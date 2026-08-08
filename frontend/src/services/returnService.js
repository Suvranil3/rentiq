import apiClient from './api';
import { getLocalData, setLocalData, INITIAL_RENTALS, INITIAL_PRODUCTS } from './mock/mockData';

export const returnService = {
  processReturn: async (rentalId, inspectionData) => {
    try {
      const res = await apiClient.post('/returns/process', { rentalId, inspectionData });
      return res.data;
    } catch (err) {
      const rentals = getLocalData('rentals', INITIAL_RENTALS);
      const products = getLocalData('products', INITIAL_PRODUCTS);

      const index = rentals.findIndex(r => r.id === rentalId);
      if (index === -1) throw new Error('Rental not found');

      const rental = rentals[index];
      const isLate = new Date() > new Date(rental.endDate);
      const lateFee = inspectionData.lateFee || (isLate ? 1500 : 0);
      const damageDeduction = inspectionData.damageDeduction || 0;
      const totalDeduction = lateFee + damageDeduction;

      const refundAmount = Math.max(0, rental.securityDeposit - totalDeduction);
      const depositStatus = totalDeduction >= rental.securityDeposit 
        ? 'FULLY_DEDUCTED' 
        : (totalDeduction > 0 ? 'PARTIALLY_DEDUCTED' : 'REFUNDED');

      rental.status = 'Returned';
      rental.depositStatus = depositStatus;
      rental.inspectionReport = {
        condition: inspectionData.condition || 'Good',
        damageNotes: inspectionData.damageNotes || 'No damage reported',
        missingAccessories: inspectionData.missingAccessories || [],
        lateFee,
        deductionAmount: totalDeduction,
        refundAmount,
        inspectionDate: new Date().toLocaleString()
      };

      // Update timeline steps
      rental.timeline = rental.timeline.map(t => {
        if (t.step === 'Returned') return { ...t, date: new Date().toLocaleString(), completed: true };
        if (t.step === 'Deposit Settled') return { ...t, date: new Date().toLocaleString(), completed: true };
        return t;
      });

      rentals[index] = rental;
      setLocalData('rentals', rentals);

      // Restore inventory stock count
      const pIndex = products.findIndex(p => p.id === rental.productId);
      if (pIndex !== -1) {
        products[pIndex].availableStock += 1;
        setLocalData('products', products);
      }

      return rental;
    }
  }
};
