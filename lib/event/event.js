/**
 * event object
 * @type {object}
 */
var events = events || {},
    vent = require('vent')

/**
 * event emitter library object
 * @type {vent}
 */
events.eventEmitter = events.eventEmitter || new vent()

/**
 * subscribe to event name
 * @param  {string}   eventName 
 * @param  {Function} callback  
 * @return {object}             
 */
events.subscribe = function(eventName, callback) {

    events.eventEmitter.on(eventName, callback)    

    return events

}

/**
 * publish an event
 * @param  {string} eventName 
 * @param  {object} data     
 * @return {object}          
 */
events.publish = function(eventName, data) {

    events.eventEmitter.trigger(eventName, data)

    return events

}

module.exports = events