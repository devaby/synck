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
		 * file system library
		 * @type {[type]}
		 */
		var fs = require('fs-extra');

		/**
		 * async library
		 * @type {object}
		 */
		var async = require('async')

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
		 * logger config
		 * @type {Object}
		 */
		logger.config = {

			saveToDisk : false,
			path : __dirname + '/log/',
			messageQueue : [],
			maxQueue : 2

		}

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

			if(logger.config.saveToDisk){

				logger.writeLog(moment().format('D MMM HH:mm:ss') + ' -' + ' [logger]' + '[info]' + message)

			}

			return logger
		}

		/**
		 *
		 * @param  {[type]} type [description]
		 * @return {[type]}      [description]
		 */
		logger.info = function (message) {

			console.log('%s %s %s', moment().format('D MMM HH:mm:ss'), '-' + ' [logger]'.debug + '[info]'.info, message)

			if(logger.config.saveToDisk){

				logger.writeLog(moment().format('D MMM HH:mm:ss') + ' -' + ' [logger]' + '[info]' + message)

			}

			return logger
		}

		/**
		 *
		 * @param  {[type]} type [description]
		 * @return {[type]}      [description]
		 */
		logger.warn = function (message) {

			console.log('%s %s %s', moment().format('D MMM HH:mm:ss'), '-' + ' [logger]'.debug + '[error]'.warn, message)

			if(logger.config.saveToDisk){

				logger.writeLog(moment().format('D MMM HH:mm:ss') + ' -' + ' [logger]' + '[warn]' + message)

			}

			return logger
		}

		/**
		 *
		 * @param  {[type]} type [description]
		 * @return {[type]}      [description]
		 */
		logger.error = function (message) {

			console.log('%s %s %s', moment().format('D MMM HH:mm:ss'), '-' + ' [logger]'.debug + '[error]'.error, message)

			if(logger.config.saveToDisk){

				logger.writeLog(moment().format('D MMM HH:mm:ss') + ' -' + ' [logger]' + '[error]' + message)

			}

			return logger
		}

		/**
		 * add message to queue
		 * @type {[type]}
		 */
		logger.addMessageToQueue = function(message) {

			logger.config.messageQueue.push(message)

		}

		/**
		 * write log message to file
		 * @type {object}
		 */
		logger.writeLog = function(message) {

			logger.prepareLogFile()

			logger.addMessageToQueue(message)

			if(logger.config.messageQueue.length >= logger.config.maxQueue) {

				async.eachSeries(logger.config.messageQueue, function(message, callback){

					fs.readFile(logger.config.path + 'log.log', 'utf8', function(err, data){

						if(err) {

							throw new Error('Error on Reading Log File')

						}

						data = data + "\r\n";

						data = data + message

						fs.outputFile(logger.config.path + 'log.log', data, function(err) {

							if(err) {

								throw new Error('Error writing log')

							}

							callback()

						})

					})

				})

			}

			return logger

		}

		/**
		 * prepare for log file
		 * check if file exist, if not, create a new one
		 * @type {object}
		 */
		logger.prepareLogFile = function() {

			if(logger.config.path) {

				fs.ensureFile(logger.config.path + 'log.log', function(err) {

					if(err) {

						throw new Error('Error on Creating Log File : ', err)

					}

				})

			}

			return logger

		}

		return logger

	}()

}).call(this)
