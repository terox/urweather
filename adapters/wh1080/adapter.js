var util   = require('util');
var Parent = require('../../lib/adapter');
var Data   = require('./data');
var map    = require('./map');
var _      = require('lodash');

var Adapter = module.exports = function Adapter() {
  return Parent.apply( this, arguments );
}
util.inherits(Adapter, Parent);

// debug => true/false

// return a array of addresses inclusive of lo to hi using the provided increment
Adapter.prototype.range = function( lo, hi, inc ) {

  var vector  = [];
  var max     = ( Math.floor(hi/8) + 1 ) * 8;
  var current

  for(var current = lo; current < max; current += inc) {
    vector.push( current );
  }

  if( this.isDebugger() ) {
    this.log('Range:', lo, hi, max, inc, vector.length);
  }

  return vector;
}

// construct a command block to send to USB device
Adapter.prototype.command = function( address ) {

  var hi = Math.floor( address/256 );
  var lo = address%256;

  return [0xA1, hi, lo, 0x20,0xA1, hi, lo, 0x20];
};

/**
 * Receive chunk of data from device
 *
 */
Adapter.prototype.chunk = function( locs, callback ) {

  var add, cmd;

  if( locs.length > 0) {
    addr = locs.shift();
    cmd  = this.command(addr);

    this.device.command(cmd);
    //this.device.on('data', callback);
  }

  return this;
}

Adapter.prototype.getData = function( from, to, callback ) {

  var self   = this;
  var locs   = self.range( from, to, 32 );
  var count  = -1;
  var buffer = [];

  var _data = function( data ) {

    if( self.isDebugger() ) {
      this.log('Received data: ', data);
    }

    buffer.push( data );
    count--;

    if( 0 === count ) {
      _get();
    }
  };

  var _get = function() {

    if( locs.length > 0 ) {

      if( self.isDebugger() ){
        this.log('LOCS', locs);
      }

      count = 4;
      self.chunk( locs, _data );
    } else {

      /*var listeners = self.device.hid.listeners('data');
      if(listeners.length>0) {
        for(var l=0; l<listeners.length; l++) {
          self.device.hid.removeListener('data',listeners[l]);
        }
      }*/
      callback( new Data(buffer, map) );
    }
  };

  this.device.hid.on('data', _data);

  _get();
}


Adapter.prototype.lastUpdate = function() {

}


/**
 * Poll to device for data
 *
 * @params {Function} callback
 *
 * @returns {Adapter}
 */
Adapter.prototype.poll = function( callback ) {

  var self = this, timeStart = process.hrtime(), timeStop = 0, fixed, current;

  self.getData(0x00, 0xFF, function( data ) {

    current = data.get('fb.current_pos');

    self.getData(current, current, function( reading ) {
      timeStop = process.hrtime();
      callback( reading.get('rf.'), timeStop - timeStart );
    });

  });

  return this;
};
