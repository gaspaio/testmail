'use strict';

var util = require('util');
var winston = require('winston');

module.exports.init = function(app) {
  winston.add(winston.transports.File, {
    filename: app.get('config').get('log')
  });
  app.set('logger', winston);
}