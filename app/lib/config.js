'use strict';
var config = require('nconf');
var path = require('path');

module.exports.init = function(app) {

  app.set('basedir', path.resolve(__dirname, '..', '..'));
  app.set('appdir',path.resolve(__dirname, '..'));
  var confdir = path.resolve(app.get('appdir'), 'config');

  config
    .argv()
    .env()
    .file('envFile', {
      file: path.resolve(confdir, 'config.' + (config.get('NODE_ENV') || 'development') + '.json')
    })
    .file('defaultFile', {
      file: path.resolve(confdir, 'config.json')
    })
    .defaults({
      'env': 'production'
    });

  // TODO Add port config

  app.set('env', process.env.NODE_ENV || config.get('env'));
  app.config = config;
}
