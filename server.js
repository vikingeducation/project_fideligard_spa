// Require es6-promise polyfill and isomorphic-fetch
require("isomorphic-fetch");

//require fs
const fs = require("fs");

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

// Extract check status function for reuse
const ensureFetch = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return await response.json();
};

app.get("/api/stocks", async (req, res, next) => {
  try {
    const stocks = [
      "AAPL",
      "MSFT",
      "TM",
      "IBM",
      "CFCO",
      "VZ",
      "KO",
      "QCOM",
      "DELL",
      "MOT",
      "BA",
      "MMM",
      "HMC",
      "CAT",
      "BT",
      "BF"
    ];

    for (let stock of stocks) {
      const url = `${BASE_URL}${stock}.json?api_key=${QUANDL_API_KEY}`;
      fs.appendFileSync(
        "./stockData.json",
        JSON.stringify(await ensureFetch(url))
      );
    }

    res.send("results.length");
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
