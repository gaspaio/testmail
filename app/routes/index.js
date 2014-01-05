'use strict';

var util = require('util');

exports.index = function(req, res, next) {
  res.render('app', {
    partials: {
      top: 'partials/top',
      bottom: 'partials/bottom'
    }
  });
}


exports.post = function(req, res, next) {

  var mailer = req.app.mailer;

  if (!req.xhr) {
    var err = new Error("Only AJAX post requests are allowed.");
    err.statusCode = 403;
    next(err);
  }

  var errors = getFormErrors(req);

  if (null !== errors) {
    var err = new Error('Invalid field values');
    err.inner = errors;
    err.statusCode = 400;
    next(err);
  }

  var mailData = buildMailData(req.body);

  mailer.send(mailData);

  res.json({msg: util.format('Email sent to %s.', req.body.sendTo)});
}


function buildMailData(formFields) {
  var mailData =  {
    to: formFields.sendTo,
    subject: formFields.subject,
    html: formFields.htmlContent
  };

  if ('' !== formFields['replyTo']) {
    mailData.replyTo = formFields['replyTo'];
  }

  return mailData;
}


function getFormErrors(req) {

  var errors = {};

  req.checkBody('sendTo').notEmpty();
  errors = req.validationErrors(true);

  if (errors === null
      || !errors.hasOwnProperty('sendTo')) {
    req.checkBody('sendTo').isEmail();
  }

  if (('replyTo' in req.body)
      && '' !== req.body.replyTo) {
    req.checkBody('replyTo').isEmail();
  }

  req.checkBody('subject').notEmpty();

  req.checkBody('htmlContent').notEmpty();

  return req.validationErrors(true);
}
