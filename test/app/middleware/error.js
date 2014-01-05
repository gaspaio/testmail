'use strict';

var express = require('express');
var request = require('supertest');
var path = require('path');

var config = require(path.join(appGlobals.appdir, 'lib', 'config'));
var error = require(path.join(appGlobals.appdir, 'middleware', 'error'));


describe('Error formatter middleware', function() {

  var err;

  function getErr(e) {
    err = e;
  }

  beforeEach(function() {
    err = {};
  });

  it('defaults to 500 status code error', function(done) {
    error.format({}, {}, {}, getErr);
    expect(err).to.have.property('statusCode');
    expect(err.statusCode).to.equal(500);
    done();
  });


  it('inits err.inner property if it doesn\'t exist', function(done) {
    error.format({}, {}, {}, getErr);
    expect(err).to.have.property('inner');
    expect(err.inner).to.be.an('object');
    done();
  });


  it('keeps existing properties of the error object', function(done) {
    err.inner = {foo: 'bar'};
    err.statusCode = 503;
    error.format(err, {}, {}, getErr);
    expect(err).to.have.property('inner');
    expect(err.inner).to.eql({foo: 'bar'});
    expect(err).to.have.property('statusCode');
    expect(err.statusCode).to.equal(503);
    done();
  });
});


describe('Error handling middleware', function() {

  var app = express;

  beforeEach(function() {
    app = express();
    config.init(app);

    app.use('/err500', function(req, res, next) {
      var err = new Error('someError');
      err.statusCode = 500;
      next(err);
    });
    app.use(error.format);
    app.use(error.handler);
  });


  it('sends a formatted error string if the request wasn\'t AJAX', function(done) {
    request(app)
      .get('/err500')
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.statusCode).to.equal(500);
        expect(res.text).to.match(/^500 [^:]* : someError/);
        expect(res.type).to.equal('text/html');
        done();
      });
  });


  it('sends a JSON error object if the request was AJAX', function(done) {
    request(app)
      .get('/err500')
      .set('X-Requested-With', 'XMLHttpRequest')
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.type).to.equal('application/json');
        expect(res.statusCode).to.equal(500);
        var json = JSON.parse(res.text);
        expect(json.msg).to.equal('someError');
        done();
      });
  });
})
