'use strict';
var json = require('../res/json')
  , config = require('../../config');

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
        code: 1
      });
    }
  });

  router.delete('/login', function (req, res, next) {
    var ses = req.session;
    return session.destroy(function (err) {
      return console.log(err);
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