var express = require('express');
var request = require('supertest');
var path = require('path');

var config = require(path.join(appGlobals.appdir, 'lib', 'config'));

var logging = require(path.join(appGlobals.appdir, 'lib', 'logger'));
var logger = require(path.join(appGlobals.appdir, 'middleware', 'logger'));

describe('Logger middleware', function() {

  var app = express;
  var log;

  beforeEach(function() {

    // Recreate and configure app
    app = express();
    config.init(app);
    app.logger = logging(
      app.config,
      app.get('basedir')
    );
  });


  it('does not log requests in production mode', function(done) {
    app.config.set('env', 'production');
    app.use(logger.requestLogger);

    app.use('/somepage', function(req, res){
      res.send(200, { somekey: 'somevalue' });
    });

    request(app)
      .get('/somepage')
      .end(function(err, res) {
        if (err) return done(err);
        expect(app.logger.flush()).to.have.length(0);
        done();
      });
  });


  it('logs errors in production mode', function(done) {
    app.config.set('env', 'production');
    app.use('/somepage', function(req, res, next){
      next(new Error('Some error'));
    });
    app.use(logger.errorLogger);

    request(app)
      .get('/somepage')
      .end(function(err, res) {
        if (err) return done(err);
        expect(app.logger.flush()).to.have.length(1);
        done();
      });
  });

});
