'use strict'

var path = require('path');
var cons = require('consolidate');

module.exports.init = function(app) {
  app.engine('hbs', cons.handlebars);
  app.set('view engine', 'hbs');
  app.set('views', path.join(app.get('appdir'), 'views'));
  app.locals({
    'app-title': 'Mail Tester'
  });
}

