const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');
const { getUsers, addUser } = require('../utils/sharedStore');

// GET /api/users — admin only, returns all users (customers and admins)
router.get('/', protect, requireAdmin, async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const users = await User.find().sort({ role: 1, createdAt: -1 });
      return res.json(users);
    }

    // In-memory / Fallback user list
    res.json(getUsers());
  } catch (err) {
    next(err);
  }
});

// POST /api/users/create-admin — admin only, create a new admin account
router.post('/create-admin', protect, requireAdmin, async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const adminUser = await User.create({
        name,
        email: cleanEmail,
        password,
        phone: phone || '',
        role: 'admin',
        status: 'Active'
      });

      return res.status(201).json({ message: 'Admin user account created successfully', user: adminUser.toJSON() });
    }

    // Memory Fallback
    const newUser = {
      _id: `admin-${Date.now()}`,
      name,
      email: cleanEmail,
      phone: phone || '',
      role: 'admin',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      totalRentals: 0,
      activeRentals: 0
    };
    addUser(newUser);
    res.status(201).json({ message: 'Admin user account created successfully', user: newUser });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/users/:id/role — change user role between admin and customer
router.patch('/:id/role', protect, requireAdmin, async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['admin', 'customer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be admin or customer' });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: `Role updated to ${role}`, user: user.toJSON() });
    }

    res.json({ message: `Role updated to ${role}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
