const express = require("express");
const app = express();
require("dotenv").config();
const fetch = require("node-fetch");

const BASE_URL = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json";
const API_KEY = process.env.API_KEY;

// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20150101&date.lt=20160101&api_key=[api key goes here]

app.get("/api/prices", async (req, res) => {
  try {
    let response = await fetch(
      `${BASE_URL}?date=20150105,20150106&qopts.columns=ticker,date,close&api_key=${API_KEY}`
    );
    let prices = await response.json();
    console.log(prices);
    res.json(prices);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Server is now listening...");
});
