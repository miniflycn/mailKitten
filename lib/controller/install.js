'use strict';
var install = require('../install')
  , json = require('../res/json')
  , fs = require('fs');

fs.exists('./config.js', function (exists) {
  if (exists) {
    install = finish;
  }
})

module.exports = function (router) {
  router.post('/install', function (req, res, next) {
    return install(req.body, function (err) {
      if (err) {
        console.log(err);
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
  });
};

function finish(data, callback) {
  callback('Don&apos;t repeat the installation');
}