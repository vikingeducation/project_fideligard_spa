require("es6-promise").polyfill;
require("isomorphic-fetch");
require("dotenv").config();
const app = require("express")();
const fs = require("fs");

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const baseUrl = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?api_key=${QUANDL_API_KEY}&qopts.columns=ticker,date,close`;

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const checkStatus = response => {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response;
};

const {
  parseSymbols,
  parseStartDate,
  isDateCorrect
} = require('./helpers');

app.get("/api/stocks", (req, res, next) => {
  console.log("Requesting search data from Quandl...");
  if (!req.query.symbols || !req.query.date) {
    res.status(400).json({"Error": "You must include a date and symbols query with every request."});
  } else if (!isDateCorrect(req.query.date)) {
    res.status(400).json({"Error": "Date must be formatted in the following manner: YYYY-MM-DD"});
  } else {
    next();
  }
}, (req, res, next) => {
  let symbols = parseSymbols(req.query.symbols);
  let endDate = req.query.date;
  let startDate = parseStartDate(endDate);
  fetch(`${baseUrl}&ticker=${symbols.toString()}&date.lte=${endDate}&date.gte=${startDate}`)
    .then(checkStatus)
    .then(response => response.json())
    .then(json => {
      res.json(json.datatable);
    })
    .catch(error => {
      next(error);
    });
});

const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
};

app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`Find the server at http://localhost:${app.get("port")}/`);
});
