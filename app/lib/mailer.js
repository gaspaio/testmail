'use strict';
var mailer = require('express-mailer');

module.exports.init = function(app) {
  var mailConfig = app.config.get("mail") || {};

  if (!('debug' in mailConfig)) {
    mailConfig.debug = app.get('env') === 'development';
  }

  mailer.extend(app, mailConfig);
}
