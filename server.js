const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const webpack = require('webpack');
const config = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const request = require('request');

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Controllers
// const yourController = require('./controllers/yourController');

const app = express();

const compiler = webpack(config);

if (app.get('env') === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.set('views', path.join(__dirname, 'public'));
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiUrlBase = 'https://api.brewerydb.com/v2/';

app.get('/styles', (req, res) => {
  const url = `${apiUrlBase}styles?key=${process.env.BREW_API}&format=json`;
  request(url, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const result = JSON.parse(body);
      return res.status(200).send(result);
    } else {
      return res.status(500).send(err);
    }
  });
});

function buildApiUrlParams(query) {
  const style = query.styleId ? `&styleId=${query.styleId}` : '';
  const name = query.name ? `&name=${query.name}` : '';
  const page = query.p ? `&p=${query.p}` : '';
  const orderBy = query.order ? `&order=${query.order}&sort=desc` : '';
  const isOrganic = query.isOrganic ? `&isOrganic=${query.isOrganic}` : '';

  return `${style}${name}${page}${orderBy}${isOrganic}`;
}

app.get('/beers', (req, res) => {
  const urlParams = buildApiUrlParams(req.query);

  if (!urlParams) {
    return res.status(400).send({ message: 'StyleID or Name required.' });
  }

  const url = `${apiUrlBase}beers?key=${process.env.BREW_API}&format=json${urlParams}`;
  request(url, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const result = JSON.parse(body);
      return res.status(200).send(result);
    } else {
      return res.status(500).send(err);
    }
  });
  return {};
});

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res) => {
    return res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

module.exports = app;
