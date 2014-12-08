(function () {

	'use strict'

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
