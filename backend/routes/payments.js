const router = require('express').Router();
const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const { protect, requireAdmin } = require('../middleware/auth');

// GET /api/payments — admin only
router.get('/', protect, requireAdmin, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const payments = await Payment.find().sort({ createdAt: -1 });
      return res.json(payments);
    }

    res.json([
      {
        _id: 'p-1',
        transactionId: 'TXN-9011',
        customer: 'Alex Johnson',
        rentalId: 'RNT-2026-8801',
        type: 'Rental Fee',
        amount: 4500,
        method: 'Credit Card',
        status: 'PAID',
        date: '2026-08-03 10:15 AM'
      },
      {
        _id: 'p-2',
        transactionId: 'TXN-9012',
        customer: 'Alex Johnson',
        rentalId: 'RNT-2026-8801',
        type: 'Deposit Hold',
        amount: 5000,
        method: 'Escrow Lock',
        status: 'HELD',
        date: '2026-08-03 10:15 AM'
      }
    ]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
