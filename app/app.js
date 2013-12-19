'use strict';

var cons = require('consolidate');
// var config = require('./config')
var express = require('express');
var path = require('path');
var routes = require('./routes');
var winston = require('winston');
var logger = require('./middleware/logger');
var app = module.exports = express();


/*
 * Middlewares
 */
// config
// log

/*
 * Configure our app
 */
// Template engine
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.locals({
  partials: {
    top: 'partials/top',
    bottom: 'partials/bottom'
  }
});

// Logging
winston.add(winston.transports.File, { filename: 'log/app.log' });
app.set('logger', winston);

// load routes
app.use(logger.requestLogger());
app.get('/', routes.index);

// app.post
// static files

//app.use(logger.errorLogger);




