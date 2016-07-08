var app     = require('amorphic');
var connect = require('connect');

function useBower (app) {
  app.use('/bower_components', connect.static(__dirname + '/bower_components'));
}

function preSessionInject (app) {
  useBower(app);
  return function () {};
}

app.listen(__dirname, null, preSessionInject);
