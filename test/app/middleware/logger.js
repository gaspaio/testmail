var express = require('express');
var request = require('supertest');
var config = require('nconf');

var logging = require('./lib/logger');
var logger = require('./middleware/logger');

describe('Logger middleware', function() {

  beforeEach(function() {
    app = express();
    app.logger = logging(config);

    // Log to memory instead of file
    app.logger.add.
  })

});