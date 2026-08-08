const router = require('express').Router();
const mongoose = require('mongoose');
const Rental = require('../models/Rental');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');

// POST /api/returns/process
router.post('/process', protect, requireAdmin, async (req, res, next) => {
  try {
    const { rentalId, inspectionData } = req.body;

    if (mongoose.connection.readyState === 1) {
      const isObjId = mongoose.Types.ObjectId.isValid(rentalId);
      const query = isObjId ? { $or: [{ _id: rentalId }, { rentalId }] } : { rentalId };
      const rental = await Rental.findOne(query);
      if (!rental) return res.status(404).json({ message: 'Rental not found' });
      if (rental.status === 'Returned') {
        return res.status(400).json({ message: 'Rental already returned' });
      }

      const isLate = new Date() > new Date(rental.endDate);
      const lateFee = inspectionData.lateFee || (isLate ? 1500 : 0);
      const damageDeduction = inspectionData.damageDeduction || 0;
      const totalDeduction = lateFee + damageDeduction;
      const refundAmount = Math.max(0, rental.securityDeposit - totalDeduction);

      let depositStatus = 'REFUNDED';
      if (totalDeduction >= rental.securityDeposit) depositStatus = 'FULLY_DEDUCTED';
      else if (totalDeduction > 0) depositStatus = 'PARTIALLY_DEDUCTED';

      const now = new Date().toLocaleString();

      rental.status = 'Returned';
      rental.depositStatus = depositStatus;
      rental.inspectionReport = {
        condition: inspectionData.condition || 'Good',
        damageNotes: inspectionData.damageNotes || 'No damage reported',
        missingAccessories: inspectionData.missingAccessories || [],
        lateFee,
        deductionAmount: totalDeduction,
        refundAmount,
        inspectionDate: now
      };

      rental.timeline = rental.timeline.map(t => {
        if (t.step === 'Returned') return { ...t.toObject(), date: now, completed: true };
        if (t.step === 'Deposit Settled') return { ...t.toObject(), date: now, completed: true };
        return t;
      });

      await rental.save();

      await Product.findByIdAndUpdate(rental.productId, { $inc: { availableStock: 1 } });
      await User.findByIdAndUpdate(rental.userId, { $inc: { activeRentals: -1 } });

      if (refundAmount > 0) {
        await Payment.create({
          customer: rental.customerName,
          rentalId: rental.rentalId,
          type: 'Deposit Refund',
          amount: refundAmount,
          method: 'Direct Disburse',
          status: 'REFUNDED',
          date: now
        });
      }
      return res.json(rental);
    }

    // In-memory fallback mode
    res.json({
      status: 'Returned',
      depositStatus: 'REFUNDED',
      inspectionReport: {
        condition: inspectionData.condition || 'Good',
        damageNotes: inspectionData.damageNotes || 'No damage reported',
        refundAmount: 5000,
        inspectionDate: new Date().toLocaleString()
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
