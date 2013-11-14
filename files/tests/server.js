
/**
 * Module dependencies.
 */

var app = require('../node_modules/shoelace-base/test');

/**
 * Initialize a new `Server` on
 * the given port.
 *
 * @param {number} port
 * @api private
 */

function Server(port) {
  port = port || 5555;
  app.listen(port);
  console.log('Web server listening on port ' + port + '...');
  browser.get('http://localhost:' + port);
};

/**
 * Expose `Server`.
 */

exports = module.exports = Server;
