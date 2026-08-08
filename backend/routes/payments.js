const router = require('express').Router();
const Payment = require('../models/Payment');
const { protect, requireAdmin } = require('../middleware/auth');

// GET /api/payments — admin only
router.get('/', protect, requireAdmin, async (req, res, next) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
