'use strict';
var mailer = require('express-mailer');

module.exports.init = function(app) {
  var config = app.get('config');

  mailer.extend(app, {
    host: config.get('mailer.host'),
    secureConnection: config.get('mailer.ssl'),
    port: config.get('mailer.port'),
    transportMethod: config.get('mailer.transport'),
    auth: {
      user: config.get('mailer.auth.user'),
      pass: config.get('mailer.auth.password')
    }
  });
}
