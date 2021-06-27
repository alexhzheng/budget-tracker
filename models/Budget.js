/** @format */

const mongoose = require('mongoose');
const BudgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add a number'],
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);
