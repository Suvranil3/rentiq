const router = require('express').Router();
const Product = require('../models/Product');
const { protect, requireAdmin } = require('../middleware/auth');

// GET /api/products — public, supports filters
router.get('/', async (req, res, next) => {
  try {
    const { category, brand, search, maxPrice, availableOnly } = req.query;
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
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id — public
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products — admin only
router.post('/', protect, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id — admin only
router.put('/:id', protect, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id — admin only
router.delete('/:id', protect, requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
