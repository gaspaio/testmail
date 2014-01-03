'use strict';

// Configure winston to log uncaught exceptions (and let process end).

var logger = require('winston');

module.exports = function(config) {

  var options = config.get('log') || {}

  if ('test' === config.get('env')) {

    // Log to memory in testing
    logger.add(logger.transports.Memory, {
      timestamp: true,
      json: true
    });

    logger.flush = function flush() {
      var out = logger.transports.memory.writeOutput;
      logger.transports.memory.writeOutput = [];
      return out;
    };
  }
  else {

    // Log to a file in production / development
    if ('file' in options) {
      logger.add(logger.transports.File, {
        filename: options.file,
        timestamp: true,
        json: true
      });
    }
  }

  return logger;
}
