(function(){

	var synck = require(__dirname + '/synck.js')()

	var config = require(__dirname + '/../config/config1.js')

	module.exports = function(){

		var index = {}

		index.init = function(){

			synck.config([config]).init()

		}

		return index.init()

	}()

}).call(this)