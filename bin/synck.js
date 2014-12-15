(function () {

	'use strict';

	/**
	 * Synck main object to export
	 * @type {Object}
	 */
	var synck = {}

	/**
	 * Storing all configuration of object
	 * The key are the config name
	 * The value are the whole configs variables of object
	 * @type {Array}
	 */
	var configs = []

	/**
	 * Var to define if all the synck workers
	 * are successfully booted with no problem
	 * @type {Boolean}
	 */
	var bootable = false

	/**
	 * Synck main object to export
	 * @type {Object}
	 */
	var options = {}

	/**
	 * [error description]
	 * @type {Array}
	 */
	var errors = []

	/**
	 * [error description]
	 * @type {Array}
	 */
	var tasks = []

	/**
	 * [emitter description]
	 * @type {[type]}
	 */
	var emitter = null

	/**
	 * [booting description]
	 * @type {Array}
	 */
	var boots = ['analyzer', 'grabber']

	/**
	 * [type description]
	 * @type {String}
	 */
	var tables = ['configs', 'tasks', 'events']

	/**
	 * [utils description]
	 * @type {Object}
	 */
	var __ = require('lodash')

	/**
	 * [utils description]
	 * @type {Object}
	 */
	var async = require('async')

	/**
	 * [utils description]
	 * @type {Object}
	 */
	var analyzer = require('./../lib/analyzer/analyzer.js')

	/**
	 * [utils description]
	 * @type {Object}
	 */
	var log = require('./../lib/logger/logger.js')

	/**
	 * event emitter library
	 * @type {Object}
	 */
	var events = require('./../lib/event/event.js')

	/**
	 * Data Grabber library
	 * @type {[type]}
	 */
	var grabber = require('./../lib/grabber/grabber.js')

	/**
	 * Synck main code base to returned when required
	 * @return {[type]} [description]
	 */
	module.exports = function () {

		/**
		 * [init description]
		 * @return {[type]} [description]
		 */
		synck.init = function () {

			if (!bootable) return synck.run()

			return synck
		}

		/**
		 * [init description]
		 * @return {[type]} [description]
		 */
		synck.run = function () {

			bootable = true

			async.eachSeries(boots, function (item, callback) {

				if (__.isFunction(synck[item])) {

					log.message('Main :: Booting ' + item)

					synck[item](callback)
				}

			}, function (err) {

				if (err) {

					log.message('Main :: Synck Failed To Boot', 'error')
				}
				else {

					log.message('Main :: Synck Has Booted')

					log.message('Main :: Telling Analyzer To Run')

					analyzer.run()
				}
			})

			return synck
		}

		/**
		 *
		 * @return {[type]} [description]
		 */
		synck.config = function (options) {

			var found = __.find(configs, {

				name: options.name
			})

			if (__.isObject(options) && __.isUndefined(found)) {

				log.message('Main :: Set Config For ' + options.name)

				configs.push(options)
			}

			return synck
		}

		/**
		 * initialize data grabber
		 * @type {[type]}
		 */
		synck.grabber = function (callback) {

			grabber().init(callback)

			return synck
		}

		/**
		 * initialize populator
		 * @type {function}
		 */
		synck.analyzer = function (callback) {

			analyzer = analyzer()

			analyzer.init(function () {

				analyzer.setConfig(configs, callback)
			})

			return synck
		}

		if (!bootable) {

			log.message('Main :: Synck (code: awidin) is running', 'section', true)
		}

		return synck
	}

}).call(this)
