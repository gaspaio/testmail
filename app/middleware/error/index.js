'use strict';


module.exports.format = function(err, req, res, next) {

  err.statusCode = err.statusCode || 500;
  err.inner = err.inner || {};
}


module.exports.handler = function(err, req, res, next) {

  /*
   * If ajax request, reply json
   * if normal, show error page.
   */
  res.status(err.statusCode);
  res.json(JSON.stringify({msg: err.message, info: err.inner}));
}

