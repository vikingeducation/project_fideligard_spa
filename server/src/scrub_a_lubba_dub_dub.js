const fetch = require("node-fetch");
const pricesJSON = require("./prices.json");
require("dotenv").config();

const BASE_URL = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json";
const API_KEY = process.env.API_KEY;
const STOCK_LIST =
  "AAPL,FB,GOOGL,PCLN,AMZN,CMG,HOG,ZEUS,BUD,LUV,LVB,GRR,COOL,FIZZ,BOOM";

const parseJSON = prices => {
  let obj = {};
  prices.map(price => {
    obj[price[1]] = obj[price[1]] || {};
    obj[price[1]][price[0]] = price[2];
  });
  let date = new Date("2015", "00", "02");
  let keyString;
  let previous;
  for (let i = 0; i < 364; i++) {
    let newdate = new Date(date);
    newdate.setDate(newdate.getDate() + i);
    keyString = newdate.toISOString().split("T")[0];
    if (obj[keyString]) {
      previous = keyString;
    } else {
      obj[keyString] = obj[previous];
    }
  }
  return obj;
};
