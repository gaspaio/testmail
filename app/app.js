'use strict';

var cons = require('consolidate');
// var config = require('./config')
var express = require('express');
var path = require('path');
var routes = require('./routes');


var app = module.exports = express();


/*
 * Middlewares
 */
// config
// log

// Configure template engine
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.locals({
  partials: {
    top: 'partials/top',
    bottom: 'partials/bottom'
  }
});

// load routes
app.get('/', routes.index);
// app.post
// static files




