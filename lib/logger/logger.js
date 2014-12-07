(function () {

	'use strict'

	module.exports = function () {

		/**
		 * logger main object to export
		 * @type {Object}
		 */
		var logger = {}

		/**
		 * [type description]
		 * @type {String}
		 */
		var type = 'grey'

		/**
		 * [type description]
		 * @type {String}
		 */
		var defaults = 'info'

		/**
		 * [moment description]
		 * @type {[type]}
		 */
		var moment = require('moment')

		/**
		 * [utils description]
		 * @type {Object}
		 */
		logger.color = require('colors').setTheme({

			silly: 'rainbow',

			input: 'grey',

			verbose: 'cyan',

			prompt: 'grey',

			info: 'green',

			data: 'grey',

			help: 'cyan',

			warn: 'yellow',

			debug: 'blue',

			error: 'red'
		})

		/**
		 * [message description]
		 * @param  {[type]} message [description]
		 * @param  {[type]} type    [description]
		 * @return {[type]}         [description]
		 */
		logger.message = function (message, method, options) {

			return (typeof logger[method] !== "function") ? logger[defaults](message, options) : logger[method](message, options)
		}

		/**
		 * [section description]
		 * @param  {[type]} section [description]
		 * @param  {[type]} newline [description]
		 * @return {[type]}         [description]
		 */
		logger.section = function (message) {

			console.log(' ')

			console.log('==============================================================================')

			console.log(message)

			console.log('==============================================================================')

			console.log(' ')

			return logger
		}

		/**
		 *
		 * @param  {[type]} type [description]
		 * @return {[type]}      [description]
		 */
		logger.info = function (message) {

			console.log('%s %s %s', moment().format('DD MMMM HH::mm:ss'), '-' + ' [logger]'.debug + '[info]'.info, message)

			return logger
		}

		/**
		 *
		 * @param  {[type]} type [description]
		 * @return {[type]}      [description]
		 */
		logger.warn = function (message) {

			console.log('%s %s %s', moment().format('DD MMMM HH::mm:ss'), '-' + ' [logger]'.debug + '[error]'.warn, message)

			return logger
		}

		/**
		 *
		 * @param  {[type]} type [description]
		 * @return {[type]}      [description]
		 */
		logger.error = function (message) {

			console.log('%s %s %s', moment().format('DD MMMM HH::mm:ss'), '-' + ' [logger]'.debug + '[error]'.error, message)

			return logger
		}

		return logger

	}()

}).call(this)
