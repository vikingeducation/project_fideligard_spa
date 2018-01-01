require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { checkStatus } = require('./helpers/fetchHelper');

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Database
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require('./mongo')().then(() => next());
  }
});



// Routes go here...



const errorHandler = (err, req, res, next) => {
  res.status(err.response ? err.response.status : 500);
  res.json(err.response);
  next();
};

app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
