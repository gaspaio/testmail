'use strict';

var cons = require('consolidate');
// var config = require('./config')
var express = require('express');
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

// load routes
app.use(routes);


// Main form

// Static files


