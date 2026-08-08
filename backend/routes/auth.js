const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { addUser, getUsers } = require('../utils/sharedStore');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { name, email, password, phone } = req.body;

      // DB Mode
      if (mongoose.connection.readyState === 1) {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });

        const user = await User.create({ name, email, password, phone: phone || '', role: 'customer' });
        const token = signToken(user._id);

        // Also track in memory store for consistency
        addUser(user.toJSON());
        return res.status(201).json({ token, user });
      }

      // No-DB In-Memory Fallback Mode
      const role = email.includes('admin') ? 'admin' : 'customer';
      const newUser = {
        _id: `u-${Date.now()}`,
        name,
        email,
        phone: phone || '',
        role,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0],
        totalRentals: 0,
        activeRentals: 0
      };
      addUser(newUser);
      const token = signToken(newUser._id);

      return res.status(201).json({ token, user: newUser });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;

      // DB Mode
      if (mongoose.connection.readyState === 1) {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.matchPassword(password))) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = signToken(user._id);
        const userObj = user.toJSON();
        return res.json({ token, user: userObj });
      }

      // No-DB In-Memory Fallback Mode
      const role = email.includes('admin') ? 'admin' : 'customer';
      const memoryUsers = getUsers();
      let existingUser = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!existingUser) {
        existingUser = {
          _id: `u-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role,
          status: 'Active',
          joinedDate: new Date().toISOString().split('T')[0],
          totalRentals: 0,
          activeRentals: 0
        };
        addUser(existingUser);
      }

      const token = signToken(existingUser._id);
      return res.json({ token, user: existingUser });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
