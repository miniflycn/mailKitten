module.exports = (function () {
  'use strict';
  var config = require('../config')
    , nodemailer = require('nodemailer')
    , transport = nodemailer.createTransport('SMTP', {
        service: config.isp,
        auth: {
          user: config.user,
          pass: config.pass
        }
      });

  function send(message, callback) {
    transport.sendMail(message, function (error, response) {
      if (error) return console.log(error.message);
      console.log(response.message);
      callback && callback();
    });
  }
  send.close = function () {
    transport.close();
  }

  return send;
})();