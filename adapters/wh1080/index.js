var Adapter = require('./adapter');
var Device  = require('../../lib/device');
var _       = require('lodash');

/**
 * Prepare
 *
 *
 */
module.exports = function( adapterConfig ) {

  adapterConfig = adapterConfig || {};

  var device = new Device({
    vid      : 0x1941, // USB vendor ID
    pid      : 0x8021, // USB product ID
  });

  _.defaults(adapterConfig, {
    tandem : false, // Use interval not device update frequency (usually 30 mins)
    debug  : false  // Show messages in console
  });

  var adapter = new Adapter( adapterConfig );

  return adapter.setupDevice( device );
};
