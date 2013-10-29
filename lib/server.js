module.exports = (function () {
  'use strict';
  var connect = require('connect')
    , urlrouter = require('urlrouter')
    , controller = require('./controller');

  var app = connect()
            .use(connect.logger('dev'))
            .use('/controller', connect.cookieParser())
            // use memoryStore for testing
            .use('/controller', connect.session({
              secret: 'mailSender', 
              key: 'sid',
              cookie: { path: '/controller', httpOnly: true, maxAge: null }
            }))
            .use('/controller', connect.urlencoded())
            .use('/controller', connect.json())
            .use('/controller', urlrouter(controller))
            .use(connect.static(process.cwd() + '/www'))
            .listen(3000);
})();