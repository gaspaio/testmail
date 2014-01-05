'use strict';

var http = require('http');
var mailerApp = require('./app');

var server = http.createServer(mailerApp());

server.listen('3000');

module.exports = server;
