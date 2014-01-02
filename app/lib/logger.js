'use strict';

// Configure winston to log uncaught exceptions (and let process end).

var util = require('util');
var winston = require('winston');

module.exports = function(config) {

  var options = config.get('log') || {}

  if ('file' in options) {
    winston.add(winston.transports.File, {
      filename: options.file
    });
  }

  return winston;
}
