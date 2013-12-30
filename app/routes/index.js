'use strict';

exports.index = function(req, res) {

  res.render('app', {
    partials: {
      top: 'partials/top',
      bottom: 'partials/bottom'
    }
  });

}


exports.post = function(req, res) {

  var errors = getFormErrors(req);

  res.send({msg: 'Email sent'});

  // Handle all errors the same way !
  // Throw Exception && add type + params {msg: ... , type: validation/system params: ...}
  /* if (empty) {

  }
  else {
    -> send 400 Bad Request
    -> errors
  }
  */

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
