const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const app = express();

const _public = path.join(__dirname, '../public');

app.use(express.static(_public));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/*', (req, res) => {
  res.sendFile(`${_public}/index.html`);
});

module.exports = app;