const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const { User, Transaction } = require('../models');
const { checkStatus, extractStockData } = require('../helpers/fetchHelper');
const baseURL = 'https://www.quandl.com/api/v3';
const moment = require('moment');

const PortfolioService = {
  getPortfolio: () => {
    return new Promise((resolve, reject) => {
      let today = moment().format('YYYY-MM-DD');
      const oneMonthAgo = moment().subtract(30, 'days').format('YYYY-MM-DD');
      const portfolio = {};

      User.findOne()
        .populate('portfolio')
        .then(user => {
          portfolio.user = user;
          portfolio.investments = [];

          const tickers = user.portfolio.map(i => i.ticker).join(',');
          return fetch(`${ baseURL }/datatables/WIKI/PRICES.json?DATE.lte=${ today }&DATE.gte=${ oneMonthAgo }&api_key=${ QUANDL_API_KEY }&TICKER=${ tickers }&qopts.columns=ticker,date,close`);
        })
        .then(checkStatus)
        .then(stocks => extractStockData(stocks.datatable.data, null))
        .then(stocks => {
          for (let investment of [...portfolio.user.portfolio]) {
            const stock = stocks.stockData.find(s => s.code === investment.ticker);
            const { currentPrice, oneDayDiff, sevenDayDiff, thirtyDayDiff } = stock;

            const investmentData = {
              code: investment.ticker,
              quantity: investment.shares,
              currentValue: investment.shares * currentPrice,
              currentPrice,
              oneDayDiff,
              sevenDayDiff,
              thirtyDayDiff
            };

            portfolio.investments.push(investmentData);
          }

          return Transaction.find();
        })
        .then(transactions => {
          portfolio.transactions = transactions;

          resolve(portfolio);
        })
        .catch(e => reject(e));
    });
  }
};

module.exports = PortfolioService;
