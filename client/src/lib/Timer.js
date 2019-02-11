/**
 * Creates a Timer object that will wait for the specified delay before running a callback
 * @param {Number} delay - Time to set the counting interval to
 * @param {Object} options - Configuration object with the following listener hooks:
 * {
 *   @field {Function} onPause - Callback to be ran once the Timer pauses counting
 *     @returns {String} - Remaining Hundredths value of the Timer until next tick
 *   @field {Function} onResume - Callback to be ran once the Timer resumes counting
 *     @returns {String} - Remaining Hundredths value of the Timer until next tick
 *   @field {Function} onStart - Callback to be ran once the Timer starts counting
 *     @returns {Number} - ID of the Timer interval
 *   @field {Function} onTick - Callback to be ran every interval tick
 *     @returns undefined
 * } 
*/
function Timer(delay, options) {
  /* 'delay' input validation */
  if (delay === undefined) {
    throw new Error(`\nMissing parameter supplied to Timer: delay\n\nMake sure you supply a valid Number`);
  }
  if (isNaN(delay)) {
    throw new TypeError(`\nInvalid input supplied for parameter 'delay'\n\nMake sure you supply a valid Number`);
  }
  /* 'options' input validation */
  if (typeof options !== 'object') {
    throw new TypeError(`\nInvalid input supplied for parameter 'options'\n\nMake sure you supply a valid Object`);
  }

  // remaining  - Stores the remaining time until next tick, defaulted to supplied delay time
  // running    - Stores running state of the timer
  // start      - Stores the start Date object
  // timerId    - Stores setTimeout to reference
  var remaining = delay, running, startTime, timerId;

  this.pause = function() {
    if (!running) {return;}
    running = false;
    // console.log('pausing the timer');
    clearInterval(timerId); // clear any existing intervals
    let elapsed = (new Date() - startTime).toString(); // Calculate the difference between 'now' and start time, convert to string
    remaining = elapsed.substr(elapsed.length - 3); // how long we have left until the next tick
    if (options.hasOwnProperty('onPause')) {
      options.onPause(remaining); // if an onPause callback is supplied, run it
    }
    // console.log(`Remaining time before next tick: ${remaining}ms`);
  };

  this.resume = function() {
    if (running) {return;}
    // console.log(`resuming timer with ${remaining}ms remaining until next tick`);
    startTime = new Date(); // set the start time
    clearInterval(timerId); // clear any existing intervals
    setTimeout(() => {
      remaining = delay; // reset the remaining field to the delay
      if (options.hasOwnProperty('onTick')) {
        options.onTick();
      }
      this.start();
    }, remaining);
    if (options.hasOwnProperty('onResume')) {
      options.onResume(remaining);
    }
  };

  this.start = function() {
    if (running) {return;}
    running = true;
    startTime = new Date(); // set the start time
    let onTick = options.hasOwnProperty('onTick') ? options.onTick : () => {}; // determine the onTick function
    timerId = setInterval(onTick, delay); // start the interval, and save the ID
    // console.log('starting timer: ', timerId);
    if (options.hasOwnProperty('onStart')) {
      options.onStart(timerId); // if an onStart callback is supplied, run it
    }
  };
}

// var timer = new Timer(1000, {
//   onTick: () => console.log('tick!'),
//   onStart: (id) => console.log(`onStart running: `, id),
//   onPause: (remaining) => console.log(`onPause running: `, remaining),
//   onResume: (remaining) => console.log(`onResume running: `, remaining)
// });

module.exports = Timer;



// On Start: can be used to set the 'Timer active' field in Redux state

// On Tick: can be used to increment a display counter held within Redux state -- track the number of seconds elapsed

// On Pause: can be used to pause the timer, and to return the remaining amount of time until the next tick

// On Resume: can be used to restart the timer, 

