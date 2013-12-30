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

  var errors = validateForm(req);
  /* if (empty) {
   res.send({msg: 'Email sent'});
  }
  else {
    -> send 400 Bad Request
    -> errors
  }
  */

}


function validateForm(req) {

  var errors = {};

  req.checkBody('sendTo').notEmpty();
  errors = req.validationErrors(true);
  if (!errors.hasOwnProperty('sendTo')) {
    req.checkBody('sendTo').isEmail();
  }

  if ('' !== req.body['replyTo']) {
    req.checkBody('replyTo').isEmail();
  }

  req.checkBody('subject').notEmpty();

  req.checkBody('htmlContent').notEmpty();

  return req.validationErrors(true);
}
