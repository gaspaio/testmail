define('app-deps', [
  'foundation',
  'jquery',
  'codemirror-htmlmixed'
]);

require(['app-deps'], function () {
  $(document).foundation();

  CodeMirror.fromTextArea($('#html-container').get(0), {
    mode: "text/html",
    theme: "solarized dark",
    lineNumbers: true
  });
});
