'use strict';

var util = require('util');

exports.index = function(req, res, next) {

  next(new Error("bingo"));

  res.render('app', {
    partials: {
      top: 'partials/top',
      bottom: 'partials/bottom'
    }
  });

}


exports.post = function(req, res, next) {

  var errors = getFormErrors(req);

  if (null !== errors) {
    var err = new Error('Invalid field values');
    err.inner = errors;
    next(err);
  }

  res.json({msg: util.format('Email sent to %s.', req.checkBody('sendTo'))});
}


function getFormErrors(req) {

  var errors = {};

  req.checkBody('sendTo').notEmpty();
  errors = req.validationErrors(true);
  if (errors !== null
      && !errors.hasOwnProperty('sendTo')) {
    req.checkBody('sendTo').isEmail();
  }

  if ('' !== req.body['replyTo']) {
    req.checkBody('replyTo').isEmail();
  }

  req.checkBody('subject').notEmpty();

  req.checkBody('htmlContent').notEmpty();

  return req.validationErrors(true);
}
