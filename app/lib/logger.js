'use strict';

var util = require('util');
var winston = require('winston');

module.exports.init = function(app) {
  winston.add(winston.transports.File, {
    filename: app.config.get('log')
  });

  app.logger = winston;
}
