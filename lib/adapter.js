var Device = require('./device');
var _      = require('lodash');


/**
 * Adapter.
 */
var Adapter = module.exports = function Adapter( config ) {

  config = config || {};

  _.defaults(config, {
    debug: false
  });

  this.config = config;
  this.buffer = [];
};

/**
 * Send log.
 */
Adapter.prototype.log = function() {
  console.log.call(this, arguments);
}

/**
 * Check if debug is enabled.
 *
 * @returns {Boolean}
 */
Adapter.prototype.isDebugger = function isDebugger() {
  return this.config.debug;
}

/**
 * Setup device to adapter.
 *
 * @params {Device} device
 *
 * @returns {Adapter}
 */
Adapter.prototype.setupDevice = function setupDevice( device ) {
  this.device = device;
  return this;
}

/**
 * Initialitze the adapter.
 *
 * @params {Function} callback
 *
 * @returns void
 */
Adapter.prototype.initialitze = function( callback ) {

  this.device.open(function() {
    callback();
  });

};

/**
 * Teardown the adapter.
 *
 * @return void
 */
Adapter.prototype.teardown = function() {

}
