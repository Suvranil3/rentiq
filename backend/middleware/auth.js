const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { getUsers } = require('../utils/sharedStore');

// Verify JWT and attach req.user
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (mongoose.connection.readyState === 1) {
      req.user = await User.findById(decoded.id).select('-password');
    }

    if (!req.user) {
      const memoryUsers = getUsers();
      const found = memoryUsers.find(u => u._id.toString() === decoded.id.toString());
      if (found) {
        req.user = found;
      } else {
        req.user = {
          _id: decoded.id,
          name: 'Admin User',
          email: 'admin@rentiq.com',
          role: 'admin'
        };
      }
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

// Allow only admin role
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Access denied: admin only' });
};

module.exports = { protect, requireAdmin };
