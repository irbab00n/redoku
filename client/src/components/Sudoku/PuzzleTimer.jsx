import React from 'react';

class PuzzleTimer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    console.log('props on Puzzle Timer: ', this.props);
    const { timerData } = this.props;

    // if the timer is active and the elapsed time is greater than 0
    // if the timer is active and the 

    return (

      <div className="puzzle-timer-wrapper">
        <h4>Elapsed Time</h4>
        <div className="puzzle-timer-container">
          {timerData.elapsedTime}
        </div>
        <div className="puzzle-timer-container">
          {/* Pause button */}
          {
            timerData.active ? 
              <button onClick={() => timerData.timer.pause(timerData.timerId)}>
                PAUSE
              </button> :
              null
          }
          {/* Start/Resume */}
          {
            timerData.elapsedTime === 0 ? 
              <button onClick={() => timerData.timer.start()}>
                START
              </button> :
              timerData.active ?
                null :
                <button onClick={() => timerData.timer.resume()}>
                  RESUME
                </button>
          }
        </div>
      </div>

    );

  }
}

export default PuzzleTimer;