const superagent = require('superagent')
require('dotenv').config()

const QANDL_API_KEY = process.env.QANDL_API_KEY

module.exports = {
  get: async (term)=>{
    try {
      const URL = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=FB&qopts.columns=date,open&api_key=${QANDL_API_KEY}`

      const response = await superagent
        .get(URL)
        .set('Accept', 'application/json')
 //       .buffer()
      console.log(response)
//      return (await response)
    }

    catch (e) {
      console.error(e.stack)
    }
  }
}