const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const models = {};

models.User = require('./user');
models.Investment = require('./investment');
models.Transaction = require('./transaction');

module.exports = models;
