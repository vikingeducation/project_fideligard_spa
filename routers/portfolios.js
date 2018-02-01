const express = require('express');
const router = express.Router();
const PortfolioService = require('../services/portfolioService');

router.get('/', (req, res, next) => {
  PortfolioService.getPortfolio()
    .then(portfolio => res.json(portfolio))
    .catch(e => next(e));
});

module.exports = router;
