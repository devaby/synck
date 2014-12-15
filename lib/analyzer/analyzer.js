(function () {

	'use strict'

	var self

	module.exports = function () {

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
		 * [ev description]
		 * @type {[type]}
		 */
		var ev = require(__dirname + './../event/event.js')

		/**
		 * [__ description]
		 * @type {[type]}
		 */
		var __ = require('lodash')

		/**
		 * [async description]
		 * @type {[type]}
		 */
		var async = require('async')

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
		analyzer.setConfig = function (options, backcall) {

			log.message('Analyzer :: Checking Config Name')

			if (__.size(options) > 0) {

				async.each(options, function (item, callback) {

					if (__.isUndefined(watch[item.name])) {

						log.message('Analyzer :: Config ' + item.name + ' is registered')

						watch[item.name] = item

						names.push(watch[item.name])
					}
					else {

						log.message('Analyzer :: Config ' + item.name + ' is exist')
					}

					callback()

				}, function (err) {

					if (err) {

						console.log(err)

						log.message('Analyzer :: Some Config ' + item.name + ' is exist')
					}

					backcall()
				})
			}
		}

		analyzer.init = function (callback) {

			callback()
		}

		analyzer.run = function () {

			log.message('Analyzer :: Looping Started!')

			var conf = names

			async.map(conf, analyzer.compare, function (err, results) {

				var nm, fr, to, i, num, key

				if (err) {

					log.message('Analyzer :: No results of counting')
				}

				async.forever(function (next) {

					async.each(results, function (data, callback) {

						console.log(data)

						log.message('Analyzer :: Begin!')

						key = __.keys(data)[0]

						num = false

						nm = data[key]

						fr = nm[__.keys(nm)[0]]

						to = nm[__.keys(nm)[1]]

						i = 0

						log.message('Analyzer :: Table ' + __.keys(nm)[0] + ' with ' + nm[__.keys(nm)[0]] + ' row')

						log.message('Analyzer :: Table ' + __.keys(nm)[1] + ' with ' + nm[__.keys(nm)[1]] + ' row')

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

							i = 0
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

						if (num > 0 || num < 0) {

							log.message('Analyzer :: ' + key + ' are ' + num)

							log.message('Analyzer :: Calling Data Grabber!')

							ev.publish('synck.analyzer.differ', {

								item: watch[key],

								callback: next
							})
						}

					}, function (err) {

						if (err) {

							log.message('Analyzer :: a file failed to process', 'error')

						}
						else {

							log.message('Analyzer :: Next Loop')
						}
					})

				}, function (err, results) {

					console.log(err)
				})

			}, function (err) {

				log.message('Analyzer :: Looping ended with error', 'error')

				console.log(err)
			})

		}

		analyzer.compare = function (item, callback) {

			log.message('Analyzer :: Compare ' + item.table.from.name + ' with ' + item.table.to.name)

			var name = {}

			var tasks = {}

			tasks[item.table.from.name] = item.table.from.function.count

			tasks[item.table.to.name] = item.table.to.function.count

			async.parallel(tasks, function (err, results) {

				name[item.name] = results

				callback(null, name)
			})

		}

		return analyzer
	}

}).call(this)
