var util   = require('util');
var Parent = require('../../lib/data');
var _      = require('lodash');



var Data = module.exports = function() {
  Parent.apply( this, arguments );
}
util.inherits(Data, Parent);

/**
 * Get data from mapping
 *
 * @param {String} namespace
 *
 * @return {Number | String | Object}
 */
Data.prototype.get = function( namespace ) {

  var data = {};
  var self = this;

  _.forEach(this.map, function( object, blockName ) {

    if( 0 === blockName.indexOf(namespace) ) {
      data[blockName] = self.block( blockName );
    }

  });

  if( 1 === Object.keys(data).length ) {
    return data[namespace];
  }

  return data;
};

/**
 * Read a block from mapping.
 *
 * @param {String} blockName
 *
 * @returns  {String | Number}
 */
Data.prototype.block = function( blockName ) {

  var result = 'NA';

  if( this.map[blockName] ) {
    result = this.extract.apply(this, this.map[blockName]);
  }

  return result;
};

/**
 * Extract a chunk of data from buffer
 *
 * @param {Integer} offset
 * @param {String}  format
 * @param {Integer} base
 * @param {Integer} prec
 *
 * @returns {String | Number}
 */
Data.prototype.extract = function( offset, format, base, prec ) {

  var blocks = -1;

  if( offset < this.buffer.length*8 ) {

    if( this.utils[format] ) {
      blocks = this.utils.offsetToBlock( offset );
      return this.utils[format].call(this, blocks[0], blocks[1], base, prec )
    } else {
      throw new Error('There is not conversor associated to `' + format + '`');
    }

  }

};

/**
 * Utils to convert and normalize data from buffer
 */
Data.prototype.utils = {

  offsetToBlock: function( offset ) {
    return [ Math.floor( offset/8 ), offset%8 ];
  },

  // returns converted station unsigned short to real-world usable number
  // optionally applies conversion and precision.
  // byte coded decimal
  bc: function( blk, i ) {
    var byte = this.buffer[blk][i];
    return ((Math.floor(byte/16)&0x0f)*10)+(byte&0x0f);
  },

  // bit field
  bf: function( blk, i, base, prec ) {
    var map = {};
    var lo = this.buffer[blk][i];
    var bits = [1,2,4,8,16,32,64,128];
    for(var i = 0; i<bits.length&&i<base.length; i++) {
      map[base[i]] = (lo&bits[i]) > 0;
    }
    return map;
  },

  sb: function( blk, i, base, prec ) {
    return (this.buffer[blk][i]>=128) ? (128-this.buffer[blk][i]) : this.buffer[blk][i];
  },

  // plain byte
  pb: function( blk, i ) {
    return this.buffer[blk][i];
  },

  // unsigned byte
  ub: function( blk, i, base, prec ) {
    var res = (this.buffer[blk][i] === 0xFF) ? null : this.buffer[blk][i];
    if(base) {
      res *= base;
    }
    return (prec) ? Number(res.toFixed(prec)) : res;
  },

  // signed short
  ss: function( blk, i, base , prec ) {
    var hb = (i+1<8)?blk:blk+1, hbi = (i+1<8)?i+1:(7-i);
    var hi = this.buffer[hb][hbi];
    var lo = this.buffer[blk][i];
    var res = null;
    if(lo === 0xFF && hi === 0xFF) return res;
    if (hi>=128) {
      res = ((128-hi)*256) - lo;
    } else {
      res = (hi*256)+lo;
    }
    if(base) {
      res *= base;
    }
    return (prec) ? Number(res.toFixed(prec)) : res;
  },

  // unsigned short
  us: function( blk, i, base, prec ) {
    var hb = (i+1<8)?blk:blk+1, hbi = (i+1<8)?i+1:(7-i);
    var hi = this.buffer[hb][hbi];
    var lo = this.buffer[blk][i];
    if(lo === 0xFF && hi === 0xFF) return null;
    var res = (hi*256)+lo;
    if(base) {
      res *= base;
    }
    return (prec) ? Number(res.toFixed(prec)) : res;
  },

  p: function(v,l) {
    return ('00000'+v).slice(-l);
  },

  wa: function( blk, i, base, prec ) {
    var lo = this.buffer[blk][i];
    var hi = (this.buffer[blk][i+2] & 0x0f) << 8;
    var res = (lo+hi) * base;

    return (prec) ? Number(res.toFixed(prec)) : res;
  },

  wg: function( blk, i, base, prec ) {
    var lo = this.buffer[blk][i];
    var hi = (this.buffer[blk][i+1] & 0xf0) << 4;
    var res = (lo+hi) * base;

    return (prec) ? Number(res.toFixed(prec)) : res;
  },

  // date time
  dt: function( blk, i, base, prec ) {
    /*var yy = this.bc( this.buffer, blk, i );
    var mm = this.bc( this.buffer, blk, i+1 );
    var dd = this.bc( this.buffer, blk, i+2 );
    var hr = this.bc( this.buffer, blk, i+3 );
    var mi = this.bc( this.buffer, blk, i+4 );
    return '20'+this.p(yy,2)+'-'+this.p(mm,2)+'-'+this.p(dd,2)+' '+this.p(hr,2)+':'+this.p(mi,2);*/
  }
};
