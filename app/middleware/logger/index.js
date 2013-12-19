'use strict';

module.exports.errorLogger = errorLogger;
module.exports.requestLogger = requestLogger;


function errorLogger() {
  return function(err, req, res, next) {
    var logger = req.app.get('logger');

    // Let winston gather all the error data.
    var exceptionMeta = logger.exception.getAllInfo(err);
    logger.error('exception', exceptionMeta);
    next(err);
  }
}

function requestLogger() {
  return function (req, res, next) {
    req.app.get('logger').info('Bingo');
    next();
  };
}
