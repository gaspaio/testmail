'use strict';

(function () {
  require.config({
    baseUrl: '/',
    paths: {
      'jquery'    : 'bower_components/jquery/jquery.min',
      'foundation': 'bower_components/foundation/js/foundation.min',
      'codemirror': 'bower_components/codemirror/lib/codemirror',
      'codemirror-htmlmixed': 'bower_components/codemirror/mode/htmlmixed/htmlmixed',
      'codemirror-xml': 'bower_components/codemirror/mode/xml/xml',
      'codemirror-css': 'bower_components/codemirror/mode/css/css',
      'codemirror-js': 'bower_components/codemirror/mode/javascript/javascript'
    },
    shim: {
      'foundation': {
        deps: ['jquery']
      },
      'codemirror-htmlmixed': {
        deps: ['codemirror', 'codemirror-xml', 'codemirror-css', 'codemirror-js']
      }
    }
  });
}());

