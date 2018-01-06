const express = require('express');
const router = express.Router();
const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const { User } = require('../models');
const { checkStatus, extractStockData, extractLastClosingPrice } = require('../helpers/fetchHelper');
const moment = require('moment');
const baseURL = 'https://www.quandl.com/api/v3';

router.get('/', (req, res, next) => {
  if (!req.query.date) {
    const error = new Error('No date');
    error.response = { status: 400, message: "No date given" };
    next(error);
  }

  let date = Date.parse(req.query.date);
  let formattedDate = moment(date).format('YYYY-MM-DD');
  const oneMonthAgo = moment(date).subtract(30, 'days').format('YYYY-MM-DD');

  if (formattedDate === 'Invalid date') {
    const error = new Error('No date');
    error.response = { status: 400, message: "Date given is invalid" };
    next(error);
  }

  fetch(`${ baseURL }/datatables/WIKI/PRICES.json?DATE.lte=${ formattedDate }&DATE.gte=${ oneMonthAgo }&api_key=${ QUANDL_API_KEY }&qopts.per_page=400&qopts.columns=ticker,date,close`)
    .then(checkStatus)
    .then(extractStockData)
    .then(stockData => {
      res.json(stockData);
    })
    .catch(error => next(error));
});

router.get('/:ticker', (req, res, next) => {
  const ticker = req.params.ticker;
  let formattedDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const threeDaysAgo = moment().subtract(3, 'days').format('YYYY-MM-DD');
  const tradeData = {};
  tradeData.ticker = ticker;

  fetch(`${ baseURL }/datatables/WIKI/PRICES.json?DATE.lte=${ formattedDate }&DATE.gte=${ threeDaysAgo }&TICKER=${ ticker }&qopts.columns=date,close&api_key=${ QUANDL_API_KEY }`)
    .then(checkStatus)
    .then(extractLastClosingPrice)
    .then(price => {
      if (!price) {
        const error = new Error('No ticker');
        error.response = { status: 404, message: "Ticker not found" };
        next(error);
      }

      tradeData.currentPrice = price;

      // need: cashAvailable, quantityOwned,
      return User.findOne().populate('portfolio');
    })
    .then(user => {
      tradeData.cashAvailable = user.cash;

      const investment = user.portfolio.find(investment => investment.ticker === ticker);

      if (!investment) {
        tradeData.quantityOwned = 0;
      } else {
        tradeData.quantityOwned = investment.shares;
      }

      res.json({ status: 200, tradeData });
    })
    .catch(error => next(error));
});

module.exports = router;
