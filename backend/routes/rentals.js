const router = require('express').Router();
const Rental = require('../models/Rental');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');

// POST /api/rentals/check-availability
router.post('/check-availability', async (req, res, next) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({
      available: product.availableStock > 0,
      remainingStock: product.availableStock
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/rentals — admin sees all, customer sees their own
router.get('/', protect, async (req, res, next) => {
  try {
    const { status, userId } = req.query;
    const query = {};

    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    } else if (userId) {
      query.userId = userId;
    }

    if (status && status !== 'All') {
      query.status = { $regex: new RegExp(status, 'i') };
    }

    const rentals = await Rental.find(query)
      .populate('userId', 'name email phone')
      .populate('productId', 'name brand images')
      .sort({ createdAt: -1 });

    res.json(rentals);
  } catch (err) {
    next(err);
  }
});

// GET /api/rentals/:id
router.get('/:id', protect, async (req, res, next) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('productId', 'name brand images dailyPrice');

    if (!rental) return res.status(404).json({ message: 'Rental not found' });

    // Customers can only see their own
    if (req.user.role !== 'admin' && rental.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(rental);
  } catch (err) {
    next(err);
  }
});

// POST /api/rentals — create rental, decrement stock
router.post('/', protect, async (req, res, next) => {
  try {
    const {
      productId, startDate, endDate, dailyRate, totalAmount,
      securityDeposit, deliveryMethod, deliveryAddress
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.availableStock <= 0) {
      return res.status(400).json({ message: 'Product is not available' });
    }

    const now = new Date().toLocaleString();
    const rental = await Rental.create({
      userId: req.user._id,
      productId,
      productName: product.name,
      customerName: req.user.name,
      customerEmail: req.user.email,
      startDate,
      endDate,
      dailyRate,
      totalAmount,
      securityDeposit,
      deliveryMethod: deliveryMethod || 'Store Pickup',
      deliveryAddress: deliveryAddress || '',
      status: 'Active',
      depositStatus: 'HELD',
      paymentStatus: 'PAID',
      timeline: [
        { step: 'Booked', date: now, completed: true },
        { step: 'Confirmed', date: now, completed: true },
        { step: 'Picked Up / Shipped', date: deliveryMethod === 'Ship to Address' ? 'Processing Dispatch' : 'Ready for Store Pickup', completed: true },
        { step: 'Active Rental', date: startDate, completed: true },
        { step: 'Returned', date: null, completed: false },
        { step: 'Deposit Settled', date: null, completed: false }
      ]
    });

    // Decrement available stock
    product.availableStock -= 1;
    await product.save();

    // Update user rental counts
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { totalRentals: 1, activeRentals: 1 }
    });

    // Record payment transactions
    await Payment.create([
      {
        customer: req.user.name,
        rentalId: rental.rentalId,
        type: 'Rental Fee',
        amount: totalAmount,
        method: 'Online Payment',
        status: 'PAID',
        date: now
      },
      {
        customer: req.user.name,
        rentalId: rental.rentalId,
        type: 'Deposit Hold',
        amount: securityDeposit,
        method: 'Escrow Lock',
        status: 'HELD',
        date: now
      }
    ]);

    res.status(201).json(rental);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
