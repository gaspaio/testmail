define('app-deps', [
  'foundation',
  'jquery',
  'codemirror-htmlmixed'
]);

require(['app-deps'], function () {
  $(document).foundation();

  var editor = CodeMirror.fromTextArea($('#html-container').get(0), {
    mode: "text/html",
    theme: "solarized dark",
    lineNumbers: true
  });


  $('#main-form').submit(function(e) {

    $('#main-form-submit').prop('disabled', true);

    var postData = $(this).serializeArray();

    postData[2].value = editor.getValue();

    $.post('/', postData)
      .done(function(data) {
        alert("success");
      })
      .fail(function(data) {
        alert("fail");
      })
      .always(function(data) {
        $('#main-form-submit').prop('disabled', false);
      });

    e.preventDefault();
  });
});
