(function () {

	module.exports = function () {

		/**
		 * Synck main object to export
		 * @type {Object}
		 */
		var synck = {}

		/**
		 * [error description]
		 * @type {Array}
		 */
		var error = []

		/**
		 * [error description]
		 * @type {Array}
		 */
		var caller = null

		/**
		 * [utils description]
		 * @type {Object}
		 */
		synck.analyzer = require('./../lib/analyzer/analyzer.js')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		synck.populator = require('./../lib/populator/populator.js')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		synck.logger = require('./../lib/logger/logger.js')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		synck.utils = {

			q: require('q'),

			_: require('lodash'),

			async: require('async'),

			event: require('events'),

			moment: require('moment'),
		}

		synck.logger.message('Synck (code: awidin) is running', 'section', true)

		/**
		 * [prepare description]
		 * @return {[type]} [description]
		 */
		synck.prepare = function () {

			synck.logger.message('Initiate synck.prepare method')

			caller = arguments.callee.caller.toString()

			if (typeof synck.populator !== "function") {

				synck.logger.message('Populator is error, it is not a function', 'error')

				error.push('Populator is error, it is not a function')
			}

			return synck
		}

		/**
		 * [init description]
		 * @return {[type]} [description]
		 */
		synck.embark = function () {

			synck.logger.message('Initiate synck.embark method')

			if (synck.utils._.size(error) > 0) {

				return synck.logger.message(function () {

					return 'Errors found, we cannot continue. ERRORS: ', error

				}(), 'error')

				return false
			}

			return synck
		}

		return synck.prepare().embark()

	}()

}).call(this)
