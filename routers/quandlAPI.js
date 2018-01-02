const express = require('express');
const router = express.Router();
const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const { checkStatus } = require('../helpers/fetchHelper');
const moment = require('moment');
const baseURL = 'https://www.quandl.com/api/v3';

router.get('/stocks', (req, res) => {
  let date = req.query.date;
  let formattedDate = moment(date).format('YYYY-MM-DD');
  const oneMonthAgo = moment(date).subtract(30, 'days').format('YYYY-MM-DD');

  if (!date) res.json({status: 400, message: "Bad request - No date given"});
  if (formattedDate === 'Invalid date') res.json({status: 400, message: "Bad request - Date given is invalid"});

  fetch(`${ baseURL }/datatables/WIKI/PRICES.json?DATE.lte=${ formattedDate }&DATE.gte=${ oneMonthAgo }&api_key=${ QUANDL_API_KEY }&qopts.per_page=100&qopts.columns=ticker,date,close`)
    .then(checkStatus)
    .then(json => {
      res.setHeader("content-type", 'text/json');
      res.send(JSON.stringify(json, null, 2));
    });
});

module.exports = router;
