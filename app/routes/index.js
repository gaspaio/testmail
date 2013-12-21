'use strict';

exports.index = function(req, res) {

  res.render('app', {
    partials: {
      top: 'partials/top',
      bottom: 'partials/bottom'
    }
  });

}

