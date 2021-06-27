/** @format */

const express = require('express');
const router = express.Router();

const { editBudget, getBudget } = require('../controllers/Budget');

router.route('/').get(getBudget);
router.route('/:budget').put(editBudget);

module.exports = router;
