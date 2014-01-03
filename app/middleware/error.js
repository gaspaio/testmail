'use strict';
var util = require('util');
var http = require('http');


module.exports.format = function(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.inner = err.inner || {};
  next(err);
}


module.exports.handler = function(err, req, res, next) {

  res.status(err.statusCode);

  if (req.xhr) {
    res.json({msg: err.message, info: err.inner});
  }

  res.send(util.format("%d %s : %s", err.statusCode, http.STATUS_CODES[err.statusCode], err.message));
}

