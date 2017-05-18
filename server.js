// Import our needed node modules
require('es6-promise').polyfill;
require('isomorphic-fetch');
require('dotenv').config();
const express = require('express');

// Initialize our app
const app = express();
// Set a const for our api key in .env
const QUANDL_API_KEY = process.env.QUANDL_API_KEY;
const baseUrl = 'https://quandl.com/api/v3/datatables/WIKI/PRICES.json';

// Set the port to 3001 instead of 3000
app.set('port', process.env.PORT || 3001);

// For later when we deploy to production, use the static
// assets built in the client/build folder instead of
// hosted at localhost:3000
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Extract checking the status of the response for reuse
function checkStatus(response) {
  // If response not okay, throw an error
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  // Otherwise just return the response
  return response;
}

// Extract fetch's json parsing function for reuse
function parseJSON(response) {
  return response.json();
}

app.get('/api/quandl/:date', (req, res, next) => {
  console.log('Requesting stock data from QUANDL...');
  let date = req.params.date;
  //let date = req.body.date;
  //?date=20160912&qopts.per_page=100&qopts.columns=ticker,date,close&api_key=soaV8Boit143qWZAubE4
  fetch(
    `${baseUrl}?qopts.per_page=100&=qopts.columns=ticker,date,close&date=${date}&api_key=${QUANDL_API_KEY}`
  )
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      // Sends a json response from Express
      res.json(json);
    })
    .catch(error => {
      next(error);
    });
});

// Defines next action for errors
function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.stack}`);
  res.status(err.response ? err.response.status : 500);
  res.json({ error: err.message });
}

// Tell the app to use the errorHandler middleware
app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Find the server at http://localhost:${app.get('port')}/`);
});
