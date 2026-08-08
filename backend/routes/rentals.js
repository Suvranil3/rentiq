const router = require('express').Router();
const mongoose = require('mongoose');
const Rental = require('../models/Rental');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// In-memory store for fallback
const memoryRentals = [];

// POST /api/rentals/check-availability
router.post('/check-availability', async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json({
        available: product.availableStock > 0,
        remainingStock: product.availableStock
      });
    }

    res.json({ available: true, remainingStock: 3 });
  } catch (err) {
    next(err);
  }
});

// GET /api/rentals — admin sees all, customer sees their own
router.get('/', protect, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
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
      return res.json(rentals);
    }

    res.json(memoryRentals);
  } catch (err) {
    next(err);
  }
});

// GET /api/rentals/:id
router.get('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const isObjId = mongoose.Types.ObjectId.isValid(id);
      const query = isObjId ? { $or: [{ _id: id }, { rentalId: id }] } : { rentalId: id };
      const rental = await Rental.findOne(query)
        .populate('userId', 'name email phone')
        .populate('productId', 'name brand images dailyPrice');
      if (!rental) return res.status(404).json({ message: 'Rental not found' });
      return res.json(rental);
    }

    const found = memoryRentals.find(r => r._id === id || r.rentalId === id);
    if (!found) return res.status(404).json({ message: 'Rental not found' });
    res.json(found);
  } catch (err) {
    next(err);
  }
});

// POST /api/rentals — create rental
router.post('/', protect, async (req, res, next) => {
  try {
    const {
      productId, startDate, endDate, dailyRate, totalAmount,
      securityDeposit, deliveryMethod, deliveryAddress, paymentMethod
    } = req.body;

    const isCOD = paymentMethod === 'Cash on Delivery';
    const now = new Date().toLocaleString();

    if (mongoose.connection.readyState === 1) {
      const isObjId = mongoose.Types.ObjectId.isValid(productId);
      let product = isObjId ? await Product.findById(productId) : null;
      if (!product) product = await Product.findOne();
      if (!product) return res.status(404).json({ message: 'Product not found' });
      if (product.availableStock <= 0) {
        return res.status(400).json({ message: 'Product is currently out of stock' });
      }

      const rental = await Rental.create({
        userId: req.user._id,
        productId: product._id,
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
        paymentMethod: paymentMethod || 'Online Payment',
        status: 'Active',
        depositStatus: isCOD ? 'PENDING_COLLECTION' : 'HELD',
        paymentStatus: isCOD ? 'PENDING' : 'PAID',
        timeline: [
          { step: 'Booked', date: now, completed: true },
          { step: 'Confirmed', date: now, completed: true },
          { step: 'Picked Up / Shipped', date: deliveryMethod === 'Ship to Address' ? 'Processing Dispatch' : 'Ready for Store Pickup', completed: true },
          { step: 'Active Rental', date: startDate, completed: true },
          { step: 'Returned', date: null, completed: false },
          { step: 'Deposit Settled', date: null, completed: false }
        ]
      });

      product.availableStock -= 1;
      await product.save();

      await User.findByIdAndUpdate(req.user._id, { $inc: { totalRentals: 1, activeRentals: 1 } });

      await Payment.create([
        {
          customer: req.user.name,
          rentalId: rental.rentalId,
          type: 'Rental Fee',
          amount: totalAmount,
          method: isCOD ? 'Cash on Delivery' : 'Online Payment',
          status: isCOD ? 'PENDING' : 'PAID',
          date: now
        },
        {
          customer: req.user.name,
          rentalId: rental.rentalId,
          type: 'Deposit Hold',
          amount: securityDeposit,
          method: isCOD ? 'COD Deposit Collect' : 'Escrow Lock',
          status: isCOD ? 'PENDING' : 'HELD',
          date: now
        }
      ]);

      return res.status(201).json(rental);
    }

    // In-memory fallback
    const rand = Math.floor(1000 + Math.random() * 9000);
    const mockRental = {
      _id: `rnt-${Date.now()}`,
      rentalId: `RNT-${new Date().getFullYear()}-${rand}`,
      userId: req.user._id,
      productId: productId || 'prod-1',
      productName: 'Sony Alpha A7 III',
      customerName: req.user.name,
      customerEmail: req.user.email,
      startDate,
      endDate,
      dailyRate,
      totalAmount,
      securityDeposit,
      deliveryMethod: deliveryMethod || 'Store Pickup',
      deliveryAddress: deliveryAddress || '',
      paymentMethod: paymentMethod || 'Online Payment',
      status: 'Active',
      depositStatus: isCOD ? 'PENDING_COLLECTION' : 'HELD',
      paymentStatus: isCOD ? 'PENDING' : 'PAID',
      timeline: [
        { step: 'Booked', date: now, completed: true },
        { step: 'Confirmed', date: now, completed: true },
        { step: 'Picked Up / Shipped', date: 'Ready for Store Pickup', completed: true },
        { step: 'Active Rental', date: startDate, completed: true },
        { step: 'Returned', date: null, completed: false },
        { step: 'Deposit Settled', date: null, completed: false }
      ]
    };
    memoryRentals.unshift(mockRental);
    res.status(201).json(mockRental);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
