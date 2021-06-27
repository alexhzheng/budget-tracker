/** @format */

const Budget = require('../models/Budget');

// @desc Edit budget
// @route
// @ public
exports.getBudget = async (req, res, next) => {
  try {
    const budgets = await Budget.find({});
    const budget = budgets[0];
    return res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
exports.editBudget = async (req, res, next) => {
  try {
    const query = { __v: '0' };
    const update = { $set: { amount: req.params.budget } };
    const budget = await Budget.findOneAndUpdate(query, update, {
      upsert: true,
      sort: { created: -1 },
    });
    console.log(budget);
    return res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
