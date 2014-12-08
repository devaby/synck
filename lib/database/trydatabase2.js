/*(function () {

	'use strict'

	module.exports = function () {*/

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
		 * [tables description]
		 * @type {Array}
		 */
		var tables = ["tableOne", "tableTwo", "tableThree"]

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

			var prototype = {

				name:"t_perioda", 

				column:"gb"
			}

			var tasks = []

			var deferred = q.defer()

			async.each(tables, function (name, callback) {

				tasks.push(function (calls) {

					fs.exists('lib/files/' + name + '.json', function (exists) {

								if (!exists) {

									collections = new loki('lib/files/' + name + '.json')


									if (collections[name]) {

										deferred.reject(new Error(collections[name]))

										console.log("error collections")

										calls(null, {

											'name': name,

											result: collections[name]
										})

									}

									else 
									
									{

										console.log("create collections")

										calls(name, collections[name])

										/*var tasks = collections.addCollection('tasks');
											tasks.insert({
											  name: prototype.name,
											  column: prototype.column
											});
											tasks.insert({
											  name: prototype.name,
											  column: prototype.column
											});
											tasks.insert({
											  name: prototype.name,
											  column: prototype.column
											});

											console.log(tasks.data);*/
											collections.saveToDisk();
									}

								}

								else
								
								{
								
									console.log("file exists")
								
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

		//database.get = function (tables) {

			console.log("database get method")

			var tasks = []

			var deferred = q.defer()

			async.each(tables, function (name, callback) {

				tasks.push(function (calls) {

					console.log(name)

					collections = new loki('lib/files/' + name + '.json')

					collections.loadDatabase(function () {
					  var users2 = collections.getCollection('tasks')
					  console.log(users2.data);
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

			//return deferred.promise

		//}

		//database.put = function (tables) {

			
			
		//}

		//database.post = function (tables) {

			
			
		//}

		//database.delete = function (tables) {

			
			
		//}


		//return database

/*	}

}).call(this)*/