'use strict';

(function () {
  require.config({
    baseUrl: '/',
    paths: {
      'modernizr' : 'bower_components/modernizr/modernizr',
      'jquery'    : 'bower_components/jquery/jquery.min',
      'foundation': 'bower_components/foundation/js/foundation.min'
    },
    shim: {
      'foundation': {
        deps: ['jquery', 'modernizr']
      }
    }
  });
}());

