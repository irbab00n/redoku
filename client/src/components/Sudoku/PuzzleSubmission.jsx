import React from 'react';

const PuzzleSubmission = ({ checkSolutionFunction, puzzle, timerData }) => (
  <div className="puzzle-submission-wrapper">
    <div className="inner-wrapper">
      {
        puzzle.winState ?
          null :
          <button
            className="puzzle-submission"
            onClick={
              () => {
                // timerData.timer.pause();
                checkSolutionFunction(JSON.parse(JSON.stringify(puzzle.matrix)));
              }
            }
          >
            Submit Puzzle
          </button>
      }
    </div>
    {
      puzzle.submissionMessage !== '' ?
        <div className="inner-wrapper">
          <p>{puzzle.submissionMessage}</p>
        </div> : null
    }
   
  </div>
);

export default PuzzleSubmission;