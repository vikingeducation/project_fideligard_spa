const superagent = require('superagent');
const fs = require('fs');
require('dotenv').config();

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;

module.exports = {
  get: async params => {
    try {
      const dirname = './data';
      let files = fs.readdirSync(dirname);

      if (!files) {
        const URL = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=AAPL,AMZN,GOOG,NFLX,DIS,TSLA,TWTR,MSFT,VZ,ABBV,WMT,UTHR,BCO&date.gte=20160101&date.lte=20161231&api_key=${QUANDL_API_KEY}`;

        const response = await superagent
          .get(URL)
          .query(params)
          .set('Accept', 'application/json')
          .buffer();

        let ouput = await response.body;

        _saveJSON(ouput);
      }

      const filePath = `./data/${files[0]}`;
      let file = fs.readFileSync(filePath, 'utf8');

      file = JSON.parse(file);

      return file.datatable.data;
    } catch (e) {
      console.error(e.stack);
    }
  }
};

function _saveJSON(data) {
  const content = JSON.stringify(data);

  fs.writeFileSync('./data/stocks.json', content, 'utf8');

  console.log('Json data saved!');
}

/*
"columns": [
{
"name": "ticker",
"type": "String"
},
{
"name": "date",
"type": "Date"
},
{
"name": "open",
"type": "BigDecimal(34,12)"
},
{
"name": "high",
"type": "BigDecimal(34,12)"
},
{
"name": "low",
"type": "BigDecimal(34,12)"
},
{
"name": "close",
"type": "BigDecimal(34,12)"
},
{
"name": "volume",
"type": "BigDecimal(37,15)"
},
{
"name": "ex-dividend",
"type": "BigDecimal(42,20)"
},
{
"name": "split_ratio",
"type": "double"
},
{
"name": "adj_open",
"type": "BigDecimal(50,28)"
},
{
"name": "adj_high",
"type": "BigDecimal(50,28)"
},
{
"name": "adj_low",
"type": "BigDecimal(50,28)"
},
{
"name": "adj_close",
"type": "BigDecimal(50,28)"
},
{
"name": "adj_volume",
"type": "double"
}
]
 */
