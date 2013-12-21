'use strict';

var cons = require('consolidate');
var config = require('nconf')
var express = require('express');
var path = require('path');
var routes = require('./routes');
var winston = require('winston');
var logger = require('./middleware/logger');

var app = module.exports = express();

// Base directory
var basedir = __dirname + '/..';

// Default to env mode

/*
 * Load app config
 */
config
  .argv()
  .env()
  .file({file: path.resolve(basedir, 'config', 'config.json')})
  .defaults({
    'log': path.resolve(basedir, 'log', 'app.log'),
    'env': 'production'
  })
  .set('basedir', basedir)
app.set('config', config)

// Default to production env
app.set('env', process.env.NODE_ENV || config.get('env'));
// TODO Add port config

/*
 * Configure our app
 */
// Template engine
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.locals({
  'app-title': 'Mail Tester'
});

// Define logger
winston.add(winston.transports.File, {
  filename: config.get('log')
});
app.set('logger', winston);


// Static files
app.use(express.static(__dirname + '../public'));
app.use('/bower_components', express.static(path.resolve(basedir, 'bower_components')));
app.use('/assets', express.static(path.resolve(basedir, 'public', 'assets')));

// Client-side app
app.use(express.static(path.resolve(basedir, 'client')));


// Load Routes
app.use(logger.requestLogger);
app.get('/', routes.index);

// app.post
// static files

app.use(logger.errorLogger);
