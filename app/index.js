'use strict';

var http = require('http');
var app = require('./app');

var server = http.createServer(app);

server.listen('3000');//, partial(logger.info, 'CMS is ready'));

/*
io.attach(server);
server.listen(config.get('server:port'), partial(logger.info, 'CMS is ready'));

// When SIGTERM is sended we close all services
process.on('SIGTERM', function () {
  async.series([
    function (cb) {
      logger.info('Killing server...');
      cb();
    },
    function (cb) {
      logger.info('Disconnecting IO');
      io.close(cb);
    },
    function (cb) {
      logger.info('Disconnecting express server');
      server.on('close', cb);
      server.close();
    },
    function (cb) {
      logger.info('Disconnecting database');
      database.knex.client.pool.destroy();
      cb();
    },
    function (cb) {
      logger.info('Disconnecting jobs');
      jobs.driver.client.end();
      cb();
    }
  ], function () {
    logger.info('END', function () {
      process.exit(0);
    });
  });
});
*/

module.exports = server;
