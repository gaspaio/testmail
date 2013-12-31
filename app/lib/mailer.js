'use strict';
var mailer = require('express-mailer');

module.exports.init = function(app) {
  var mailConfig = app.get('config').get("mail") || {};

  if (!('debug' in mailConfig)) {
    mailConfig.debug = app.get('env') === 'development';
  }

  mailer.extend(app, mailConfig);
}
