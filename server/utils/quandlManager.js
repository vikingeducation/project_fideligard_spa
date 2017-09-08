const superagent = require('superagent');
require('dotenv').config();

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;

module.exports = {
  get: async params => {
    try {
      const URL = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=AAPL,AMZN,GOOG,NFLX,DIS,TSLA,TWTR,MSFT,VZ,ABBV,WMT,UTHR,BCO&date.gte=20170101&date.lte=20170105&api_key=${QUANDL_API_KEY}`;

      const response = await superagent
        .get(URL)
        .query(params)
        .set('Accept', 'application/json')
        .buffer();
      console.log(await response.body);
      return await response.body;
    } catch (e) {
      console.error(e.stack);
    }
  }
};
