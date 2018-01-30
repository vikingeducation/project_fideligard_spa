require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Database
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const stocks = require('./routers/stocks');
const transactions = require('./routers/transactions');
const portfolios = require('./routers/portfolios');

app.use('/api/v1/stocks', stocks);
app.use('/api/v1/transactions', transactions);
app.use('/api/v1/portfolios', portfolios);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.response ? err.response.status : 500);
  res.json(err.response);
  next();
};

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
