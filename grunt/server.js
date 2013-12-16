'use strict';

var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function (grunt) {
  grunt.registerTask('dev:server', 'Launch webserver.', function () {
    var done = this.async();

    var args = [
      '-e',
      'node|js|json',
      '-w',
      'app,config',
      'app'
    ];

    var opts = {
      stdio: 'inherit',
      env: process.env,
      cwd: path.join(__dirname, '..')
    };

    // Spawn server using supervisor.
    var server = spawn('./node_modules/.bin/supervisor', args, opts);

    // Finish task on close.
    server.on('close', done);
  });
};
