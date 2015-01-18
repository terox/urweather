var WeatherStation = require('./weather-station');
var _              = require('lodash');

/**
 * Create Weather Station.
 *
 * @param {String} adapterName
 * @param {Object} config
 *
 * @return {WeatherStation}
 */
var create = exports.create = function create( adapterName, config ) {

  var adapter;

  _.defaults(config, {
    interval : 60,    // Seconds
    recent   : 10,    // How many fine interval updates to maintain in memory
    debug    : false
  });

  try {

    adapter = require(__dirname + '/../adapters/' + adapterName.toLowerCase())();
    return new WeatherStation(config, adapter);

  } catch(e) {
    throw new Error('The adapter `' + adapterName + '` does not exists');
  }

};

exports.Adapter        = require('./adapter');
exports.Data           = require('./data');
exports.Device         = require('./device')
exports.WeatherStation = WeatherStation;
