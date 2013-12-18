'use strict';

var express = require('express');
var path = require('path');

var app = module.exports = express();

app.get('/', renderPage);

// Set path to templates
app.set('views', path.join(__dirname, '../views'));


function renderPage(req, res) {
  var info = {
    partials: {
      top: 'partials/top',
      bottom: 'partials/bottom'
    }
  };

  res.render('app', info);
}
