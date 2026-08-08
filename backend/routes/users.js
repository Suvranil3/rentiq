const router = require('express').Router();
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');

// GET /api/users — admin only
router.get('/', protect, requireAdmin, async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
