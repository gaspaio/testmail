'use strict';
var config = require('nconf');
var path = require('path');

// TODO Extend app object with app.config

module.exports.init = function(app) {
  var appdir = app.get('appdir');
  var basedir = app.get('basedir');

  config
    .argv()
    .env()
    .file({file: path.resolve(appdir, 'config', 'config.json')})
    .defaults({
      'log': {file: path.resolve(basedir, 'log', 'app.log')},
      'env': 'production'
    });

  app.config = config;
}
