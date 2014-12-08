/* 
* @Author: Laptop Kerja
* @Date:   2014-12-08 22:32:17
* @Last Modified by:   Laptop Kerja
* @Last Modified time: 2014-12-09 05:27:08
*/

(function(){

    'use strict';

    module.exports = function() {

        var grabber = grabber || {},
            __ = require('lodash'),
            events = require(__dirname +'/../../lib/event/event.js'),
            log = require(__dirname +'/../../lib/logger/logger.js')

        grabber.config;

        /**
         * Starting Point Grabber library
         * @type {function}
         */
        grabber.init = function(config) {

            log.message('Starting Data Grabber')

            grabber.config = config

            grabber.createListener()

        }

        /**
         * creating listener to event se
         * @type {[type]}
         */
        grabber.createListener = function() {

            events.subscribe('AnalyzerMisscount', function(data){

                data.table.from.function.all(function(err, sourceData){

                    if(err) {

                        log.message('error on reading all data from table source', 'error')

                        return grabber

                    }

                    var sourceData = sourceData

                    data.table.to.function.all(function(err, destinationData) {

                        if(err) {

                            log.message('error on reading all data from table source', 'error')

                            return grabber

                        }

                        var destinationData = destinationData

                        var filteredObject = grabber.compareObject(grabber.objectTranslator(sourceData), grabber.objectTranslator(destinationData))                    

                        events.publish('populatorPopulate', {

                            data : filteredObject,
                            callback : data.table.to.function.insert

                        })

                    })

                })

            })

        }

        grabber.objectTranslator = function(obj) {

            var newObj = {}

            __.each(obj, function(value, key){

                var newKey = ''

                __.each(value, function(_value, _key) {

                    newKey += _key + ':' + _value + ';'

                })

                newKey = newKey.replace(/\s/g, '')

                newObj[newKey] = value

            })

            return newObj

        }

        grabber.compareObject = function(objA, objB) {

            var filteredObject = []

            __.each(objA, function(value, key) {

                if(!objB[key]) {

                    filteredObject.push(value)

                }

            })

            return filteredObject

        }

        return grabber

    }

})()