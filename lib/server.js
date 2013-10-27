module.exports = (function () {
  'use strict';
  var connect = require('connect')
    , urlrouter = require('urlrouter')
    , controller = require('./controller');

  var app = connect()
            .use(connect.logger('dev'))
            .use(connect.cookieParser())
            // use memoryStore for testing
            .use(connect.session({ secret: 'cat', key: 'sid'}))
            .use(connect.bodyParser())
            .use('/controller', urlrouter(controller))
            .use(connect.static(process.cwd() + '/www'))
            .listen(3000);
})();