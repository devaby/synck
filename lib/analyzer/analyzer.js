(function () {

	var self,

		jobs = {},

		ev = require(__dirname + '/../event/event.js'),

		__ = require('lodash'),

		async = require('async'),

		config = require(__dirname + '/../../config/config1.js')

	module.exports = function () {

		'use strict'

		/**
		 * analyzer main object to export
		 * @type {Object}
		 */
		var analyzer = {}

		/**
		 * [type description]
		 * @type {String}
		 */
		var watch = {}

		/**
		 * [type description]
		 * @type {String}
		 */
		var names = []

		/**
		 * [type description]
		 * @type {String}
		 */
		var count = 0

		/**
		 * [moment description]
		 * @type {[type]}
		 */
		var moment = require('moment')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var log = require('./../logger/logger.js')

		/**
		 * [message description]
		 * @param  {[type]} message [description]
		 * @param  {[type]} type    [description]
		 * @return {[type]}         [description]
		 */
		analyzer.checkConfig = function (name) {

			log.message('Analyzer :: Config name is ' + name)

			if (!__.isUndefined(watch[name])) {

				return true

			}
			else {

				return false
			}
		}

		/**
		 * [message description]
		 * @param  {[type]} message [description]
		 * @param  {[type]} type    [description]
		 * @return {[type]}         [description]
		 */
		analyzer.setConfig = function (options) {

			log.message('Analyzer :: Checking Config Name')

			if (!analyzer.checkConfig(options.name)) {

				log.message('Analyzer :: Config ' + options.name + ' is registered')

				watch[options.name] = options

				names.push(watch[options.name])

				return true

			}
			else {

				log.message('Analyzer :: Config ' + options.name + ' is exist')

				return false
			}
		}

		analyzer.compare = function (item, callback) {

			log.message('Analyzer :: Compare ' + item.table.from.name + ' with ' + item.table.to.name)

			var name = {}

			var tasks = {}

			tasks[item.table.from.name] = item.table.from.function.count

			tasks[item.table.to.name] = item.table.to.function.count

			async.parallel(tasks, function (err, results) {

				name[item.name] = results

				if (err) {

					callback(true, name)

					return
				}

				callback(null, name)
			})

			// item.table.from.function.count(callback)

			// item.table.to.function.count(callback)

			// console.log('from function :: ', config.table.from.function.count())

			// console.log('to function :: ', config.table.to.function.count())

			// async.parallel([

			// 	function (pcallback) {

			// 		config.table.to.function.count(function (err, data) {

			// 			if (err) {

			// 				console.error(err)
			// 				pcallback(err)
			// 				return false

			// 			}

			// 			pcallback(null, data)

			// 		})

			// 	},
			// 	function (pcallback) {

			// 		config.table.from.function.count(function (err, data) {

			// 			if (err) {

			// 				console.error(err)
			// 				pcallback(err)
			// 				return false

			// 			}

			// 			pcallback(null, data)

			// 		})

			// 	}
			// ], function (err, result) {

			// 	if (err) {

			// 		console.error(err)
			// 		return false

			// 	}

			// 	if (result[0] !== result[1]) {

			// 		callback()

			// 	}

			// })

		}

		analyzer.decider = function (data, callback) {

			log.message('Analyzer :: Start')


		}

		analyzer.init = function (callback) {

			log.message('Analyzer :: Start')

			analyzer.looper()

		}

		analyzer.looper = function () {

			log.message('Analyzer :: Loop')

			async.map(names, analyzer.compare, function (err, results) {

				if (err) {

					log.message('Analyzer :: Loop Error 01 has been found. Stopping.')

					return
				}

				async.each(results, function (data, callback) {

					console.log(data);

					var key = __.keys(data)[0]

					var num = false

					var i = 0

					if (__.isObject(data[key])) {

						__.each(data[key], function (value, key) {

							if (i == 0) {

								num = value

							}
							else {

								num = num - value
							}

							i++
						})
					}

					if (num === false) {

						log.message('Analyzer :: Loop Error 02 has been found. Stopping.')

						callback(true)

						return
					}

					if (num == 0) {

						log.message('Analyzer :: ' + key + ' are sync ')

						callback()

						return
					}

					if (num > 0) {

						log.message('Analyzer :: ' + key + ' are minus ' + num)

						log.message('Analyzer :: Calling Data Grabber!')

						ev.publish('AnalyzerMisscount', watch[key])
					}

					callback()

				}, function (err) {

					if (err) {
						// One of the iterations produced an error.
						// All processing will now stop.
						console.log('A file failed to process');
					}
					else {
						console.log('All files have been processed successfully');
					}
				})

			}, function (err) {

				if (err) {
					// One of the iterations produced an error.
					// All processing will now stop.
					console.log('A file failed to process');
				}
				else {
					console.log('All files have been processed successfully');
				}
			})

			return

			// async.parallel(watch, function (result, callback) {

			// 	log.message('Analyzer :: Loop No: ' + i)

			// 	i++

			// }, function (err, data) {

			// 	if (err) {

			// 		log.message('Analyzer :: Error ' + err)
			// 	}

			// 	log.message(data)
			// })

			// return

			// async.map(config, function (_v) {

			// 	async.forever(function (next) {

			// 		analyzer.compare(_v, function (err, data) {

			// 			if (err) {

			// 				console.error(err)

			// 				return false
			// 			}

			// 			log.message('matter cuy')

			// 			// next()

			// 			ev.publish('AnalyzerMisscount', _v)

			// 		})

			// 		setTimeout(function () {

			// 			console.log('next')

			// 			next()

			// 		}, 3000)

			// 	}, function (err) {

			// 		console.error(err)

			// 	})

			// })

		}

		if (!self) {

			self = analyzer
		}

		return analyzer

	}


}).call(this)
