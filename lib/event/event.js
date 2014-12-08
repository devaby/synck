/**
 * event object
 * @type {object}
 */
var events = events || {}

/**
 * event emitter library object
 * @type {vent}
 */
events.eventEmitter = new vent()

/**
 * subscribe to event name
 * @param  {string}   eventName 
 * @param  {Function} callback  
 * @return {object}             
 */
events.subscribe = function(eventName, callback) {

    events.eventEmitter.on(eventName, callback(data))    

    return events

}

/**
 * publish an event
 * @param  {string} evetName 
 * @param  {object} data     
 * @return {object}          
 */
events.publish = function(evetName, data) {

    events.eventEmitter.trigger(eventName, data)

    return events

}

module.exports = events