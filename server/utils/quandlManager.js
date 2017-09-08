const superagent = require('superagent');
require('dotenv').config();

const QANDL_API_KEY = process.env.QANDL_API_KEY;

module.exports = {
  get: async (term, params) => {
    try {
      const URL = `https://www.quandl.com/api/v3/datasets/EOD/${term}.json?api_key=${QANDL_API_KEY}`;

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
