const router = require('express').Router();
const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
const { protect } = require('../middleware/auth');

// GET /api/invoices — Admin sees all, customer sees own
router.get('/', protect, async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const invoices = await Invoice.find(query).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    next(err);
  }
});

// GET /api/invoices/:id
router.get('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjId ? { $or: [{ _id: id }, { invoiceId: id }] } : { invoiceId: id };

    const invoice = await Invoice.findOne(query);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    if (req.user.role !== 'admin' && invoice.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(invoice);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
