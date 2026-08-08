const router = require('express').Router();
const Pricelist = require('../models/Pricelist');
const { protect, requireAdmin } = require('../middleware/auth');

// GET /api/pricelists
router.get('/', async (req, res, next) => {
  try {
    const pricelists = await Pricelist.find().sort({ category: 1 });
    res.json(pricelists);
  } catch (err) {
    next(err);
  }
});

// POST /api/pricelists — Admin create/update tier
router.post('/', protect, requireAdmin, async (req, res, next) => {
  try {
    const { category, hourlyRate, dailyRate, weeklyRate, monthlyRate, securityDeposit } = req.body;
    const pricelist = await Pricelist.findOneAndUpdate(
      { category },
      { category, hourlyRate, dailyRate, weeklyRate, monthlyRate, securityDeposit },
      { new: true, upsert: true }
    );
    res.json(pricelist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
