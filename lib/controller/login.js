'use strict';
var json = require('../res/json')
  , redirect = require('../res/redirect')
  , config;

try {
  config = require('../../config');
} catch (e) {
  config = {
    user: 'test',
    pass: 'test'
  };
}

module.exports = function (router) {
  // refactor
  router.post('/login', function (req, res, next) {
    var body = req.body
      , ses = req.session;
    if (body.user === config.user && body.pass && config.pass) {
      ses.auth = true;
      ses.user = body.user;
      ses.save();
      return json(res, 200, {
        code: 0
      });
    } else {
      return json(res, 200, {
        code: 1,
        message: 'Username or Password isn&apos;t correct.'
      });
    }
  });

  router.get('/logout', function (req, res, next) {
    var ses = req.session;
    return ses.destroy(function (err) {
      if (err) return console.log(err);
      return json(res, 200, {
        code: 0
      });
    });
  });

  router.get('/login', function (req, res, next) {
    var ses = req.session;
    if (ses.auth) {
      ses.touch();
      return json(res, 200, {
        code: 0,
        user: ses.user
      });
    } else {
      return json(res, 200, {
        code: 1
      });
    }
  });
};