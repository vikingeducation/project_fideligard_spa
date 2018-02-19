require("es6-promise").polyfill;
require("isomorphic-fetch");
require("dotenv").config();
const express = require("express");
const app = express();
const FIDELIGARD_API_KEY = process.env.FIDELIGARD_API_KEY;
const baseUrl = "https://www.quandl.com/api/v3/datatables/";

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Extract checking status of response
function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.get("/:databaseCode/:dataset/:date/", (req, res, next) => {
  console.log(
    `Requesting Search: ${baseUrl}${req.params.databaseCode}/${
      req.params.dataset
    }?date=${req.params.date}&qopts.columns=ticker,date,close&api_key=APIKEY`
  );

  fetch(
    `${baseUrl}${req.params.databaseCode}/${req.params.dataset}?date=${
      req.params.date
    }&qopts.columns=ticker,date,close&api_key=${FIDELIGARD_API_KEY}`
  )
    .then(checkStatus)
    .then(response => {
      return response.json();
    })
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      next(error);
    });
});

function errorHandler(err, req, res, next) {
  console.error(`Api Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}/`);
});
