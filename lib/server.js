module.exports = (function () {
  'use strict';
  var connect = require('connect')
  	, controller = require('./controller');

  var app = connect()
            .use(connect.logger('dev'))
            .use(connect.bodyParser())
            .use('/controller', controller)
            .use(connect.static(process.cwd() + '/www'))
            .listen(3000);
})();