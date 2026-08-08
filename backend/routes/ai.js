const router = require('express').Router();
const Rental = require('../models/Rental');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');

// GET /api/ai/insights — admin dashboard analytics
router.get('/insights', protect, requireAdmin, async (req, res, next) => {
  try {
    const [
      totalProducts,
      availableProducts,
      totalRentals,
      activeRentals,
      overdueRentals,
      returnedRentals,
      totalUsers
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ availableStock: { $gt: 0 } }),
      Rental.countDocuments(),
      Rental.countDocuments({ status: 'Active' }),
      Rental.countDocuments({ status: 'Overdue' }),
      Rental.countDocuments({ status: 'Returned' }),
      User.countDocuments({ role: 'customer' })
    ]);

    // Revenue: sum of totalAmount for all rentals
    const revenueAgg = await Rental.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // Top rented products
    const topProductsAgg = await Rental.aggregate([
      { $group: { _id: '$productId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $project: { name: '$product.name', category: '$product.category', count: 1, _id: 0 } }
    ]);

    // Monthly rentals trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const monthlyTrend = await Rental.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          rentals: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { month: '$_id', rentals: 1, revenue: 1, _id: 0 } }
    ]);

    res.json({
      summary: {
        totalProducts,
        availableProducts,
        totalRentals,
        activeRentals,
        overdueRentals,
        returnedRentals,
        totalUsers,
        totalRevenue
      },
      topProducts: topProductsAgg,
      monthlyTrend,
      predictions: [
        {
          type: 'Demand Spike',
          message: `${activeRentals} active rentals currently. Peak demand expected in upcoming weekends.`,
          confidence: 87,
          severity: 'info'
        },
        overdueRentals > 0 && {
          type: 'Overdue Alert',
          message: `${overdueRentals} rental(s) are overdue. Immediate follow-up recommended.`,
          confidence: 99,
          severity: 'critical'
        }
      ].filter(Boolean)
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
