var events  = require('events');
var util		= require('util');
var Device  = require('./device');
var Adapter = require('./adapter');
var _       = require('lodash');



/**
 * Weather Station.
 *
 * @param {Object}  				 config
 * @param {Adapter | String} adapter
 */
var WeatherStation = module.exports = function WeatherStation(config, adapter) {

	if(_.isUndefined( adapter ) || !(adapter instanceof Adapter)) {
		throw new Error('You need to pass a valid adapter');
	}

	_.defaults(config, {
		interval: 15,
		history : 10
	});

	this.interval = config.interval;
	this.history  = config.history;
	this.adapter  = adapter;
	this.timer    = null;
	this.buffer   = [];
};
util.inherits( WeatherStation, events.EventEmitter );

/**
 * Lister for data.
 *
 * @returns {WeatherStation}
 */
WeatherStation.prototype.listen = function() {

	var self = this;

	// Initialize adapter
	self.adapter.initialitze(function() {

		self.timer = setInterval(function() {

			// Poll to adapter for weather data
			self.adapter.poll(function( object ) {

				// TODO Normalize the object

				self.emit('data', object);
			});

		}, self.interval * 1000);

	});

	return this;
};

/**
 * Close connection
 *
 * @returns void
 */
WeatherStation.prototype.close = function() {
	cleatInterval(this.timer);
	this.adapter.teardown();
};
