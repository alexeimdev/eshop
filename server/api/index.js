const express = require('express');

const products = require('./products');
const categories = require('./categories');

const api = express.Router();

api.use('/products', products);
api.use('/categories', categories);

module.exports = api;