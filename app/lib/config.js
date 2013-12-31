'use strict';
var config = require('nconf');
var path = require('path');

module.exports.init = function(app) {
  var appdir = app.get('appdir');
  var basedir = app.get('basedir');

  config
    .argv()
    .env()
    .file({file: path.resolve(appdir, 'config', 'config.json')})
    .defaults({
      'log': path.resolve(basedir, 'log', 'app.log'),
      'env': 'production'
    });

  app.set('config', config)
}