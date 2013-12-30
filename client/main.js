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

    for (var key in postData) {
      if ("htmlContent" === postData[key].name) {
        postData[key].value = editor.getValue();
        break;
      }
    }

    $.post('/', postData)
      .done(function(data) {
        displayMsg(data.msg);
      })
      .fail(function(data) {
        //displayMsg(data.msg);
      })
      .always(function(data) {
        $('#main-form-submit').prop('disabled', false);
      });

    e.preventDefault();
  });



  function displayMsg(msg, append, type) {

    var append = append || false;
    var type = type || 'info';

    var alertBoxHtml =
      '<div data-alert class="alert-box ' + type + ' radius">'
      + msg
      + '<a href="#" class="close">&times;</a></div>';

    if (append) {
      $('#message-box').append(alertBoxHtml);
    }
    else {
      $('#message-box').html(alertBoxHtml);
    }

    // Bind events to new alert box.
    $('#message-box').foundation();
  }
});
