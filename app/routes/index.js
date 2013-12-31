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

  res.json({msg: util.format('Email sent to %s.', req.body.sendTo)});
}


function getFormErrors(req) {

  var errors = {};

  req.checkBody('sendTo').notEmpty();
  errors = req.validationErrors(true);
  if (errors !== null
      && !errors.hasOwnProperty('sendTo')) {
    req.checkBody('sendTo').isEmail();
  }

  if ('' !== req.body.replyTo) {
    req.checkBody('replyTo').isEmail();
  }

  req.checkBody('subject').notEmpty();

  req.checkBody('htmlContent').notEmpty();

  return req.validationErrors(true);
}
