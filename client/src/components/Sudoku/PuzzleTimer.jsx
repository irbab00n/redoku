import React from 'react';

class PuzzleTimer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (

      <div className="puzzle-timer-wrapper">
        <h4>Elapsed Time</h4>
        <div className="puzzle-timer-container">
          0
        </div>
        <div className="puzzle-timer-container">
          <button>
            Button
          </button>
        </div>
      </div>

    );

  }
}

export default PuzzleTimer;