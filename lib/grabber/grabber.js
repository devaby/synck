/*
 * @Author: Laptop Kerja
 * @Date:   2014-12-08 22:32:17
 * @Last Modified by:   Laptop Kerja
 * @Last Modified time: 2014-12-09 05:27:08
 */

(function () {

	'use strict';

	var self

	module.exports = function () {

		var mapper = {},
			grabber = grabber || {},
			async = require('async'),
			__ = require('lodash'),
			events = require(__dirname + '/../../lib/event/event.js'),
			log = require(__dirname + '/../../lib/logger/logger.js')

		grabber.config;

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.init = function (config) {

			log.message('Starting Data Grabber')

			grabber.config = config
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.release = function (name) {

			if (mapper[name].current == mapper[name].released) {

				log.message('Map of ' + name + ' has complete and released!!')

				async.each(mapper[name]['data'], function (value, callback) {

					var l1, l2, keys

					keys = __.keys(value)[0]

					log.message('Map of ' + name + ' data batch No.' + keys + ' size ' + __.size(value[keys]))

					mapper[name]['result'](keys, value[keys], callback)

				}, function (err) {

					if (err) {

						console.log(err)

						log.message('Error Has Occured!!', 'error')

					}

					delete mapper[name]
				})
			}
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.batchs = function (name, data, from, to, chunkBegin, chunkEnd) {

			async.map(data, function (item, callback) {

				from(item, callback)

			}, function (err, results) {

				if (err) {

					log.message('Grabber :: Batch No. ' + chunkBegin + ' Error!')

					console.log(err)

					return
				}

				var a = {}

				a[chunkBegin] = results

				mapper[name].current = chunkEnd

				async.map(results, function (item, callback2) {

					to(item, callback2)

				}, function (err, results) {

					if (err) {

						log.message('Grabber :: Batch Filtered No. ' + chunkBegin + ' Error!')

						a[chunkBegin] = false

						return
					}

					a[chunkBegin] = results

					mapper[name].data.push(a)
				})
			})
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.splitter = function (items) {

			log.message('Grabber :: Splitting data for insert from ' + items.sizeAfter + ' to ' + items.batch)

			if (mapper[items.name]) {

				grabber.release(items.name)

				return grabber
			}

			mapper[items.name] = {}

			mapper[items.name].current = 0

			mapper[items.name].data = []

			mapper[items.name].result = items.translate.insert

			var count = items.batch

			var itemsData = items.data()

			var itemsCount = __.size(itemsData)

			mapper[items.name].released = itemsCount

			var i, j, f, temparray, cond = false,

				chunk = count;

			if (__.size(itemsData) > 0) {

				f = 0

				for (i = 0, j = itemsCount; i < j; i += chunk) {

					chunk = (i + chunk > itemsCount) ? itemsCount - i : chunk

					f += chunk

					self.batchs(items.name, itemsData.slice(i, i + chunk), items.translate.from, items.translate.to, i, f)
				}
			}
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.sorts = function (objectName, dataOne, dataTwo, batch, translateFrom, translateTo, insertion) {

			log.message('Grabber :: Sorting Data ' + objectName)

			var objects = {}

			var batch = batch

			var datas

			objects.name = objectName

			objects.sizeBefore = __.size(dataOne)

			datas = __.difference(dataOne, dataTwo)

			objects.sizeAfter = __.size(datas)

			objects.batch = (__.isUndefined(batch)) ? __.size(datas) : batch

			objects.translate = {

				from: translateFrom,

				to: translateTo,

				insert: insertion
			}

			objects.data = function () {

				return datas
			}

			objects.result = insertion

			grabber.splitter(objects)
		}

		/**
		 * creating listener to event se
		 * @type {[type]}
		 */
		grabber.createListener = function () {

			var name = {}

			var tasks = {}

			events.subscribe('AnalyzerMisscount', function (item) {

				log.message('Grabber :: AnalyzerMisscount Listener Fired!')

				log.message('Grabber :: Getting ' + item.table.from.name + ' with ' + item.table.to.name)

				tasks[item.table.from.name] = item.table.from.function.all

				tasks[item.table.to.name] = item.table.to.function.all

				async.parallel(tasks, function (err, results) {

					log.message('Grabber :: Ending')

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

					if (err) {

						console.log(err);

						return
					}

					self.sorts(item.name, results[item.table.from.name], results[item.table.to.name], item.batch, item.table.from.function.translate, item.table.to.function.translate, item.table.to.function.insert)
				})

				return

				data.table.from.function.all(function (err, sourceData) {

					if (err) {

						log.message('error on reading all data from table source', 'error')

						return grabber

					}

					var sourceData = sourceData

					data.table.to.function.all(function (err, destinationData) {

						if (err) {

							log.message('error on reading all data from table source', 'error')

							return grabber

						}

						var destinationData = destinationData

						var filteredObject = grabber.compareObject(grabber.objectTranslator(sourceData), grabber.objectTranslator(destinationData))

						events.publish('populatorPopulate', {

							data: filteredObject,
							callback: data.table.to.function.insert

						})

					})

				})

			})

		}

		grabber.objectTranslator = function (obj) {

			var newObj = {}

			__.each(obj, function (value, key) {

				var newKey = ''

				__.each(value, function (_value, _key) {

					newKey += _key + ':' + _value + ';'

				})

				newKey = newKey.replace(/\s/g, '')

				newObj[newKey] = value

			})

			return newObj

		}

		grabber.compareObject = function (objA, objB) {

			var filteredObject = []

			__.each(objA, function (value, key) {

				if (!objB[key]) {

					filteredObject.push(value)

				}

			})

			return filteredObject

		}

		if (!self) {

			self = grabber

			grabber.createListener()
		}

		return self
	}

})()
