/**
 * A collection of small utility functions that help with dom manipulation, adding listeners,
 * promises and other good things.
 *
 * @module Utils
 */

/**
 * Runs a waterfall of promises: calls each task, passing the result
 * from the previous one as an argument. The first task is run with an empty array.
 *
 * @memberof Utils
 * @param {array} methods of Promises to run waterfall on
 * @return {Promise} of the final task
 */
function promiseWaterfall (methods) {
  const [resolvedPromise, ...tasks] = methods
  const finalTaskPromise = tasks.reduce((prevTaskPromise, task) => {
    return prevTaskPromise.then(task)
  }, resolvedPromise([])) // initial value

  return finalTaskPromise
}

/**
 * Adds multiple listeners to to a DOM element
 * Equvalent to jQuery’s `$form.on('drag dragstart dragend dragover dragenter dragleave drop')`.
 *
 * @memberof Utils
 * @param {String} el selector
 * @param {String} events to add, like `drag dragstart dragend dragover dragenter dragleave drop`
 * @param {requestCallback} cb
 * @return {String}
 */
function addListenerMulti (el, events, cb) {
  const eventsArray = events.split(' ')
  for (let event in eventsArray) {
    el.addEventListener(eventsArray[event], cb, false)
  }
}

/**
 * Shallow flatten nested arrays.
 */
function flatten (arr) {
  return [].concat.apply([], arr)
}

function qsa (selector, context) {
  return Array.prototype.slice.call((context || document).querySelectorAll(selector) || [])
}

export default {
  promiseWaterfall,
  // toggleClass,
  // addClass,
  // removeClass,
  addListenerMulti,
  flatten,
  qsa
}
