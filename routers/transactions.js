const express = require('express');
const router = express.Router();
const { Transaction } = require('../models');
const TransactionService = require('../services/transactionService');

router.get('/', (req, res, next) => {
  Transaction.find()
    .then(transactions => {
      res.json(transactions);
    })
    .catch(e => next(e));
});

router.post('/', (req, res, next) => {
  const { shares } = req.body;

  if (!shares || !shares.trim()) {
    res.json({ status: 406, message: 'No quantity entered' });
    return;
  }

  TransactionService.handleTransaction(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(e => next(e));
});

module.exports = router;
