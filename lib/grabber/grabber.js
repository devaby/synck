/*
 * @Author: Laptop Kerja
 * @Date:   2014-12-08 22:32:17
 * @Last Modified by:   Laptop Kerja
 * @Last Modified time: 2014-12-16 07:25:27
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
		 *
		 */
		var analyzerCallback

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

			arrayWay = function(_data, releaser, _callback){

				async.map(_data, function(v, mcallback){

					releaser(v.id, v, function(e, done){

						if(e){

							// console.error(e)
							mcallback(e)
							return false

						}

						mcallback(null, done)

					})

				}, function(err, result){

					if(err){

						_callback(err)
						return false

					}

					_callback(null, result)

				})

			}

			objectWay = function(_data, releaser, _callback){

				releaser(_data.id, _data, function(e, done){

					if(e){

						// console.error(e)
						_callback(e)
						return false

					}

					// console.log('done', done)
					_callback(null, done)

				})

			}

			if(typeof data !== 'object'){

				callback(new Error('Argument 1 is not an Object or Array'))

				return false

			}else if(__.isArray(data)){
			// }else if(data.length > -1){

				// console.log('arrayWay')
				executer = arrayWay

			}else{

				// console.log('objectWay')
				executer = objectWay

			}

			if(typeof releaser !== 'function'){

				callback(new Error('Argument 2 is not an Function'))

				return false

			}

			if(typeof callback !== 'function'){

				callback(new Error('Argument 3 is not an Function'))

				return false

			}

			// console.log('pass requirement')

			executer(data, releaser, function(err, done){

				if(err){

					// console.error(err)
					callback(err)
					return false

				}

				// console.log(' final ')
				callback(null, done)

			})


			// if (mapper[name].current == mapper[name].released) {

			// 	log.message('Map of ' + name + ' has complete and released!!')

			// 	console.log(mapper[name])

			// 	var l1, l2, keys

			// 	async.each(mapper[name]['data'], function (value, callback) {

			// 			keys = __.keys(value)[0]

			// 			if (__.size(value[keys]) > 0) {

			// 				log.message('Grabber :: ' + name + ' batch No.' + keys + ' size ' + __.size(value[keys]))

			// 				mapper[name]['result'](keys, value[keys], callback)

			// 			}
			// 			else {

			// 				log.message('Grabber :: ' + name + ' batch No.' + keys + ' is Undefined, Canceling')
			// 			}

			// 		},
			// 		function (err) {

			// 			if (err) {

			// 				console.log(err)

			// 				log.message('Error Has Occured!!', 'error')

			// 				// analyzerCallback()
			// 			}

			// 			log.message('Grabber :: ' + name + ' has been released')

			// 			// analyzerCallback()
			// 		})
			// }
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.translate = function (data, callback) {

			async.parallel(data, function (err, results) {

				//  console.log(file);

				//  if (type == 'insertion') {

				//      to(file, callbacks)
				//  }
				//  else {

				//      from(file, callbacks)
				//  }

				// }, function (error, datas) {

				//  console.log(datas)

				//  if (error) {

				//      log.message('Grabber :: Batch No. ' + chunkBegin + ' Error!')

				//      console.log(error)

				//      return
				//  }

				//  log.message('Grabber :: Batch No. ' + chunkBegin + ' Created!')

				//  a[chunkBegin] = datas

				// mapper[name].data.push(a)
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

			// console.log('name', name)
			// console.log('data', data)
			// console.log('from', from)
			// console.log('to', to)
			// console.log('chunkBegin', chunkBegin)
			// console.log('chunkEnd', chunkEnd)
			// console.log('type', type)

			async.each(data, function (value, callback) {

				// if (err) {

				//  log.message('Grabber :: Batch No. ' + chunkBegin + ' Error!')

				//  console.log(err)

				//  return
				// }

				// log.message('Grabber :: Batch No. ' + chunkBegin + ' Created!')

				// console.log(value)

				// async.each(a[chunkBegin], function (file, callbacks) {

				// 	console.log(file);

				// 	if (type == 'insertion') {

				// 		to(file, callbacks)
				// 	}
				// 	else {

				// 		from(file, callbacks)
				// 	}

				// 	// callbacks()

				// }, function (error, datas) {

				// 	console.log(datas)

				// 	if (error) {

				// 		log.message('Grabber :: Batch No. ' + chunkBegin + ' Error!')

				// 		console.log(error)

				// 		return
				// 	}

				// 	log.message('Grabber :: Batch No. ' + chunkBegin + ' Created!')

				// 	a[chunkBegin] = datas

				// 	mapper[name].data.push(a)

				// })

				if(typeof from == 'function'){

					from(value, function(err, data){

						if(typeof to == 'function'){

							to(data, function(err, _data) {

								if(typeof releaser) {

									grabber.release(_data, releaser, function(err, __data){

										if(err) {

											console.error(err)

											log.message('Error on releasing ' + name)

											callback(err)

											return false

										}

										log.message('Success on releasing ' + name)

										callback()

									})

								}

								finalResults.push(_data)

							})

						}

					})

				}

				// i++

				// callback()

			}, function (err) {

				if (err) {

					console.log(err)
					backcall(err)
					return false

				}

				log.message('Grabber :: Batch No. ' + chunkBegin + ' to ' + chunkEnd + ' Created!')

				backcall(null, finalResults)
			})

			// jobs.push(function (callback) {

			// 	a[chunkBegin] = arrays[chunkBegin]

			// 	async.each(arrays[chunkBegin], function (item, calls) {

			// 		if (type == 'insertion') {

			// 			from(item, calls)
			// 		}
			// 		else {

			// 			to(item, calls)
			// 		}

			// 	}, function (err, results) {

			// 		if (err) {

			// 			log.message('Grabber :: Batch No. ' + chunkBegin + ' Error!')

			// 			console.log(err)

			// 			callback(true, err)

			// 			return
			// 		}

			// 		log.message('Grabber :: Batch No. ' + chunkBegin + ' Created!')

			// 		a[chunkBegin] = results

			// 		mapper[name].data.push(a)

			// 		callback(null, results)
			// 	})
			// })

			// async.series(jobs, function (err, results) {

			// 	if (err) {

			// 		log.message('Grabber :: Batch No. ' + chunkBegin + ' Error!')

			// 		return
			// 	}

			// 	console.log(results);

			// 	log.message('Grabber :: Processing Data Batch No. ' + chunkBegin + ' Done!')

			// })
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.splitter = function (items) {

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

				if(items.type == 'insertion') {

					functions = items.translate.insertion

				} else {

					functions = items.translate.deletion

				}

				async.map(temparray, function (data, callback) {

					grabber.batchs(items.name, data.data, items.translate.from, items.translate.to, functions, data.from, data.to, items.type, callback)

				}, function (err, results) {

					if (err) {

						console.log(err)
					}

					log.message('Grabber :: Total of ' + results.length + ' batchs are all done')
				})
			}
		}

		/**
		 * Starting Point Grabber library
		 * @type {function}
		 */
		grabber.sorts = function (objectName, dataOne, dataTwo, batch, translateFrom, translateTo, insertion, deletion) {

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

			grabber.splitter(objects)
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

				var item = item.item

				analyzerCallback = item.callback

				log.message('Grabber :: Checking runnning process for ' + item.name)

				if (mapper[item.name]) {

					log.message('Grabber :: Found!')

					return
				}

				log.message('Grabber :: Not found! Executing sorting and batching for ' + item.name)

				log.message('Grabber :: Getting ' + item.table.from.name + ' with ' + item.table.to.name)

				tasks[item.table.from.name] = item.table.from.function.all

				tasks[item.table.to.name] = item.table.to.function.all

				async.parallel(tasks, function (err, results) {

					if (err) {

						log.message('Grabber :: Getting Error')

						console.log(err)

						analyzerCallback()

						return
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

						item.table.to.function.delete)
				})

				return

			})

		}

		// grabber.objectTranslator = function (obj) {

		// 	var newObj = {}

		// 	__.each(obj, function (value, key) {

		// 		var newKey = ''

		// 		__.each(value, function (_value, _key) {

		// 			newKey += _key + ':' + _value + ';'

		// 		})

		// 		newKey = newKey.replace(/\s/g, '')

		// 		newObj[newKey] = value

		// 	})

		// 	return newObj

		// }

		// grabber.compareObject = function (objA, objB) {

		// 	var filteredObject = []

		// 	__.each(objA, function (value, key) {

		// 		if (!objB[key]) {

		// 			filteredObject.push(value)

		// 		}

		// 	})

		// 	return filteredObject

		// }



		if (!bootable) {

			// grabber.createListener()

			bootable = true
		}

		return grabber
	}

}).call(this)
