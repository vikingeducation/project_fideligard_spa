// Require es6-promise polyfill and isomorphic-fetch
require("isomorphic-fetch");

// Dotenv
require("dotenv").config();
const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const BASEURL = "https://www.quandl.com/api/v3/";

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
  return await response.text();
};


app.get("/api/books", async (req, res, next) => {
  try {
    const query = req.query.query || "";
    const field = req.query.field || "all";
    console.log("Searching for stock data...");
    const url = `${BASEURL}/search/index.xml?key=${QUANDL_API_KEY}&q=${query}&search=${field}`;
    res.json(await ensureFetch(url));
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
