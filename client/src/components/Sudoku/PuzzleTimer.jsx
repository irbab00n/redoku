import React from 'react';
import moment from 'moment';

class PuzzleTimer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    // console.log('props on Puzzle Timer: ', this.props);
    const { showControls, timerData } = this.props;

    // if the timer is active and the elapsed time is greater than 0
    // if the timer is active and the 

    return (

      <div className="puzzle-timer-wrapper">
        <h4>Elapsed Time</h4>
        <div className={`puzzle-timer-container ${timerData.active ? 'active' : 'grey-bg'}`}>
          <div className="inner-wrapper">
            {moment().startOf('day').seconds(timerData.elapsedTime).format('H:mm:ss')}
          </div>
        </div>
        {
          showControls ?
            <div className="puzzle-timer-controls">
              {/* Pause button */}
              {
                timerData.active ? 
                  <label title="Resume timer" onClick={() => timerData.timer.pause()}><i className="fas fa-pause"></i></label> :
                  null
              }
              {/* Start/Resume */}
              {
                !timerData.started && !timerData.active ? 
                  <label title="Start timer" onClick={() => timerData.timer.start()}><i className="fas fa-play"></i></label> :
                  timerData.active ?
                    null :
                    <label title="Resume timer" onClick={() => timerData.timer.resume()}><i className="fas fa-play"></i></label>
              }
            </div> :
            null
        }
        
      </div>

    );

  }
}

export default PuzzleTimer;