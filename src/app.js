const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();

const addCORSHeaders = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(addCORSHeaders);
app.use(router);

module.exports = app;