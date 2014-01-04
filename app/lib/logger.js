'use strict';

var winston = require('winston');
var path = require('path');

// TODO Configure winston to log uncaught exceptions (and let process end).

module.exports = function(appconfig, basedir) {

  var logger = new (winston.Logger)();
  var config = configDefaults(appconfig, basedir);

  logger.add(winston.transports[config.transport], config.options);

  if ('Memory' === config.transport) {
    logger.flush = function flush() {
      var out = logger.transports.memory.writeOutput;
      var err = logger.transports.memory.errorOutput;
      logger.transports.memory.clearLogs();
      return out.concat(err);
    };
  }

  return logger;
}


function configDefaults(appconfig, basedir) {

  var config = appconfig.get('log') || {};
  config.options = config.options || {};

  config.transport = config.transport || 'File';
  config.options.timestamp = true;
  config.options.json = true;

  switch (config.transport) {
    case 'File':
      config.options.filename = config.options.filename ||
        path.resolve(basedir, 'log', 'app.log');
      break;
    case 'Memory':
      break;
  }

  return config;
}
