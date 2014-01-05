'use strict';

var mailerApp = require(appGlobals.appdir, 'app');
var request = require('supertest');
var path = require('path');

describe('Main route', function() {

  var app;
  var fieldErrMsg = 'Invalid field values';

  beforeEach(function() {
    app = mailerApp;
  });


  describe('when GETed', function() {
    it('returns a html page', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });


  describe('when POSTed to', function() {
    it('responds to non AJAX posts with a 403 html error page', function(done) {
      request(app)
        .post('/')
        .send('')
        .expect(403)
        .expect('Content-Type', /html/)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });


    it('does not accept absent \'to\' fields', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          subject: 'coucou',
          htmlContent: 'bingo'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['sendTo']);
          done();
        });
    });


    it('does not accept invalid \'to\' fields', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'invalid-mail',
          subject: 'coucou',
          htmlContent: 'bingo'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['sendTo']);
          done();
        });
    });


    it('does not accept absent \'subject\' fields', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'somevalid@mail.com',
          htmlContent: 'bingo'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['subject']);
          done();
        });
    });


    it('does not accept empty \'subject\' fields', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'somevalid@mail.com',
          subject: '',
          htmlContent: 'bingo'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['subject']);
          done();
        });
    });


    it('does not accept empty \'htmlContent\' fields', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'somevalid@mail.com',
          subject: 'coucou',
          htmlContent: ''
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['htmlContent']);
          done();
        });
    });


    it('does not accept absent \'htmlContent\' fields', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'somevalid@mail.com',
          subject: 'coucou'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['htmlContent']);
          done();
        });
    });


    it('returns multiple errors', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'somevalid@mail.com'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['htmlContent', 'subject']);
          done();
        });
    });


    it('returns an error if an invalid replyTo value is present', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'somevalid@mail.com',
          replyTo: 'invalid-value',
          subject: 'coucou',
          htmlContent: 'bingo'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.equal(fieldErrMsg);
          expect(json.info).to.have.keys(['replyTo']);
          done();
        });
    });


    it('returns a success message', function(done) {
      request(app)
        .post('/')
        .type('form')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          sendTo: 'somevalid@mail.com',
          subject: 'coucou',
          htmlContent: 'bingo'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          var json = JSON.parse(res.text);
          expect(json.msg).to.match(/^Email sent to .*/);
          done();
        });
    });
  });
});

