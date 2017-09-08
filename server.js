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

app.get("/api/stocks", async (req, res, next) => {
  try {
    const data = JSON.parse(fs.readFileSync("./stockData.json", "utf8"));
    const first = data[0].dataset.data;
    const obj = first.reduce((acc, [date, price]) => {
      acc[moment(date).unix()] = price;
      return acc;
    }, {});

    res.send(JSON.stringify(obj, null, 2));
  } catch (error) {
    next(error);
  }
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
