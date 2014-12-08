(function () {

	var ev = require(__dirname + '/../event/event.js'),

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
		var watch = []

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
		analyzer.config = function (options) {

			console.log('config')

			config = options
		
		}

		analyzer.compare = function(callback){

			var result

			console.log('compare')

			// console.log('from function :: ', config.table.from.function.count())

			// console.log('to function :: ', config.table.to.function.count())

			if(result){

				callback()

			}

		}

		analyzer.init = function(callback){

			console.log('init')

			analyzer.looper()

		}

		analyzer.looper = function(){

			console.log('looper')

			async.map(config, function(_v){

				async.forever(function(next){

					analyzer.compare(function(err, data){

						if(err){

							console.error(err)
							return false

						}

						console.log('matter cuy')

						//next()

					})

					setTimeout(function(){

						console.log('next')

						next()

					}, 3000)

				}, function(err){

					console.error(err)

				})

			})

		}

		return analyzer

	}


}).call(this)
