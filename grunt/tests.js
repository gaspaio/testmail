'use strict';

var path = require('path');

module.exports = function (grunt) {
  grunt.registerTask('test:server', 'Run server unit tests', launchMocha);

  function launchMocha() {

    // Use "dot" reporter on ci, else "spec".
//    var reporter = process.env.NODE_ENV === 'ci' ? 'dot' : 'spec';

    grunt.util.spawn({
      cmd: 'node_modules/.bin/mocha',
      args: [
//        '--reporter', reporter,
        '--require', 'test/app/bootstrap.js',
        '--check-leaks',
        'test/app/**/*.js'
      ],
      opts: {
        stdio: 'inherit',
        cwd: path.join(__dirname, '..'),
        env: process.env
      }
    }, this.async());
  }
};
