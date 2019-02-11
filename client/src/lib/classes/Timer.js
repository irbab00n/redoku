/**
 * @class Timer
 * @author Thomas Cosby
 * @description - Creates a Timer that will wait for the specified delay before running a callback.  However, it is HIGHLY suggested to use this module with a delay of 1000, representing 1000ms or 1 second.
 * @param {Number} delay - Time to set the counting interval to
 * @param {Object} options - Configuration object with the following listener hooks:
 * {
 *   @property {Function} onPause - Callback to be ran once the Timer pauses counting
 *     @returns {String} - Remaining Hundredths value of the Timer until next tick
 *   @property {Function} onResume - Callback to be ran once the Timer resumes counting
 *     @returns {String} - Remaining Hundredths value of the Timer until next tick
 *   @property {Function} onStart - Callback to be ran once the Timer starts counting
 *     @returns {Number} - ID of the Timer interval
 *   @property {Function} onTick - Callback to be ran every interval tick
 *     @returns undefined
 * } 
*/
class Timer {
  constructor(delay, options) {
    this.delay = delay || 1000; // Default is 1 second.
    this.isPaused = false;  // Used to prevent usage of the 'start' method while there is a remaining amount to tick before starting a fresh timer
    this.isRunning = false;  // Used to prevent usage of the 'pause' method while there is no current timer running
    this.options = options;  // Save the supplied options to the instance
    this.remaining = delay;  // Stores the remaining time in ms until the next tick is supposed to occur for the timer
    this.startTime = null;  // Stores the start Date object
    this.timerId = null;  // Stores the id of the interval controlling the tick
  }

  pause() {
    if (!this.isRunning) {
      console.log('Timer is currently not running, you cannot pause it');
      return;
    }
    clearInterval(this.timerId);  // clear any remaining intervals
    this.timerId = null;  // reset the timerId
    this.isPaused = true;  // @CRITICAL -- toggle on the isPaused state
    this.isRunning = false;  // @CRITICAL -- toggle off the running state
    let elapsed = (new Date() - this.startTime).toString();  // calculate how much time has elapsed
    this.remaining = elapsed.substr(elapsed.length - 3);  // last 3 digits requird for
    if (this.options.hasOwnProperty('onPause')) { // if the user supplied an onPause listener
      this.options.onPause(this.remaining);  // run the listener, passing in the remaining value
    }
  }

  resume() {
    if (this.isRunning) {
      console.log('Timer is currently running, you cannot resume it');
      return;
    }
    clearInterval(this.timerId);  // clear any remaining intervals
    this.timerId = null;  // reset the timerId
    this.isPaused = false;  // @CRITIAL -- toggle off the isPaused state
    this.startTime = new Date();  // set the new startTime
    setTimeout(() => { // after the remaining time until next tick
      this.remaining = this.delay; // reset the 'remaining' property to the supplied delay
      if (this.options.hasOwnProperty('onTick')) { // if the user supplied an onTick listener
        this.options.onTick();  // run the listener
      }
      this.start(); // start a fresh counter interval
    }, this.remaining);
    if (this.options.hasOwnProperty('onResume')) {
      this.options.onResume(this.remaining);
    }
  }

  start() {
    if (this.isRunning) {
      console.log('Timer is already running, you cannot restart it');
      return;
    }
    if (this.isPaused) { // if the timer is paused, prevent starting a new timer; this prevents inaccuracies within the total time elapsed
      console.log('Timer is paused, must be resumed');
      return;
    }
    let onTick = this.options.hasOwnProperty('onTick') ? // if the user supplied an onTick listener
      this.options.onTick :  // use it for the interval
      () => {};  // if not, stub with empty function
    this.isRunning = true;  // toggle on the running state
    this.startTime = new Date();  // set the new startTime
    this.timerId = setInterval(onTick, this.delay);  // initiate the interval, save the timerId
    if (this.options.hasOwnProperty('onStart')) {  // if the user supplied an onStart listener
      this.options.onStart(this.timerId);  // run the listener
    }
  }
}

// var timer = new Timer(1000, {
//   onTick: () => console.log('tick!'),
//   onStart: (id) => console.log(`onStart running: `, id),
//   onPause: (remaining) => console.log(`onPause running: `, remaining),
//   onResume: (remaining) => console.log(`onResume running: `, remaining)
// });

module.exports = Timer;