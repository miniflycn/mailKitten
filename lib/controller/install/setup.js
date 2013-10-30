'use strict';

var fs = require('fs')
  , login = require('../login');

module.exports = function (opt, callback) {
  fs.readFile('./config.default.js', function (err, data) {
    if (err) return callback(err);
    data = data.toString()
               .replace('<%=isp%>', opt.isp)
               .replace('<%=user%>', opt.user)
               .replace('<%=pass%>', opt.pass);
    fs.writeFile('./config.js', data, function (err) {
      if (err) return callback(err);
      login.init();
      return callback();
    });
  });
};