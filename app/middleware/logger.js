'use strict';

var util = require('util');
var winston = require('winston');

module.exports.errorLogger =  function(err, req, res, next) {

  var logger = req.app.logger;
  var statusCode = err.statusCode || 500;

  // No logger defined by app
  if (undefined === logger) {
    next(err);
  }

  // Only log internal errors.
  if (statusCode < 500) {
    next(err);
  }

  // Let winston gather all the error data, if none is present.
  err.inner = err.inner || winston.exception.getAllInfo(err);
  logger.error('Exception', err.inner);
  next(err);
};


module.exports.requestLogger = function (req, res, next) {

  var logger = req.app.logger;

  // No logger defined by app
  if (undefined === logger) {
    next();
  }

  // Only log requests in development mode
  if ('development' === req.app.config.get('env')) {
    var msg = util.format('HTTP %s %s', req.method, req.url);
    logger.log('info', msg, req.headers);
  }

  next();
};

