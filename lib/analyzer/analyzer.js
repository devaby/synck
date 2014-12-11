(function () {

	var ev = require(__dirname + '/../event/event.js'),

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

				if (err) {

					callback(err, results)

					return
				}

				name[item.name] = results

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

		analyzer.init = function (callback) {

			log.message('Analyzer :: Start')

			analyzer.looper()

		}

		analyzer.looper = function () {

			log.message('Analyzer :: Loop')

			// console.log(watch);

			var i = 0

			async.map(names, analyzer.compare, function (err, results) {

				console.log(results);
				// results is now an array of stats for each file
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

		return analyzer

	}


}).call(this)
