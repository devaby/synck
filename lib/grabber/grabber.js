/*
 * @Author: Laptop Kerja
 * @Date:   2014-12-08 22:32:17
 * @Last Modified by:   Ridwan Abadi
 * @Last Modified time: 2015-01-09 18:28:56
 */

(function () {

	'use strict';

	var self, bootable

	module.exports = function () {

		/**
		 * [grabber description]
		 * @type {Object}
		 */
		var grabber = {}

		/**
		 * [mapper description]
		 * @type {Object}
		 */
		var mapper = {}

		/**
		 * [async description]
		 * @type {[type]}
		 */
		var async = require('async')

		/**
		 * [__ description]
		 * @type {[type]}
		 */
		var __ = require('lodash')

		/**
		 * [events description]
		 * @type {[type]}
		 */
		var events = require(__dirname + './../event/event.js')

		/**
		 * [log description]
		 * @type {[type]}
		 */
		var log = require(__dirname + './../logger/logger.js')

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.init = function (callback) {

			grabber.createListener()

			callback()
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.release = function (data, releaser, callback) {

			var arrayWay, objectWay, executer

			arrayWay = function (_data, _releaser, _callback) {

				async.mapSeries(_data, function (v, mcallback) {

					// if(!v.id) console.error(new Error('data Id from grabber.batch not detected'))

					_releaser(v.id, v, function (e, done) {

						if (e) {

							return mcallback(e)
						}

						mcallback(null, done)

					})

				}, function (err, result) {

					if (err) {

						console.error(err)

						return _callback(err)
					}

					_callback(null, result)

				})

			}

			objectWay = function (_data, _releaser, _callback) {

				_releaser(_data.id, _data, function (e, done) {

					if (e) {

						console.error(e)

						return _callback(e)
					}

					_callback(null, done)
				})
			}

			if (typeof data !== 'object') {

				callback(new Error('Argument 1 is not an Object or Array'))

				return false

			}
			else if (__.isArray(data)) {

				executer = arrayWay

			}
			else {

				executer = objectWay

			}

			console.log(typeof data);

			if (typeof releaser !== 'function') {

				callback(new Error('Argument 2 is not an Function'))

				return false

			}

			if (typeof callback !== 'function') {

				callback(new Error('Argument 3 is not an Function'))

				return false

			}

			executer(data, releaser, function (err, done) {

				console.log('executer callback')

				if (err) {

					console.error(err)

					return callback(err)
				}

				callback(null, done)
			})
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.batchs = function (name, data, from, to, releaser, chunkBegin, chunkEnd, type, backcall) {

			var a = {}

			var i = 0

			var jobs = []

			var arrays = {}

			var finalResults = []

			async.each(data, function (value, callback) {

				if (typeof from == 'function') {

					from(value, function (err, data) {

						if (typeof to == 'function') {

							to(data, function (err, _data) {

								finalResults.push(_data)

								callback()

							})

						}

					})

				}
				else {

					callback()
				}

			}, function (err) {

				if (err) {

					console.log(err)

					return backcall(err)
				}

				if (typeof releaser == 'function') {

					grabber.release(finalResults, releaser, function (err, __data) {

						if (err) {

							console.error(err)

							log.message('Error on releasing ' + name)

							return backcall(err)
						}

						log.message('Success on releasing ' + name)

						return backcall(null, finalResults)

					})
				}

				log.message('Grabber :: Batch No. ' + chunkBegin + ' to ' + chunkEnd + ' Created!')
			})
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.splitter = function (items, next) {

			log.message('Grabber :: Splitting data for action from ' + items.sizeAfter + ' to ' + items.batch)

			mapper[items.name] = {}

			mapper[items.name].type = items.type

			mapper[items.name].current = 0

			mapper[items.name].data = []

			mapper[items.name].result = items.result

			var count = items.batch

			var itemsData = items.data()

			var itemsCount = __.size(itemsData)

			mapper[items.name].released = itemsCount

			var i, j, f, temparray = [],

				cond = false,

				chunk = count;

			if (__.size(itemsData) > 0) {

				f = 0

				for (i = 0, j = itemsCount; i < j; i += chunk) {

					chunk = (i + chunk > itemsCount) ? itemsCount - i : chunk

					f += chunk

					temparray.push({

						from: i,

						to: f,

						data: itemsData.slice(i, i + chunk)
					})

					// grabber.batchs(items.name, itemsData.slice(i, i + chunk), items.translate.from, items.translate.to, i, f, items.type)

					if (f == itemsCount) {

						log.message('Grabber :: Batchs done, waiting job to finish')

						// setInterval(function () {

						// 	log.message('Grabber :: Checking the release of ' + items.name)

						// 	console.log(mapper[items.name])

						// 	grabber.release(items.name)

						// }, 1000)
					}
				}

				/**
				 * function to send to bacth
				 */
				var functions

				if (items.type == 'insertion') {

					functions = items.translate.insertion

				}
				else {

					functions = items.translate.deletion

				}

				async.mapSeries(temparray, function (data, callback) {

					grabber.batchs(items.name, data.data, items.translate.from, items.translate.to, functions, data.from, data.to, items.type, callback)

				}, function (err, results) {

					if (err) {

						console.log(err)
					}

					console.log(next)

					log.message('Grabber :: Total of ' + results.length + ' batchs are all done')

					next()
				})
			}
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.sorts = function (objectName, dataOne, dataTwo, batch, translateFrom, translateTo, insertion, deletion, next) {

			log.message('Grabber :: Sorting Data ' + objectName)

			var objects = {}

			var batch = batch

			var type = __.size(dataOne) - __.size(dataTwo)

			var model = (type > 0) ? 'insertion' : 'deletion'

			var datas

			log.message('Grabber :: Synck Type Is ' + model)

			objects.name = objectName

			objects.type = model

			objects.sizeBefore = (type > 0) ? __.size(dataOne) : __.size(dataTwo)

			datas = (type > 0) ? __.difference(dataOne, dataTwo) : __.difference(dataTwo, dataOne)

			objects.sizeAfter = (type > 0) ? __.size(datas) : __.size(dataOne) - __.size(datas)

			objects.batch = (__.isUndefined(batch)) ? __.size(datas) : batch

			objects.translate = {

				from: translateFrom,

				to: translateTo,

				insertion: insertion,

				deletion: deletion
			}

			objects.data = function () {

				return datas
			}

			objects.result = (type > 0) ? insertion : deletion

			console.log('obj ', next);

			grabber.splitter(objects, next)
		}

		/**
		 * creating listener to event se
		 * @type {[type]}
		 */
		grabber.createListener = function () {

			events.subscribe('synck.analyzer.differ', function (item) {

				log.message('Grabber :: Event "synck.analyzer.differ" launched')

				var name = {}

				var tasks = {}

				var analyzerCallback = item.callback

				var item = item.item

				log.message('Grabber :: Checking runnning process for ' + item.name)

				if (mapper[item.name]) {

					log.message('Grabber :: Found!')

					delete mapper[item.name]
				}

				log.message('Grabber :: Not found! Executing sorting and batching for ' + item.name)

				log.message('Grabber :: Getting ' + item.table.from.name + ' with ' + item.table.to.name)

				tasks[item.table.from.name] = item.table.from.function.all

				tasks[item.table.to.name] = item.table.to.function.all

				async.parallel(tasks, function (err, results) {

					if (err) {

						log.message('Grabber :: Getting Error')

						console.log(err)

						return analyzerCallback()
					}

					name[item.name] = {}

					name[item.name][item.table.from.name] = {}

					name[item.name][item.table.from.name]['size'] = __.size(results[item.table.from.name])

					name[item.name][item.table.from.name]['translate'] = item.table.from.function.translate

					name[item.name][item.table.from.name]['data'] = function () {

						return results[item.table.from.name]
					}

					name[item.name][item.table.to.name] = {}

					name[item.name][item.table.to.name]['size'] = __.size(results[item.table.to.name])

					name[item.name][item.table.to.name]['translate'] = item.table.to.function.translate

					name[item.name][item.table.to.name]['data'] = function () {

						return results[item.table.to.name]
					}

					grabber.sorts(item.name,

						results[item.table.from.name],

						results[item.table.to.name],

						item.batch,

						item.table.from.function.translate,

						item.table.to.function.translate,

						item.table.to.function.insert,

						item.table.to.function.delete,

						analyzerCallback)
				})
			})
		}

		if (!bootable) {

			bootable = true
		}

		return grabber
	}

}).call(this)
