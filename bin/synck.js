(function () {

	module.exports = function () {

		/**
		 * Synck main object to export
		 * @type {Object}
		 */
		var s = this

		/**
		 * Synck main object to export
		 * @type {Object}
		 */
		var synck = {}

		/**
		 * Synck main object to export
		 * @type {Object}
		 */
		var options = {}

		/**
		 * [error description]
		 * @type {Array}
		 */
		var error = []

		/**
		 * [error description]
		 * @type {Array}
		 */
		var caller = null

		/**
		 * [error description]
		 * @type {Array}
		 */
		var eventmap = {}

		/**
		 * [emitter description]
		 * @type {[type]}
		 */
		var emitter = null

		/**
		 * [booting description]
		 * @type {Array}
		 */
		// var boots = ['listener', 'database', 'validator', 'embark']
		var boots = ['analyzer', 'grabber', 'populator']

		/**
		 * [type description]
		 * @type {String}
		 */
		var tables = ['configs', 'tasks', 'events']

		/**
		 * [error description]
		 * @type {Array}
		 */
		var listening = ['newConfig']

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var q = require('q')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var inherit = require('inherit')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var util = require('util')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var moment = require('moment')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var _ = require('lodash')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var async = require('async')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var events = require('events').EventEmitter

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var analyzer = require('./../lib/analyzer/analyzer.js')()

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var populator = require('./../lib/populator/populator.js')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var storage = require('./../lib/database/database.js')

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
		 * [booting description]
		 * @type {Array}
		 */
		var cores = [{

			'analyzer': analyzer

		}, {

			'populator': populator

		}, {

			'storage': storage
		}]

		/**
		 * [code description]
		 * @type {[type]}
		 */
		log.message('Main :: Synck (code: awidin) is running', 'section', true)

		/**
		 * [init description]
		 * @return {[type]} [description]
		 */
		synck.init = function () {

			var count = 0

			async.eachSeries(boots, function (method, callback) {

				// console.log(method)

				// log.message('Initiating ' + boots[count], 'section', true)

				// console.log(method)

				if (_.isFunction(synck[method])) {

					synck[method]()
				}

				// promise.then(function (data) {

				// 	if (!data) {

				// 		callback(data)

				// 	}
				// 	else {

				// 		callback()
				// 	}

				// })

				count++

				callback()

			}, function (err) {

				if (err) {

					log.message('Something\' is failed cancel booting', 'error')

				}
				else {

					// synck.inherit()
				}
			})

			return synck
		}

		/**
		 * [validator description]
		 *
		 * var opt = {

		table: {

			from: function (callback) {

				return db.table('dbo.t_perioda').count('id', 'mssql').then(function (data) {

					callback(null, data['data'][0]['count(*)'])

				}, function (err) {

					console.log('MSSQL ERROR: ', err)

					callback(err, 'data')
				})
			},

			to: function (callback) {

				return db.table('dbo._toll_boothtasks').count('id', 'mssql').then(function (data) {

					callback(null, data['data'][0]['count(*)'])

				}, function (err) {

					console.log('MSSQL ERROR: ', err)

					callback(err, 'data')
				})
			},

			pivot: function (callback) {

				return db.table('_mhi_batchs').count('*').then(function (data) {

					callback(null, data[0]['count(*)'])

				}, function (err) {

					console.log('ERROR: ', err)

					callback(err, 'data')
				})
			},
		}
	}
		 *
		 * @return {[type]} [description]
		 */
		synck.config = function (options) {

			log.message('Main :: Set Config')

			analyzer.setConfig(options)

			// console.log('options', options)
			// console.log('analyzer', analyzer)

			// console.log(typeof options)

			// if(typeof options !== 'array'){

			// 	log.message('Configuration data not an array ', error)
			// 	return false

			// }

			// analyzer.config(options)

			return synck
		}

		/**
		 * [listener description]
		 * @return {[type]} [description]
		 */
		synck.database = function () {

			log.message('Initiate synck.database method')

			return storage().init(tables)
		}

		/**
		 * initialize data grabber
		 * @type {[type]}
		 */
		synck.grabber = function () {

			grabber().init()

			return synck

		}

		/**
		 * initialize populator
		 * @type {function}
		 */
		synck.populator = function () {

			populator().init()

			return synck

		}

		/**
		 * initialize populator
		 * @type {function}
		 */
		synck.analyzer = function () {

			analyzer.init()

			return synck

		}

		/**
		 * [listener description]
		 * @return {[type]} [description]
		 */
		synck.listener = function () {

			log.message('Initiate synck.listener method')

			return synck

			util.inherits(synck, events)

			_.each(cores, function (value, key) {

				util.inherits(value, events)

				_.each(listening, function (values) {

					console.log(_.findKey(cores[key]));

					if (typeof eventmap[values] === "function") {

						var current = _.findKey(cores[key])

						try {

							console.log(typeof current());

							_.findKey(cores[key]).prototype.on(values, eventmap[values])

							console.log(values)

						}
						catch (e) {

							log.message(e, 'error')

						}

					}
				})
			})

			console.log(storage)

		}

		/**
		 * [validator description]
		 * @return {[type]} [description]
		 */
		synck.validator = function () {

			log.message('Initiate synck.validator method')

			if (typeof populator !== "function") {

				log.message('Populator is error, it is not a function', 'error')

				error.push('Populator is error, it is a ' + populator)
			}

			return synck
		}

		/**
		 * [init description]
		 * @return {[type]} [description]
		 */
		synck.embark = function () {

			log.message('Initiate synck.embark method')

			synck.prototype.emit('newConfig')

			if (_.size(error) > 0) {

				return log.message(function () {

					return 'Errors found, cannot continue. ERRORS: ', error

				}(), 'error')

				return false
			}

			return synck
		}

		eventmap.newConfig = function () {

			log.message('event "newConfig" is called!!!!')

		}

		return synck

	}

}).call(this)
