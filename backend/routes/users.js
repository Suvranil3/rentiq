const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');
const { getUsers } = require('../utils/sharedStore');

// GET /api/users — admin only
router.get('/', protect, requireAdmin, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const users = await User.find({ role: 'customer' }).sort({ createdAt: -1 });
      if (users && users.length > 0) {
        return res.json(users);
      }
    }

    // In-memory / Fallback user list (includes all newly registered users)
    res.json(getUsers());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
