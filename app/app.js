'use strict';


var validator = require('express-validator');
var express = require('express');
var path = require('path');

var config = require('./lib/config');
var templating = require('./lib/templating');
var logging = require('./lib/logger');
var mailing = require('./lib/mailer');

var logger = require('./middleware/logger');
var error = require('./middleware/error');
var routes = require('./routes');

var app = module.exports = express();

// Set configuration
config.init(app);

var basedir = app.get('basedir');

/*
 * Configure services
 */
templating.init(app);

app.logger = logging(
  app.config,
  app.get('basedir')
);

app.mailer = mailing(
  app.config,
  app.logger
);

/*
 * Generic middlewares
 */
app.use(express.urlencoded());
app.use(validator());

// Static files
app.use('/bower_components', express.static(path.resolve(basedir, 'bower_components')));
app.use('/assets', express.static(path.resolve(basedir, 'public', 'assets')));

// Client-side app
app.use(express.static(path.resolve(basedir, 'client')));

// Load Routes
app.use(logger.requestLogger);
app.get('/', routes.index);
app.post('/', routes.post);
app.use(error.format);
app.use(logger.errorLogger);
app.use(error.handler);
