/* 
* @Author: Laptop Kerja
* @Date:   2014-12-08 22:32:17
* @Last Modified by:   Laptop Kerja
* @Last Modified time: 2014-12-09 02:16:15
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

            // events.subscribe('eventName', function(data){

                // dummy data
                var table_a = [

                    {

                        name : "Trina Friesen",
                        email : "mann.anika@example.net"

                    },
                    {

                        name : "Burney O'Kon",
                        email : "ivy.rohan@example.org"

                    },
                    {

                        name : "Dr. Junius Rogahn",
                        email : "schamberger.rickie@example.com"

                    },
                    {

                        name : "Jiles Jakubowski",
                        email : "daniela70@example.org"

                    },
                    {

                        name : "Kipp Rice",
                        email : "gulgowski.devyn@example.com"

                    },
                    {

                        name : "Woodrow Wolf",
                        email : "jacque03@example.net"

                    },
                    {

                        name : "Cason Botsford",
                        email : "almeda81@example.net"

                    },
                    {

                        name : "Mr. Halley Ryan",
                        email : "raquan44@example.net"

                    },
                    {

                        name : "Lilburn Weissnat",
                        email : "deonta88@example.com"

                    },
                    {

                        name : "Jerrad Schuppe",
                        email : "bhudson@example.com"

                    },


                ]

                var table_b = [

                    {

                        name : "Trina Friesen",
                        email : "mann.anika@example.net"

                    },
                    
                    {

                        name : "Dr. Junius Rogahn",
                        email : "schamberger.rickie@example.com"

                    },
                    
                    {

                        name : "Kipp Rice",
                        email : "gulgowski.devyn@example.com"

                    },
                    
                    {

                        name : "Cason Botsford",
                        email : "almeda81@example.net"

                    },
                    
                    {

                        name : "Lilburn Weissnat",
                        email : "deonta88@example.com"

                    },
                    

                ]

                var newTableA = grabber.objectTranslator(table_a)

                // console.log(newTableA)

                var newTableB = grabber.objectTranslator(table_b)

                // console.log(newTableB)

                var filtered = grabber.compareObject(newTableA, newTableB)

                console.log(filtered)

            // })

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