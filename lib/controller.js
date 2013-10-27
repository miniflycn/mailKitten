'use strict';

var install = require('./controller/install')
  , login = require('./controller/login');

module.exports = function (router) {
  install(router);
  login(router);
};