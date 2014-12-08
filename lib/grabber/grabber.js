/* 
* @Author: Laptop Kerja
* @Date:   2014-12-08 22:32:17
* @Last Modified by:   Laptop Kerja
* @Last Modified time: 2014-12-08 23:42:16
*/

(function(){

    'use strict';

    module.exports = function() {

        var grabber = grabber || {},
            events = require(__dirname +'/../../lib/event/event.js'),
            log = require(__dirname +'/../../lib/logger/logger.js')

        grabber.config;

        grabber.init = function(config) {

            log.message('Starting Data Grabber')

            grabber.config = config

        }

        return grabber

    }()

})()