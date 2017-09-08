// Require es6-promise polyfill and isomorphic-fetch
require("isomorphic-fetch");

//require fs
const fs = require("fs");
const moment = require("moment");

// Dotenv
require("dotenv").config();
const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const BASE_URL = "https://www.quandl.com/api/v3/datasets/EOD/";

// Express
const express = require("express");
const app = express();

// Set development port to 3001
app.set("port", process.env.PORT || 3001);

// When in production, only serve static assets
// from the client/build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const day = i => {
  return moment()
    .year(2016)
    .dayOfYear(i)
    .startOf("day")
    .unix();
};

const getFirstPrice = prices => {
  let i = 1;
  while (!prices[day(i++)]) {}
  return prices[day(i)];
};

const buildPriceHash = company => {
  return company.dataset.data.reduce((acc, [date, price]) => {
    acc[moment(date).unix()] = price;
    return acc;
  }, {});
};

const buildPricesData = company => {
  const prices = buildPriceHash(company);
  let mostRecentPrice = getFirstPrice(prices);
  return [...Array(366)].map((_, i) => {
    const price = prices[day(i)];
    mostRecentPrice = price ? price : mostRecentPrice;
    return { [day(i)]: mostRecentPrice };
  });
};

const gatherData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync("./stockData.json", "utf8"));
    return data.map(company => {
      return {
        code: company.dataset.dataset_code,
        prices: buildPricesData(company)
      };
    });
  } catch (error) {
    next(error);
  }
};

app.get("/api/stocks", async (req, res, next) => {
  const companies = await gatherData();
  res.send(JSON.stringify(companies));
});

// Defines next action for errors
app.use((err, req, res, next) => {
  console.error("Error: ", err.stack);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
