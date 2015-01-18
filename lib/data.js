var Data = module.exports = function Data ( buffer, map ) {
  this.buffer = buffer || [];
  this.map    = map    || {};
}

/**
 * Get data from mapping.
 */
Data.prototype.get = function() {
  throw new Error("This method must be overwritten!");
};

/**
 * Extract a chunk of data from buffer.
 */
Data.prototype.extract = function() {
  throw new Error("This method must be overwritten!");
};

/**
 * Read a block from mapping.
 */
Data.prototype.block = function() {
  throw new Error("This method must be overwritten!");
};

/**
 * Utils to convert and normalize data from buffer.
 */
Data.prototype.utils = function() {
  throw new Error("This method must be overwritten!");
};
