const express = require('express');
const dotenv = require('dotenv').config();
const api = require('./api');

const HTTP_PORT = process.env.HTTP_PORT || 5000 ;

const app = express();

app.use(express.json())
app.use('/api', api);

app.listen(HTTP_PORT, () => {
    console.log('[server]', 'server is up on port', HTTP_PORT);
})