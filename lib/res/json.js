'use strict';

module.exports = function (res, statuCode, data) {
  res.writeHead(statuCode, {'Content-Type': 'application/json; charset=UTF-8'});
  res.statuCode = statuCode;
  return res.end(data ? JSON.stringify(data) : '');
};