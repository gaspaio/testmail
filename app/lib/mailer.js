'use strict';

var nodemailer = require('nodemailer');
var util = require('util');

var mailer = {};

module.exports = function(config, logger) {

  var options = config.get("mail") || {};

  var transportMethod = options.transport || 'STMP';
  var transport = nodemailer.createTransport(transportMethod, options.transport_options);

  if (!('from' in options.mail_options)) {
    throw new Error('\"From\" field missing from mail configuration.');
  }

  var mailOptionsDefault = options.mail_options;
  mailOptionsDefault.generateTextFromHTML = true;

  /**
   * Send an email
   * @param {Object} data (the email headers and html content)
   */
  mailer.send = function(data) {
    var mailOptions = mailOptionsDefault;

    for (var prop in data) {
      mailOptions[prop] = data[prop];
    }

    transport.sendMail(mailOptions, mailHandler);
  }


  /**
   * Email callback
   * @param {Object} error
   * @param {Object} response
   */
  function mailHandler(error, response) {

    if (error) {
      var errmsg = util.format('%s : %s', error.name, error.message)
      logger.error(errmsg, error);
    }
    else {
      var msg = this._message;
      logger.info(util.format('Sucessfully send email to adress %s : %s', msg.to, msg.subject));
    }
  }

  return mailer;
}
