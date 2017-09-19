// Require es6-promise polyfill and isomorphic-fetch
require("isomorphic-fetch");

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

const tickers = [
  "AAPL",
  "MSFT",
  "IBM",
  "VZ",
  "KO",
  "BA",
  "MMM",
  "CAT",
  "V",
  "UNH",
  "PG",
  "GS",
  "MRK",
  "UTX",
  "TRV"
];

// Gather and parse data
const helper = require("./quandl-eod-helper");
const Eod = new helper();
Eod.setTickers(tickers);
Eod.setYear("2016");
Eod.fetch();

// Endpoint!
app.get("/api/stocks", (req, res) => {
  const data = Eod.data();
  res.json(data);
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
