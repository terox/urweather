var HID     = require('node-hid');
var Promise = require('bluebird');
var _       = require('lodash');



/**
 * Device
 * @constructor
 *
 */
function Device(config) {

  config = config || {};

  if( _.isUndefined(config.vid) ) {
    throw new Error('You must define VendorID');
  }

  if( _.isUndefined(config.pid) ) {
    throw new Error('You must define ProductID');
  }

  this.vid    = config.vid;
  this.pid    = config.pid;
  this.tamdem = config.tandem;
  this.hid    = null;
};

/**
 * Open HIDs device.
 *
 * @returns {Device}
 */
Device.prototype.open = function open( callback ) {

  var self = this;

  var devices  = HID.devices()
    , selected = null;

  devices.every(function(device) {
    if( device.vendorId === self.vid && device.productId === self.pid ) {
      selected = new HID.HID(device.path);
      self.hid = selected;
      callback(selected);

      return false;
    }

    return true;
  });

  if(null === selected) {
    throw new Error('Imposible open HID with VID: `' + self.vid + '` and PID: `' + self.pid + '`')
  }

  return this;
};

/**
 * Send command to device.
 *
 * @param {Array} cmd
 *
 * @returns {Device}
 */
Device.prototype.command = function command( cmd ) {
  this.hid.write(cmd);
  return this;
}

/**
 * Add listener to device.
 *
 * @param {String}   listener
 * @param {Function} callback
 */
Device.prototype.on = function on( listener, callback ) {
  this.hid.on(listener, callback);
}

/*Device.prototype.hid = function hid() {
  return this.hid;
}*/

module.exports = Device;
