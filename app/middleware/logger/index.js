'use strict';

var util = require('util');


module.exports.errorLogger =  function(err, req, res, next) {

  var logger = req.app.get('logger');

  // No logger defined by app
  if (undefined === logger) {
    next(err);
  }

  // Only log internal errors.
  if (500 > err.statusCode) {
    next(err);
  }

  // Let winston gather all the error data, if none is present.
  err.inner = err.inner || logger.exception.getAllInfo(err);
  logger.error('Exception', err.inner);
  next(err);
};


module.exports.requestLogger = function (req, res, next) {

  var logger = req.app.get('logger');

  // No logger defined by app
  if (undefined === logger) {
    next();
  }

  // Only log requests in development mode
  if ('develpment' === req.app.get('env')) {
    var msg = util.format('HTTP %s %s', req.method, req.url);
    logger.log('info', msg, req.headers);
  }

  next();
};

