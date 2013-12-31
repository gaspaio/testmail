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

// Base directory
var basedir = path.resolve(__dirname, '..');
app.set('basedir', basedir);
app.set('appdir',path.resolve(basedir, 'app'));

// Set configuration
config.init(app);

// Default to production env
app.set('env', process.env.NODE_ENV || app.get('config').get('env'));
// TODO Add port config

/*
 * Configure our app
 */
// Template engine
templating.init(app);

// Define logger
logging.init(app);

// Define Mailer
mailing.init(app);

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
