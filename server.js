require("es6-promise").polyfill;
require("isomorphic-fetch");
require("dotenv").config();
const app = require("express")();
const fs = require("fs");

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
// const baseUrl = "https://www.goodreads.com/";

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


app.get("/api/search", (req, res, next) => {
  console.log("Requesting search data from GoodReads...");
  // const q = req.query.q || "B";
  // fetch(`${baseUrl}/search/index.xml?key=${QUANDL_API_KEY}&q=${q}`)
  //   .then(checkStatus)
  //   .then(response => response.text())
  //   .then(parseXML)
  //   .then(json => {
  //     res.json(json.GoodreadsResponse.search.results.work || []);
  //   })
  //   .catch(error => {
  //     next(error);
  //   });
});

app.get("/api/book", (req, res, next) => {
  console.log("Requesting selected book data from GoodReads...");
  // const { id } = req.query;
  // fetch(`${baseUrl}/book/show/${id}.xml?key=${QUANDL_API_KEY}`)
  //   .then(checkStatus)
  //   .then(response => response.text())
  //   .then(parseXML)
  //   .then(json => {
  //     res.json(json.GoodreadsResponse.book || {});
  //   })
  //   .catch(error => {
  //     next(error);
  //   });
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
