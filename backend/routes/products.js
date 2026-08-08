const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { protect, requireAdmin } = require('../middleware/auth');

// Initial seed products for No-DB fallback mode
const memoryProducts = [
  {
    _id: 'prod-1',
    id: 'prod-1',
    name: 'Sony Alpha A7 III',
    brand: 'Sony',
    category: 'Camera',
    description: 'Full-frame mirrorless camera with 24.2MP sensor. Perfect for professional photography.',
    dailyPrice: 1500,
    weeklyPrice: 8500,
    monthlyPrice: 28000,
    securityDeposit: 25000,
    totalStock: 3,
    availableStock: 3,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '24.2MP Full-Frame', 'ISO': '100-51200', 'Video': '4K HDR' }
  },
  {
    _id: 'prod-2',
    id: 'prod-2',
    name: 'Canon EOS R5',
    brand: 'Canon',
    category: 'Camera',
    description: 'High-resolution 45MP mirrorless camera with 8K RAW video recording.',
    dailyPrice: 2000,
    weeklyPrice: 12000,
    monthlyPrice: 40000,
    securityDeposit: 35000,
    totalStock: 2,
    availableStock: 2,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Sensor': '45MP Full-Frame', 'ISO': '100-102400', 'Video': '8K RAW' }
  },
  {
    _id: 'prod-3',
    id: 'prod-3',
    name: 'DJI Ronin-S Gimbal',
    brand: 'DJI',
    category: 'Stabilizer',
    description: '3-axis gimbal stabilizer for DSLR and mirrorless cameras up to 3.6kg.',
    dailyPrice: 800,
    weeklyPrice: 4500,
    monthlyPrice: 15000,
    securityDeposit: 12000,
    totalStock: 4,
    availableStock: 4,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1571945147346-4b7fd5df5c41?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Payload': '3.6 kg', 'Battery Life': '12 hours' }
  },
  {
    _id: 'prod-4',
    id: 'prod-4',
    name: 'Rode NT1-A Studio Microphone',
    brand: 'Rode',
    category: 'Audio',
    description: 'Studio-quality condenser microphone with ultra-low noise floor.',
    dailyPrice: 400,
    weeklyPrice: 2200,
    monthlyPrice: 7500,
    securityDeposit: 8000,
    totalStock: 5,
    availableStock: 5,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'],
    specifications: { 'Type': 'Condenser', 'Pattern': 'Cardioid' }
  }
];

// GET /api/products — public, supports filters
router.get('/', async (req, res, next) => {
  try {
    const { category, brand, search, maxPrice, availableOnly } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (category && category !== 'All') query.category = category;
      if (brand && brand !== 'All') query.brand = brand;
      if (maxPrice) query.dailyPrice = { $lte: Number(maxPrice) };
      if (availableOnly === 'true') query.availableStock = { $gt: 0 };
      if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [{ name: regex }, { brand: regex }, { category: regex }];
      }
      const products = await Product.find(query).sort({ createdAt: -1 });
      return res.json(products);
    }

    // In-memory fallback mode
    let list = [...memoryProducts];
    if (category && category !== 'All') list = list.filter(p => p.category === category);
    if (brand && brand !== 'All') list = list.filter(p => p.brand === brand);
    if (maxPrice) list = list.filter(p => p.dailyPrice <= Number(maxPrice));
    if (availableOnly === 'true') list = list.filter(p => p.availableStock > 0);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id — public
router.get('/:id', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json(product);
    }

    // In-memory fallback
    const product = memoryProducts.find(p => p._id === req.params.id || p.id === req.params.id) || memoryProducts[0];
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products — admin only
router.post('/', protect, requireAdmin, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    }

    const newProd = {
      _id: `prod-${Date.now()}`,
      id: `prod-${Date.now()}`,
      ...req.body,
      availableStock: req.body.totalStock || 1,
      status: 'Available'
    };
    memoryProducts.unshift(newProd);
    res.status(201).json(newProd);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id — admin only
router.put('/:id', protect, requireAdmin, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json(product);
    }

    const idx = memoryProducts.findIndex(p => p._id === req.params.id || p.id === req.params.id);
    if (idx !== -1) {
      memoryProducts[idx] = { ...memoryProducts[idx], ...req.body };
      return res.json(memoryProducts[idx]);
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id — admin only
router.delete('/:id', protect, requireAdmin, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json({ message: 'Product deleted' });
    }

    const idx = memoryProducts.findIndex(p => p._id === req.params.id || p.id === req.params.id);
    if (idx !== -1) {
      memoryProducts.splice(idx, 1);
      return res.json({ message: 'Product deleted' });
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
