'use strict';
var install = require('./install')
  , json = require('./json')
  , fs = require('fs');

fs.exists('./config.js', function (exists) {
  if (exists) {
    install = finish;
  }
})

module.exports = function (req, res, next) {
  if (req.method === 'POST' && req.url === '/install') {
    return install(req.body, function (err) {
      if (err) {
        return json(res, 200, {
          code: 1,
          message: err
        });
      }
      install = finish;
      return json(res, 200, {
        code: 0
      });
    });
  } else {
    next();
  }
};

function finish(data, callback) {
  callback('Don&apos;t repeat the installation');
}