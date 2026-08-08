const router = require('express').Router();
const Address = require('../models/Address');
const { protect } = require('../middleware/auth');

// GET /api/addresses — Customer gets own addresses
router.get('/', protect, async (req, res, next) => {
  try {
    const addresses = await Address.find({ userId: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
    res.json(addresses);
  } catch (err) {
    next(err);
  }
});

// POST /api/addresses — Add new address
router.post('/', protect, async (req, res, next) => {
  try {
    const { fullName, phone, street, city, state, zip, country, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ userId: req.user._id }, { isDefault: false });
    }

    const address = await Address.create({
      userId: req.user._id,
      fullName: fullName || req.user.name,
      phone: phone || req.user.phone,
      street,
      city,
      state,
      zip,
      country: country || 'India',
      isDefault: !!isDefault
    });

    res.status(201).json(address);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/addresses/:id — Delete address (owner only)
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ message: 'Address not found' });
    if (address.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await address.deleteOne();
    res.json({ message: 'Address deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
