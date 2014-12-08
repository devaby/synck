(function () {

	'use strict'

	function(err, data){

		if(err){

			return false

		}



	}

	module.exports = function () {

		/**
		 * populator main object to export
		 * @type {Object}
		 */
		var populator = {}

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

		var bank = {}

		populator.storing = function(key, array){

			if(typeof array !== 'array') {

				console.error(new Error('Populator :: storing parameter 2 is not array'))
				return false
			
			}

			if(typeof key !== 'string'){

				console.error(new Error('Populator :: storing parameter 1 is not string'))
				return false

			} 

			bank[key] = array

			return true

		}

		populator.populate = function(key, callback){

			if(typeof key !== 'string'){

				console.error(new Error('Populator :: populate parameter 1 is not string'))
				return false

			}

			if(typeof callback !== 'function'){

				console.error(new Error('Populator :: storing parameter 2 is not function'))
				return false

			}

			if(typeof bank[key] !== 'array'){

				console.error(new Error('Populator :: storing parameter data is not an array'))
				return false

			}

			async.map(bank[key], function(_v){

				callback(null, _v)

			}, function(err, result){

				if(err){

					console.error(err)
					callback(err)
					return false

				}

				populator.flush()
			
			})

		}

		populator.check = function(key){

			if(typeof key !== 'string'){

				console.error(new Error('Populator :: check parameter 1 is not string'))
				return false

			}

			if(bank[key]){

				return true

			}else{

				return false

			}

		}

		populator.flush = function(key){

			if(this.check(key)){

				delete bank[key]

			}else{

				console.error(new Error('No key match to flush'))

			}

		}

		/**
		 * [message description]
		 * @param  {[type]} message [description]
		 * @param  {[type]} type    [description]
		 * @return {[type]}         [description]
		 */
		populator.config = function (name, callback) {

			return (typeof populator[method] !== "function") ? populator[defaults](message, options) : populator[method](message, options)

		}

		return populator

	}

}).call(this)
