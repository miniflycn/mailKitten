'use strict';

module.exports = function (res, url) {
  res.writeHead(302, {
    'Location': url
  });
  res.statusCode = 302;
  res.end();
};