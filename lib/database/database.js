(function () {

	'use strict'

	module.exports = function () {

		/**
		 * database main object to export
		 * @type {Object}
		 */
		var database = {}

		/**
		 * [type description]
		 * @type {String}
		 */
		var watch = []

		/**
		 * [collections description]
		 * @type {Array}
		 */
		var collections = []

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var q = require('q')

		/**
		 * [moment description]
		 * @type {[type]}
		 */
		var async = require('async')

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
		 * [utils description]
		 * @type {Object}
		 */
		var fs = require('fs')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		var loki = require('lokijs')

		/**
		 * [message description]
		 * @param  {[type]} message [description]
		 * @param  {[type]} type    [description]
		 * @return {[type]}         [description]
		 */
		database.init = function (tables) {

			console.log("database has been called")

			console.log(this);

			this.prototype.on('newConfig', 'test')

			var tasks = []

			var deferred = q.defer()

			async.each(tables, function (name, callback) {

				tasks.push(function (calls) {

					fs.exists('./files/' + name + '.json', function (exists) {

						if (!exists) {

							collections[name] = new loki('./files/' + name + '.json')

							if (collections[name]) {

								deferred.reject(new Error(collections[name]))

								calls(null, {

									'name': name,

									result: collections[name]
								})
							}
							else {

								calls(name, collections[name])
							}
						}
					})
				})

				callback()

			}, function (err) {

				if (err) {

					log.message('Synck (code: awidin) is running', 'section', true)
				}
			})

			async.parallel(tasks, function (err, result) {

				if (err) {

					log.message(('Failed to create table %s with reason %s', err, result), 'error')

				}
				else {

					log.message(('Table %s with reason %s', err, result), 'error')
				}

			}, function (err, results) {


			})

			return deferred.promise
		}

		/**
		 * [message description]
		 * @param  {[type]} message [description]
		 * @param  {[type]} type    [description]
		 * @return {[type]}         [description]
		 */
		database.config = function (name, callback) {

			return (typeof database[method] !== "function") ? database[defaults](message, options) : database[method](message, options)
		}

		return database

	}

}).call(this)
