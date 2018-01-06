const express = require('express');
const router = express.Router();
const TransactionService = require('../services/transactionService');

router.post('/', (req, res) => {
  const { shares } = req.body;

  if (!shares || !shares.trim()) {
    res.json({ status: 406, message: 'No quantity entered' });
    return;
  }

  TransactionService.handleTransaction(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(e => res.status(500).json({ status: 500, message: e.message }));
});

module.exports = router;
