(function () {

	'use strict'

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
		analyzer.config = function (name, callback) {

			return (typeof analyzer[method] !== "function") ? analyzer[defaults](message, options) : analyzer[method](message, options)
		}

		return analyzer

	}

}).call(this)
