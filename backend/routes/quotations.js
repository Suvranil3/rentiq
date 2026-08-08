const router = require('express').Router();
const mongoose = require('mongoose');
const Quotation = require('../models/Quotation');
const Product = require('../models/Product');
const User = require('../models/User');
const Invoice = require('../models/Invoice');
const Rental = require('../models/Rental');
const Payment = require('../models/Payment');
const { protect, requireAdmin } = require('../middleware/auth');

// GET /api/quotations — Admin sees all, customer sees own
router.get('/', protect, async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const quotations = await Quotation.find(query).sort({ createdAt: -1 });
    res.json(quotations);
  } catch (err) {
    next(err);
  }
});

// GET /api/quotations/:id
router.get('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjId ? { $or: [{ _id: id }, { quotationId: id }] } : { quotationId: id };

    const quotation = await Quotation.findOne(query);
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });

    if (req.user.role !== 'admin' && quotation.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(quotation);
  } catch (err) {
    next(err);
  }
});

// POST /api/quotations — Admin creates quotation for customer
router.post('/', protect, requireAdmin, async (req, res, next) => {
  try {
    const {
      userId, productId, startDate, endDate, rentalFee, securityDeposit, discount
    } = req.body;

    const customer = await User.findById(userId);
    if (!customer) return res.status(404).json({ message: 'Customer user not found' });

    const isObjId = mongoose.Types.ObjectId.isValid(productId);
    let product = isObjId ? await Product.findById(productId) : null;
    if (!product) product = await Product.findOne();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const totalAmount = Math.max(0, (Number(rentalFee) + Number(securityDeposit)) - Number(discount || 0));

    const quotation = await Quotation.create({
      userId: customer._id,
      productId: product._id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      productName: product.name,
      startDate,
      endDate,
      rentalFee: Number(rentalFee),
      securityDeposit: Number(securityDeposit),
      discount: Number(discount || 0),
      totalAmount,
      status: 'DRAFT',
      createdBy: req.user._id
    });

    res.status(201).json(quotation);
  } catch (err) {
    next(err);
  }
});

// POST /api/quotations/:id/confirm — Admin confirms quotation & creates Invoice + Active Rental
router.post('/:id/confirm', protect, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjId ? { $or: [{ _id: id }, { quotationId: id }] } : { quotationId: id };

    const quotation = await Quotation.findOne(query);
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    if (quotation.status !== 'DRAFT') {
      return res.status(400).json({ message: `Quotation is already ${quotation.status}` });
    }

    const product = await Product.findById(quotation.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.availableStock <= 0) {
      return res.status(400).json({ message: 'Product is currently out of stock' });
    }

    quotation.status = 'CONFIRMED';
    await quotation.save();

    const now = new Date().toLocaleString();

    // 1. Create Invoice
    const invoice = await Invoice.create({
      quotationId: quotation.quotationId,
      userId: quotation.userId,
      customerName: quotation.customerName,
      customerEmail: quotation.customerEmail,
      rentalFee: quotation.rentalFee,
      securityDeposit: quotation.securityDeposit,
      totalAmount: quotation.totalAmount,
      paymentStatus: 'PAID'
    });

    // 2. Create Active Rental Order
    const rental = await Rental.create({
      userId: quotation.userId,
      productId: quotation.productId,
      productName: quotation.productName,
      customerName: quotation.customerName,
      customerEmail: quotation.customerEmail,
      startDate: quotation.startDate,
      endDate: quotation.endDate,
      dailyRate: product.dailyPrice,
      totalAmount: quotation.totalAmount,
      securityDeposit: quotation.securityDeposit,
      deliveryMethod: 'Store Pickup',
      deliveryAddress: 'In-Store Counter',
      paymentMethod: 'In-Store Cash/Card',
      status: 'Active',
      depositStatus: 'HELD',
      paymentStatus: 'PAID',
      timeline: [
        { step: 'Booked', date: now, completed: true },
        { step: 'Confirmed', date: now, completed: true },
        { step: 'Picked Up / Shipped', date: 'In-Store Handover', completed: true },
        { step: 'Active Rental', date: quotation.startDate, completed: true },
        { step: 'Returned', date: null, completed: false },
        { step: 'Deposit Settled', date: null, completed: false }
      ]
    });

    // 3. Decrement Product Stock
    product.availableStock -= 1;
    await product.save();

    // 4. Record Payment Transactions
    await Payment.create([
      {
        customer: quotation.customerName,
        rentalId: rental.rentalId,
        type: 'Rental Fee',
        amount: quotation.rentalFee,
        method: 'In-Store Cash/Card',
        status: 'PAID',
        date: now
      },
      {
        customer: quotation.customerName,
        rentalId: rental.rentalId,
        type: 'Deposit Hold',
        amount: quotation.securityDeposit,
        method: 'Escrow Lock',
        status: 'HELD',
        date: now
      }
    ]);

    res.json({
      message: 'Quotation confirmed, invoice generated, and active rental initialized!',
      quotation,
      invoice,
      rental
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/quotations/:id/cancel
router.post('/:id/cancel', protect, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjId ? { $or: [{ _id: id }, { quotationId: id }] } : { quotationId: id };

    const quotation = await Quotation.findOne(query);
    if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
    if (quotation.status === 'CONFIRMED') {
      return res.status(400).json({ message: 'Confirmed quotations cannot be cancelled' });
    }

    quotation.status = 'CANCELLED';
    await quotation.save();
    res.json(quotation);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
