'use strict';

(function () {
  require.config({
    baseUrl: '/bower_components',
    paths: {
      'jquery'    : 'jquery/jquery.min',
      'foundation': 'foundation/js/foundation.min',
      'codemirror': 'codemirror/lib/codemirror',
      'codemirror-htmlmixed': 'codemirror/mode/htmlmixed/htmlmixed',
      'codemirror-xml': 'codemirror/mode/xml/xml',
      'codemirror-css': 'codemirror/mode/css/css',
      'codemirror-js': 'codemirror/mode/javascript/javascript'
    },
    shim: {
      'foundation': {
        deps: ['jquery']
      },
      'codemirror-xml': {
        deps: ['codemirror']
      },
      'codemirror-css': {
        deps: ['codemirror']
      },
      'codemirror-js': {
        deps: ['codemirror']
      },
      'codemirror-htmlmixed': {
        deps: ['codemirror', 'codemirror-xml', 'codemirror-css', 'codemirror-js']
      }
    }
  });
}());

