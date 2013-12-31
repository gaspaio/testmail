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
    e.preventDefault();

    var postData = $(this).serializeArray();
    var editorValue = editor.getValue().trim();

    if ('' === editorValue) {
      displayMsg('Email content must not be empty.', false, 'warning');
      return;
    }

    for (var key in postData) {
      if ("htmlContent" === postData[key].name) {
        postData[key].value = editorValue;
        break;
      }
    }

    $.post('/', postData)
      .done(function(data) {
        displayMsg(data.msg, false, 'success');
      })
      .fail(function(data) {
        if (data.status >= 500) {
          displayMsg(data.statusText + ': ' + data.responseJSON.msg, false, 'warning');
          return;
        }
        requestErrorHandler(data);
      })
      .always(function(data) {
        $('#main-form-submit').prop('disabled', false);
      });


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


  function requestErrorHandler(data) {

    var json = data.responseJSON;

    switch (data.status) {
      // Server-side field validation errors
      case 400:
        var info = '';
        for (var elem in json.info) {
          info = '<li><strong>' + elem + ': </strong>' + json.info[elem].msg + '</li>';
        }
        if ('' !== info) {
          info = '<ul>' + info + '</ul>';
        }

        displayMsg('<p>' + json.msg + '</p>' + info, false, 'warning');
        break;
    }
  }
});
